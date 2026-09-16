'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import styles from './StickyStack.module.scss'

function StackCard({ children, isLast }: { children: ReactNode; isLast: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${isLast ? styles.lastWrap : ''}`}>
      <motion.div
        className={styles.card}
        style={isLast || prefersReducedMotion ? undefined : { scale, opacity }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function StickyStack({ cards }: { cards: ReactNode[] }) {
  return (
    <div className={styles.stack}>
      {cards.map((card, i) => (
        <StackCard key={i} isLast={i === cards.length - 1}>
          {card}
        </StackCard>
      ))}
    </div>
  )
}
