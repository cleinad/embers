'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default function AboutPage() {
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
      {/* ── HERO ── */}
      <section style={{
        width: '100%',
        padding: 'clamp(120px,16vh,180px) clamp(20px,5vw,56px) clamp(72px,9vw,110px)',
        position: 'relative',
        textAlign: 'center',
      }}>
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
          }}>Who We Are</span>
          <h1 className="animate-hero-2" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem,5vw,4rem)',
            fontWeight: 700,
            lineHeight: 1.06,
            color: '#FFF8EE',
            marginBottom: '20px',
          }}>
            About Embers
          </h1>
          <p className="animate-hero-3" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.92rem,1.4vw,1.02rem)',
            color: '#c8b5a0',
            lineHeight: 1.72,
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            A community for UBC business students navigating the tension between faith and ambition — together.
          </p>
        </div>
      </section>

      {/* ── TEAM PHOTO ── */}
      <section style={{
        width: '100%',
        padding: '0 clamp(20px,5vw,56px) clamp(64px,8vw,100px)',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div ref={r} className="reveal" style={{ maxWidth: '960px', width: '100%' }}>
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(248,110,23,0.18)',
            boxShadow: '0 12px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(248,110,23,0.06)',
          }}>
            <Image
              src="/images/team-pic.jpg"
              alt="The Embers team at UBC"
              width={1920}
              height={1080}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1000px) 100vw, 960px"
              priority
            />
          </div>
          <p style={{
            textAlign: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            letterSpacing: '0.06em',
            color: '#7a6558',
            marginTop: '14px',
          }}>
            The Embers team at UBC
          </p>
        </div>
      </section>
      {/* ── STORY ── */}
      <section style={{
        width: '100%',
        padding: 'clamp(64px,8vw,100px) clamp(20px,5vw,56px)',
        background: '#FFF8EE',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span ref={r} className="reveal" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            display: 'block',
            marginBottom: '16px',
          }}>Our Story</span>
          <h2 ref={r} className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem,3vw,2.5rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: 'var(--brown-dark)',
            marginBottom: '32px',
          }}>
            Faith that shapes the marketplace.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p ref={r} className="reveal reveal-delay-1" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.93rem,1.3vw,1.01rem)',
              lineHeight: 1.82,
              color: 'var(--brown-mid)',
            }}>
              Embers began with a small group of UBC Sauder students driven by a simple conviction: faith and business don&apos;t have to be separate worlds. We believe that faith is not just a personal journey but something that can shape and guide our professional lives as well.
            </p>
            <p ref={r} className="reveal reveal-delay-2" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.93rem,1.3vw,1.01rem)',
              lineHeight: 1.82,
              color: 'var(--brown-mid)',
            }}>
              Our mission is to bring together students at Sauder who share the belief that business can be a platform for service, integrity, and leadership. We aim to create a community where like-minded individuals can connect, grow, and challenge one another to live out their faith in the business world. Through discussion, mentorship, and service, we strive to cultivate a supportive network where we can inspire each other to lead with purpose and make an impact that transcends the classroom.
            </p>
            <p ref={r} className="reveal reveal-delay-3" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.93rem,1.3vw,1.01rem)',
              lineHeight: 1.82,
              color: 'var(--brown-mid)',
            }}>
              At Embers, we are committed to fostering meaningful relationships that blend faith, business, and leadership — empowering the next generation of responsible and impactful leaders at UBC and beyond.
            </p>
          </div>
          {/* Closing quote */}
          <div ref={r} className="reveal reveal-delay-4" style={{
            marginTop: '36px',
            paddingLeft: '20px',
            borderLeft: '3px solid rgba(248,110,23,0.55)',
          }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem,1.5vw,1.12rem)',
              color: 'var(--orange)',
              lineHeight: 1.65,
            }}>
              If you&apos;ve ever felt the tension between your faith and your ambition, you&apos;re not alone. This community is for you.
            </p>
          </div>
        </div>
      </section>
      {/* ── VALUES ── */}
      <section style={{
        width: '100%',
        padding: 'clamp(64px,8vw,100px) clamp(20px,5vw,56px)',
        paddingBottom: 'clamp(100px, 10vw, 300px)',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <span ref={r} className="reveal" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            display: 'block',
            marginBottom: '14px',
          }}>Our Values</span>
          <h2 ref={r} className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem,3vw,2.4rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: '#FFF8EE',
            marginBottom: '40px',
          }}>
            What we stand on.
          </h2>

          <div className="values-grid">
            {/* Living Faith */}
            <div ref={r} className="reveal reveal-delay-1" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(248,110,23,0.18)',
              borderRadius: '16px',
              padding: 'clamp(24px,3.5vw,36px) clamp(22px,3vw,32px)',
            }}>
              <div style={{
                width: '36px', height: '2px',
                background: 'linear-gradient(90deg, #f86e17 0%, transparent 100%)',
                borderRadius: '2px',
                marginBottom: '20px',
              }} />
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.25rem,2vw,1.55rem)',
                fontWeight: 700,
                color: '#FFF8EE',
                marginBottom: '16px',
                lineHeight: 1.2,
              }}>Living Faith</h3>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.82rem,1.1vw,0.9rem)',
                lineHeight: 1.65,
                color: '#f5a46a',
                marginBottom: '14px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(248,110,23,0.18)',
              }}>
                &ldquo;For we live by faith, not by sight.&rdquo;<br />
                <span style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal', fontSize: '0.74rem', letterSpacing: '0.04em', color: '#a08878' }}>— 2 Corinthians 5:7</span>
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.88rem,1.2vw,0.95rem)',
                lineHeight: 1.78,
                color: '#c8b5a0',
              }}>
                As a community of believers, we commit to living out our faith in everything we do, trusting in God&apos;s promises and acting on them with boldness and courage. We believe that true faith is not passive, but actively walks with God in every circumstance — whether in our studies, relationships, or leadership.
              </p>
            </div>

            {/* Stewardship */}
            <div ref={r} className="reveal reveal-delay-2" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(248,110,23,0.18)',
              borderRadius: '16px',
              padding: 'clamp(24px,3.5vw,36px) clamp(22px,3vw,32px)',
            }}>
              <div style={{
                width: '36px', height: '2px',
                background: 'linear-gradient(90deg, #f86e17 0%, transparent 100%)',
                borderRadius: '2px',
                marginBottom: '20px',
              }} />
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.25rem,2vw,1.55rem)',
                fontWeight: 700,
                color: '#FFF8EE',
                marginBottom: '16px',
                lineHeight: 1.2,
              }}>Stewardship</h3>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.82rem,1.1vw,0.9rem)',
                lineHeight: 1.65,
                color: '#f5a46a',
                marginBottom: '14px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(248,110,23,0.18)',
              }}>
                &ldquo;Each of you should use whatever gift you have received to serve others.&rdquo;<br />
                <span style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal', fontSize: '0.74rem', letterSpacing: '0.04em', color: '#a08878' }}>— 1 Peter 4:10</span>
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.88rem,1.2vw,0.95rem)',
                lineHeight: 1.78,
                color: '#c8b5a0',
              }}>
                We recognize that every skill and talent we possess is a gift from God, entrusted to us for His glory. We value faithful stewardship by using our abilities to serve others and advance God&apos;s Kingdom — in our academic pursuits, our work, and our personal lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
