const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('typescript')
const filename = path.join(__dirname, '../src/components/valley/arrival-model.ts')
const mod = new Module(filename)
mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename)
const { buildArrival, arrivalSprites, arrivalColors } = mod.exports
const blocks = buildArrival()
const pavingBelow = (x, z) => blocks.some(block => {
  if (block.rotation?.some(v => v !== 0)) return false
  const top = block.at[1] + block.size[1] / 2
  return top >= 3 - 1e-8 && top <= 3.15 && Math.abs(x - block.at[0]) <= block.size[0] / 2 + 1e-8 && Math.abs(z - block.at[2]) <= block.size[2] / 2 + 1e-8
})
for (let n = 0; n <= 160; n++) assert.ok(pavingBelow(n / 20, 0), `Causeway gap at x=${n / 20}`)
for (let n = 0; n <= 32; n++) assert.ok(pavingBelow(3.7, -n / 20), `Cottage approach gap at z=${-n / 20}`)
for (const block of blocks) {
  assert.ok([...block.at, ...block.size, ...(block.rotation || [])].every(Number.isFinite), 'Finite geometry')
  assert.ok(block.size.every(n => n > 0), 'Positive geometry dimensions')
  assert.ok(arrivalColors(false)[block.finish] && arrivalColors(true)[block.finish], 'Both themes cover every finish')
}
const character = arrivalSprites.find(sprite => sprite.kind === 'character')
assert.ok(character && pavingBelow(character.at[0], character.at[2]), 'Seated character has a solid surface beneath it')
for (const sprite of arrivalSprites) assert.ok(fs.existsSync(path.join(__dirname, '../public', sprite.image)), `Missing illustration: ${sprite.image}`)
console.log('Arrival checks passed: continuous causeway and cottage approach, grounded character, valid geometry, theme materials and sprite assets.')
