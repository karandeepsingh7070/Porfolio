'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import styles from './CopyEmail.module.scss'

const PARTICLE_COUNT = 10

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const handleCopy = () => {
    navigator.clipboard?.writeText(email).catch(() => {})
    setCopied(true)
    setBurstKey((k) => k + 1)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2
    return { x: Math.cos(angle) * 60, y: Math.sin(angle) * 60 }
  })

  return (
    <span className={styles.wrap}>
      <AnimatePresence>
        {copied && (
          <motion.span
            className={styles.toast}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Copied to clipboard
          </motion.span>
        )}
      </AnimatePresence>

      {!prefersReducedMotion && (
        <AnimatePresence>
          {copied &&
            particles.map((p, i) => (
              <motion.span
                key={`${burstKey}-${i}`}
                className={styles.particle}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
        </AnimatePresence>
      )}

      <a href={`mailto:${email}`} className={styles.emailBtn} onClick={handleCopy}>
        {email}
      </a>
    </span>
  )
}
