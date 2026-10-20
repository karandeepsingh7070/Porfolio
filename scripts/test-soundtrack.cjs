const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename)
const { planSegment, shuffleBag, fadeCurve, CROSSFADE } = require('../src/components/valley/soundtrack-plan.ts')
const { soundtrack } = require('../src/data/soundtrack.ts')

soundtrack.forEach(track => assert.ok(fs.existsSync(path.join(__dirname, '../public', track.src)), `${track.src} is served`))
for (const edge of [0, .5, .999999]) {
  soundtrack.forEach((track, i) => {
    const segment = planSegment(i, track.duration, () => edge)
    if (track.duration < 70) {
      assert.deepEqual(segment, { track: i, start: 0, end: track.duration, fade: track.duration / 4 }, 'short cues play whole with proportionate fades')
      return
    }
    assert.ok(segment.start >= track.duration * .12, 'stretches begin inside the track, not at its opening')
    assert.ok(segment.end <= track.duration - 2, 'stretches end before the track does')
    assert.ok(segment.end - segment.start >= Math.min(70, track.duration * .6) - 1e-9, 'each stretch lasts long enough to settle into')
    assert.ok(segment.end - segment.start >= 2 * CROSSFADE, 'fade in and fade out never overlap')
  })
}
let last = -1
for (let round = 0; round < 500; round++) {
  const bag = shuffleBag(soundtrack.length, last)
  assert.deepEqual([...bag].sort(), soundtrack.map((_, i) => i), 'every track plays once per round')
  assert.notEqual(bag[0], last, 'a new round never repeats the track just heard')
  last = bag[bag.length - 1]
}
const fadeIn = fadeCurve(0, 1, 24), fadeOut = fadeCurve(1, 0, 24)
assert.equal(fadeIn[23], 1); assert.ok(Math.abs(fadeOut[23]) < 1e-12)
fadeIn.forEach((v, i) => assert.ok(Math.abs(v * v + fadeOut[i] ** 2 - 1) < 1e-9, 'crossfades hold constant power'))
assert.ok(Math.abs(fadeCurve(.4, 0, 8)[7]) < 1e-12, 'fades resume from a partial level')
console.log('Soundtrack checks passed: files, mid-track stretches, short cues, shuffle rounds and equal-power fades.')
