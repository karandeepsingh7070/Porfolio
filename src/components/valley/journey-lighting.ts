import { smoothStep } from './journey-math'

export type JourneyTime = 'daylight' | 'evening' | 'night'

/** Chapter-based timing stays consistent when content expands or the viewport changes. */
export function journeyLighting(progress: number) {
  const position = Math.max(0, Math.min(7, Number.isFinite(progress) ? progress : 0))
  const time: JourneyTime = position < 2 ? 'daylight' : position < 5.5 ? 'evening' : 'night'
  const night = smoothStep((position - 4) / 2)
  return {
    time,
    // Bring in light text during dusk, before the Experience scene reaches its grey midpoint.
    theme: night >= .25 ? 'dark' : time === 'evening' || time === 'night' ? 'evening' : 'light',
    evening: smoothStep((position - 1) / 2),
    night,
  }
}
