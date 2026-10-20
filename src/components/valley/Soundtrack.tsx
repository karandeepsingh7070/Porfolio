'use client'

import { useEffect, useRef, useState } from 'react'
import { SkipForwardIcon } from '@phosphor-icons/react/dist/ssr'
import { SoundtrackPlayer, type SoundtrackState } from './soundtrack-player'
import styles from './Soundtrack.module.scss'

const ANNOUNCE_MS = 6000

/** Ambient music for the journey: off by default, remembered, and paused while the tab is away. */
export default function Soundtrack() {
  const player = useRef<SoundtrackPlayer | null>(null)
  const wanted = useRef(false)
  const [supported, setSupported] = useState(true)
  const [{ playing, track }, setState] = useState<SoundtrackState>({ playing: false, track: null })
  const [announce, setAnnounce] = useState(false)

  useEffect(() => {
    if (!SoundtrackPlayer.supported()) { setSupported(false); return }
    const instance = new SoundtrackPlayer(setState)
    player.current = instance
    try { wanted.current = localStorage.getItem('valley-sound') === 'on' } catch { /* Storage is optional. */ }

    // A returning listener's music resumes on their first interaction, since browsers block it before one.
    const resumeOnGesture = (event: Event) => {
      if (!wanted.current || instance.active || document.hidden) return
      if ((event.target as Element | null)?.closest?.('[data-soundtrack]')) return
      instance.play()
    }
    let awayWhilePlaying = false
    const syncVisibility = () => {
      if (document.hidden) { awayWhilePlaying = instance.active; instance.pause() }
      else if (awayWhilePlaying) { awayWhilePlaying = false; instance.play() }
    }
    document.addEventListener('click', resumeOnGesture)
    document.addEventListener('keydown', resumeOnGesture)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      document.removeEventListener('click', resumeOnGesture)
      document.removeEventListener('keydown', resumeOnGesture)
      document.removeEventListener('visibilitychange', syncVisibility)
      instance.dispose()
      player.current = null
      setState({ playing: false, track: null })
    }
  }, [])

  useEffect(() => {
    if (!playing || !track) return
    setAnnounce(true)
    const timer = window.setTimeout(() => setAnnounce(false), ANNOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [playing, track])

  const toggle = () => {
    const next = !playing
    wanted.current = next
    try { localStorage.setItem('valley-sound', next ? 'on' : 'off') } catch { /* The toggle works without persistence. */ }
    if (next) player.current?.play()
    else player.current?.pause()
  }

  if (!supported) return null
  const nowPlaying = playing && track
  return (
    <div className={styles.soundtrack} data-soundtrack data-playing={playing ? '' : undefined}>
      <button className={styles.toggle} type="button" onClick={toggle} aria-pressed={playing}
        aria-label={nowPlaying ? `Background music, now playing ${track.title} by ${track.artist}` : 'Background music'}>
        <span className={styles.bars} aria-hidden="true"><span /><span /><span /></span>
        <span className={styles.label} title={nowPlaying ? `${track.title} — ${track.artist}` : undefined}>
          {nowPlaying ? <><span className={styles.title}>{track.title}</span> · {track.artist}</> : 'Sound off'}
        </span>
      </button>
      <button className={styles.skip} type="button" onClick={() => player.current?.skip()} disabled={!playing} aria-label="Play a different track">
        <SkipForwardIcon size={12} weight="fill" />
      </button>
      <p className={styles.nowPlaying} data-visible={nowPlaying && announce ? '' : undefined} aria-hidden="true">
        <span className={styles.bars}><span /><span /><span /></span>
        {track && <span className={styles.label}><span className={styles.title}>{track.title}</span> · {track.artist}</span>}
      </p>
    </div>
  )
}
