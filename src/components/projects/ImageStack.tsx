'use client'

import Image, { type StaticImageData } from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './ImageStack.module.scss'

interface StackImage {
  src: StaticImageData
  alt: string
}

const OFFSETS = [
  { rotate: -2, x: 0, y: 0 },
  { rotate: 7, x: 26, y: 22 },
  { rotate: -9, x: -22, y: 38 },
]

export default function ImageStack({ images, className }: { images: StackImage[]; className?: string }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`${styles.stack} ${className ?? ''}`}
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : 'hover'}
    >
      {images.map((image, i) => {
        const offset = OFFSETS[i % OFFSETS.length]
        return (
          <motion.div
            key={image.alt}
            className={styles.frame}
            style={{ zIndex: images.length - i }}
            variants={{
              rest: { rotate: offset.rotate, x: offset.x, y: offset.y },
              hover: {
                rotate: offset.rotate * 1.7,
                x: offset.x * 2.3,
                y: offset.y * 1.4 - i * 14,
              },
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.image}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
