import Reveal from '@/components/ui/Reveal'
import StickyStack from './StickyStack'
import ProjectCase from './ProjectCase'
import ProjectRack from './ProjectRack'
import { caseStudies, indexProjects } from '@/data/projects'
import styles from './ProjectsSection.module.scss'

export default function ProjectsSection() {
  return (
    <section id="work" className={styles.section}>
      <div className={`container ${styles.intro}`}>
        <Reveal>
          <h2 className={styles.heading}>Frontends built for scale, and the tools built along the way.</h2>
        </Reveal>
      </div>

      <StickyStack cards={caseStudies.map((project) => <ProjectCase key={project.slug} project={project} />)} />

      <ProjectRack projects={indexProjects} />
    </section>
  )
}
