'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const PARTNERS = [
  { name: 'Partner 1', logo: '/images/emberslogo.png' },
  { name: 'Partner 2', logo: '/images/emberslogo.png' },
  { name: 'Partner 3', logo: '/images/emberslogo.png' },
  { name: 'Partner 4', logo: '/images/emberslogo.png' },
  { name: 'Partner 5', logo: '/images/emberslogo.png' },
  { name: 'Partner 6', logo: '/images/emberslogo.png' },
]

// Duplicate for seamless looping
const ITEMS = [...PARTNERS, ...PARTNERS]

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let pos = 0
    let raf: number

    const step = () => {
      pos += 0.5 // px per frame — adjust for speed
      const halfWidth = track.scrollWidth / 2
      if (pos >= halfWidth) pos = 0
      track.style.transform = `translateX(-${pos}px)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          willChange: 'transform',
        }}
      >
        {ITEMS.map((partner, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 clamp(32px, 5vw, 64px)',
              opacity: 0.5,
            }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={100}
              height={36}
              style={{ objectFit: 'contain', height: '54px', width: 'auto' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
