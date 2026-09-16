import Reveal from '@/components/ui/Reveal'
import styles from './AboutSection.module.scss'

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className="container container--narrow">
        <Reveal>
          <h2 className={styles.heading}>How I think about this work</h2>
        </Reveal>
        <Reveal delay={0.1} className={styles.body}>
          <p>
            I got into this because I was curious how websites actually worked. That curiosity
            turned into building frontend architecture for a high-traffic streaming platform,
            then into an open-source state management library, then into a VS&nbsp;Code
            extension for sharing git stashes over a network. The thread running through all of
            it: <strong>I like building the tool, not just using it.</strong>
          </p>
          <p>
            Most of my day job is the unglamorous plumbing, state management, data fetching,
            performance, that has to be right before a product ever feels simple. Outside of
            work, if something is annoying enough at my desk, I usually end up trying to fix it
            with a side project.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
