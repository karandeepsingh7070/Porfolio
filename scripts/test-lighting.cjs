const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename)
const { journeyLighting } = require('../src/components/valley/journey-lighting.ts')

// The story holds daylight at arrival/work, warms the middle, and reaches night before Contact.
assert.equal(journeyLighting(0).time, 'daylight')
assert.equal(journeyLighting(1).evening, 0)
assert.equal(journeyLighting(3).time, 'evening')
assert.equal(journeyLighting(4).evening, 1)
assert.equal(journeyLighting(4).night, 0)
// White text must already be active through the Experience twilight midpoint.
assert.equal(journeyLighting(4).theme, 'evening')
assert.equal(journeyLighting(4.75).theme, 'dark')
assert.equal(journeyLighting(5).theme, 'dark')
for (const stop of [6, 7]) {
  assert.equal(journeyLighting(stop).theme, 'dark')
  assert.equal(journeyLighting(stop).night, 1)
}
const samples = Array.from({ length: 701 }, (_, i) => i / 100)
const forward = samples.map(journeyLighting)
const backward = [...samples].reverse().map(journeyLighting).reverse()
assert.deepEqual(forward, backward, 'reverse scrolling and anchor jumps reconstruct identical lighting')
for (let i = 1; i < forward.length; i++) {
  for (const blend of ['evening', 'night']) {
    const change = forward[i][blend] - forward[i - 1][blend]
    assert.ok(change >= 0 && change < .011, 'lighting is continuous and monotonic')
  }
}
for (const value of [-10, NaN, Infinity]) assert.deepEqual(journeyLighting(value), journeyLighting(0))
assert.deepEqual(journeyLighting(20), journeyLighting(7))
console.log('Lighting checks passed: three chapter phases, continuous blends, reverse scroll, anchor jumps and bounded input.')
