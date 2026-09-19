'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image, { type StaticImageData } from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import styles from './ImageLightbox.module.scss'

interface LightboxImage {
  src: StaticImageData
  alt: string
}

export default function ImageLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const isOpen = index !== null
  const total = images.length

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(((index ?? 0) + 1) % total)
      if (e.key === 'ArrowLeft') onNavigate(((index ?? 0) - 1 + total) % total)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, index, total, onClose, onNavigate])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <XIcon size={22} weight="bold" />
          </button>

          {total > 1 && (
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={(e) => {
                e.stopPropagation()
                onNavigate((index - 1 + total) % total)
              }}
              aria-label="Previous image"
            >
              <CaretLeftIcon size={22} weight="bold" />
            </button>
          )}

          <motion.div
            key={index}
            className={styles.frame}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={images[index].src} alt={images[index].alt} className={styles.image} priority />
          </motion.div>

          {total > 1 && (
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={(e) => {
                e.stopPropagation()
                onNavigate((index + 1) % total)
              }}
              aria-label="Next image"
            >
              <CaretRightIcon size={22} weight="bold" />
            </button>
          )}

          {total > 1 && (
            <span className={styles.counter}>
              {index + 1} / {total}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
