# Mobile scroll performance — 20 October 2026

The descending landscape and scroll-driven daylight/evening/night palettes remain.
The work targets rendering cost rather than changing the portfolio's structure.

## Findings and changes

- The scroll handler wrote inherited lighting properties, then dispatched callbacks
  that measured project and career cards. This interleaved writes and layout reads.
  Card coordinates are now cached and refreshed on resize, font/image loads, and
  disclosure changes. Scroll callbacks receive the already-read scroll position.
- A passive native scroll listener batches updates in one animation frame. Section
  bounds, viewport height and maximum scroll are measured when layout changes.
  The active page no longer needs Framer Motion's scroll subscription.
- Root lighting transitions repeatedly interpolated inherited variables for 600 ms,
  including after the scroll stopped. The existing scroll interpolation now drives
  the palette directly, with 1% color steps and no writes for unchanged values.
  Surface and SVG color transitions no longer trail the scroll-driven lighting.
- The landscape skips unchanged scene positions and is memoized against navigation
  rerenders. Mobile horizontal framing pans an SVG group inside a fixed viewBox,
  instead of changing the viewport of every SVG descendant each frame.
- Mobile and coarse-pointer screens use tinted surfaces instead of live backdrop
  blurs over moving scenery. Career cards are opaque to preserve readability.
- Ambient landmark animations pause away from their chapters. On touch-sized or
  coarse-pointer screens, decoration pauses during scrolling and resumes after
  150 ms of rest; the scroll-driven landscape continues moving.

Reading geometry before writes follows [web.dev's layout guidance](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing).
Backdrop filtering requires extra rendering passes, as described by [WebKit](https://webkit.org/blog/3632/introducing-backdrop-filters/).

## Production measurements

Same local Chromium-based browser and machine, headless mobile emulation at
390 × 844 CSS pixels, device scale 3, touch enabled. An eight-second scripted scroll
travels the entire document and back, after initial loading and font readiness.
Both versions use the same geometry-read/mutation instrumentation. Runs are serial.

| Metric | Before | After |
| --- | ---: | ---: |
| CPU slowdown | 4× | 4× |
| Animation-frame samples | 245 | 387 |
| 95th-percentile frame interval | 66.7 ms | 33.4 ms |
| Frames taking over 34 ms | 56 | 14 |
| `getBoundingClientRect` calls | 1,492 | 28 |
| Layout time | 275 ms | 84 ms |
| Style recalculation time | 3,133 ms | 2,351 ms |
| Script time | 488 ms | 310 ms |
| Main-thread task time | 6,177 ms | 4,626 ms |
| First-load JavaScript (Next build) | 127 kB | 118 kB |

The throttled run has 75% fewer frames over 34 ms and 98% fewer geometry reads.
Without CPU throttling, the final mobile-emulation run sampled 481 frames in eight
seconds (approximately 60 fps), with a 16.7 ms 95th-percentile interval and no frames
over 34 ms.
These are synthetic desktop-browser results, not measurements from physical iOS
or Android devices. Animation-frame intervals are a responsiveness proxy, not a
GPU presentation trace. The 4× stress test still misses some frame deadlines.

## Reproduce

Use a production server in one terminal:

```sh
npm run build
npm run start -- --hostname 127.0.0.1
```

The optional profiler needs Playwright and a Chromium browser available in your
tooling environment; it adds no application dependency. If Playwright is in Node's
module search path and has its bundled browser installed:

```sh
node scripts/profile-scroll.cjs comparison
SCROLL_CPU_RATE=1 node scripts/profile-scroll.cjs normal-cpu
```

For external tooling, set `PLAYWRIGHT_MODULE` to its Playwright module path and
`BROWSER_EXECUTABLE_PATH` to a Chromium executable. `PORTFOLIO_URL` overrides the
default local server URL. Each run writes metrics and four chapter screenshots to
a new temporary directory and prints its path. Compare multiple runs on an idle
machine with identical browser settings.

## Verification

Production build, TypeScript, ESLint, and the valley, arrival, ridge, lighting and
soundtrack checks passed. Browser checks covered forward/reverse chapters,
mobile anchor navigation, motion preference persistence, reduced-motion mode,
expanded project selection and subsequent chapter alignment, career selection,
orientation changes, absence of mobile backdrop filters and horizontal overflow,
and desktop SVG framing. No runtime errors were reported.
