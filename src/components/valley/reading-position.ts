type ReadingTarget = { element: HTMLElement; top: number; bottom: number }

/** Cache document coordinates when layout changes, never in the scroll write phase. */
export function observeReadingPosition(
  selector: string,
  update: (targets: ReadingTarget[], scrollY: number, viewportHeight: number) => void,
) {
  const main = document.getElementById('main')
  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
  let targets: ReadingTarget[] = []
  let height = window.innerHeight
  let frame = 0
  let cancelled = false
  const read = (event?: Event) => {
    const position = (event as CustomEvent<{ y: number; height: number }> | undefined)?.detail
    update(targets, position?.y ?? window.scrollY, position?.height ?? height)
  }
  const measure = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      const y = window.scrollY
      height = window.innerHeight
      targets = elements.filter(element => !element.closest('details:not([open])')).map(element => {
        const rect = element.getBoundingClientRect()
        return { element, top: rect.top + y, bottom: rect.bottom + y }
      })
      read()
    })
  }
  const observer = new ResizeObserver(measure)
  if (main) observer.observe(main)
  elements.forEach(element => observer.observe(element))
  measure()
  document.fonts.ready.then(() => { if (!cancelled) measure() })
  window.addEventListener('valley-progress', read)
  window.addEventListener('resize', measure)
  main?.addEventListener('load', measure, true)
  document.addEventListener('toggle', measure, true)
  return () => {
    cancelled = true
    observer.disconnect()
    cancelAnimationFrame(frame)
    window.removeEventListener('valley-progress', read)
    window.removeEventListener('resize', measure)
    main?.removeEventListener('load', measure, true)
    document.removeEventListener('toggle', measure, true)
  }
}
