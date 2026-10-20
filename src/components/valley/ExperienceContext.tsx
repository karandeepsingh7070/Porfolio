'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const ExperienceContext = createContext({ active: 0, select: (_index: number) => {} })
export const useExperience = () => useContext(ExperienceContext)

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [active, select] = useState(0)
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-career-role]'))
    const update = () => {
      const line = window.innerHeight * .48
      const distances = cards.map(card => {
        const rect = card.getBoundingClientRect()
        return Math.abs((rect.top + rect.bottom) / 2 - line)
      })
      if (distances.length) select(distances.indexOf(Math.min(...distances)))
    }
    const observer = new ResizeObserver(update)
    cards.forEach(card => observer.observe(card))
    update()
    window.addEventListener('valley-progress', update)
    window.addEventListener('resize', update)
    return () => { observer.disconnect(); window.removeEventListener('valley-progress', update); window.removeEventListener('resize', update) }
  }, [])
  return <ExperienceContext.Provider value={{ active, select }}>{children}</ExperienceContext.Provider>
}
