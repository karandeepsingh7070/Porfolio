'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import { capabilities } from '@/data/capabilities'
import styles from './CapabilitiesSection.module.scss'

function pillRotation(i: number) {
  return ((i % 5) - 2) * 2.4
}

export default function CapabilitiesSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false })
  const [isDragging, setIsDragging] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    dragState.current = { isDown: true, moved: false, startX: e.pageX - trackRef.current.offsetLeft, scrollLeft: trackRef.current.scrollLeft }
  }
  const endDrag = () => {
    dragState.current.isDown = false
    setIsDragging(false)
  }
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.isDown || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = x - dragState.current.startX
    if (Math.abs(walk) > 5) {
      dragState.current.moved = true
      setIsDragging(true)
    }
    trackRef.current.scrollLeft = dragState.current.scrollLeft - walk
  }

  let lastGroup = ''

  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <h2 className={styles.heading}>Less visible than the UI, just as load-bearing.</h2>
        </Reveal>
        <div
          className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseLeave={endDrag}
          onMouseUp={endDrag}
          onMouseMove={onMouseMove}
        >
          {capabilities.map((cap, i) => {
            const showDivider = cap.group !== lastGroup && lastGroup !== ''
            lastGroup = cap.group
            const rotate = prefersReducedMotion ? 0 : pillRotation(i)

            return (
              <span key={cap.label} style={{ display: 'contents' }}>
                {showDivider && <span className={styles.divider} aria-hidden="true" />}
                <motion.span
                  className={styles.pill}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6, y: 16, rotate: rotate * 2 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, rotate }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: Math.min(i * 0.04, 0.6), type: 'spring', stiffness: 260, damping: 16 }}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.12, rotate: 0, y: -5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  {cap.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className={styles.icon}
                      src={`https://cdn.simpleicons.org/${cap.icon}`}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                      onLoad={(e) => {
                        if (e.currentTarget.naturalWidth === 0) e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  {cap.label}
                </motion.span>
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
