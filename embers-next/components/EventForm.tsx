'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface EventData {
  id?: string
  title: string
  date: string
  start_time: string
  end_time: string
  host_name: string
  room: string
  description: string
}

interface EventFormProps {
  initial?: EventData | null
  onSuccess: () => void
  onCancel: () => void
}

const empty: EventData = {
  title: '',
  date: '',
  start_time: '17:00',
  end_time: '18:00',
  host_name: '',
  room: '',
  description: '',
}

// ── Validation limits ──
const LIMITS = {
  title: 80,
  host_name: 60,
  room: 80,
  description: 700,
}

function charCount(value: string, max: number) {
  const remaining = max - value.length
  const near = remaining <= Math.floor(max * 0.15)   // warn when ≤15% left
  const over = remaining < 0
  return { remaining, near, over }
}

export default function EventForm({ initial, onSuccess, onCancel }: EventFormProps) {
  const [form, setForm] = useState<EventData>(initial ?? empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof EventData, string>>>({})

  useEffect(() => {
    setForm(initial ?? empty)
    setError(null)
    setFieldErrors({})
  }, [initial])

  function validate(): boolean {
    const errs: Partial<Record<keyof EventData, string>> = {}

    if (!form.title.trim()) {
      errs.title = 'Title is required.'
    } else if (form.title.length > LIMITS.title) {
      errs.title = `Title must be ${LIMITS.title} characters or fewer.`
    }

    if (!form.date) {
      errs.date = 'Date is required.'
    }

    if (form.host_name.length > LIMITS.host_name) {
      errs.host_name = `Host name must be ${LIMITS.host_name} characters or fewer.`
    }

    if (form.room.length > LIMITS.room) {
      errs.room = `Room / Location must be ${LIMITS.room} characters or fewer.`
    }

    if (form.description.length > LIMITS.description) {
      errs.description = `Description must be ${LIMITS.description} characters or fewer.`
    }

    if (form.start_time && form.end_time && form.end_time <= form.start_time) {
      errs.end_time = 'End time must be after start time.'
    }

    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target

    // Enforce hard character limits — silently cap at max+1 so the error shows
    const limit = LIMITS[name as keyof typeof LIMITS]
    if (limit !== undefined && value.length > limit + 20) return  // ignore pastes wildly over limit

    setForm((prev) => ({ ...prev, [name]: value }))

    // Clear field error on change
    if (fieldErrors[name as keyof EventData]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[name as keyof EventData]; return next })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setError(null)

    const payload = {
      title: form.title.trim(),
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time || null,
      host_name: form.host_name.trim(),
      room: form.room.trim(),
      description: form.description.trim(),
    }

    let result
    if (form.id) {
      result = await supabase.from('events').update(payload).eq('id', form.id)
    } else {
      result = await supabase.from('events').insert([payload])
    }

    if (result.error) {
      setError(result.error.message)
    } else {
      onSuccess()
    }
    setLoading(false)
  }

  const isEditing = !!form.id

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-lg border ${hasError ? 'border-red-400 bg-red-50' : 'border-[rgba(42,31,20,0.15)] bg-white'} text-[var(--text)] text-sm focus:outline-none focus:ring-2 ${hasError ? 'focus:ring-red-400' : 'focus:ring-[var(--orange)]'} focus:border-transparent transition placeholder-[var(--text-mid)]`
  const labelClass = 'block text-xs font-semibold tracking-wide text-[var(--brown-dark)] mb-1.5 uppercase'
  const fieldErrorClass = 'text-xs text-red-600 mt-1'
  const charHintClass = (over: boolean, near: boolean) =>
    `text-xs mt-1 text-right ${over ? 'text-red-600 font-medium' : near ? 'text-amber-600' : 'text-[var(--text-mid)] opacity-60'}`

  const titleCount = charCount(form.title, LIMITS.title)
  const hostCount  = charCount(form.host_name, LIMITS.host_name)
  const roomCount  = charCount(form.room, LIMITS.room)
  const descCount  = charCount(form.description, LIMITS.description)

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

      {/* Title */}
      <div>
        <label className={labelClass} htmlFor="title">Title *</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="Event title"
          maxLength={LIMITS.title + 20}
          className={inputClass(!!fieldErrors.title)}
        />
        <div className="flex justify-between items-start mt-1">
          {fieldErrors.title
            ? <span className={fieldErrorClass}>{fieldErrors.title}</span>
            : <span />}
          {(titleCount.near || titleCount.over) && (
            <span className={charHintClass(titleCount.over, titleCount.near)}>
              {titleCount.over ? `${-titleCount.remaining} over limit` : `${titleCount.remaining} left`}
            </span>
          )}
        </div>
      </div>

      {/* Date / Time row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr auto auto' }}>
        <div>
          <label className={labelClass} htmlFor="date">Date *</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={form.date}
            onChange={handleChange}
            className={inputClass(!!fieldErrors.date)}
          />
          {fieldErrors.date && <span className={fieldErrorClass}>{fieldErrors.date}</span>}
        </div>
        <div>
          <label className={labelClass} htmlFor="start_time">Start</label>
          <input
            id="start_time"
            name="start_time"
            type="time"
            value={form.start_time}
            onChange={handleChange}
            className={inputClass(false)}
            style={{ width: '120px' }}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="end_time">End</label>
          <input
            id="end_time"
            name="end_time"
            type="time"
            value={form.end_time}
            onChange={handleChange}
            className={inputClass(!!fieldErrors.end_time)}
            style={{ width: '120px' }}
          />
          {fieldErrors.end_time && (
            <span className={fieldErrorClass} style={{ display: 'block', whiteSpace: 'nowrap' }}>{fieldErrors.end_time}</span>
          )}
        </div>
      </div>

      {/* Host Name */}
      <div>
        <label className={labelClass} htmlFor="host_name">Host Name</label>
        <input
          id="host_name"
          name="host_name"
          type="text"
          value={form.host_name}
          onChange={handleChange}
          placeholder="Who is hosting this event?"
          maxLength={LIMITS.host_name + 20}
          className={inputClass(!!fieldErrors.host_name)}
        />
        <div className="flex justify-between items-start mt-1">
          {fieldErrors.host_name
            ? <span className={fieldErrorClass}>{fieldErrors.host_name}</span>
            : <span />}
          {(hostCount.near || hostCount.over) && (
            <span className={charHintClass(hostCount.over, hostCount.near)}>
              {hostCount.over ? `${-hostCount.remaining} over limit` : `${hostCount.remaining} left`}
            </span>
          )}
        </div>
      </div>

      {/* Room */}
      <div>
        <label className={labelClass} htmlFor="room">Room / Location</label>
        <input
          id="room"
          name="room"
          type="text"
          value={form.room}
          onChange={handleChange}
          placeholder="e.g. Henry Angus 354"
          maxLength={LIMITS.room + 20}
          className={inputClass(!!fieldErrors.room)}
        />
        <div className="flex justify-between items-start mt-1">
          {fieldErrors.room
            ? <span className={fieldErrorClass}>{fieldErrors.room}</span>
            : <span />}
          {(roomCount.near || roomCount.over) && (
            <span className={charHintClass(roomCount.over, roomCount.near)}>
              {roomCount.over ? `${-roomCount.remaining} over limit` : `${roomCount.remaining} left`}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass} htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          placeholder="What's this event about?"
          maxLength={LIMITS.description + 50}
          className={`${inputClass(!!fieldErrors.description)} resize-none`}
        />
        <div className="flex justify-between items-start mt-1">
          {fieldErrors.description
            ? <span className={fieldErrorClass}>{fieldErrors.description}</span>
            : <span />}
          <span className={charHintClass(descCount.over, descCount.near)}>
            {descCount.over
              ? `${-descCount.remaining} over limit`
              : descCount.near
                ? `${descCount.remaining} left`
                : `${form.description.length} / ${LIMITS.description}`}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          style={{
            flex: 1,
            padding: '10px 24px',
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
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
          }}
          onMouseEnter={e => {
            if (loading) return
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
          {loading ? 'Saving…' : isEditing ? 'Update Event' : 'Create Event'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px',
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
          Cancel
        </button>
      </div>
    </form>
  )
}
