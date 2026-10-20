export type Point = [number, number, number]
export const STOPS: Point[] = [[0, 3, 0], [8, 3, -3], [13, 3, -11], [21, 5, -11], [26, 5, -19], [32, 7, -23], [39, 7, -20]]
export const STOP_COUNT = STOPS.length
export const clampUnit = (value: number) => Math.min(1, Math.max(0, value))
export function smoothStep(value: number) { const t = clampUnit(value); return t * t * (3 - 2 * t) }
export function mixPoint(a: Point, b: Point, t: number): Point { return a.map((v, i) => v + (b[i] - v) * t) as Point }
export function route(index: number): Point[] {
  const a = STOPS[index], b = STOPS[index + 1]
  return [a, [b[0], a[1], a[2]], [b[0], b[1], a[2]], b]
}
export function alongRoute(points: Point[], fraction: number): Point {
  const lengths = points.slice(1).map((p, i) => Math.hypot(...p.map((v, j) => v - points[i][j])))
  let distance = clampUnit(fraction) * lengths.reduce((sum, n) => sum + n, 0)
  for (let i = 0; i < lengths.length; i++) {
    if (lengths[i] > 0 && distance <= lengths[i]) return mixPoint(points[i], points[i + 1], distance / lengths[i])
    distance -= lengths[i]
  }
  return points[points.length - 1]
}
export function travelerPosition(progress: number): Point {
  const p = Math.max(0, Math.min(STOP_COUNT - 1, progress))
  const i = Math.min(STOP_COUNT - 2, Math.floor(p)), t = p - i
  return alongRoute(route(i), smoothStep(t))
}
/** The document controls reading rests, with travel confined to each section approach. */
export function scrollToScene(y: number, bounds: number[], viewportHeight: number, maxScroll: number) {
  if (!bounds.length) return 0
  let progress = 0
  for (let i = 1; i < bounds.length; i++) {
    const end = bounds[i]
    const start = Math.max(bounds[i - 1], end - viewportHeight * .8)
    if (y >= end) progress = i
    else if (y > start) { progress = i - 1 + (y - start) / (end - start); break }
    else break
  }
  const finalStart = bounds[bounds.length - 1] + 80
  const overview = maxScroll > finalStart + 100 && y > finalStart ? clampUnit((y - finalStart) / (maxScroll - finalStart)) : 0
  return Math.min(STOP_COUNT, Math.max(0, progress + overview))
}
