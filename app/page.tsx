'use client'

import { useEffect, useRef } from 'react'
import ImageCarousel from '@/components/ImageCarousel'
import EventCarousel from '@/components/EventCarousel'
import PartnersCarousel from '@/components/PartnersCarousel'
import Footer from '@/components/Footer'

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
        className="hero-section flex items-center justify-center text-center"
        style={{
          minHeight: '100vh',
          padding: 'clamp(100px,14vh,160px) clamp(20px,5vw,56px) clamp(80px,10vh,140px)',
        }}
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


      {/* ─── OUR MISSION — orange-toned dark brown strip ─── */}
      <section style={{
        background: 'linear-gradient(150deg, #3d1f0a 0%, #2e1608 60%, #261208 100%)',
        width: '100%',
        padding: 'clamp(64px,8vw,100px) clamp(20px,5vw,56px)',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Orange gloss bloom — top-left */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 15% 0%, rgba(248,110,23,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div className="mission-grid" style={{
          maxWidth: '1140px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 420px',
          gap: 'clamp(40px,5vw,72px)',
          alignItems: 'center',
        }}>
          {/* Left: Mission text */}
          <div ref={r} className="reveal" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              display: 'block',
              marginBottom: '18px',
            }}>Our Mission</span>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem,3.2vw,2.6rem)',
              fontWeight: 700,
              lineHeight: 1.12,
              color: '#FFF8EE',
              marginBottom: '20px',
            }}>
              Rooted in faith.<br />Built for business.
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.93rem,1.3vw,1.02rem)',
              lineHeight: 1.82,
              color: '#c8b5a0',
              marginBottom: '28px',
            }}>
              Embers exists to form virtuous, courageous leaders who bring the light of Christ into the marketplace. We gather UBC business students to grow together in faith, sharpen one another in community, and step into every boardroom, case room, and career with integrity and purpose.
            </p>
            <div style={{
              width: '48px',
              height: '2px',
              background: 'linear-gradient(90deg, #f86e17 0%, transparent 100%)',
              borderRadius: '2px',
              marginBottom: '20px',
            }} />
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.92rem',
              color: '#a08878',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <em>&ldquo;Let your light shine before others.&rdquo;</em>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.06em', color: '#7a6558' }}>— Matthew 5:16</span>
            </p>
          </div>

          {/* Right: Carousel */}
          <div ref={r} className="reveal reveal-delay-2" style={{
            width: '100%',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}>
            <ImageCarousel />
          </div>
        </div>
      </section>

      {/* ─── OUR STORY — dark orange theme ─── */}
      <section id="story" style={{
        background: 'linear-gradient(170deg, #c2460a 0%, #c24010 45%, #b83c0e 75%, #b23a0c 100%)',
        width: '100%',
        padding: 'clamp(64px,8vw,100px) clamp(20px,5vw,56px)',
        position: 'relative',
        borderTop: '1px solid rgba(255,180,80,0.12)',
      }}>
        {/* Subtle top glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,180,80,0.13) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '780px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <span ref={r} className="reveal" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,220,170,0.85)',
            display: 'block',
            marginBottom: '16px',
          }}>Our Story</span>
          <h2 ref={r} className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem,3vw,2.4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#FFF8EE',
            marginBottom: '28px',
          }}>
            Students with a heart for The Lord
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p ref={r} className="reveal reveal-delay-2" style={{ fontSize: 'clamp(0.92rem,1.3vw,0.99rem)', lineHeight: 1.82, color: 'rgba(255,220,185,0.80)' }}>
              Embers started with a small group of students driven by a simple conviction: faith and business don&apos;t have to be separate worlds.
            </p>
            <p ref={r} className="reveal reveal-delay-2" style={{ fontSize: 'clamp(0.92rem,1.3vw,0.99rem)', lineHeight: 1.82, color: 'rgba(255,220,185,0.80)' }}>
              We believe Jesus calls his followers into every corner of life — including the marketplace. That means the lecture halls, the case rooms, the networking events, and the boardrooms. We exist to gather those who want to answer that call together, to build each other up, stay accountable, and be the kind of people who shine wherever they&apos;re placed.
            </p>
            <p ref={r} className="reveal reveal-delay-3" style={{ fontSize: 'clamp(0.92rem,1.3vw,0.99rem)', lineHeight: 1.82, color: 'rgba(255,220,185,0.80)' }}>
              Navigating professional settings today is difficult, but we believe that we should walk with Jesus every step of the way, no matter what the world throws at us. We are not to be isolated, but have other brothers and sisters with whom we can discuss our challenges and encourage one another.{' '}
              <strong style={{ color: '#FFF8EE' }}>That is the setting Embers seeks to create.</strong>
            </p>
            <p ref={r} className="reveal reveal-delay-4" style={{ fontSize: 'clamp(0.92rem,1.3vw,0.99rem)', lineHeight: 1.82, color: 'rgba(255,220,185,0.80)' }}>
              If you&apos;ve ever felt the tension between your faith and your ambition, you&apos;re not alone. This community is for you.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PARTNERS — thin white strip with scrolling logos ─── */}
      <section style={{
        background: '#ffffff',
        width: '100%',
        padding: 'clamp(40px,5vw,64px) 0',
        borderTop: '1px solid rgba(42,31,20,0.07)',
        borderBottom: '1px solid rgba(42,31,20,0.07)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Fade masks on left and right edges */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: 'clamp(40px,8vw,100px)',
          background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: 'clamp(40px,8vw,100px)',
          background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* Section label */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.63rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(42,31,20,0.35)',
          textAlign: 'center',
          marginBottom: 'clamp(28px,4vw,40px)',
        }}>Partners &amp; Supporters</p>

        <PartnersCarousel />
      </section>

      {/* ─── WHAT WE DO — brown mission theme ─── */}
      <section className="what-we-do-section" style={{
        background: 'linear-gradient(150deg, #3d1f0a 0%, #2e1608 60%, #261208 100%)',
        width: '100%',
       padding: 'clamp(80px,10vw,140px) 0 clamp(120px,14vw,180px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orange glow bloom — top left (matches mission section) */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 15% 0%, rgba(248,110,23,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Section header — centered */}
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span ref={r} className="reveal" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            display: 'block',
            marginBottom: '14px',
          }}>What We Do</span>
          <h2 ref={r} className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.9rem,3.2vw,2.7rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: '#FFF8EE',
            marginBottom: '12px',
          }}>
            Faith. Community. Impact.
          </h2>
          <p ref={r} className="reveal reveal-delay-2" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.9rem,1.3vw,1rem)',
            color: '#c8b5a0',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 48px',
          }}>
            From Scripture to the boardroom — here&apos;s how we live it out together.
          </p>
        </div>

        {/* Carousel — full-width, no horizontal padding so cards bleed */}
        <div ref={r} className="reveal reveal-delay-2" style={{ position: 'relative', zIndex: 1 }}>
          <EventCarousel />
        </div>
      </section>

      <Footer />

    </main>
  )
}
