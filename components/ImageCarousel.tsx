'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const IMAGES = [
  { src: '/images/emb-4.jpg', alt: 'Embers community photo 4' },
  { src: '/images/emb-5.JPG', alt: 'Embers community photo 5' },
  { src: '/images/emb-6.jpg', alt: 'Embers community photo 6' },
]

export default function ImageCarousel() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin.current])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    autoplayPlugin.current.reset()
    emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    autoplayPlugin.current.reset()
    emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return
    autoplayPlugin.current.reset()
    emblaApi.scrollTo(index)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <div
      className="embla-carousel glass-panel"
      style={{ overflow: 'hidden', position: 'relative', borderRadius: '20px' }}
      onMouseEnter={() => autoplayPlugin.current.stop()}
      onMouseLeave={() => autoplayPlugin.current.play()}
    >
      {/* Viewport */}
      <div ref={emblaRef} style={{ overflow: 'hidden', borderRadius: '20px' }}>
        <div style={{ display: 'flex' }}>
          {IMAGES.map((img) => (
            <div
              key={img.src}
              style={{
                flex: '0 0 100%',
                minWidth: 0,
                position: 'relative',
                aspectRatio: '16 / 9',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: 'cover', borderRadius: '20px' }}
                sizes="(max-width: 780px) 100vw, 780px"
                priority={img.src.includes('emb-1')}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={scrollPrev}
        className="embla-arrow embla-arrow-prev"
        aria-label="Previous image"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={scrollNext}
        className="embla-arrow embla-arrow-next"
        aria-label="Next image"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="embla-dots">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            className={`embla-dot${i === selectedIndex ? ' embla-dot-active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
