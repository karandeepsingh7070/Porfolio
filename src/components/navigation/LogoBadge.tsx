'use client'

import { useRef } from 'react'
import { motion, useScroll, useMotionValue, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { smilingAvatar } from '@/assets/avatar'
import styles from './LogoBadge.module.scss'

const SENSITIVITY = 0.55

export default function LogoBadge({ onClick }: { onClick?: () => void }) {
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useMotionValue(0)
  const smoothRotate = useSpring(rotate, { stiffness: 120, damping: 22, mass: 0.7 })
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastY.current
    lastY.current = latest
    if (prefersReducedMotion) return
    rotate.set(rotate.get() + delta * SENSITIVITY)
  })

  return (
    <a href="#main" className={styles.wrap} onClick={onClick} aria-label="Karandeep Singh, back to top">
      <motion.div
        className={styles.badge}
        style={prefersReducedMotion ? undefined : { rotateY: smoothRotate }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
      >
        <div className={styles.face}>
          <div className={styles.avatarCrop}>{smilingAvatar()}</div>
        </div>
        <div className={`${styles.face} ${styles.back}`} aria-hidden="true">
          KS
        </div>
      </motion.div>
      <span className={styles.staticMark} aria-hidden="true">
        KS
      </span>
    </a>
  )
}
