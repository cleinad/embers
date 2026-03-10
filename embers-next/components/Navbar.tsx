'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/about', label: 'About' },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          padding: scrolled ? '12px 0' : '18px 0',
          background: scrolled || menuOpen ? 'rgba(255,248,238,0.96)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(10px)' : 'none',
          boxShadow: scrolled || menuOpen ? '0 1px 0 rgba(42,31,20,0.08)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 56px)' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/emberslogo.png"
              alt="Embers"
              width={120}
              height={42}
              style={{ height: '42px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Nav links + Instagram icon */}
          <div className="nav-desktop-links flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: '0.02em',
                    color: isActive ? 'var(--orange)' : 'var(--brown-mid)',
                    background: isActive ? 'rgba(243,108,30,0.10)' : 'transparent',
                    transition: 'color 0.2s ease, background 0.2s ease',
                    textDecoration: 'none',
                  }}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Instagram icon */}
            <a
              href="https://www.instagram.com/embers.ubc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Embers on Instagram"
              className="nav-instagram-icon"
              style={{ marginLeft: '8px', color: 'var(--brown-dark)', display: 'flex', alignItems: 'center' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              display: 'none', // hidden on desktop via CSS
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40px',
              height: '40px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              gap: '5px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--brown-dark)',
                borderRadius: '2px',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--brown-dark)',
                borderRadius: '2px',
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--brown-dark)',
                borderRadius: '2px',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="mobile-menu-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          background: 'rgba(255,248,238,0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          // Only show on mobile
        }}
      >
        {links.map((link, i) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '14px 40px',
                borderRadius: '12px',
                fontSize: '1.35rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                letterSpacing: '0.01em',
                color: isActive ? 'var(--orange)' : 'var(--brown-dark)',
                background: isActive ? 'rgba(243,108,30,0.08)' : 'transparent',
                textDecoration: 'none',
                transition: 'color 0.2s ease, background 0.2s ease',
                transitionDelay: menuOpen ? `${i * 0.06}s` : '0s',
                transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                opacity: menuOpen ? 1 : 0,
                display: 'block',
                textAlign: 'center',
                width: '100%',
                maxWidth: '280px',
              }}
            >
              {link.label}
            </Link>
          )
        })}

        {/* Instagram in mobile menu */}
        <a
          href="https://www.instagram.com/embers.ubc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Embers on Instagram"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--brown-mid)',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-sans)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            opacity: menuOpen ? 1 : 0,
            transitionDelay: menuOpen ? '0.2s' : '0s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--brown-mid)')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
          @embers.ubc
        </a>
      </div>
    </>
  )
}
