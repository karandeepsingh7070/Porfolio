import { smoothStep } from './journey-math'

export const RIDGE_ELEVATIONS = [0, 480, 990, 1100, 1510, 1830, 2180, 2540]

/** Evaluated directly so reverse scrolling, anchor jumps and resizes cannot drift. */
export function ridgeCamera(progress: number, motion: boolean) {
  const p = Math.max(0, Math.min(RIDGE_ELEVATIONS.length - 1, Number.isFinite(progress) ? progress : 0))
  const position = motion ? p : Math.round(p)
  const i = Math.min(RIDGE_ELEVATIONS.length - 2, Math.floor(position))
  const descent = RIDGE_ELEVATIONS[i] + (RIDGE_ELEVATIONS[i + 1] - RIDGE_ELEVATIONS[i]) * smoothStep(position - i)
  return { terrain: -descent, mountains: -descent * .13, foreground: -descent * 1.5, sky: -descent * .035, altitude: Math.round((2400 - p * (1680 / (RIDGE_ELEVATIONS.length - 1))) / 10) * 10 }
}
