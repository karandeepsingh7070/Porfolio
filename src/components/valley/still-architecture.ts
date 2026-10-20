import { STOPS, type Point } from './journey-math'
export type Finish = 'ivory' | 'stone' | 'shadow' | 'teal' | 'deep' | 'gold' | 'pink' | 'grass'
export type Solid = { at: Point; size: Point; finish: Finish }
export type Plant = { at: Point; size: number; flower?: boolean }
export type Portal = { at: Point; rotation?: number }

/** Authored masonry: Still's narrow paths, inset piers and layered garden pavilions. */
export function buildArchitecture() {
  const solids: Solid[] = [], plants: Plant[] = [], portals: Portal[] = []
  const box = (at: Point, size: Point, finish: Finish = 'ivory') => solids.push({ at, size, finish })
  const pier = (x: number, z: number, top: number, width = 1.35, depth = width) => {
    const bottom = -1.6, h = top - bottom
    box([x, bottom + h / 2, z], [width, h, depth], 'stone')
    // Recessed faces framed by pale uprights, capitals and a shadowed foot.
    box([x, bottom + h / 2, z + depth / 2 + .008], [width - .23, h - .48, .015], 'shadow')
    box([x + width / 2 + .008, bottom + h / 2, z], [.015, h - .48, depth - .23], 'shadow')
    box([x, top - .13, z], [width + .12, .12, depth + .12], 'teal')
    box([x, top, z], [width + .28, .16, depth + .28])
    box([x, bottom, z], [width + .2, .16, depth + .2])
  }
  const tile = (x: number, y: number, z: number) => {
    box([x, y - .12, z], [.98, .24, .98])
    // A raised fine rim reads as Still's individually engraved walkable stones.
    box([x, y + .003, z], [.74, .012, .74], 'stone')
    box([x, y + .011, z], [.70, .014, .70])
  }
  const path = (a: Point, b: Point, support = true) => {
    const count = Math.ceil(Math.hypot(b[0] - a[0], b[2] - a[2]))
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count)
      const x = a[0] + (b[0] - a[0]) * t, z = a[2] + (b[2] - a[2]) * t
      tile(x, a[1], z)
      if (support && i % 4 === 0) pier(x, z, a[1] - .3, .72)
    }
  }
  const garden = (x: number, y: number, z: number, flower = false, width = 1.7) => {
    pier(x, z, y - .15, width, 1.7)
    box([x, y, z], [width + .25, .2, 1.95])
    box([x, y + .12, z], [width - .1, .04, 1.55], 'gold')
    box([x, y + .16, z], [width - .16, .06, 1.49], 'grass')
    plants.push({ at: [x + (flower ? -.25 : .25), y + .2, z - .28], size: flower ? .82 : 1, flower })
  }
  const pavilion = (x: number, y: number, z: number, height = 1.6, wide = 1.9) => {
    pier(x, z, y - .2, wide, 1.9)
    box([x, y, z], [wide + .3, .18, 2.18])
    box([x, y + .12, z], [wide + .02, .055, 1.9], 'gold')
    for (const dx of [-wide / 2 + .16, wide / 2 - .16]) for (const dz of [-.72, .72]) {
      box([x + dx, y + height / 2, z + dz], [.17, height, .17], 'teal')
      box([x + dx, y + .24, z + dz], [.28, .2, .28])
      box([x + dx, y + height - .1, z + dz], [.27, .12, .27], 'gold')
    }
    box([x, y + height * .48, z - .83], [wide - .3, height * .85, .13], 'deep')
    portals.push({ at: [x, y + .15, z - .73] })
    box([x, y + height, z], [wide + .42, .13, 2.22])
    box([x, y + height + .11, z], [wide + .28, .09, 2.08], 'pink')
    box([x, y + height + .2, z], [wide + .48, .1, 2.26])
    box([x, y + height + .29, z], [wide + .17, .09, 1.94], 'teal')
    // Fine tesserae beneath the cornice, rather than oversized decorative blocks.
    for (let i = 0; i < 7; i++) box([x - wide * .4 + i * wide * .8 / 6, y + height - .12, z + .9], [.07, .07, .06], 'gold')
  }

  // Fixed paths connect every crossing; lifts handle changes in elevation.
  STOPS.slice(0, -1).forEach((a, i) => {
    const b = STOPS[i + 1]
    // Arrival owns its dressed stone causeway and courtyard branch.
    if (i !== 0) path(a, [b[0], a[1], a[2]])
    if (a[1] === b[1]) tile(b[0], b[1], a[2])
    else {
      // Open brass lift shaft; the moving platform and traveler share the same track.
      for (const dz of [-.61, .61]) box([b[0] + .61, (a[1] + b[1]) / 2, a[2] + dz], [.045, b[1] - a[1] + 1.2, .045], 'gold')
      box([b[0] + .61, b[1] + .6, a[2]], [.08, .08, 1.35], 'gold')
    }
    // Start after the lift tile so the shaft has a real opening.
    const dir = Math.sign(b[2] - a[2])
    if (dir) path([b[0], b[1], a[2] + dir], b)
  })

  // Arrival's garden, cottage and fixed character are authored in arrival-model.ts.

  // Work: a long open colonnade, with an inhabited court on its far edge.
  tile(8, 3, -3); pavilion(9.1, 3, -4.6, 2.15, 2.8)
  path([8, 3, -3], [11, 3, -3]); garden(7.2, 3, -5.7, true)
  for (let z = -6; z >= -9; z--) {
    box([12.4, 4, z], [.16, 2, .16], 'teal')
    box([14.1, 4, z], [.16, 2, .16], 'teal')
  }
  box([13.25, 5.04, -7.5], [2.15, .17, 4.65])
  box([13.25, 5.18, -7.5], [1.95, .1, 4.4], 'teal')

  // Overwatch: two garden arms intersect above the gallery already visited.
  tile(13, 3, -11); garden(11.6, 3, -12.5, false)
  path([11.6, 3, -11], [15.5, 3, -11]); garden(15.5, 3, -12.4, true)
  pier(13, -11, 2.7, 1.4); pavilion(14.7, 3, -14.3, 1.45, 1.7)
  path([13, 3, -11], [13, 3, -14.3]); path([13, 3, -14.3], [14.7, 3, -14.3])

  // Memory: the first upper landing, a narrow double-height reading pavilion.
  tile(21, 5, -11); pavilion(22.6, 5, -12.6, 2.6, 1.7)
  garden(20, 5, -13.2, false)
  path([21, 5, -11], [21, 5, -13]); path([21, 5, -13], [22.6, 5, -13])
  for (let n = 0; n < 5; n++) box([23.35, 5.4 + n * .36, -11.9], [.08, .06, .72], 'gold')

  // Experience: a descending procession of buttresses, visible under the upper path.
  tile(26, 5, -19); garden(25, 5, -20.5, false)
  for (let n = 0; n < 4; n++) {
    pier(27.2 + n * 1.2, -20.6, 4.7 - n * .48, .85)
    box([27.2 + n * 1.2, 4.77 - n * .48, -20.6], [1.12, .08, 1.12], 'teal')
  }
  pavilion(27.4, 5, -17.4, 1.25, 1.7)
  path([26, 5, -19], [26, 5, -17.4]); path([26, 5, -17.4], [27.4, 5, -17.4])

  // About: a roofless garden with a shallow rill and a single flowering tree.
  tile(32, 7, -23); garden(31, 7, -24.4, true, 2.3)
  garden(33.3, 7, -25, false)
  path([32, 7, -23], [32, 7, -25]);
  box([33.1, 7.03, -23.7], [1.6, .12, .47], 'teal')
  box([33.1, 7.11, -23.7], [1.36, .03, .28], 'deep')
  box([31.1, 7.32, -22.5], [1.35, .16, .4])
  for (const x of [30.6, 31.6]) box([x, 7.14, -22.5], [.12, .3, .3], 'stone')

  // Contact: an open belvedere at the route's highest point.
  tile(39, 7, -20); pavilion(39, 7, -21.8, 1.75, 2.5)
  path([39, 7, -20], [39, 7, -21.8]); garden(40.8, 7, -20, true)
  garden(37.4, 7, -21.8, false)
  return { solids, plants, portals }
}
