import { soundtrack, type SoundtrackTrack } from '@/data/soundtrack'
import { fadeCurve, planSegment, shuffleBag, type Segment } from './soundtrack-plan'

const VOLUME = .3
const OPENING_FADE = 4
const RESUME_FADE = 1.6
const PAUSE_FADE = .8
const SKIP_FADE = 2.5
const PRELOAD_LEAD = 20

interface Deck { audio: HTMLAudioElement; gain: GainNode; segment: Segment | null }
export interface SoundtrackState { playing: boolean; track: SoundtrackTrack | null }

/** Ramps through equal-power steps from wherever the parameter currently is. */
function glide(param: AudioParam, to: number, seconds: number, now: number) {
  const from = param.value
  param.cancelScheduledValues(now)
  param.setValueAtTime(from, now)
  const steps = 24
  fadeCurve(from, to, steps).forEach((value, i) => param.linearRampToValueAtTime(value, now + seconds * (i + 1) / steps))
}

/**
 * Two streaming media elements routed through Web Audio gain nodes: one leads while the
 * other preloads the next stretch or fades out. Gain nodes carry every fade because iOS
 * ignores `audio.volume`; streaming means only the stretch being heard is downloaded.
 */
export class SoundtrackPlayer {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private decks: Deck[] = []
  private lead = 0
  private retireAt = 0
  private bag: number[] = []
  private last = -1
  private failures = 0
  private skipping = false
  private playing = false
  private audible = false
  private heard = false
  private session = 0
  private ticker = 0
  private stopper = 0

  constructor(private onChange: (state: SoundtrackState) => void) {}

  static supported() {
    return typeof window !== 'undefined' && ('AudioContext' in window || 'webkitAudioContext' in window)
  }

  get active() { return this.playing }

  /** Call from a user gesture the first time: browsers only let sound start inside one. */
  play() {
    if (this.playing) return
    const context = this.setup()
    if (!context) return
    window.clearTimeout(this.stopper)
    if (context.state !== 'running') context.resume().catch(() => {})
    this.playing = true
    const session = ++this.session
    const lead = this.decks[this.lead], other = this.decks[1 - this.lead]
    if (!lead.segment) {
      this.load(lead, this.nextSegment())
      // WebKit lets script play an element later only if a gesture has touched it.
      if (!other.segment) other.audio.load()
    }
    lead.audio.play().catch(() => {
      if (session !== this.session) return
      this.playing = false
      window.clearInterval(this.ticker)
      this.emit()
    })
    if (this.retireAt) other.audio.play().catch(() => {})
    window.clearInterval(this.ticker)
    this.ticker = window.setInterval(() => this.tick(), 250)
    this.emit()
  }

  pause() {
    if (!this.playing || !this.context || !this.master) return
    this.playing = false
    this.audible = false
    this.session++
    window.clearInterval(this.ticker)
    glide(this.master.gain, 0, PAUSE_FADE, this.context.currentTime)
    this.stopper = window.setTimeout(() => {
      this.decks.forEach(deck => deck.audio.pause())
      this.context?.suspend().catch(() => {})
    }, PAUSE_FADE * 1000)
    this.emit()
  }

  /** Crossfades into a fresh random stretch as soon as it can play. */
  skip() {
    if (!this.playing) return
    this.skipping = true
    this.tick()
  }

  dispose() {
    this.session++
    window.clearInterval(this.ticker)
    window.clearTimeout(this.stopper)
    this.decks.forEach(deck => this.release(deck))
    this.context?.close().catch(() => {})
    this.context = null
  }

  private setup() {
    if (this.context) return this.context
    const Context = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Context) return null
    // On iOS, play through the silent switch like any music player the visitor started.
    const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession
    if (session) session.type = 'playback'
    const context = new Context()
    const master = context.createGain()
    master.gain.value = 0
    master.connect(context.destination)
    this.decks = [0, 1].map(() => {
      const audio = new Audio()
      audio.preload = 'auto'
      const gain = context.createGain()
      gain.gain.value = 0
      context.createMediaElementSource(audio).connect(gain).connect(master)
      const deck: Deck = { audio, gain, segment: null }
      audio.addEventListener('error', () => {
        if (!deck.segment) return
        this.failures++
        // A failed lead counts as finished in tick(); a failed preload is retried with another track.
        if (deck !== this.decks[this.lead]) this.release(deck)
      })
      return deck
    })
    this.context = context
    this.master = master
    return context
  }

  private nextSegment() {
    if (!this.bag.length) this.bag = shuffleBag(soundtrack.length, this.last)
    const index = this.bag.shift()!
    this.last = index
    return planSegment(index, soundtrack[index].duration)
  }

  private load(deck: Deck, segment: Segment) {
    deck.segment = segment
    deck.gain.gain.cancelScheduledValues(0)
    deck.gain.gain.value = deck === this.decks[this.lead] ? 1 : 0
    // The media fragment starts streaming mid-track; the seek covers browsers that ignore it.
    deck.audio.src = `${soundtrack[segment.track].src}#t=${segment.start.toFixed(1)}`
    deck.audio.addEventListener('loadedmetadata', () => {
      if (deck.segment === segment && Math.abs(deck.audio.currentTime - segment.start) > 1) deck.audio.currentTime = segment.start
    }, { once: true })
    deck.audio.load()
  }

  private release(deck: Deck) {
    deck.segment = null
    deck.audio.pause()
    deck.audio.removeAttribute('src')
    deck.audio.load()
    if (deck === this.decks[1 - this.lead]) this.retireAt = 0
  }

  private tick() {
    const context = this.context
    if (!context || !this.master || !this.playing) return
    const lead = this.decks[this.lead], other = this.decks[1 - this.lead]
    if (!this.audible && this.decks.some(deck => deck.segment && !deck.audio.paused && deck.audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
      glide(this.master.gain, VOLUME, this.heard ? RESUME_FADE : OPENING_FADE, context.currentTime)
      this.audible = this.heard = true
    }
    if (this.retireAt && context.currentTime >= this.retireAt) this.release(other)
    if (this.failures >= soundtrack.length) { this.failures = 0; this.pause(); return }
    if (!lead.segment) return

    const position = lead.audio.currentTime
    const finished = lead.audio.ended || !!lead.audio.error
    if (!this.retireAt && !other.segment && (this.skipping || finished || position >= lead.segment.end - lead.segment.fade - PRELOAD_LEAD)) {
      this.load(other, this.nextSegment())
    }
    const next = other.segment
    if (!next || this.retireAt || other.audio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA || other.audio.seeking) return
    const fade = this.skipping ? SKIP_FADE : Math.min(lead.segment.fade, next.fade)
    if (!this.skipping && !finished && position < lead.segment.end - fade) return

    other.audio.play().catch(() => {})
    glide(other.gain.gain, 1, fade, context.currentTime)
    glide(lead.gain.gain, 0, fade, context.currentTime)
    this.lead = 1 - this.lead
    this.retireAt = context.currentTime + fade
    this.skipping = false
    this.failures = 0
    this.emit()
  }

  private emit() {
    const segment = this.decks[this.lead]?.segment
    this.onChange({ playing: this.playing, track: segment ? soundtrack[segment.track] : null })
  }
}
