const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')
const label = process.argv[2] || 'profile'
const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-scroll-'))
const cpuRate = Number(process.env.SCROLL_CPU_RATE || 4)
;(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE_PATH ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH } : {}) })
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:3000', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: path.join(outputDir, 'arrival.png') })
    const session = await context.newCDPSession(page)
    await session.send('Performance.enable')
    await session.send('Emulation.setCPUThrottlingRate', { rate: cpuRate })
    const before = (await session.send('Performance.getMetrics')).metrics
    const results = await page.evaluate(async () => {
      const root = document.documentElement
      root.style.scrollBehavior = 'auto'
      let geometryReads = 0, mutations = 0
      const original = Element.prototype.getBoundingClientRect
      Element.prototype.getBoundingClientRect = function () { geometryReads++; return original.call(this) }
      const observer = new MutationObserver(records => { mutations += records.length })
      observer.observe(root, { subtree: true, attributes: true, attributeFilter: ['style', 'transform', 'viewBox', 'opacity'] })
      const frames = []
      let previous, start
      const duration = 8000
      await new Promise(resolve => {
        const frame = now => {
          if (start === undefined) start = now
          if (previous !== undefined) frames.push(now - previous)
          previous = now
          const phase = Math.min(1, (now - start) / duration)
          const fraction = phase <= .5 ? phase * 2 : 2 - phase * 2
          window.scrollTo(0, fraction * (root.scrollHeight - window.innerHeight))
          if (phase < 1) requestAnimationFrame(frame)
          else requestAnimationFrame(resolve)
        }
        requestAnimationFrame(frame)
      })
      observer.disconnect()
      Element.prototype.getBoundingClientRect = original
      frames.sort((a, b) => a - b)
      return { frames: frames.length, p95FrameMs: frames[Math.floor(frames.length * .95)], framesOver34ms: frames.filter(x => x > 34).length, geometryReads, mutations }
    })
    const after = (await session.send('Performance.getMetrics')).metrics
    const metrics = Object.fromEntries(after.filter(x => ['LayoutCount','RecalcStyleCount','LayoutDuration','RecalcStyleDuration','ScriptDuration','TaskDuration'].includes(x.name)).map(x => [x.name, x.value - before.find(b => b.name === x.name).value]))
    await session.send('Emulation.setCPUThrottlingRate', { rate: 1 })
    for (const id of ['overwatch', 'experience', 'contact']) {
      await page.locator(`#${id}`).evaluate(el => el.scrollIntoView({ behavior: 'instant' }))
      await page.waitForTimeout(800)
      await page.screenshot({ path: path.join(outputDir, `${id}.png`) })
    }
    const output = { label, viewport: `390x844 @3x, ${cpuRate}x CPU slowdown`, ...results, ...metrics, errors }
    fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify(output, null, 2))
    console.log(JSON.stringify(output, null, 2))
    console.log(`Results and screenshots: ${outputDir}`)
  } finally {
    await browser.close()
  }
})().catch(error => { console.error(error); process.exitCode = 1 })
