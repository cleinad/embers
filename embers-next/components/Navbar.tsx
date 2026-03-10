'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? '12px 0' : '18px 0',
        background: scrolled ? 'rgba(255,248,238,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(42,31,20,0.08)' : 'none',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 56px)' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/emberslogo.png"
            alt="Embers"
            width={120}
            height={42}
            style={{ height: '42px', width: 'auto' }}
            priority
          />
        </Link>

        {/* Nav links + Instagram icon */}
        <div className="flex items-center gap-1">
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

          {/* Instagram icon — same as original embers nav */}
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
      </div>
    </nav>
  )
}
