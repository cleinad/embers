'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import EventForm from '@/components/EventForm'
import SeriesPanel from '@/components/SeriesPanel'

interface Event {
  id: string
  title: string
  date: string
  start_time: string
  end_time: string
  host_name: string
  room: string
  description: string
  series_id: string | null
  created_at: string
}

type View = 'login' | 'dashboard'
type DashTab = 'events' | 'series'

export default function AdminPage() {
  const router = useRouter()
  const [view, setView] = useState<View>('login')
  const [dashTab, setDashTab] = useState<DashTab>('events')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [loginFieldErrors, setLoginFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [events, setEvents] = useState<Event[]>([])
  const [seriesMap, setSeriesMap] = useState<Record<string, { title: string; color: string }>>({})
  const [eventsLoading, setEventsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [dateSort, setDateSort] = useState<'asc' | 'desc'>('desc')
  const seriesNewRef = useRef<(() => void) | null>(null)
  const PAGE_SIZE = 10

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  setToast({ msg, type })
  setToastVisible(true)
  setTimeout(() => setToastVisible(false), 2800)
  setTimeout(() => setToast(null), 3300)
}

  const fetchSeries = useCallback(async () => {
    const { data } = await supabase.from('series').select('id,title,color')
    if (data) {
      const map: Record<string, { title: string; color: string }> = {}
      for (const s of data) map[s.id] = { title: s.title, color: s.color }
      setSeriesMap(map)
    }
  }, [])

  const fetchEvents = useCallback(async () => {
    setEventsLoading(true)
    const [evRes] = await Promise.all([
      supabase.from('events').select('*').order('date', { ascending: true }),
      fetchSeries(),
    ])
    if (!evRes.error) setEvents(evRes.data ?? [])
    setEventsLoading(false)
  }, [fetchSeries])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const allowed = await checkExec(session.user.email ?? '')
        if (allowed) { setView('dashboard'); fetchEvents() }
        else { await supabase.auth.signOut(); router.replace('/') }
      }
    })
  }, [router, fetchEvents])

  async function checkExec(userEmail: string): Promise<boolean> {
    const { data } = await supabase
      .from('exec_users').select('id').eq('email', userEmail).maybeSingle()
    return !!data
  }

  function validateLogin(): boolean {
    const errs: { email?: string; password?: string } = {}
    const emailTrimmed = email.trim()

    if (!emailTrimmed) {
      errs.email = 'Email is required.'
    } else if (emailTrimmed.length > 254) {
      errs.email = 'Email address is too long.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errs.email = 'Please enter a valid email address.'
    }

    if (!password) {
      errs.password = 'Password is required.'
    } else if (password.length > 128) {
      errs.password = 'Password must be 128 characters or fewer.'
    }

    setLoginFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!validateLogin()) return
    setAuthLoading(true)
    setAuthError(null)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setAuthError(error.message); setAuthLoading(false); return }
    const allowed = await checkExec(data.user?.email ?? '')
    if (!allowed) {
      await supabase.auth.signOut()
      setAuthError('You are not authorized as an exec member.')
      setAuthLoading(false)
      return
    }
    setView('dashboard')
    fetchEvents()
    setAuthLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setView('login'); setEvents([]); setEmail(''); setPassword('')
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) showToast('Failed to delete event.', 'error')
    else { showToast('Event deleted.'); setDeleteConfirm(null); fetchEvents() }
  }

  function handleFormSuccess() {
    showToast(editingEvent ? 'Event updated!' : 'Event created!')
    setShowForm(false); setEditingEvent(null); fetchEvents()
  }

  // ── DERIVED: filtered + sorted events ──
  const filteredEvents = events
    .filter(ev => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.trim().toLowerCase()
      const seriesTitle = ev.series_id && seriesMap[ev.series_id] ? seriesMap[ev.series_id].title : ''
      return (
        ev.title?.toLowerCase().includes(q) ||
        ev.date?.toLowerCase().includes(q) ||
        ev.start_time?.toLowerCase().includes(q) ||
        ev.end_time?.toLowerCase().includes(q) ||
        ev.host_name?.toLowerCase().includes(q) ||
        ev.room?.toLowerCase().includes(q) ||
        ev.description?.toLowerCase().includes(q) ||
        seriesTitle.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      const cmp = a.date.localeCompare(b.date)
      return dateSort === 'asc' ? cmp : -cmp
    })

  // ── LOGIN VIEW ──
  if (view === 'login') {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ padding: 'clamp(20px,5vw,56px)' }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <div className="text-center" style={{ marginBottom: '32px' }}>
            <span className="section-label" style={{ display: 'block', marginBottom: '8px' }}>Admin Access</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: 'var(--brown-dark)', textShadow: '0 0 30px rgba(255,248,238,0.8)' }}>
              Admin Login
            </h1>
          </div>
          <div className="glass-panel" style={{ padding: 'clamp(28px,4vw,40px)' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--brown-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }} htmlFor="email">Email</label>
                <input
                  id="email" type="email" required value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (loginFieldErrors.email) setLoginFieldErrors(p => ({ ...p, email: undefined }))
                  }}
                  placeholder="e.g. nick@embersubc.com"
                  maxLength={254}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: loginFieldErrors.email ? '1px solid rgba(220,38,38,0.5)' : '1px solid rgba(42,31,20,0.15)', background: loginFieldErrors.email ? 'rgba(220,38,38,0.04)' : 'rgba(255,248,238,0.7)', color: 'var(--text)', fontSize: '0.875rem', outline: 'none', fontFamily: 'var(--font-sans)' }}
                  onFocus={e => (e.currentTarget.style.boxShadow = loginFieldErrors.email ? '0 0 0 2px rgba(220,38,38,0.4)' : '0 0 0 2px var(--orange)')}
                  onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                />
                {loginFieldErrors.email && (
                  <span style={{ display: 'block', marginTop: '4px', fontSize: '0.75rem', color: '#b91c1c' }}>{loginFieldErrors.email}</span>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--brown-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }} htmlFor="password">Password</label>
                <input
                  id="password" type="password" required value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (loginFieldErrors.password) setLoginFieldErrors(p => ({ ...p, password: undefined }))
                  }}
                  placeholder="••••••••"
                  maxLength={128}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: loginFieldErrors.password ? '1px solid rgba(220,38,38,0.5)' : '1px solid rgba(42,31,20,0.15)', background: loginFieldErrors.password ? 'rgba(220,38,38,0.04)' : 'rgba(255,248,238,0.7)', color: 'var(--text)', fontSize: '0.875rem', outline: 'none', fontFamily: 'var(--font-sans)' }}
                  onFocus={e => (e.currentTarget.style.boxShadow = loginFieldErrors.password ? '0 0 0 2px rgba(220,38,38,0.4)' : '0 0 0 2px var(--orange)')}
                  onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                />
                {loginFieldErrors.password && (
                  <span style={{ display: 'block', marginTop: '4px', fontSize: '0.75rem', color: '#b91c1c' }}>{loginFieldErrors.password}</span>
                )}
              </div>
              {authError && (
                <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#b91c1c', borderRadius: '10px', padding: '10px 14px', fontSize: '0.85rem' }}>{authError}</div>
              )}
              <button
                type="submit" disabled={authLoading}
                style={{
                  padding: '14px 32px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, rgba(255,148,70,0.82) 0%, rgba(248,100,18,0.72) 100%)',
                  border: '1px solid rgba(248,110,23,0.70)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  boxShadow: '0 2px 12px rgba(248,110,23,0.30), inset 0 1px 0 rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  cursor: authLoading ? 'not-allowed' : 'pointer',
                  opacity: authLoading ? 0.6 : 1,
                  transition: 'transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  if (authLoading) return
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'linear-gradient(135deg, rgba(255,160,85,0.95) 0%, rgba(240,90,10,0.90) 100%)'
                  el.style.borderColor = 'rgba(240,90,10,0.85)'
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = '0 8px 28px rgba(248,110,23,0.40), inset 0 1px 0 rgba(255,255,255,0.38)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'linear-gradient(135deg, rgba(255,148,70,0.82) 0%, rgba(248,100,18,0.72) 100%)'
                  el.style.borderColor = 'rgba(248,110,23,0.70)'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 2px 12px rgba(248,110,23,0.30), inset 0 1px 0 rgba(255,255,255,0.35)'
                }}
              >
                {authLoading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  // ── DASHBOARD VIEW ──
  return (
    <main className="min-h-screen">

      {/* Header */}
      <section style={{ padding: 'clamp(100px,14vh,140px) clamp(20px,5vw,56px) clamp(32px,4vw,48px)' }}>
        <div className="admin-header-row" style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <span className="section-label" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>Admin Dashboard</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: 'var(--brown-dark)', textShadow: '0 0 30px rgba(255,248,238,0.8)' }}>
              {dashTab === 'events' ? 'Event Management' : 'Series Management'}
            </h1>
          </div>
          <div className="admin-action-buttons" style={{ display: 'flex', gap: '12px' }}>
            {dashTab === 'events' ? (
              <button
                onClick={() => { setEditingEvent(null); setShowForm(true) }}
                style={{ padding: '10px 22px', borderRadius: '6px', background: 'linear-gradient(135deg, rgba(255,148,70,0.82) 0%, rgba(248,100,18,0.72) 100%)', border: '1px solid rgba(248,110,23,0.70)', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.04em', boxShadow: '0 2px 12px rgba(248,110,23,0.30), inset 0 1px 0 rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', cursor: 'pointer', transition: 'transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'linear-gradient(135deg, rgba(255,160,85,0.95) 0%, rgba(240,90,10,0.90) 100%)'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'linear-gradient(135deg, rgba(255,148,70,0.82) 0%, rgba(248,100,18,0.72) 100%)'; el.style.transform = 'translateY(0)' }}
              >+ New Event</button>
            ) : (
              <button
                onClick={() => seriesNewRef.current?.()}
                style={{ padding: '10px 22px', borderRadius: '6px', background: 'linear-gradient(135deg, rgba(255,148,70,0.82) 0%, rgba(248,100,18,0.72) 100%)', border: '1px solid rgba(248,110,23,0.70)', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.04em', boxShadow: '0 2px 12px rgba(248,110,23,0.30), inset 0 1px 0 rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', cursor: 'pointer', transition: 'transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'linear-gradient(135deg, rgba(255,160,85,0.95) 0%, rgba(240,90,10,0.90) 100%)'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'linear-gradient(135deg, rgba(255,148,70,0.82) 0%, rgba(248,100,18,0.72) 100%)'; el.style.transform = 'translateY(0)' }}
              >+ New Series</button>
            )}
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 22px',
                borderRadius: '6px',
                background: 'rgba(255,248,238,0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: 'var(--brown-mid)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                border: '1px solid rgba(42,31,20,0.15)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,248,238,0.85)'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 6px 20px rgba(42,31,20,0.10), inset 0 1px 0 rgba(255,255,255,0.6)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,248,238,0.55)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.5)'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 clamp(20px,5vw,56px) var(--pad-v)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', gap: '0', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(42,31,20,0.12)', alignSelf: 'flex-start', background: 'rgba(255,248,238,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            {(['events', 'series'] as DashTab[]).map((tab, i) => (
              <button
                key={tab}
                onClick={() => { setDashTab(tab); setShowForm(false); setEditingEvent(null) }}
                style={{
                  padding: '9px 24px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.04em',
                  border: 'none',
                  borderLeft: i > 0 ? '1px solid rgba(42,31,20,0.12)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.18s ease, color 0.18s ease',
                  background: dashTab === tab ? 'rgba(248,110,23,0.15)' : 'transparent',
                  color: dashTab === tab ? 'var(--orange)' : 'var(--text-mid)',
                  textTransform: 'capitalize',
                }}
              >{tab}</button>
            ))}
          </div>

          {dashTab === 'series' ? (
            <SeriesPanel showToast={showToast} triggerNewRef={seriesNewRef} />
          ) : (<>

          {/* Event Form — frosted glass */}
          {showForm && (
            <div className="glass-panel" style={{ padding: 'clamp(24px,4vw,40px)', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '24px' }}>
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <EventForm
                initial={editingEvent}
                onSuccess={handleFormSuccess}
                onCancel={() => { setShowForm(false); setEditingEvent(null) }}
              />
            </div>
          )}

          {/* Search section */}
          <div className="glass-panel" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem', pointerEvents: 'none', opacity: 0.5 }}>🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                  placeholder="Search events by title, host, room, description…"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: '10px',
                    border: '1px solid rgba(42,31,20,0.15)',
                    background: 'rgba(255,248,238,0.7)',
                    color: 'var(--text)',
                    fontSize: '0.875rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--orange)')}
                  onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setCurrentPage(1) }}
                  style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 500, border: '1px solid rgba(42,31,20,0.15)', color: 'var(--text-mid)', background: 'rgba(255,248,238,0.5)', cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', transition: 'background 0.15s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,248,238,0.9)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,248,238,0.5)')}
                >
                  Clear
                </button>
              )}
            </div>
            {searchQuery && (
              <p style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-mid)', fontFamily: 'var(--font-sans)' }}>
                {filteredEvents.length === 0 ? 'No events match your search.' : `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''} found`}
              </p>
            )}
          </div>

          {/* Events list — frosted glass */}
          <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(42,31,20,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--brown-dark)', fontSize: '1.1rem' }}>
                All Events
                {events.length > 0 && <span style={{ marginLeft: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', fontWeight: 400, color: 'var(--text-mid)' }}>({filteredEvents.length}{searchQuery ? ` of ${events.length}` : ''})</span>}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-mid)', fontFamily: 'var(--font-sans)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Date</span>
                <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(42,31,20,0.15)' }}>
                  <button
                    onClick={() => { setDateSort('asc'); setCurrentPage(1) }}
                    style={{ padding: '5px 12px', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'var(--font-sans)', border: 'none', cursor: 'pointer', transition: 'background 0.15s ease, color 0.15s ease', background: dateSort === 'asc' ? 'rgba(248,110,23,0.15)' : 'rgba(255,248,238,0.5)', color: dateSort === 'asc' ? 'var(--orange)' : 'var(--text-mid)' }}
                    onMouseEnter={e => { if (dateSort !== 'asc') (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,238,0.9)' }}
                    onMouseLeave={e => { if (dateSort !== 'asc') (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,238,0.5)' }}
                  >↑ Asc</button>
                  <div style={{ width: '1px', background: 'rgba(42,31,20,0.15)' }} />
                  <button
                    onClick={() => { setDateSort('desc'); setCurrentPage(1) }}
                    style={{ padding: '5px 12px', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'var(--font-sans)', border: 'none', cursor: 'pointer', transition: 'background 0.15s ease, color 0.15s ease', background: dateSort === 'desc' ? 'rgba(248,110,23,0.15)' : 'rgba(255,248,238,0.5)', color: dateSort === 'desc' ? 'var(--orange)' : 'var(--text-mid)' }}
                    onMouseEnter={e => { if (dateSort !== 'desc') (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,238,0.9)' }}
                    onMouseLeave={e => { if (dateSort !== 'desc') (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,238,0.5)' }}
                  >↓ Desc</button>
                </div>
              </div>
            </div>

            {eventsLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
                <div className="w-8 h-8 border-4 border-[var(--orange)] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-mid)', fontSize: '0.875rem' }}>
                No events yet. Click &ldquo;+ New Event&rdquo; to get started.
              </div>
            ) : filteredEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-mid)', fontSize: '0.875rem' }}>
                No events match your search.
              </div>
            ) : (
              <div>
                {filteredEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((ev) => (
                  <div key={ev.id} style={{ padding: '16px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '12px', borderBottom: '1px solid rgba(42,31,20,0.06)', transition: 'background 0.15s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,248,238,0.4)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontWeight: 600, color: 'var(--brown-dark)', fontSize: '0.875rem', marginBottom: '4px' }}>{ev.title}</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px', fontSize: '0.75rem', color: 'var(--text-mid)' }}>
                        {ev.date && <span>📅 {new Date(ev.date + 'T00:00:00').toLocaleDateString('en-CA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                        {ev.start_time && <span>🕐 {ev.start_time}{ev.end_time ? ` – ${ev.end_time}` : ''}</span>}
                        {ev.host_name && <span>👤 {ev.host_name}</span>}
                        {ev.room && <span>📍 {ev.room}</span>}
                        {ev.series_id && seriesMap[ev.series_id] && <span>📚 {seriesMap[ev.series_id].title}</span>}
                      </div>
                      {ev.description && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-mid)', marginTop: '6px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{ev.description}</p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => { setEditingEvent(ev); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, border: '1px solid rgba(42,31,20,0.15)', color: 'var(--brown-dark)', background: 'rgba(255,248,238,0.5)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'background 0.15s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,248,238,0.9)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,248,238,0.5)')}
                      >Edit</button>
                      {deleteConfirm === ev.id ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button onClick={() => handleDelete(ev.id)} style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, border: '1px solid rgba(42,31,20,0.15)', color: 'var(--text-mid)', background: 'rgba(255,248,238,0.5)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(ev.id)} style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, border: '1px solid rgba(220,38,38,0.2)', color: '#dc2626', background: 'rgba(220,38,38,0.04)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'background 0.15s ease' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.08)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.04)')}
                        >Delete</button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Pagination controls */}
                {filteredEvents.length > PAGE_SIZE && (
                  <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(42,31,20,0.08)' }}>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{ padding: '6px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500, border: '1px solid rgba(42,31,20,0.15)', color: currentPage === 1 ? 'var(--text-mid)' : 'var(--brown-dark)', background: 'rgba(255,248,238,0.5)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1, fontFamily: 'var(--font-sans)', transition: 'background 0.15s ease' }}
                      onMouseEnter={e => { if (currentPage !== 1) (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,238,0.9)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,238,0.5)' }}
                    >← Prev</button>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)', fontFamily: 'var(--font-sans)' }}>
                      Page {currentPage} of {Math.ceil(filteredEvents.length / PAGE_SIZE)}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredEvents.length / PAGE_SIZE), p + 1))}
                      disabled={currentPage === Math.ceil(filteredEvents.length / PAGE_SIZE)}
                      style={{ padding: '6px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500, border: '1px solid rgba(42,31,20,0.15)', color: currentPage === Math.ceil(filteredEvents.length / PAGE_SIZE) ? 'var(--text-mid)' : 'var(--brown-dark)', background: 'rgba(255,248,238,0.5)', cursor: currentPage === Math.ceil(filteredEvents.length / PAGE_SIZE) ? 'not-allowed' : 'pointer', opacity: currentPage === Math.ceil(filteredEvents.length / PAGE_SIZE) ? 0.4 : 1, fontFamily: 'var(--font-sans)', transition: 'background 0.15s ease' }}
                      onMouseEnter={e => { if (currentPage !== Math.ceil(filteredEvents.length / PAGE_SIZE)) (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,238,0.9)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,238,0.5)' }}
                    >Next →</button>
                  </div>
                )}
              </div>
            )}
          </div>

          </>)}

        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 50,
            padding: '14px 24px',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            opacity: toastVisible ? 1 : 0,
            transition: 'opacity 0.5s ease',
            ...(toast.type === 'success'
              ? {
                  background: 'rgba(248,110,23,0.45)',
                  border: '1px solid rgba(248,110,23,0.55)',
                  color: '#fff',
                  boxShadow: '0 4px 24px rgba(248,110,23,0.25)',
                }
              : {
                  background: 'rgba(220,38,38,0.55)',
                  border: '1px solid rgba(220,38,38,0.45)',
                  color: '#fff',
                  boxShadow: '0 4px 24px rgba(220,38,38,0.25)',
                }),
          }}
        >
          {toast.msg}
        </div>
      )}
    </main>
  )
}
