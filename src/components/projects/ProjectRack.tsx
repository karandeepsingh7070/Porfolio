'use client'

import { useRef, useState, type MouseEvent } from 'react'
import Reveal from '@/components/ui/Reveal'
import type { IndexProject } from '@/data/projects'
import styles from './ProjectRack.module.scss'

export default function ProjectRack({ projects }: { projects: IndexProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false })
  const [isDragging, setIsDragging] = useState(false)

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    dragState.current = {
      isDown: true,
      moved: false,
      startX: e.pageX - trackRef.current.offsetLeft,
      scrollLeft: trackRef.current.scrollLeft,
    }
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

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (dragState.current.moved) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div className={`container ${styles.wrap}`}>
      <Reveal>
        <p className={styles.heading}>More tools and platforms. Drag to browse.</p>
      </Reveal>
      <div
        className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onMouseMove={onMouseMove}
        onClickCapture={onClickCapture}
      >
        {projects.map((project) => (
          <div key={project.name} className={styles.card}>
            <h4 className={styles.name}>{project.name}</h4>
            {project.viewlift && <span className={styles.viewliftBadge}>Viewlift</span>}
            <p className={styles.description}>{project.description}</p>
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
        ))}
      </div>
    </div>
  )
}
