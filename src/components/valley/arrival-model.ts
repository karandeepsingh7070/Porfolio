import type { Point } from './journey-math'

export const arrivalPalette = {
  limestone: '#ead8b9', paving: '#f2e4c9', joint: '#bba98c', foundation: '#c4ad87',
  inset: '#a69578', grass: '#a4b58a', moss: '#81976c', wall: '#eddbb9',
  timber: '#775440', wood: '#9e7451', roof: '#b76f55', roofLight: '#cd8b6b',
  roofDark: '#965845', glass: '#f7c76e', iron: '#515b4b', mat: '#c98866',
  weave: '#f1d8ac', leaf: '#6e8c67', petal: '#e5a5ab', clay: '#bc8161',
}
export type ArrivalFinish = keyof typeof arrivalPalette
export type ArrivalBlock = { at: Point; size: Point; finish: ArrivalFinish; rotation?: Point; layer: number }
export type ArrivalGable = { at: Point; width: number; height: number; depth: number; finish: ArrivalFinish }
export type ArrivalSprite = { at: Point; size: [number, number]; image: string; kind: 'tree' | 'character' }

// Shared by the live scene and its SVG fallback. All Arrival objects are stationary.
export const arrivalSprites: ArrivalSprite[] = [
  { at: [2.4, 3.1, -4.1], size: [2.05, 2.65], image: '/images/arrival/orchard-tree.svg', kind: 'tree' },
  { at: [5.5, 3.1, -3.3], size: [1.8, 2.35], image: '/images/arrival/orchard-tree.svg', kind: 'tree' },
  { at: [-1.85, 3.09, -.9], size: [3.75, 4.1], image: '/images/arrival/cherry-tree-still.svg', kind: 'tree' },
  { at: [-.85, 3.14, .85], size: [1.6, 1.74], image: '/images/arrival/seated-sikh-2d.webp', kind: 'character' },
]
export const arrivalGables: ArrivalGable[] = [
  { at: [3.7, 5.04, -2.7], width: 2.7, height: 1.04, depth: 2.2, finish: 'wall' },
]

export function buildArrival() {
  const blocks: ArrivalBlock[] = []
  let layer = 0
  const box = (at: Point, size: Point, finish: ArrivalFinish, rotation?: Point) => blocks.push({ at, size, finish, rotation, layer })
  const terrace = (x: number, z: number, width: number, depth: number) => {
    box([x, 2.18, z], [width - .18, 1.24, depth - .18], 'foundation')
    box([x, 1.53, z], [width + .12, .16, depth + .12], 'inset')
    box([x, 1.67, z], [width + .06, .12, depth + .06], 'limestone')
    box([x, 2.85, z], [width + .16, .18, depth + .16], 'limestone')
    box([x, 2.99, z], [width + .26, .12, depth + .26], 'paving')
    // Mortar courses and vertical joints give the plinth a human masonry scale.
    for (let row = 0; row < 3; row++) {
      const y = 1.8 + row * .34
      box([x, y, z + depth / 2 - .08], [width - .18, .018, .012], 'inset')
      box([x + width / 2 - .08, y, z], [.012, .018, depth - .18], 'inset')
      for (let j = 0; j < Math.floor(width / .65); j++) box([x - width / 2 + .28 + j * .65 + (row % 2) * .26, y + .16, z + depth / 2 - .074], [.012, .29, .013], 'inset')
      for (let j = 0; j < Math.floor(depth / .65); j++) box([x + width / 2 - .074, y + .16, z - depth / 2 + .28 + j * .65 + (row % 2) * .26], [.013, .29, .012], 'inset')
    }
  }
  terrace(-1, .05, 4.3, 3.75)
  terrace(3.75, -2.7, 4.1, 3.65)
  // Lawn is recessed just below the coping; the mat sits on the grass.
  box([-1.02, 3.065, .03], [3.86, .03, 3.3], 'grass')
  box([3.75, 3.065, -2.7], [3.7, .03, 3.25], 'grass')

  // Continuous, dressed stone causeway with narrow contrasting curb stones.
  for (const x of [2.2, 6.6]) {
    box([x, 1.62, 0], [.48, 2.25, .72], 'foundation')
    box([x, .53, 0], [.64, .18, .88], 'limestone')
    box([x, 2.68, 0], [.68, .16, .93], 'paving')
  }
  box([4.48, 2.76, 0], [7.12, .32, 1.18], 'foundation')
  box([4.48, 2.96, 0], [7.12, .08, 1.22], 'joint')
  for (let n = 0; n < 10; n++) {
    const x = 1.23 + n * .72
    box([x, 3.025, -.23], [.69, .065, .43], n % 3 === 0 ? 'limestone' : 'paving')
    box([x, 3.025, .23], [.69, .065, .43], n % 3 === 1 ? 'limestone' : 'paving')
    for (const z of [-.57, .57]) box([x, 3.065, z], [.7, .14, .14], 'limestone')
  }
  // Branch from the causeway into the cottage's little front courtyard.
  box([3.7, 2.79, -.94], [1.14, .42, 1.9], 'foundation')
  for (let n = 0; n < 4; n++) {
    box([3.7, 3.025, -.35 - n * .46], [.98, .065, .44], 'paving')
    for (const x of [3.14, 4.26]) box([x, 3.065, -.35 - n * .46], [.13, .13, .44], 'limestone')
  }

  // Woven picnic mat: a border, fine stripes, and short fringe at each end.
  box([-.88, 3.105, .82], [2.28, .035, 1.68], 'mat', [0, -.16, 0])
  box([-.88, 3.125, .82], [2.07, .008, 1.47], 'weave', [0, -.16, 0])
  for (let n = 0; n < 9; n++) box([-1.78 + n * .225, 3.132, .82], [.036, .008, 1.28], 'mat', [0, -.16, 0])
  for (let n = 0; n < 14; n++) for (const z of [.01, 1.65]) box([-1.88 + n * .15, 3.11, z], [.025, .014, .14], 'weave')
  // Fallen petals remain still, even while the camera moves between chapters.
  const scatter = (n: number) => {
    let value = Math.imul(n + 1, 374761393)
    value = Math.imul(value ^ (value >>> 13), 1274126177)
    return ((value ^ (value >>> 16)) >>> 0) / 4294967296
  }
  for (let n = 0; n < 18; n++) {
    const x = -2.85 + scatter(n) * 3.2, z = -1.5 + scatter(n + 41) * 3
    box([x, 3.095, z], [.045, .014, .075], 'petal', [0, n * 1.7, 0])
  }

  // Rural cottage, built at the same scale as the seated character.
  layer = 2
  box([3.7, 3.18, -2.7], [2.9, .26, 2.4], 'limestone')
  box([3.7, 4.12, -2.7], [2.7, 1.86, 2.2], 'wall')
  box([3.7, 3.34, -1.589], [2.7, .18, .055], 'foundation')
  for (const x of [2.39, 5.01]) box([x, 4.13, -1.56], [.12, 1.87, .14], 'timber')
  box([3.7, 5.02, -1.54], [2.86, .15, .16], 'timber')
  box([5.055, 5.02, -2.7], [.12, .15, 2.25], 'timber')
  // Front door with an inset panel, plank seams and brass-coloured handle.
  layer = 4
  box([3.26, 3.95, -1.55], [.71, 1.48, .11], 'timber')
  box([3.26, 3.93, -1.475], [.55, 1.3, .05], 'wood')
  for (const x of [3.11, 3.27, 3.43]) box([x, 3.91, -1.44], [.014, 1.22, .012], 'timber')
  box([3.44, 3.91, -1.41], [.05, .06, .035], 'glass')
  box([3.26, 3.1, -1.21], [.96, .12, .51], 'limestone')
  box([3.26, 3.065, -.92], [1.1, .055, .24], 'paving')
  const windowFront = (x: number) => {
    box([x, 4.25, -1.55], [.72, .85, .14], 'timber')
    box([x, 4.25, -1.468], [.57, .67, .035], 'glass')
    box([x, 4.25, -1.44], [.045, .72, .03], 'timber')
    box([x, 4.25, -1.439], [.62, .045, .035], 'timber')
    box([x, 3.8, -1.41], [.86, .11, .3], 'wood')
    for (const dx of [-.48, .48]) {
      box([x + dx, 4.25, -1.53], [.19, .81, .08], 'leaf')
      for (let j = 0; j < 5; j++) box([x + dx, 3.96 + j * .14, -1.48], [.15, .018, .015], 'moss')
    }
  }
  windowFront(4.42)
  box([5.07, 4.23, -2.6], [.11, .87, .81], 'timber')
  box([5.136, 4.23, -2.6], [.024, .69, .62], 'glass')
  box([5.155, 4.23, -2.6], [.025, .74, .045], 'timber')
  box([5.155, 4.23, -2.6], [.025, .045, .67], 'timber')
  box([5.15, 3.76, -2.6], [.3, .11, .94], 'wood')

  // Two sloped roof planes, staggered clay tiles, ridge caps and deep eaves.
  layer = 5
  const slope = Math.atan2(1.04, 1.35)
  for (const side of [-1, 1]) {
    box([3.7 + side * .76, 5.49, -2.7], [1.96, .15, 2.68], 'roofDark', [0, 0, -side * slope])
    for (let row = 0; row < 5; row++) for (let col = 0; col < 8; col++) {
      const dx = .12 + row * .31
      box([3.7 + side * dx, 6.2 - dx * Math.tan(slope), -3.86 + col * .33 + (row % 2) * .045], [.37, .055, .31], (row + col) % 4 === 0 ? 'roofLight' : 'roof', [0, 0, -side * slope])
    }
    box([3.7 + side * .74, 5.54, -1.3], [1.98, .12, .11], 'timber', [0, 0, -side * slope])
  }
  for (let n = 0; n < 8; n++) box([3.7, 6.24, -3.86 + n * .33], [.23, .13, .34], 'roofLight')
  // Small attic vent and tall brick chimney, with a visible dark flue.
  layer = 4
  box([3.7, 5.42, -1.585], [.36, .36, .07], 'timber')
  for (const dx of [-.1, 0, .1]) box([3.7 + dx, 5.42, -1.535], [.034, .27, .04], 'wood')
  layer = 6
  box([4.39, 5.99, -3.29], [.44, 1.45, .46], 'roofDark')
  for (let row = 0; row < 6; row++) {
    box([4.39, 5.39 + row * .22, -3.046], [.45, .025, .016], 'limestone')
    box([4.618, 5.39 + row * .22, -3.29], [.016, .025, .46], 'limestone')
    box([4.39 + (row % 2 ? -.08 : .09), 5.49 + row * .22, -3.046], [.018, .18, .016], 'limestone')
  }
  box([4.39, 6.74, -3.29], [.58, .14, .6], 'roofLight')
  box([4.39, 6.815, -3.29], [.32, .015, .33], 'iron')

  // Courtyard pots, low picket fence and path lanterns.
  layer = 7
  for (const [x, z] of [[2.25, -1.47], [5.23, -1.65], [-2.64, 1.17]]) {
    box([x, 3.23, z], [.31, .33, .31], 'clay')
    box([x, 3.39, z], [.37, .075, .37], 'roofLight')
    for (let j = 0; j < 4; j++) box([x + Math.sin(j * 2) * .11, 3.54, z + Math.cos(j * 2) * .09], [.11, .28, .09], 'leaf', [0, j, .2])
    box([x, 3.69, z], [.12, .1, .11], 'petal')
  }
  layer = 1
  for (let i = 0; i < 7; i++) box([2.05 + i * .55, 3.43, -4.42], [.075, .74, .09], 'wood')
  for (const y of [3.25, 3.6]) box([3.7, y, -4.42], [3.4, .075, .065], 'wood')
  layer = 7
  for (const [x, z] of [[1.08, .75], [4.52, -.86]]) {
    box([x, 3.4, z], [.055, .7, .055], 'iron')
    box([x, 3.76, z], [.24, .31, .24], 'glass')
    box([x, 3.57, z], [.3, .07, .3], 'iron')
    box([x, 3.96, z], [.34, .09, .34], 'iron')
    for (const dx of [-.12, .12]) for (const dz of [-.12, .12]) box([x + dx, 3.76, z + dz], [.024, .32, .024], 'iron')
  }
  return blocks
}

export function arrivalColors(dark: boolean): Record<ArrivalFinish, string> {
  return dark ? { ...arrivalPalette, grass: '#72866a', moss: '#627758', wall: '#d4c49e', paving: '#d6c9a9', limestone: '#c3b18e', foundation: '#a59271', glass: '#ffd185' } : arrivalPalette
}
