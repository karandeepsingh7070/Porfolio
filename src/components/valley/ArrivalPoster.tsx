import { arrivalColors, arrivalGables, arrivalSprites, buildArrival, type ArrivalFinish } from './arrival-model'
import type { Point } from './journey-math'

type Face = { points: Point[]; finish: ArrivalFinish; shade: number; depth: number }
const sides = [[0, 3, 2, 1], [4, 5, 6, 7], [1, 2, 6, 5], [0, 4, 7, 3], [3, 7, 6, 2], [0, 1, 5, 4]]
const depth = (points: Point[]) => points.reduce((total, point) => total + point[0] + point[1] + point[2], 0) / points.length
const makeFace = (points: Point[], finish: ArrivalFinish): Face | null => {
  const a = points[1].map((v, i) => v - points[0][i]), b = points[2].map((v, i) => v - points[0][i])
  const normal = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  if (normal[0] + normal[1] + normal[2] <= 0) return null
  const magnitude = Math.hypot(...normal)
  return { points, finish, shade: Number((.18 * Math.max(0, normal[2] / magnitude) + .27 * Math.max(0, normal[0] / magnitude)).toFixed(4)), depth: depth(points) }
}
const faces: Face[] = buildArrival().flatMap((block, index) => {
  const [w, h, d] = block.size.map(v => v / 2)
  const [, ry = 0, rz = 0] = block.rotation ?? []
  const points: Point[] = [[-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d], [-w, -h, d], [w, -h, d], [w, h, d], [-w, h, d]].map(([x, y, z]) => {
    const xx = x * Math.cos(ry) + z * Math.sin(ry), zz = -x * Math.sin(ry) + z * Math.cos(ry)
    return [block.at[0] + xx * Math.cos(rz) - y * Math.sin(rz), block.at[1] + xx * Math.sin(rz) + y * Math.cos(rz), block.at[2] + zz]
  })
  return sides.map(indices => makeFace(indices.map(i => points[i]), block.finish)).filter((face): face is Face => face !== null).map(face => ({ ...face, depth: block.layer * 100000 + index * 100 + face.depth }))
})
for (const gable of arrivalGables) {
  for (const direction of [-1, 1]) {
    const [x, y, z] = gable.at
    const points: Point[] = [[x - gable.width / 2, y, z + direction * gable.depth / 2], [x + gable.width / 2, y, z + direction * gable.depth / 2], [x, y + gable.height, z + direction * gable.depth / 2]]
    const face = makeFace(direction === 1 ? points : points.reverse(), gable.finish)
    if (face) faces.push({ ...face, depth: 300000 + face.depth })
  }
}

/** The same cottage, paths, mat and character when WebGL or motion is unavailable. */
export default function ArrivalPoster({ dark, compact }: { dark: boolean; compact: boolean }) {
  const palette = arrivalColors(dark), scale = compact ? 39 : 35, origin = compact ? 370 : 560
  const project = ([x, y, z]: Point) => [origin + (x - z - 2.5) * scale, 335 + (x + z + .3) * scale * .577 - (y - 3) * scale * 1.155]
  // Stable serialized coordinates across server/client math implementations.
  const polygon = (points: Point[]) => points.map(point => project(point).map(v => v.toFixed(3)).join(',')).join(' ')
  const items = [
    ...faces.map((face, i) => ({ depth: face.depth, id: `face-${i}`, render: <g fill={palette[face.finish]}><polygon points={polygon(face.points)} /><polygon points={polygon(face.points)} fill="#564937" opacity={face.shade} /></g> })),
    ...arrivalSprites.map((sprite, i) => {
      const [x, y] = project(sprite.at), width = sprite.size[0] * scale * Math.SQRT2, height = sprite.size[1] * scale * Math.SQRT2
      return { depth: sprite.kind === 'character' ? 900000 : 190000 + depth([sprite.at]), id: `sprite-${i}`, render: <image href={sprite.image} x={x - width / 2} y={y - height} width={width} height={height} opacity={dark ? .85 : 1} /> }
    }),
  ].sort((a, b) => a.depth - b.depth)
  const chimney = project([4.39, 6.85, -3.29])
  return <svg viewBox="0 0 800 540" role="presentation" aria-hidden="true">
    {items.map(item => <g key={item.id}>{item.render}</g>)}
    {[0, 1, 2, 3].map(i => <ellipse key={i} cx={chimney[0] + i * 4} cy={chimney[1] - 5 - i * 12} rx={5 + i * 2} ry={7 + i * 2} fill={dark ? '#bbc8ad' : '#c3b8a4'} opacity={.18 - i * .03} />)}
  </svg>
}
