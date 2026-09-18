'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './StickerCluster.module.scss'

const stickers = [
  { label: 'Open source', accent: true, x: '2%', y: '6%', rotate: -6 },
  { label: '6 yrs experience', x: '58%', y: '2%', rotate: 4 },
  { label: 'Cloud', x: '0%', y: '46%', rotate: 3 },
  { label: 'Team lead', x: '78%', y: '20%', rotate: -3 },
  { label: 'New Delhi', x: '4%', y: '82%', rotate: 5 },
  { label: 'LLM/AI Handyman', x: '70%', y: '86%', rotate: -4 },
]

export default function StickerCluster() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={styles.field} ref={containerRef} aria-hidden="true">
      {stickers.map((sticker, i) => (
        <motion.div
          key={sticker.label}
          className={`${styles.sticker} ${sticker.accent ? styles.accent : ''}`}
          style={{ left: sticker.x, top: sticker.y }}
          initial={{ opacity: 0, scale: 0.6, rotate: sticker.rotate * 2 }}
          animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
          transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
          drag={!prefersReducedMotion}
          dragConstraints={containerRef}
          dragElastic={0.4}
          whileDrag={{ scale: 1.12, zIndex: 10, cursor: 'grabbing' }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        >
          {sticker.label}
        </motion.div>
      ))}
    </div>
  )
}
