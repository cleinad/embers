'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

export interface Series {
  id: string
  title: string
  color: string
}

export const SERIES_COLORS: {
  key: string; label: string; solid: string;
  calendarBg: string; calendarBorder: string;
  calendarGlass: string; calendarGlassBorder: string; calendarGlassText: string;
  gradient: string; eventGradient: string; text: string; border: string
}[] = [
  {
    key: 'orange',
    label: 'Orange',
    solid: '#F86E17',
    calendarBg: '#d45a0a',
    calendarBorder: '#a84208',
    calendarGlass: 'linear-gradient(135deg, rgba(255,205,155,0.62) 0%, rgba(240,145,90,0.34) 100%)',
    calendarGlassBorder: 'rgba(245,164,106,0.62)',
    calendarGlassText: '#9a3e18',
    gradient: 'linear-gradient(135deg, rgba(255,205,155,0.62) 0%, rgba(240,145,90,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #ff9a4a 0%, #f06010 100%)',
    text: '#9a3e18',
    border: 'rgba(245,164,106,0.62)',
  },
  {
    key: 'brown',
    label: 'Brown',
    solid: '#7C5C3E',
    calendarBg: '#6b4e34',
    calendarBorder: '#4e3622',
    calendarGlass: 'linear-gradient(135deg, rgba(180,140,100,0.62) 0%, rgba(130,90,55,0.38) 100%)',
    calendarGlassBorder: 'rgba(160,120,80,0.62)',
    calendarGlassText: '#3e2a14',
    gradient: 'linear-gradient(135deg, rgba(180,140,100,0.62) 0%, rgba(140,100,65,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #c4a07a 0%, #8a6040 100%)',
    text: '#3e2a14',
    border: 'rgba(160,120,80,0.62)',
  },
  {
    key: 'blue',
    label: 'Blue',
    solid: '#3B6EA5',
    calendarBg: '#2e5a8a',
    calendarBorder: '#1e3f62',
    calendarGlass: 'linear-gradient(135deg, rgba(140,185,240,0.62) 0%, rgba(60,110,190,0.38) 100%)',
    calendarGlassBorder: 'rgba(100,160,220,0.62)',
    calendarGlassText: '#1a3d66',
    gradient: 'linear-gradient(135deg, rgba(140,185,240,0.62) 0%, rgba(80,140,210,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #7ab8f0 0%, #4080c8 100%)',
    text: '#1a3d66',
    border: 'rgba(100,160,220,0.62)',
  },
  {
    key: 'purple',
    label: 'Purple',
    solid: '#7B5EA7',
    calendarBg: '#664e8e',
    calendarBorder: '#4a3568',
    calendarGlass: 'linear-gradient(135deg, rgba(185,155,230,0.62) 0%, rgba(120,80,185,0.38) 100%)',
    calendarGlassBorder: 'rgba(160,120,210,0.62)',
    calendarGlassText: '#3e1f66',
    gradient: 'linear-gradient(135deg, rgba(185,155,230,0.62) 0%, rgba(140,105,195,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #c0a0e8 0%, #8058c0 100%)',
    text: '#3e1f66',
    border: 'rgba(160,120,210,0.62)',
  },
  {
    key: 'yellow',
    label: 'Yellow',
    solid: '#C89B10',
    calendarBg: '#a8820c',
    calendarBorder: '#7a5e08',
    calendarGlass: 'linear-gradient(135deg, rgba(255,225,120,0.62) 0%, rgba(200,155,20,0.38) 100%)',
    calendarGlassBorder: 'rgba(220,185,60,0.62)',
    calendarGlassText: '#6b4e00',
    gradient: 'linear-gradient(135deg, rgba(255,235,130,0.62) 0%, rgba(220,185,60,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #f5d870 0%, #c89820 100%)',
    text: '#6b4e00',
    border: 'rgba(220,190,80,0.62)',
  },
  {
    key: 'green',
    label: 'Green',
    solid: '#4A7C59',
    calendarBg: '#3b6648',
    calendarBorder: '#294a34',
    calendarGlass: 'linear-gradient(135deg, rgba(140,200,155,0.62) 0%, rgba(65,130,85,0.38) 100%)',
    calendarGlassBorder: 'rgba(100,175,120,0.62)',
    calendarGlassText: '#1e4a2e',
    gradient: 'linear-gradient(135deg, rgba(150,210,165,0.62) 0%, rgba(80,150,100,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #80c898 0%, #4a8060 100%)',
    text: '#1e4a2e',
    border: 'rgba(100,175,120,0.62)',
  },
  {
    key: 'red',
    label: 'Red',
    solid: '#A63D2F',
    calendarBg: '#8c3228',
    calendarBorder: '#66231b',
    calendarGlass: 'linear-gradient(135deg, rgba(220,145,130,0.62) 0%, rgba(175,60,45,0.38) 100%)',
    calendarGlassBorder: 'rgba(200,110,95,0.62)',
    calendarGlassText: '#5e1a10',
    gradient: 'linear-gradient(135deg, rgba(225,150,135,0.62) 0%, rgba(180,70,55,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #d88070 0%, #a84030 100%)',
    text: '#5e1a10',
    border: 'rgba(200,110,95,0.62)',
  },
  {
    key: 'pink',
    label: 'Pink',
    solid: '#B5607A',
    calendarBg: '#974f66',
    calendarBorder: '#703a4c',
    calendarGlass: 'linear-gradient(135deg, rgba(230,170,190,0.62) 0%, rgba(185,90,115,0.38) 100%)',
    calendarGlassBorder: 'rgba(210,135,160,0.62)',
    calendarGlassText: '#5e2035',
    gradient: 'linear-gradient(135deg, rgba(235,175,195,0.62) 0%, rgba(190,100,125,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #e0a0b8 0%, #b86080 100%)',
    text: '#5e2035',
    border: 'rgba(210,135,160,0.62)',
  },
  {
    key: 'gray',
    label: 'Gray',
    solid: '#7A7570',
    calendarBg: '#65605c',
    calendarBorder: '#4a4642',
    calendarGlass: 'linear-gradient(135deg, rgba(190,185,178,0.62) 0%, rgba(120,115,108,0.38) 100%)',
    calendarGlassBorder: 'rgba(165,160,152,0.62)',
    calendarGlassText: '#38342e',
    gradient: 'linear-gradient(135deg, rgba(195,190,183,0.62) 0%, rgba(135,130,122,0.34) 100%)',
    eventGradient: 'linear-gradient(135deg, #b8b4ae 0%, #807a74 100%)',
    text: '#38342e',
    border: 'rgba(165,160,152,0.62)',
  },
]

interface SeriesPanelProps {
  showToast: (msg: string, type?: 'success' | 'error') => void
  triggerNewRef?: React.MutableRefObject<(() => void) | null>
}

// ── shared button styles ──
const btnOrange = {
  padding: '10px 22px',
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
  cursor: 'pointer',
  transition: 'transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
} as React.CSSProperties

export default function SeriesPanel({ showToast, triggerNewRef }: SeriesPanelProps) {
  const [seriesList, setSeriesList] = useState<Series[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingSeries, setEditingSeries] = useState<Series | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // form state
  const [formTitle, setFormTitle] = useState('')
  const [formColor, setFormColor] = useState('orange')
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [titleError, setTitleError] = useState<string | null>(null)

  const fetchSeries = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('series').select('*').order('title', { ascending: true })
    if (!error) setSeriesList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchSeries() }, [fetchSeries])

  useEffect(() => {
    if (triggerNewRef) triggerNewRef.current = openCreate
  })

  function openCreate() {
    setEditingSeries(null)
    setFormTitle('')
    setFormColor('orange')
    setFormError(null)
    setTitleError(null)
    setShowForm(true)
  }

  function openEdit(s: Series) {
    setEditingSeries(s)
    setFormTitle(s.title)
    setFormColor(s.color)
    setFormError(null)
    setTitleError(null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelForm() {
    setShowForm(false)
    setEditingSeries(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = formTitle.trim()
    if (!trimmed) { setTitleError('Title is required.'); return }
    if (trimmed.length > 80) { setTitleError('Title must be 80 characters or fewer.'); return }
    setTitleError(null)
    setFormLoading(true)
    setFormError(null)

    const payload = { title: trimmed, color: formColor }
    let result
    if (editingSeries) {
      result = await supabase.from('series').update(payload).eq('id', editingSeries.id)
    } else {
      result = await supabase.from('series').insert([payload])
    }

    if (result.error) {
      setFormError(result.error.message)
    } else {
      showToast(editingSeries ? 'Series updated!' : 'Series created!')
      setShowForm(false)
      setEditingSeries(null)
      fetchSeries()
    }
    setFormLoading(false)
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('series').delete().eq('id', id)
    if (error) showToast('Failed to delete series.', 'error')
    else { showToast('Series deleted.'); setDeleteConfirm(null); fetchSeries() }
  }

  const colorFor = (key: string) => SERIES_COLORS.find(c => c.key === key) ?? SERIES_COLORS[0]

  const btnGhost: React.CSSProperties = {
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
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Series Form */}
      {showForm && (
        <div className="glass-panel" style={{ padding: 'clamp(24px,4vw,40px)', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '24px' }}>
            {editingSeries ? 'Edit Series' : 'Create New Series'}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--brown-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Title *
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={e => { setFormTitle(e.target.value); if (titleError) setTitleError(null) }}
                placeholder="Series name"
                maxLength={100}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: titleError ? '1px solid rgba(220,38,38,0.5)' : '1px solid rgba(42,31,20,0.15)', background: titleError ? 'rgba(220,38,38,0.04)' : 'rgba(255,248,238,0.7)', color: 'var(--text)', fontSize: '0.875rem', outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' }}
                onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--orange)')}
                onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
              />
              {titleError && <span style={{ display: 'block', marginTop: '4px', fontSize: '0.75rem', color: '#b91c1c' }}>{titleError}</span>}
            </div>

            {/* Color picker */}
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--brown-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Color
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {SERIES_COLORS.map(c => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setFormColor(c.key)}
                    title={c.label}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: c.solid,
                      border: formColor === c.key ? '3px solid var(--brown-dark)' : '3px solid transparent',
                      outline: formColor === c.key ? '2px solid rgba(42,31,20,0.3)' : '2px solid transparent',
                      outlineOffset: '2px',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, outline 0.15s ease',
                      transform: formColor === c.key ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                    }}
                  />
                ))}
              </div>
              <p style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-mid)' }}>
                Selected: <strong>{colorFor(formColor).label}</strong>
              </p>
            </div>

            {formError && (
              <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#b91c1c', borderRadius: '10px', padding: '10px 14px', fontSize: '0.85rem' }}>{formError}</div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                disabled={formLoading}
                style={{ ...btnOrange, flex: 1, opacity: formLoading ? 0.6 : 1, cursor: formLoading ? 'not-allowed' : 'pointer' }}
                onMouseEnter={e => { if (!formLoading) { const el = e.currentTarget as HTMLElement; el.style.background = 'linear-gradient(135deg, rgba(255,160,85,0.95) 0%, rgba(240,90,10,0.90) 100%)'; el.style.transform = 'translateY(-2px)' } }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'linear-gradient(135deg, rgba(255,148,70,0.82) 0%, rgba(248,100,18,0.72) 100%)'; el.style.transform = 'translateY(0)' }}
              >
                {formLoading ? 'Saving…' : editingSeries ? 'Update Series' : 'Create Series'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                style={btnGhost}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,248,238,0.85)'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,248,238,0.55)'; el.style.transform = 'translateY(0)' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Series list */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(42,31,20,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--brown-dark)', fontSize: '1.1rem' }}>
            All Series
            {seriesList.length > 0 && <span style={{ marginLeft: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', fontWeight: 400, color: 'var(--text-mid)' }}>({seriesList.length})</span>}
          </h2>
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
            <div className="w-8 h-8 border-4 border-[var(--orange)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : seriesList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-mid)', fontSize: '0.875rem' }}>
            No series yet. Click &ldquo;+ New Series&rdquo; to get started.
          </div>
        ) : (
          <div>
            {seriesList.map(s => {
              const col = colorFor(s.color)
              return (
                <div key={s.id}
                  style={{ padding: '16px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(42,31,20,0.06)', transition: 'background 0.15s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,248,238,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                >
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: col.solid, flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontWeight: 600, color: 'var(--brown-dark)', fontSize: '0.875rem' }}>{s.title}</h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-mid)' }}>{col.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button
                      onClick={() => openEdit(s)}
                      style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, border: '1px solid rgba(42,31,20,0.15)', color: 'var(--brown-dark)', background: 'rgba(255,248,238,0.5)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'background 0.15s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,248,238,0.9)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,248,238,0.5)')}
                    >Edit</button>
                    {deleteConfirm === s.id ? (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => handleDelete(s.id)} style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Confirm</button>
                        <button onClick={() => setDeleteConfirm(null)} style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, border: '1px solid rgba(42,31,20,0.15)', color: 'var(--text-mid)', background: 'rgba(255,248,238,0.5)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(s.id)}
                        style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, border: '1px solid rgba(220,38,38,0.2)', color: '#dc2626', background: 'rgba(220,38,38,0.04)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'background 0.15s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.08)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.04)')}
                      >Delete</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
