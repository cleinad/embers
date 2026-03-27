'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const EVENTS = [
  {
    tag: 'Flagship Event',
    title: 'Panel Nights',
    desc: 'We bring in leaders from the business world to share one thing: how their faith shapes what they do. Real people, real stories.',
    image: '/images/emb-1.jpg',
  },
  {
    tag: 'Weekly',
    title: 'Bible Studies',
    desc: 'Deep dives into Scripture and what it means to live faithfully in a competitive world.',
    image: '/images/emb-6.jpg',
  },
  {
    tag: 'Community',
    title: 'Trivia Nights',
    desc: 'Community, laughter, and a healthy dose of competition. Just good people having a good time.',
    image: '/images/emb-5.JPG',
  },
  {
    tag: 'Outreach',
    title: 'DTES Volunteering',
    desc: "Serving alongside our neighbours in Vancouver's Downtown Eastside, putting love into action.",
    image: '/images/emb-4.jpg',
  },
  {
    tag: 'Competition',
    title: 'Case Competitions',
    desc: 'Taking our values into the arena — business problems, faith-driven teams, and integrity in the room.',
    image: '/images/emb-5.jpg',
  },
]

export default function EventCarousel() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3800, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false },
    [autoplayPlugin.current]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

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

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return
      autoplayPlugin.current.reset()
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <div className="event-carousel-root">

      {/* ── Slide track ─────────────────────────────────────────────
          The clip div only wraps the Embla viewport row so that
          horizontal overflow is hidden (prevents side-scroll) but
          vertical shadow is NOT clipped.
          Arrows and dots live OUTSIDE the clip div so they are never
          cut off and the card shadow has full room above/below.
      ─────────────────────────────────────────────────────────────── */}
      <div className="event-carousel-clip">
        <div ref={emblaRef} className="event-carousel-viewport">
          <div className="event-carousel-container">
            {EVENTS.map((ev, i) => {
              const diff = i - selectedIndex
              const n = EVENTS.length
              const wrappedDiff = ((diff + Math.floor(n / 2) + n) % n) - Math.floor(n / 2)
              const isActive = wrappedDiff === 0
              const isAdjacent = Math.abs(wrappedDiff) === 1

              let cardClass = 'event-card event-card-far'
              if (isActive) cardClass = 'event-card event-card-active'
              else if (isAdjacent) cardClass = 'event-card event-card-adjacent'

              return (
                <div key={ev.title} className="event-carousel-slide">
                  <div className={cardClass} onClick={() => !isActive && scrollTo(i)}>
                    {/* Background Image — clipped by its own inner wrapper */}
                    <div className="event-card-image-wrap">
                      <Image
                        src={ev.image}
                        alt={ev.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 767px) 80vw, 400px"
                      />
                      {/* Gradient overlay */}
                      <div className="event-card-overlay" />
                    </div>

                    {/* Content */}
                    <div className="event-card-content">
                      <span className="event-card-tag">{ev.tag}</span>
                      <h3 className="event-card-title">{ev.title}</h3>
                      <p className="event-card-desc">{ev.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Prev Arrow — outside clip so it's never cut off */}
      <button
        className="event-carousel-arrow event-carousel-arrow-prev"
        onClick={scrollPrev}
        aria-label="Previous event"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next Arrow — outside clip so it's never cut off */}
      <button
        className="event-carousel-arrow event-carousel-arrow-next"
        onClick={scrollNext}
        aria-label="Next event"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot Indicators — outside clip */}
      <div className="event-carousel-dots">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            className={`event-carousel-dot${i === selectedIndex ? ' event-carousel-dot-active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to ${EVENTS[i].title}`}
          />
        ))}
      </div>

    </div>
  )
}
