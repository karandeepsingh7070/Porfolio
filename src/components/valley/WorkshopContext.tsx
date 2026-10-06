'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import styles from './PortfolioContent.module.scss'

type WorkshopSelection = {
  active: number
  hover: (project: number | null) => void
  focus: (project: number | null) => void
}
const WorkshopContext = createContext<WorkshopSelection>({ active: 0, hover: () => {}, focus: () => {} })
export const useWorkshop = () => useContext(WorkshopContext)

export function WorkshopProvider({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(0)
  const [hovered, hover] = useState<number | null>(null)
  const [focused, focus] = useState<number | null>(null)

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-workshop-project]'))
    let lastScroll = window.scrollY
    const update = () => {
      if (lastScroll !== window.scrollY) {
        hover(null)
        const focusedCard = document.activeElement?.closest<HTMLElement>('[data-workshop-project]')
        const rect = focusedCard?.getBoundingClientRect()
        if (!rect || rect.bottom <= 0 || rect.top >= window.innerHeight) focus(null)
        lastScroll = window.scrollY
      }
      const visible = cards.filter(card => !card.closest('details:not([open])') && card.getClientRects().length > 0)
      const distances = visible.map(card => {
        const rect = card.getBoundingClientRect()
        const readingLine = window.innerHeight * .5
        return Math.max(rect.top - readingLine, readingLine - rect.bottom, 0)
      })
      if (distances.length) setScrolled(Number(visible[distances.indexOf(Math.min(...distances))].dataset.workshopProject))
    }
    update()
    window.addEventListener('valley-progress', update)
    window.addEventListener('resize', update)
    document.addEventListener('toggle', update, true)
    return () => {
      window.removeEventListener('valley-progress', update)
      window.removeEventListener('resize', update)
      document.removeEventListener('toggle', update, true)
    }
  }, [])

  return <WorkshopContext.Provider value={{ active: focused ?? hovered ?? scrolled, hover, focus }}>{children}</WorkshopContext.Provider>
}

/** The article preserves ordinary project links; its selection also lights the landscape. */
export function WorkshopCard({ index, children }: { index: number; children: ReactNode }) {
  const selection = useWorkshop()
  return <article className={styles.production} data-workshop-project={index} data-active={selection.active === index}
    aria-labelledby={`workshop-project-${index}`}
    onMouseEnter={() => selection.hover(index)} onMouseLeave={() => selection.hover(null)}
    onFocus={() => selection.focus(index)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) selection.focus(null) }}>
    {children}
  </article>
}

/** Selection follows pointer, keyboard focus, or the visible project on the trail. */
export function ProjectLandmark({ index, label, children }: { index: number; label: string; children: ReactNode }) {
  const selection = useWorkshop()
  return <article className={styles.sceneProject} data-workshop-project={index} data-active={selection.active === index} aria-label={label}
    onMouseEnter={() => selection.hover(index)} onMouseLeave={() => selection.hover(null)}
    onFocus={() => selection.focus(index)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) selection.focus(null) }}>
    {children}
  </article>
}
