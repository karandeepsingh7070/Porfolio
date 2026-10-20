'use client'

import { experience } from '@/data/experience'
import { useExperience } from './ExperienceContext'
import styles from './PortfolioContent.module.scss'

const highlights = [
  ['Promoted in 2.5 years', 'Team of 5 lead', 'Employee of the Month'],
  ['EdTech platform', 'Persisted GraphQL queries'],
  ['Public education', 'Student & teacher resources'],
]

export default function ExperienceTimeline() {
  const { active, select } = useExperience()
  return <ol className={styles.careerTimeline} aria-label="Career milestones">
    {experience.map((entry, index) => <li key={entry.period} data-active={active === index} aria-current={active === index ? 'step' : undefined}>
      <span className={styles.careerNode} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <article className={styles.careerCard} data-career-role={index} tabIndex={0} onFocus={() => select(index)} aria-labelledby={`career-role-${index}`}>
        <p className={styles.careerPeriod}>{entry.period}</p>
        <h3 id={`career-role-${index}`}>{entry.title}</h3>
        <p className={styles.careerOrganisation}>{entry.organisation}</p>
        <ul className={styles.careerHighlights} aria-label="Impact highlights">{highlights[index].map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
        <ul className={styles.careerPoints}>{entry.points.map(point => <li key={point}>{point}</li>)}</ul>
      </article>
    </li>)}
  </ol>
}
