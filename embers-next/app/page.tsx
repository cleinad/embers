'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HomePage() {
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

      {/* ─── HERO — transparent over watercolor ─── */}
      <section
        className="min-h-screen flex items-center justify-center text-center"
        style={{ padding: 'clamp(100px,14vh,160px) clamp(20px,5vw,56px) clamp(60px,8vh,100px)' }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
          <p className="animate-hero-1" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--brown-mid)',
            marginBottom: '14px',
            textShadow: '0 0 20px rgba(255,248,238,0.9)',
          }}>
            UBC · Christian Business Community
          </p>
          <h1 className="animate-hero-2" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.6rem,5.5vw,4.4rem)',
            fontWeight: 700,
            lineHeight: 1.06,
            color: 'var(--brown-dark)',
            marginBottom: '18px',
            textShadow: '0 0 30px rgba(255,248,238,0.8), 0 0 60px rgba(255,248,238,0.5)',
          }}>
            Disciples in<br />the Marketplace.
          </h1>
          <p className="animate-hero-3" style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.95rem,1.5vw,1.08rem)',
            color: 'var(--brown-mid)',
            lineHeight: 1.6,
            marginBottom: '8px',
            textShadow: '0 0 20px rgba(255,248,238,0.9)',
          }}>
            &ldquo;You are the light of the world.&rdquo;
          </p>
          <p className="animate-hero-3" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82em',
            letterSpacing: '0.05em',
            color: 'var(--brown-mid)',
            opacity: 0.65,
            marginBottom: '16px',
            textShadow: '0 0 20px rgba(255,248,238,0.9)',
          }}>— Matthew 5:14</p>
          <p className="animate-hero-4" style={{
            fontSize: 'clamp(0.92rem,1.4vw,1.02rem)',
            color: 'var(--brown-mid)',
            lineHeight: 1.72,
            marginBottom: '32px',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textShadow: '0 0 20px rgba(255,248,238,0.9)',
          }}>
            A community for UBC business students navigating the tension between faith and ambition. You don&apos;t have to choose.
          </p>
          <div className="animate-hero-5" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="#story"
              style={{
                display: 'inline-block',
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
                transition: 'transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
              }}
              onMouseEnter={e => {
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
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* ─── PURPOSE & MISSION — frosted glass panels over watercolor ─── */}
      <section style={{ padding: '0 clamp(20px,5vw,56px)', marginTop: '-4vh', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '780px', width: '100%' }}
          className="grid-cols-1 sm:grid-cols-2"
        >
          <div ref={r} className="reveal reveal-delay-1 glass-panel text-center"
            style={{ padding: 'clamp(24px,3.5vw,36px) clamp(22px,3vw,32px)' }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2vw,1.6rem)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '12px', lineHeight: 1.2 }}>Purpose</h2>
            <p style={{ fontSize: 'clamp(0.88rem,1.2vw,0.96rem)', lineHeight: 1.78, color: 'var(--text-mid)' }}>
              To build virtuous, loving and responsible disciples of Christ through accountability and responsible leadership.
            </p>
          </div>
          <div ref={r} className="reveal reveal-delay-2 glass-panel text-center"
            style={{ padding: 'clamp(24px,3.5vw,36px) clamp(22px,3vw,32px)' }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2vw,1.6rem)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '12px', lineHeight: 1.2 }}>Mission</h2>
            <p style={{ fontSize: 'clamp(0.88rem,1.2vw,0.96rem)', lineHeight: 1.78, color: 'var(--text-mid)' }}>
              Create a community and network for disciples of Jesus Christ in business to be the light of the world.
            </p>
          </div>
        </div>
      </section>

      {/* ─── STORY — frosted glass panel over watercolor ─── */}
      <section
        id="story"
        style={{
          padding: 'var(--pad-v) clamp(20px,5vw,56px)',
          marginTop: 'clamp(80px,14vw,280px)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div ref={r} className="reveal glass-panel" style={{ maxWidth: '620px', width: '100%', padding: 'clamp(32px,5vw,52px) clamp(28px,4vw,48px)' }}>
          <span className="section-label reveal">Our Story</span>
          <h2 ref={r} className="reveal reveal-delay-1 section-heading">
            Students with a heart for The Lord
          </h2>
          <p ref={r} className="reveal reveal-delay-2" style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            Embers started with a small group of students driven by a simple conviction: faith and business don&apos;t have to be separate worlds.
          </p>
          <p ref={r} className="reveal reveal-delay-3" style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            We believe Jesus calls his followers into every corner of life — including the marketplace. That means the lecture halls, the case rooms, the networking events, and the boardrooms. We exist to gather those who want to answer that call together, to build each other up, stay accountable, and be the kind of people who shine wherever they&apos;re placed.
          </p>
          <p ref={r} className="reveal reveal-delay-3" style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            Navigating professional settings today is difficult, but we believe that we should walk with Jesus every step of the way, no matter what the world throws at us. We are not to be isolated, but have other brothers and sisters with whom we can discuss our challenges and encourage one another.{' '}
            <strong style={{ color: 'var(--brown-dark)' }}>That is the setting Embers seeks to create.</strong>
          </p>
          <p ref={r} className="reveal reveal-delay-4" style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)' }}>
            If you&apos;ve ever felt the tension between your faith and your ambition, you&apos;re not alone. This community is for you.
          </p>
        </div>
      </section>

      {/* ─── WHAT WE DO — frosted glass activity cards over watercolor ─── */}
      <section style={{ padding: 'var(--pad-v) clamp(20px,5vw,56px)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <span ref={r} className="reveal section-label" style={{ textShadow: '0 0 20px rgba(255,248,238,0.9)' }}>What We Do</span>
          <h2 ref={r} className="reveal reveal-delay-1 section-heading" style={{ textShadow: '0 0 24px rgba(255,248,238,0.8), 0 0 48px rgba(255,248,238,0.4)' }}>
            Faith. Community. Impact.
          </h2>

          {/* Activities grid — 3 columns like original */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginTop: '28px' }}
            className="activities-grid-responsive"
          >
            {/* Featured — spans 2 cols */}
            <div ref={r} className="reveal reveal-delay-1 glass-panel" style={{
              gridColumn: 'span 2',
              background: 'rgba(255,248,238,0.70)',
              border: '1px solid rgba(243,108,30,0.15)',
              padding: 'clamp(20px,2.5vw,28px)',
              transition: 'transform 0.28s ease, box-shadow 0.28s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.cssText += ';transform:translateY(-4px);box-shadow:0 12px 36px rgba(243,108,30,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
            >
              <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '10px' }}>Flagship Event</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '12px', lineHeight: 1.25 }}>Panel Nights</h3>
              <p style={{ fontSize: '0.94rem', lineHeight: 1.76, color: 'var(--text-mid)' }}>
                We bring in leaders from the business world to share one thing: how their faith shapes what they do. The decisions they make, the people they lead, the work they pursue. Real people, real stories.
              </p>
            </div>

            {[
              { title: 'Bible Studies', desc: 'Weekly deep dives into Scripture and what it means to live faithfully in a competitive world.' },
              { title: 'Trivia Nights', desc: 'Community, laughter, and a healthy dose of competition. Just good people having a good time.' },
              { title: 'DTES Volunteering', desc: "Serving alongside our neighbours in Vancouver's Downtown Eastside, putting love into action." },
              { title: 'Case Competitions', desc: 'Taking our values into the arena — business problems, faith-driven teams, and integrity in the room.' },
            ].map((card, i) => (
              <div
                key={card.title}
                ref={r}
                className={`reveal reveal-delay-${(i % 3) + 2} glass-panel`}
                style={{ padding: 'clamp(20px,2.5vw,28px)', transition: 'transform 0.28s ease, box-shadow 0.28s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.cssText += ';transform:translateY(-4px);box-shadow:0 12px 36px rgba(42,31,20,0.10)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '12px', lineHeight: 1.25 }}>{card.title}</h3>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.76, color: 'var(--text-mid)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SITE BOTTOM — Instagram link, matches embers original ─── */}
      <div style={{ padding: '36px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a
          href="https://www.instagram.com/embers.ubc"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--brown-mid)',
            fontSize: '0.85rem',
            fontWeight: 400,
            letterSpacing: '0.05em',
            textShadow: '0 0 16px rgba(255,248,238,0.9)',
            transition: 'color 0.22s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--brown-mid)')}
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
