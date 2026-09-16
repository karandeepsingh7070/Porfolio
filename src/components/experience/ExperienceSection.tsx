'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import { experience, highlights } from '@/data/experience'
import styles from './ExperienceSection.module.scss'

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.5'],
  })
  const lineHeight = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <Reveal>
          <h2 className={styles.heading}>Five years, three roles, one steady climb in responsibility.</h2>
        </Reveal>

        <div className={styles.body} ref={sectionRef}>
          <div className={styles.lineTrack}>
            <motion.div className={styles.lineDraw} style={{ scaleY: lineHeight, height: '100%' }} />
          </div>

          <div className={styles.list}>
            {experience.map((entry) => (
              <Reveal key={entry.title + entry.period} className={styles.entry}>
                <span className={styles.dot} aria-hidden="true" />
                <p className={styles.period}>{entry.period}</p>
                <h3 className={styles.title}>{entry.title}</h3>
                <p className={styles.org}>
                  {entry.organisation}, {entry.context}
                </p>
                <ul className={styles.points}>
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <div className={styles.highlights}>
          {highlights.map((highlight) => (
            <Reveal key={highlight.text}>
              <p className={styles.highlightText}>{highlight.text}</p>
              {highlight.href && (
                <a className={styles.highlightLink} href={highlight.href} target="_blank" rel="noopener noreferrer">
                  {highlight.hrefLabel ?? 'Read more'}
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
