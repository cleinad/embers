import Image from 'next/image'

export const metadata = {
  title: 'About — Embers UBC',
  description: 'Learn about Embers, a Christian business community at UBC.',
}

export default function AboutPage() {
  return (
    <main>

      {/* ── HEADER — transparent over watercolor ── */}
      <section
        className="text-center"
        style={{ padding: 'clamp(120px,16vh,180px) clamp(20px,5vw,56px) clamp(48px,6vw,80px)' }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <span className="section-label">Who We Are</span>
          <h1 style={{
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
          <p style={{
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
        <div style={{ maxWidth: '960px', width: '100%' }}>
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
        <div className="glass-panel" style={{ maxWidth: '620px', width: '100%', padding: 'clamp(32px,5vw,52px) clamp(28px,4vw,48px)' }}>
          <p style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            Embers started with a small group of students driven by a simple conviction: faith and business don&apos;t have to be separate worlds.
          </p>
          <p style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            We believe Jesus calls his followers into every corner of life — including the marketplace. That means the lecture halls, the case rooms, the networking events, and the boardrooms. We exist to gather those who want to answer that call together, to build each other up, stay accountable, and be the kind of people who shine wherever they&apos;re placed.
          </p>
          <p style={{ fontSize: '0.97rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '16px' }}>
            Navigating professional settings today is difficult, but we believe that we should walk with Jesus every step of the way, no matter what the world throws at us. We are not to be isolated, but have other brothers and sisters with whom we can discuss our challenges and encourage one another.{' '}
            <strong style={{ color: 'var(--brown-dark)' }}>That is the setting Embers seeks to create.</strong>
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--orange)', lineHeight: 1.65 }}>
            If you&apos;ve ever felt the tension between your faith and your ambition, you&apos;re not alone. This community is for you.
          </p>
        </div>
      </section>

      {/* ── PURPOSE & MISSION — frosted glass panels ── */}
      <section style={{ padding: '0 clamp(20px,5vw,56px) var(--pad-v)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '780px', width: '100%' }}>
          <span className="section-label">Our Values</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="values-grid">
            <div className="glass-panel text-center" style={{ padding: 'clamp(24px,3.5vw,36px) clamp(22px,3vw,32px)' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2vw,1.6rem)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '12px', lineHeight: 1.2 }}>Purpose</h2>
              <p style={{ fontSize: 'clamp(0.88rem,1.2vw,0.96rem)', lineHeight: 1.78, color: 'var(--text-mid)' }}>
                To build virtuous, loving and responsible disciples of Christ through accountability and responsible leadership.
              </p>
            </div>
            <div className="glass-panel text-center" style={{ padding: 'clamp(24px,3.5vw,36px) clamp(22px,3vw,32px)' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2vw,1.6rem)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '12px', lineHeight: 1.2 }}>Mission</h2>
              <p style={{ fontSize: 'clamp(0.88rem,1.2vw,0.96rem)', lineHeight: 1.78, color: 'var(--text-mid)' }}>
                Create a community and network for disciples of Jesus Christ in business to be the light of the world.
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
