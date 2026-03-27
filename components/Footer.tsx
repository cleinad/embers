export default function Footer() {
  return (
    <footer style={{
      background: '#261208',
      borderTop: '1px solid rgba(248,110,23,0.12)',
      padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,56px) 0',
    }}>
      {/* Main footer row */}
      <div className="footer-main-row">

        {/* Left — Logo + tagline */}
        <div className="footer-logo-col">
          <a href="/" style={{ display: 'inline-block', marginBottom: '12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/emberslogowhite.png"
              alt="Embers logo"
              style={{ height: '44px', width: 'auto', objectFit: 'contain', filter: 'brightness(0.92)' }}
            />
          </a>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '0.82rem',
            color: 'rgba(200,168,136,0.60)',
            lineHeight: 1.5,
          }}>
            Disciples in the Marketplace.
          </p>
        </div>

        {/* Center — Nav links */}
        <nav className="footer-nav-col" aria-label="Footer navigation">
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.63rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(248,110,23,0.70)',
            marginBottom: '14px',
          }}>Navigate</p>
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Calendar', href: '/calendar' },
          ].map(link => (
            <a key={link.href} href={link.href} className="footer-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — Social icons */}
        <div className="footer-social-col">
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.63rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(248,110,23,0.70)',
            marginBottom: '14px',
          }}>Contact Us</p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

            {/* Gmail */}
            <a
              href="mailto:embersatUBC@gmail.com"
              aria-label="Email us"
              className="footer-social-icon"
              title="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/embers.ubc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="footer-social-icon"
              title="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="Find us on LinkedIn"
              className="footer-social-icon"
              title="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="4"/>
                <line x1="8" y1="11" x2="8" y2="16"/>
                <line x1="8" y1="8" x2="8" y2="8.01"/>
                <line x1="12" y1="16" x2="12" y2="11"/>
                <path d="M12 14a3 3 0 0 1 6 0v2"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="#"
              aria-label="Follow us on TikTok"
              className="footer-social-icon"
              title="TikTok"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} Embers UBC</span>
      </div>
    </footer>
  )
}
