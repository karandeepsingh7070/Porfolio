'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { observeReadingPosition } from './reading-position'

const ExperienceContext = createContext({ active: 0, select: (_index: number) => {} })
export const useExperience = () => useContext(ExperienceContext)

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [active, select] = useState(0)
  useEffect(() => {
    return observeReadingPosition('[data-career-role]', (cards, y, height) => {
      const line = y + height * .48
      const distances = cards.map(card => {
        return Math.abs((card.top + card.bottom) / 2 - line)
      })
      if (distances.length) select(distances.indexOf(Math.min(...distances)))
    })
  }, [])
  const value = useMemo(() => ({ active, select }), [active])
  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}
