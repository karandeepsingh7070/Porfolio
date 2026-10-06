'use client'

import { useEffect, useRef } from 'react'
import styles from './ValleyJourney.module.scss'

/** Still-like screen-space rain; one inexpensive canvas, no input interception. */
export default function ForestRain({ active, compact }: { active: boolean; compact: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!active || !ref.current) return
    const canvas = ref.current, context = canvas.getContext('2d')
    if (!context) return
    let width = 0, height = 0, frame = 0, last = 0, elapsed = 0
    const wrap = (n: number, span: number) => ((n % span) + span) % span
    const resize = () => {
      const bounds = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5)
      width = bounds.width; height = bounds.height
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = (now: number) => {
      if (document.hidden) { frame = 0; return }
      elapsed += last ? Math.min((now - last) / 1000, .05) : 0; last = now
      context.clearRect(0, 0, width, height)
      context.lineWidth = .8
      for (let i = 0; i < (compact ? 48 : 115); i++) {
        const near = i % 3 === 0, speed = near ? 345 : 245
        const x = wrap(i * 137.51 - elapsed * 29, width + 40) - 20
        const y = wrap(i * 97.3 + elapsed * speed, height + 40) - 20
        const length = near ? 16 : 9
        context.strokeStyle = near ? 'rgba(199,225,191,.45)' : 'rgba(164,207,177,.23)'
        context.beginPath(); context.moveTo(x, y); context.lineTo(x - length * .13, y + length); context.stroke()
      }
      // Quiet rainfall rings in the lower, watery part of the scene.
      for (let i = 0; i < 9; i++) {
        const phase = (elapsed * .65 + i * .37) % 1
        const x = width * (.08 + ((i * .173) % .84)), y = height * (.73 + (i % 3) * .075)
        context.strokeStyle = `rgba(137,185,152,${(1 - phase) * .18})`
        context.beginPath(); context.ellipse(x, y, 2 + phase * 13, 1 + phase * 4, 0, 0, Math.PI * 2); context.stroke()
      }
      frame = requestAnimationFrame(draw)
    }
    const visibility = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0
      if (!document.hidden) frame = requestAnimationFrame(draw)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas); resize(); visibility()
    document.addEventListener('visibilitychange', visibility)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', visibility) }
  }, [active, compact])
  return active ? <canvas ref={ref} className={styles.rain} data-weather="rain" aria-hidden="true" /> : null
}
