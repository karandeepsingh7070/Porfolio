const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename)
const { ridgeCamera, RIDGE_ELEVATIONS } = require('../src/components/valley/ridge-camera.ts')
const { scrollToScene } = require('../src/components/valley/journey-math.ts')
RIDGE_ELEVATIONS.forEach((elevation, i) => {
  assert.equal(ridgeCamera(i, true).terrain, -elevation, 'each reading stop frames its authored destination')
  assert.deepEqual(ridgeCamera(i, false), ridgeCamera(i, true), 'static and animated chapter compositions agree')
})
let previous = ridgeCamera(0, true)
for (let step = 1; step <= (RIDGE_ELEVATIONS.length - 1) * 1000; step++) {
  const camera = ridgeCamera(step / 1000, true)
  assert.ok(camera.terrain <= previous.terrain, 'camera always descends')
  assert.ok(Math.abs(camera.terrain - previous.terrain) < 1, 'no jumps at chapter boundaries')
  assert.ok(Math.abs(camera.sky) <= Math.abs(camera.mountains) && Math.abs(camera.mountains) <= Math.abs(camera.terrain) && Math.abs(camera.terrain) <= Math.abs(camera.foreground), 'parallax preserves depth order')
  previous = camera
}
for (const bounds of [[0, 900, 2200, 3400, 4500, 5700, 7100, 8500], [0, 844, 2480, 5400, 7100, 8500, 9900, 11300]]) {
  const max = bounds[bounds.length - 1] + 800
  bounds.forEach((y, i) => assert.equal(ridgeCamera(scrollToScene(y, bounds, 844, max), true).terrain, -RIDGE_ELEVATIONS[i], 'anchors align after responsive layout or disclosure expansion'))
  const samples = Array.from({ length: 100 }, (_, i) => max * i / 99)
  const forward = samples.map(y => ridgeCamera(scrollToScene(y, bounds, 844, max), true))
  const reverse = [...samples].reverse().map(y => ridgeCamera(scrollToScene(y, bounds, 844, max), true)).reverse()
  assert.deepEqual(forward, reverse, 'reverse scrolling reconstructs the same composition')
}
assert.equal(ridgeCamera(-1, true).altitude, 2400)
assert.equal(ridgeCamera(10, true).altitude, 720)
assert.deepEqual(ridgeCamera(NaN, true), ridgeCamera(0, true))
assert.equal(ridgeCamera(1.2, false).terrain, ridgeCamera(1.4, false).terrain, 'motion-off remains still within a chapter')
console.log('Ridge checks passed: continuous descent, depth order, static compositions, anchors, expanded content, reverse scroll and altitude bounds.')
