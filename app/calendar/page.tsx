'use client'

import { useEffect, useRef } from 'react'
import CalendarView from '@/components/CalendarView'

export default function CalendarPage() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    revealRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const r = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <main>

      {/* ── HEADER — transparent over watercolor ── */}
      <section
        className="text-center"
        style={{ padding: 'clamp(120px,16vh,180px) clamp(20px,5vw,56px) clamp(48px,6vw,80px)' }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <span className="animate-hero-1 section-label" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>Events</span>
          <h1 className="animate-hero-2" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem,5vw,4rem)',
            fontWeight: 700,
            lineHeight: 1.06,
            color: 'var(--brown-dark)',
            marginBottom: '18px',
            textShadow: '0 0 30px rgba(255,248,238,0.8), 0 0 60px rgba(255,248,238,0.5)',
          }}>
            Event Calendar
          </h1>
          <p className="animate-hero-3" style={{
            fontSize: 'clamp(0.92rem,1.4vw,1.02rem)',
            color: 'var(--brown-mid)',
            lineHeight: 1.72,
            maxWidth: '480px',
            margin: '0 auto',
            textShadow: '0 0 20px rgba(255,248,238,0.9)',
          }}>
            Stay up to date with everything happening at Embers. Click any event to see full details.
          </p>
        </div>
      </section>

      {/* ── CALENDAR — frosted glass panel ── */}
      <section style={{ padding: '0 clamp(20px,5vw,56px) var(--pad-v)', display: 'flex', justifyContent: 'center' }}>
        <div ref={r} className="reveal glass-panel calendar-section-panel" style={{ maxWidth: '1000px', width: '100%', padding: 'clamp(24px,4vw,40px)' }}>
          <CalendarView />
        </div>
      </section>

      {/* ── SITE BOTTOM — Instagram link ── */}
      <div style={{ padding: '36px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a
          href="https://www.instagram.com/embers.ubc"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-bottom-link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
          @embers.ubc
        </a>
      </div>

    </main>
  )
}
