'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

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
    <main>

      {/* ── HEADER — transparent over watercolor ── */}
      <section
        className="text-center"
        style={{ padding: 'clamp(120px,16vh,180px) clamp(20px,5vw,56px) clamp(48px,6vw,80px)' }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <span className="animate-hero-1 section-label">Who We Are</span>
          <h1 className="animate-hero-2" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem,5vw,4rem)',
            fontWeight: 700,
            lineHeight: 1.06,
            color: 'var(--brown-dark)',
            marginBottom: '18px',
            textShadow: '0 0 30px rgba(255,248,238,0.8), 0 0 60px rgba(255,248,238,0.5)',
          }}>
            About Embers
          </h1>
          <p className="animate-hero-3" style={{
            fontSize: 'clamp(0.92rem,1.4vw,1.02rem)',
            color: 'var(--brown-mid)',
            lineHeight: 1.72,
            maxWidth: '480px',
            margin: '0 auto',
            textShadow: '0 0 20px rgba(255,248,238,0.9)',
          }}>
            A community for UBC business students navigating the tension between faith and ambition — together.
          </p>
        </div>
      </section>

      {/* ── TEAM PHOTO ── */}
      <section style={{ padding: '0 clamp(20px,5vw,56px) var(--pad-v)', display: 'flex', justifyContent: 'center' }}>
        <div ref={r} className="reveal" style={{ maxWidth: '960px', width: '100%' }}>
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(42,31,20,0.08)',
            boxShadow: '0 8px 40px rgba(42,31,20,0.10), 0 2px 8px rgba(42,31,20,0.06)',
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
            fontSize: '0.82rem',
            color: 'var(--text-mid)',
            marginTop: '14px',
            letterSpacing: '0.03em',
            opacity: 0.75,
          }}>
            The Embers team at UBC
          </p>
        </div>
      </section>

      {/* ── STORY — frosted glass panel ── */}
      <section style={{ padding: '0 clamp(20px,5vw,56px) var(--pad-v)', display: 'flex', justifyContent: 'center' }}>
        <div ref={r} className="reveal reveal-delay-1 glass-panel" style={{ maxWidth: '620px', width: '100%', padding: 'clamp(32px,5vw,52px) clamp(28px,4vw,48px)' }}>
          <p style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            Embers began with a small group of UBC Sauder students driven by a simple conviction: faith and business don't have to be separate worlds. We believe that faith is not just a personal journey but something that can shape and guide our professional lives as well.
          </p>
          <p style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            Our mission is to bring together students at Sauder who share the belief that business can be a platform for service, integrity, and leadership. We aim to create a community where like-minded individuals can connect, grow, and challenge one another to live out their faith in the business world. Through discussion, mentorship, and service, we strive to cultivate a supportive network where we can inspire each other to lead with purpose and make an impact that transcends the classroom.
          </p>
          <p style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            At Embers, we are committed to fostering meaningful relationships that blend faith, business, and leadership—empowering the next generation of responsible and impactful leaders at UBC and beyond.{' '}
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--orange)', lineHeight: 1.65 }}>
            If you&apos;ve ever felt the tension between your faith and your ambition, you&apos;re not alone. This community is for you.
          </p>
        </div>
      </section>

      {/* ── Values — frosted glass panels ── */}
      <section style={{ padding: '0 clamp(20px,5vw,56px) var(--pad-v)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '780px', width: '100%' }}>
          <span ref={r} className="reveal section-label">Our Values</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="values-grid">

            {/* Living Faith */}
            <div ref={r} className="reveal reveal-delay-1 glass-panel" style={{ padding: 'clamp(24px,3.5vw,36px) clamp(22px,3vw,32px)' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2vw,1.6rem)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '16px', lineHeight: 1.2 }}>
                Living Faith
              </h2>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.82rem,1.1vw,0.9rem)',
                lineHeight: 1.65,
                color: 'var(--orange)',
                marginBottom: '14px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(243,108,30,0.15)',
              }}>
                &ldquo;For we live by faith, not by sight.&rdquo;<br />
                <span style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal', fontSize: '0.75rem', letterSpacing: '0.04em', opacity: 0.8 }}>— 2 Corinthians 5:7 (NIV)</span>
              </p>
              <p style={{ fontSize: 'clamp(0.88rem,1.2vw,0.96rem)', lineHeight: 1.78, color: 'var(--text-mid)' }}>
                As a community of believers, we commit to living out our faith in everything we do, trusting in God&apos;s promises and acting on them with boldness and courage. We believe that true faith is not passive, but actively walks with God in every circumstance—whether in our studies, relationships, or leadership. We trust God for the strength to move forward, knowing that He is faithful to guide us.
              </p>
            </div>

            {/* Stewardship */}
            <div ref={r} className="reveal reveal-delay-2 glass-panel" style={{ padding: 'clamp(24px,3.5vw,36px) clamp(22px,3vw,32px)' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2vw,1.6rem)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '16px', lineHeight: 1.2 }}>
                Stewardship
              </h2>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.82rem,1.1vw,0.9rem)',
                lineHeight: 1.65,
                color: 'var(--orange)',
                marginBottom: '14px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(243,108,30,0.15)',
              }}>
                &ldquo;Each of you should use whatever gift you have received to serve others, as faithful stewards of God&apos;s grace in its various forms.&rdquo;<br />
                <span style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal', fontSize: '0.75rem', letterSpacing: '0.04em', opacity: 0.8 }}>— 1 Peter 4:10 (NIV)</span>
              </p>
              <p style={{ fontSize: 'clamp(0.88rem,1.2vw,0.96rem)', lineHeight: 1.78, color: 'var(--text-mid)' }}>
                We recognize that every skill and talent we possess is a gift from God, entrusted to us for His glory. We value faithful stewardship by using our abilities to serve others and advance God&apos;s Kingdom. Whether it&apos;s through our academic pursuits, our work, or our personal lives, we strive to honor God by using our skills for the good of others and the furthering of His mission.
              </p>
            </div>

          </div>
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
