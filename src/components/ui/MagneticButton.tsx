'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import styles from './MagneticButton.module.scss'

interface MagneticButtonProps {
  href: string
  children: ReactNode
  ghost?: boolean
  target?: string
  rel?: string
  onClick?: () => void
}

export default function MagneticButton({ href, children, ghost, target, rel, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 14, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 14, mass: 0.4 })

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.35)
    y.set(relY * 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div className={styles.wrap} style={{ x: springX, y: springY }}>
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${styles.btn} ${ghost ? styles.ghost : ''}`}
      >
        {children}
      </a>
    </motion.div>
  )
}
