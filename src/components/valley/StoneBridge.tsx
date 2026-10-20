'use client'

import { useExperience } from './ExperienceContext'
import { Waypoint } from './TimberWorkshop'
import styles from './RidgeLandscape.module.scss'
import { BRIDGE, bridgeCrossing, bridgeDeckTransform, bridgeFaceTransform, bridgeEntrance, bridgeExit } from './bridge-layout'

const masonry = 'M0 0H140V70H108V52A38 38 0 0 0 32 52V70H0Z'

/** A compact single-arch footbridge over a shallow, grassy hollow. */
export default function StoneBridge() {
  const { active } = useExperience()
  const [x, y] = bridgeCrossing[active]
  return <g data-landmark="stone-bridge" data-milestone={active}>
    <defs>
      <clipPath id="bridge-masonry"><path d={masonry} /></clipPath>
    </defs>
    {/* A local ground shadow anchors the arch without introducing a river. */}
    <ellipse cx="1222" cy="2265" rx="94" ry="24" fill="var(--ridge-shadow)" opacity=".1" transform="rotate(-26.565 1222 2265)" />
    {/* Grass and rock abutments carry both ends at exactly deck elevation. */}
    <g transform={bridgeFaceTransform}>
      <path d="M-28-7L14 0V70L-20 52Z M126 0L168-7L160 52L126 70Z" fill="var(--ridge-rock)" />
      <path d="M-28-7L14 0L6 52L-20 52Z M126 0L168-7L160 52L134 52Z" fill="var(--ridge-rock-dark)" opacity=".22" />
    </g>
    <g transform={bridgeDeckTransform} fill="var(--ridge-grass)">
      <path d="M-30-22H0V22H-30Z M140-22H170V22H140Z" />
    </g>
    <g fill="none">
      <path d={`M1307 2100Q1295 2135 ${bridgeEntrance.join(' ')}M${bridgeExit.join(' ')}Q1020 2290 1012 2388`} stroke="var(--ridge-path-edge)" strokeWidth="34" />
      <path d={`M1307 2100Q1295 2135 ${bridgeEntrance.join(' ')}M${bridgeExit.join(' ')}Q1020 2290 1012 2388`} stroke="var(--ridge-path)" strokeWidth="25" />
    </g>
    <g transform={bridgeFaceTransform}>
      <path d={masonry} fill="var(--ridge-wall-shade)" />
      <g clipPath="url(#bridge-masonry)" fill="none" stroke="var(--ridge-rock)" strokeWidth="1.2" opacity=".65">
        {[15, 32, 49, 66].map((row,i) => <g key={row}><path d={`M0 ${row}H140`} />{Array.from({length:5},(_,j) => <path key={j} d={`M${j*30+(i%2)*15} ${row-17}v17`} />)}</g>)}
      </g>
      <path d="M32 70V52A38 38 0 0 1 108 52V70" fill="none" stroke="var(--ridge-wall)" strokeWidth="8" />
      <g stroke="var(--ridge-rock)" strokeWidth="1.2" opacity=".8">
        <path d="M70 10v9M49 16l4 8M91 16l-4 8M34 32l8 4M106 32l-8 4M28 52h8M104 52h8" />
      </g>
    </g>
    {/* The sand-colored route is ONLY on this top plane between the landings. */}
    <g transform={bridgeDeckTransform}>
      <path d="M0-22H140V22H0Z" fill="var(--ridge-wall)" />
      <path data-bridge-walkway="true" d="M-4-14H144V14H-4Z" fill="var(--ridge-path)" />
      {Array.from({length:8},(_,i) => <path key={i} d={`M${i*20}-22V22`} stroke="var(--ridge-rock)" strokeWidth=".7" opacity=".35" />)}
      <path d="M0-23H140M0 23H140" stroke="var(--ridge-wall)" strokeWidth="4" />
    </g>
    <g transform={`matrix(1 -.5 0 1 ${BRIDGE.x - BRIDGE.halfWidth} ${BRIDGE.y - BRIDGE.halfWidth * .5})`}><path d="M0 0H140V-12H0Z" fill="var(--ridge-wall-shade)" /><path d="M0-12H140" stroke="var(--ridge-wall)" strokeWidth="4" /></g>
    <Waypoint x={1328} y={2209} number="03" active />
    <g className={styles.bridgeWalker} style={{transform:`translate(${x}px, ${y}px)`}}>
      <ellipse cy="-1" rx="19" ry="5" fill="var(--ridge-shadow)" opacity=".22" />
      <g key={active} className={styles.bridgeStep}><image href="/images/experience/bridge-character.webp" x="-26" y="-89" width="52" height="91" /></g>
    </g>
    <g transform={bridgeFaceTransform}><path d="M0 0H140V-8H0Z" fill="var(--ridge-wall-shade)" /><path d="M0-8H140" stroke="var(--ridge-wall)" strokeWidth="4" /></g>
    <g fill="var(--ridge-rock)"><path d="M1120 2454l18-12 24 6 9 13-34 5Z" /><path d="M1310 2540l17-18 24 3 12 20-32 8Z" /><path d="M966 2393l16-12 24 6 5 13-28 5Z" /></g>
    <g fill="var(--ridge-grass-light)"><path d="M1120 2454l18-12 24 6-23 6Z" /><path d="M1310 2540l17-18 24 3-21 12Z" /></g>
  </g>
}
