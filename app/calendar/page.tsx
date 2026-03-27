'use client'

import { useEffect, useRef } from 'react'
import CalendarView from '@/components/CalendarView'
import Footer from '@/components/Footer'

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
    <main style={{
      background: 'linear-gradient(170deg, #3d1f0a 0%, #2e1608 40%, #261208 100%)',
      minHeight: '100vh',
    }}>

      {/* ── HEADER ── */}
      <section
        className="text-center"
        style={{
          padding: 'clamp(120px,16vh,180px) clamp(20px,5vw,56px) clamp(48px,6vw,80px)',
          position: 'relative',
        }}
      >
        {/* Orange glow bloom */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(248,110,23,0.11) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="animate-hero-1" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            display: 'block',
            marginBottom: '16px',
          }}>Events</span>
          <h1 className="animate-hero-2" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem,5vw,4rem)',
            fontWeight: 700,
            lineHeight: 1.06,
            color: '#FFF8EE',
            marginBottom: '18px',
          }}>
            Event Calendar
          </h1>
          <p className="animate-hero-3" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.92rem,1.4vw,1.02rem)',
            color: '#c8b5a0',
            lineHeight: 1.72,
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            Stay up to date with everything happening at Embers. Click any event to see full details.
          </p>
        </div>
      </section>

      {/* ── CALENDAR ── */}
      <section style={{
        padding: '0 clamp(20px,5vw,56px) clamp(100px,14vw,200px)',
        display: 'flex',
        justifyContent: 'center',
      }}>
        {/* Outer darker box */}
        <div
          ref={r}
          className="reveal"
          style={{
            maxWidth: '1060px',
            width: '100%',
            padding: 'clamp(20px,3vw,36px)',
            background: 'rgba(240,228,210,0.55)',
            border: '1px solid rgba(210,190,165,0.45)',
            borderRadius: '24px',
            boxShadow: '0 8px 48px rgba(0,0,0,0.45)',
          }}
        >
          <CalendarView />
        </div>
      </section>

      <Footer />

    </main>
  )
}
