'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './ThemeToggle.module.scss'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  if (!mounted) return <span className={styles.toggle} aria-hidden="true" />

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
    >
      <motion.span
        className={styles.knob}
        animate={{ x: isDark ? '1.5rem' : 0, backgroundColor: isDark ? 'var(--accent)' : 'var(--ink)' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}
