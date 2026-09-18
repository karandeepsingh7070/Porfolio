'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './CharacterImage.module.scss'

const CANVAS_WIDTH = 480
const CANVAS_HEIGHT = 853

// Dark-mode source has a solid black backdrop, light-mode a solid white one —
// key out whichever is active per frame so the mascot reads as transparent.
const DARK_KEY_LOW = 14
const DARK_KEY_HIGH = 70
const LIGHT_KEY_LOW = 200
const LIGHT_KEY_HIGH = 235

function readIsDark() {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'dark') return true
  if (attr === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function CharacterImage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(readIsDark())

    const observer = new MutationObserver(() => setIsDark(readIsDark()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onMediaChange = () => setIsDark(readIsDark())
    media.addEventListener('change', onMediaChange)

    return () => {
      observer.disconnect()
      media.removeEventListener('change', onMediaChange)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    video.load()
    video.play().catch(() => {})

    const low = isDark ? DARK_KEY_LOW : LIGHT_KEY_LOW
    const high = isDark ? DARK_KEY_HIGH : LIGHT_KEY_HIGH

    let rafId: number

    const draw = () => {
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = frame.data
        for (let i = 0; i < data.length; i += 4) {
          if (isDark) {
            const brightness = Math.max(data[i], data[i + 1], data[i + 2])
            if (brightness <= low) {
              data[i + 3] = 0
            } else if (brightness < high) {
              data[i + 3] = Math.round(((brightness - low) / (high - low)) * 255)
            }
          } else {
            const brightness = Math.min(data[i], data[i + 1], data[i + 2])
            if (brightness >= high) {
              data[i + 3] = 0
            } else if (brightness > low) {
              data[i + 3] = Math.round(((high - brightness) / (high - low)) * 255)
            }
          }
        }
        ctx.putImageData(frame, 0, 0)
      }
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [isDark])

  return (
    <motion.div
      className={styles.wrap}
      initial={{ y: 28, scale: 0.94, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className={styles.sourceVideo}
        src={isDark ? '/character/mascot-dark.mp4' : '/character/mascot-light.mp4'}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className={styles.media} />
    </motion.div>
  )
}
