export interface Segment { track: number; start: number; end: number; fade: number }

export const CROSSFADE = 7
const MIN_LENGTH = 70
const MAX_LENGTH = 150

/** Picks a stretch from somewhere inside a track instead of its opening bars; short cues play whole. */
export function planSegment(track: number, duration: number, random = Math.random): Segment {
  if (duration < MIN_LENGTH) return { track, start: 0, end: duration, fade: Math.min(CROSSFADE, duration / 4) }
  const length = Math.min(duration * .6, MIN_LENGTH + random() * (MAX_LENGTH - MIN_LENGTH))
  const earliest = duration * .12
  const latest = duration - length - 2
  const start = earliest + random() * (latest - earliest)
  return { track, start, end: start + length, fade: CROSSFADE }
}

/** Every track plays once per round, and a new round never repeats the track just heard. */
export function shuffleBag(count: number, avoid: number, random = Math.random) {
  const bag = Array.from({ length: count }, (_, i) => i)
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]]
  }
  if (bag.length > 1 && bag[0] === avoid) [bag[0], bag[1]] = [bag[1], bag[0]]
  return bag
}

/** Equal-power gain steps, so two overlapping tracks keep a steady combined loudness. */
export function fadeCurve(from: number, to: number, steps: number) {
  return Array.from({ length: steps }, (_, i) => {
    const t = (i + 1) / steps
    return from + (to - from) * (to > from ? Math.sin(t * Math.PI / 2) : 1 - Math.cos(t * Math.PI / 2))
  })
}
