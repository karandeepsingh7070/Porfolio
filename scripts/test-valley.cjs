const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('typescript')
const filename = path.join(__dirname, '../src/components/valley/journey-math.ts')
const mod = new Module(filename)
mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename)
const { travelerPosition, STOPS, route, scrollToScene } = mod.exports
const distance = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]))
for (let i = 0; i < STOPS.length; i++) assert.ok(distance(travelerPosition(i), STOPS[i]) < 1e-8, 'traveler arrives at each reading stop')
for (let i = 0; i < 6; i++) {
  const path = route(i)
  for (let n = 0; n <= 1000; n++) {
    const p = i + n / 1000, position = travelerPosition(p)
    assert.ok(path.slice(1).some((b, j) => Math.abs(distance(path[j], position) + distance(position, b) - distance(path[j], b)) < 1e-7), 'traveler follows masonry or lift without cutting corners')
    if (n) assert.ok(distance(travelerPosition(p - .001), position) > 0, 'traveler advances without waiting for a bridge')
    if (n) assert.ok(distance(travelerPosition(p - .001), position) < .06, 'no teleport at a bend or elevation change')
  }
}
assert.deepEqual(travelerPosition(-1), STOPS[0])
assert.deepEqual(travelerPosition(7), STOPS[6])
for (const bounds of [[0, 900, 2200, 3400, 4800, 6200, 7600], [0, 740, 2380, 5600, 7100, 8500, 9900]]) {
  const max = bounds[6] + 500
  bounds.forEach((y, i) => assert.equal(scrollToScene(y, bounds, 900, max), i, 'anchors and expanded content align'))
  assert.equal(scrollToScene(max, bounds, 900, max), 7)
  const forward = Array.from({ length: 101 }, (_, i) => scrollToScene(max * i / 100, bounds, 900, max))
  const backward = Array.from({ length: 101 }, (_, i) => scrollToScene(max * (100 - i) / 100, bounds, 900, max)).reverse()
  assert.deepEqual(forward, backward, 'reverse scroll exactly reconstructs the journey')
}
console.log('Journey checks passed: route continuity, uninterrupted travel, elevations, anchors, expanded content, reverse scroll.')
