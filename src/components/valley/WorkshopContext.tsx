'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { observeReadingPosition } from './reading-position'
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
    let lastScroll = window.scrollY
    return observeReadingPosition('[data-workshop-project]', (cards, y, height) => {
      if (lastScroll !== y) {
        hover(null)
        const focusedCard = document.activeElement?.closest<HTMLElement>('[data-workshop-project]')
        const target = cards.find(card => card.element === focusedCard)
        if (!target || target.bottom <= y || target.top >= y + height) focus(null)
        lastScroll = y
      }
      const readingLine = y + height * .5
      const distances = cards.map(card => {
        return Math.max(card.top - readingLine, readingLine - card.bottom, 0)
      })
      if (distances.length) setScrolled(Number(cards[distances.indexOf(Math.min(...distances))].element.dataset.workshopProject))
    })
  }, [])

  const active = focused ?? hovered ?? scrolled
  const value = useMemo(() => ({ active, hover, focus }), [active])
  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>
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
