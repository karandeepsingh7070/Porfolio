'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import styles from './TiltCard.module.scss'

export default function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const rotateXVal = useMotionValue(0)
  const rotateYVal = useMotionValue(0)
  const rotateX = useSpring(rotateXVal, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(rotateYVal, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateYVal.set((px - 0.5) * 10)
    rotateXVal.set((0.5 - py) * 10)
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
    scale.set(1.02)
  }

  const handleMouseLeave = () => {
    rotateXVal.set(0)
    rotateYVal.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${className ?? ''}`}
      style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.spotlight} />
      {children}
    </motion.div>
  )
}
