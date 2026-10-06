'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useScroll } from 'framer-motion'
import { ArrowDownIcon, ArrowUpRightIcon, ListIcon, MoonIcon, PauseIcon, PlayIcon, SunIcon, XIcon } from '@phosphor-icons/react/dist/ssr'
import { resumeHref } from '@/data/social'
import RidgeLandscape from './RidgeLandscape'
import Soundtrack from './Soundtrack'
import { WorkshopProvider } from './WorkshopContext'
import { scrollToScene } from './journey-math'
import { ridgeCamera } from './ridge-camera'
import styles from './ValleyJourney.module.scss'


const chapters = [
  { name: 'Arrival', href: '#arrival', location: 'The high ridge' },
  { name: 'Work', href: '#work', location: 'The workshops' },
  { name: 'Experience', href: '#experience', location: 'The stone bridge' },
  { name: 'About', href: '#about', location: 'The sheltered garden' },
  { name: 'Contact', href: '#contact', location: 'The floral haven' },
]
const stepChapter = [0, 1, 1, 1, 1, 2, 3, 4]
const stepNames = ['The high ridge', 'The workshops', 'The open observatory', 'The memory archive', 'The riverside outpost', 'The stone bridge', 'The sheltered garden', 'The floral haven']

export default function ValleyJourney({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const activeRef = useRef(0)
  const progressLine = useRef<HTMLSpanElement>(null)
  const altitude = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)
  const [dark, setDark] = useState(false)
  const [compact, setCompact] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [paused, setPaused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const motionEnabled = hydrated && !reduced && !paused
  const chapter = stepChapter[active]

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sizeQuery = window.matchMedia('(max-width: 900px)')
    const syncMotion = () => setReduced(motionQuery.matches)
    const syncSize = () => setCompact(sizeQuery.matches)
    const syncTheme = () => setDark(document.documentElement.dataset.theme === 'dark')
    syncMotion(); syncSize(); syncTheme()
    try { setPaused(localStorage.getItem('valley-motion') === 'off') } catch { /* Storage is optional. */ }
    setHydrated(true)
    motionQuery.addEventListener('change', syncMotion)
    sizeQuery.addEventListener('change', syncSize)
    const themeObserver = new MutationObserver(syncTheme)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      motionQuery.removeEventListener('change', syncMotion)
      sizeQuery.removeEventListener('change', syncSize)
      themeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.valleyMotion = motionEnabled ? 'on' : 'off'
    return () => { delete document.documentElement.dataset.valleyMotion }
  }, [motionEnabled])

  useEffect(() => {
    const main = contentRef.current
    if (!main) return
    const sections = Array.from(main.querySelectorAll<HTMLElement>('[data-scene-step]'))
    let bounds: number[] = []
    let measuring = 0

    const update = (y: number) => {
      if (!bounds.length) return
      const total = document.documentElement.scrollHeight - window.innerHeight
      progress.current = scrollToScene(y, bounds, window.innerHeight, total)
      const nextActive = Math.min(stepChapter.length - 1, Math.round(progress.current))
      if (activeRef.current !== nextActive) { activeRef.current = nextActive; setActive(nextActive) }
      if (progressLine.current) progressLine.current.style.transform = `scaleX(${Math.max(0, Math.min(1, y / Math.max(1, total)))})`
      if (altitude.current) altitude.current.textContent = `${ridgeCamera(progress.current, true).altitude}`
      window.dispatchEvent(new Event('valley-progress'))
    }
    const measure = () => {
      cancelAnimationFrame(measuring)
      measuring = requestAnimationFrame(() => {
        bounds = sections.map(section => section.getBoundingClientRect().top + window.scrollY)
        update(window.scrollY)
      })
    }
    const observer = new ResizeObserver(measure)
    sections.forEach(section => observer.observe(section))
    measure()
    const unsubscribe = scrollY.on('change', update)
    window.addEventListener('resize', measure)
    window.addEventListener('pageshow', measure)
    main.addEventListener('load', measure, true)
    let cancelled = false
    document.fonts.ready.then(() => { if (!cancelled) measure() })
    return () => {
      cancelled = true
      unsubscribe(); observer.disconnect(); cancelAnimationFrame(measuring)
      window.removeEventListener('resize', measure)
      window.removeEventListener('pageshow', measure)
      main.removeEventListener('load', measure, true)
    }
  }, [scrollY])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        headerRef.current?.querySelector<HTMLButtonElement>('[aria-controls="valley-menu"]')?.focus()
      }
    }
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [menuOpen])

  const toggleTheme = () => {
    const next = !dark
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    setDark(next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch { /* The toggle works without persistence. */ }
  }
  const toggleMotion = () => {
    const next = !paused
    setPaused(next)
    try { localStorage.setItem('valley-motion', next ? 'off' : 'on') } catch { /* The toggle works without persistence. */ }
  }

  return (
    <WorkshopProvider><div className={styles.journey} data-scene-step={active}>
      <a className={styles.skip} href="#main">Skip to content</a>
      <header className={styles.header} ref={headerRef}>
        <a href="#arrival" className={styles.brand} aria-label="Karandeep Singh, back to top" onClick={() => setMenuOpen(false)}>
          <span className={styles.monogram} aria-hidden="true">ks<span>.</span></span>
          <span className={styles.brandName}>Karandeep Singh<span>Software engineer</span></span>
        </a>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {chapters.slice(1).map((item, i) => (
            <a key={item.href} href={item.href} aria-current={chapter === i + 1 ? 'location' : undefined}>{item.name}</a>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={dark ? 'Switch to daylight' : 'Switch to nightfall'}>
            {dark ? <MoonIcon size={18} /> : <SunIcon size={18} />}<span>{dark ? 'Nightfall' : 'Daylight'}</span>
          </button>
          <a className={styles.resume} href={resumeHref} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRightIcon size={15} /></a>
          <button className={styles.menuButton} type="button" aria-expanded={menuOpen} aria-controls="valley-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XIcon size={23} /> : <ListIcon size={23} />}
          </button>
        </div>
        {menuOpen && (
          <nav id="valley-menu" className={styles.mobileNav} aria-label="Mobile navigation">
            {chapters.map(item => <a key={item.href} href={item.href} aria-current={chapters[chapter].href === item.href ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.name}<ArrowUpRightIcon size={18} /></a>)}
          </nav>
        )}
      </header>

      <div className={styles.worldFrame} aria-hidden="true">
        <RidgeLandscape progress={progress} motion={motionEnabled} compact={compact} />
        <div className={styles.worldCaption}>
          <span>{stepNames[active]}</span>
          <span>{String(chapter + 1).padStart(2, '0')} / 05</span>
        </div>
      </div>

      <main id="main" ref={contentRef} className={styles.content}>{children}</main>

      <div className={styles.journeyBar}>
        <a className={styles.nextChapter} href={chapters[Math.min(chapter + 1, 4)].href}>
          <span className={styles.altitude}><span ref={altitude}>2400</span> m</span>{chapter === 4 ? 'You’ve reached the meadow' : 'Scroll to descend'}<ArrowDownIcon size={15} />
        </a>
        <nav className={styles.chapterNav} aria-label="Journey chapters">
          {chapters.map((item, i) => (
            <a key={item.href} href={item.href} aria-label={item.name} aria-current={chapter === i ? 'location' : undefined}>
              <span className={styles.chapterMark} /><span className={styles.chapterName}>{item.name}</span>
            </a>
          ))}
        </nav>
        <div className={styles.ambience}>
          <Soundtrack />
          <button className={styles.motion} type="button" onClick={toggleMotion} disabled={reduced} aria-pressed={!paused && !reduced} aria-label={motionEnabled ? 'Pause landscape motion' : 'Enable landscape motion'}>
            {motionEnabled ? <PauseIcon size={13} /> : <PlayIcon size={13} />}<span>{reduced ? 'Reduced motion' : motionEnabled ? 'Motion on' : 'Motion off'}</span>
          </button>
        </div>
        <span className={styles.progressTrack} aria-hidden="true"><span ref={progressLine} /></span>
      </div>
    </div></WorkshopProvider>
  )
}
