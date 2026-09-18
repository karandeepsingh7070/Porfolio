import Image from 'next/image'
import TiltCard from '@/components/ui/TiltCard'
import ImageStack from './ImageStack'
import type { CaseStudy } from '@/data/projects'
import styles from './ProjectCase.module.scss'

export default function ProjectCase({ project }: { project: CaseStudy }) {
  const story = [project.problem, project.thinking, project.solution, project.result].join(' ')

  return (
    <div className={`container ${styles.grid}`}>
      <div>
        {(project.name || project.role || project.badge) && (
          <div className={styles.meta}>
            {project.name && (
              <span className={styles.kicker}>
                {project.name}
                {project.role ? ` · ${project.role}` : ''}
              </span>
            )}
            {project.badge && <span className={styles.badge}>{project.badge}</span>}
          </div>
        )}
        <h3 className={styles.name}>{project.heading ?? project.name}</h3>
        <p className={styles.story}>{story}</p>

        <div className={styles.tags}>
          {project.tech.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className={styles.links}>
            {project.links.map((link) => (
              <a key={link.href} className={styles.link} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {project.gallery && project.gallery.length > 0 ? (
        <ImageStack images={project.gallery} className={styles.media} />
      ) : (
        <TiltCard className={styles.media}>
          {project.thumbnail ? (
            <Image src={project.thumbnail} alt={`${project.name} preview`} fill sizes="(max-width: 900px) 100vw, 45vw" className={styles.image} />
          ) : (
            <div className={styles.swatch}>
              <span className={styles.swatchLetter}>{project.name.charAt(0)}</span>
            </div>
          )}
        </TiltCard>
      )}
    </div>
  )
}
