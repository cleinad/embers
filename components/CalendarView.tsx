'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid/index.js'
import timeGridPlugin from '@fullcalendar/timegrid/index.js'
import interactionPlugin from '@fullcalendar/interaction/index.js'
import { EventClickArg } from '@fullcalendar/core/index.js'
import { supabase } from '@/lib/supabaseClient'

interface Event {
  id: string
  title: string
  date: string
  start_time: string
  end_time: string
  host_name: string
  room: string
  description: string
  created_at: string
}

interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
  extendedProps: {
    start_time: string
    end_time: string
    host_name: string
    room: string
    description: string
  }
}

interface SelectedEvent extends Event {}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null)
  const [search, setSearch] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [])

  // Lock body scroll when modal is open, restore when closed
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedEvent])

  async function fetchEvents() {
    setLoading(true)
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
    } else {
      const mapped: CalendarEvent[] = (data || []).map((ev: Event) => ({
        id: ev.id,
        title: ev.title,
        start: ev.start_time ? `${ev.date}T${ev.start_time}` : ev.date,
        end: ev.end_time ? `${ev.date}T${ev.end_time}` : undefined,
        extendedProps: {
          start_time: ev.start_time,
          end_time: ev.end_time,
          host_name: ev.host_name,
          room: ev.room,
          description: ev.description,
        },
      }))
      setEvents(mapped)
    }
    setLoading(false)
  }

  function handleEventClick(arg: EventClickArg) {
    arg.jsEvent.preventDefault()
    ;(arg.jsEvent.target as HTMLElement).blur()
    const ev = arg.event
    setSelectedEvent({
      id: ev.id,
      title: ev.title,
      date: ev.startStr.split('T')[0],
      start_time: ev.extendedProps.start_time,
      end_time: ev.extendedProps.end_time,
      host_name: ev.extendedProps.host_name,
      room: ev.extendedProps.room,
      description: ev.extendedProps.description,
      created_at: '',
    })
  }

  const filteredEvents = events.filter((ev) =>
    ev.title.toLowerCase().includes(search.toLowerCase()) ||
    ev.extendedProps.host_name?.toLowerCase().includes(search.toLowerCase()) ||
    ev.extendedProps.room?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search events by title, host, or room…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 rounded-lg border border-[rgba(42,31,20,0.15)] bg-[rgba(255,248,238,0.8)] text-[var(--text)] placeholder-[var(--text-mid)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent transition"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-[var(--orange)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-[rgba(255,248,238,0.8)] backdrop-blur-md rounded-2xl p-4 md:p-6 border border-[rgba(42,31,20,0.06)]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={
              isMobile
                ? { left: 'prev,next', center: 'title', right: 'today' }
                : { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }
            }
            events={filteredEvents}
            eventClick={handleEventClick}
            height="auto"
          />
        </div>
      )}

      {/* Event Detail Modal — portalled to body so it sits above all FC stacking contexts */}
      {selectedEvent && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[rgba(42,31,20,0.45)] backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-[var(--cream)] rounded-2xl max-w-md w-full shadow-2xl relative flex flex-col"
            style={{ padding: '32px 28px 28px 28px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-[var(--text-mid)] hover:text-[var(--orange)] transition-colors text-xl font-light"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ paddingBottom: '20px' }}>
              <span className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--orange)] block mb-2">
                Event Details
              </span>
              <h2 className="font-serif font-bold text-[var(--brown-dark)] text-2xl leading-tight">
                {selectedEvent.title}
              </h2>
            </div>

            {/* Attributes */}
            <div className="space-y-3 text-sm text-[var(--text-mid)]" style={{ paddingBottom: '28px' }}>
              {selectedEvent.date && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[var(--brown-dark)] w-20 shrink-0">Date</span>
                  <span>{new Date(selectedEvent.date + 'T00:00:00').toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
              {(selectedEvent.start_time || selectedEvent.end_time) && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[var(--brown-dark)] w-20 shrink-0">Time</span>
                  <span>
                    {selectedEvent.start_time}
                    {selectedEvent.end_time ? ` – ${selectedEvent.end_time}` : ''}
                  </span>
                </div>
              )}
              {selectedEvent.host_name && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[var(--brown-dark)] w-20 shrink-0">Host</span>
                  <span>{selectedEvent.host_name}</span>
                </div>
              )}
              {selectedEvent.room && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[var(--brown-dark)] w-20 shrink-0">Room</span>
                  <span>{selectedEvent.room}</span>
                </div>
              )}
              {selectedEvent.description && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[var(--brown-dark)] w-20 shrink-0">About</span>
                  <span className="leading-relaxed">{selectedEvent.description}</span>
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(255,205,155,0.45) 0%, rgba(240,145,90,0.28) 100%)',
                border: '1px solid rgba(245,164,106,0.5)',
                color: '#9a3e18',
                boxShadow: '0 1px 4px rgba(230,120,50,0.10), inset 0 1px 0 rgba(255,255,255,0.45)',
                backdropFilter: 'blur(6px)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(255,215,165,0.58) 0%, rgba(240,145,90,0.40) 100%)'
                el.style.borderColor = 'rgba(230,140,80,0.65)'
                el.style.boxShadow = '0 2px 8px rgba(230,120,50,0.16), inset 0 1px 0 rgba(255,255,255,0.5)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(255,205,155,0.45) 0%, rgba(240,145,90,0.28) 100%)'
                el.style.borderColor = 'rgba(245,164,106,0.5)'
                el.style.boxShadow = '0 1px 4px rgba(230,120,50,0.10), inset 0 1px 0 rgba(255,255,255,0.45)'
              }}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}