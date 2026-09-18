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
            I started out working with robots and PCBs, completely focused on hardware. Then,
            almost out of nowhere, I got hooked on <strong>web development</strong>.
          </p>
          <p>
            That sudden shift led to my first real job, where I built frontend systems for OTT
            streaming apps. Diving deep into software got me into open source, where I built my
            own state management library and developer tools. Now I <strong>sometimes freelance</strong>,
            solving tough frontend problems and building custom tools for different teams.
          </p>
          <p>
            In the end, <strong>I prefer building the tools to using them</strong>; the bulk of my
            time is devoted to the more technical aspects, such as managing state, speeding up
            data loads, and eliminating lag, to ensure the applications run smoothly. And each
            time I get stuck or feel frustrated at my desk, I put on my headphones and{' '}
            <em>go for a walk</em>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
