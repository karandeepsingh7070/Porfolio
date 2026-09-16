'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { resumeHref } from '@/data/social'
import MagneticButton from '@/components/ui/MagneticButton'
import StickerCluster from './StickerCluster'
import CharacterImage from './CharacterImage'
import styles from './Hero.module.scss'

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const initial = prefersReducedMotion ? 'visible' : 'hidden'

  return (
    <header className={`${styles.hero} container`}>
      <div>
        <motion.h1 className={styles.headline} initial={initial} animate="visible" custom={0.1} variants={lineVariants}>
          Frontends that don&apos;t fall over.
        </motion.h1>

        <motion.p className={styles.subhead} initial={initial} animate="visible" custom={0.25} variants={lineVariants}>
          I&apos;m <strong>Karandeep</strong>, a Senior Frontend Engineer in New Delhi, building
          architecture for high-traffic platforms and the open-source tools other engineers
          reach for.
        </motion.p>

        <motion.div className={styles.actions} initial={initial} animate="visible" custom={0.4} variants={lineVariants}>
          <MagneticButton href="#work">View work</MagneticButton>
          <MagneticButton href={resumeHref} target="_blank" rel="noopener noreferrer" ghost>
            Resume
          </MagneticButton>
        </motion.div>
      </div>

      <div className={styles.visual}>
        <CharacterImage />
        <StickerCluster />
      </div>
    </header>
  )
}
