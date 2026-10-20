import type { ReactNode } from 'react'
import styles from './RidgeLandscape.module.scss'

// Small irregular groups follow the trail and continue across the open pasture.
const clusters = [
  [1210, 2785], [1330, 2822], [1168, 2872], [1258, 2905],
  [1120, 2950], [1205, 2985], [1050, 3038], [1170, 3070],
  [1363, 3035], [1410, 3120], [987, 3162], [1060, 3232],
  [1337, 3220], [1190, 3275], [1420, 3300], [945, 3298],
]
const flowers = clusters.flatMap(([x, y], cluster) =>
  Array.from({ length: 3 + cluster % 3 }, (_, i) => ({
    x: x + [-14, 2, 15, -5, 22][i],
    y: y + [0, -7, 4, 11, -3][i],
    scale: .52 + ((cluster * 3 + i) % 5) * .1,
    kind: (cluster + i) % 4,
  })))

const petalColors = ['#FFD166', '#E287B2', '#D4ADFC']
// Authored phases avoid hydration randomness while keeping each breeze independent.
const airbornePetals = [
  [1350, 2790, 6.8, -1.7], [1255, 2915, 7.6, -5.1],
  [1375, 3010, 6.3, -3.4], [1200, 3060, 7.9, -.8],
  [1320, 3130, 7.1, -6.2],
]

function Sway({ phase, children }: { phase: number; children: ReactNode }) {
  return <g className={styles.meadowSway} style={{ animationDuration: `${3 + (phase * 7 % 11) / 5}s`, animationDelay: `${-(phase * 1.37 % 5)}s` }}>{children}</g>
}

function Fern({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="var(--haven-leaf)">
    <Sway phase={x}>
    {[-45, -22, 5, 31, 55].map(angle => <g key={angle} transform={`rotate(${angle})`}>
      <path d="M0 0Q-3-16 0-31" fill="none" stroke="var(--haven-stem)" strokeWidth="1" />
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M0 ${-5-i*5}q${-10+i} -8 -1 -8M0 ${-5-i*5}q${10-i} -7 0 -8`} />)}
    </g>)}
    </Sway>
  </g>
}

/** A grounded meadow at the final bend, sharing the ridge's SVG camera. */
export default function FloralHaven() {
  return <g data-landmark="floral-haven">
    <defs>
      <radialGradient id="haven-glow"><stop stopColor="#FFD166" stopOpacity=".48" /><stop offset="1" stopColor="#FFD166" stopOpacity="0" /></radialGradient>
      <radialGradient id="haven-ground-shadow"><stop stopColor="var(--ridge-shadow)" stopOpacity=".3" /><stop offset=".5" stopColor="var(--ridge-shadow)" stopOpacity=".18" /><stop offset="1" stopColor="var(--ridge-shadow)" stopOpacity="0" /></radialGradient>
      <path id="haven-petal" d="M-4 0Q-1-3 4-1Q3 3-1 2Q-3 2-4 0Z" />
      <g id="haven-flower">
        <path d="M0 0Q3-8 0-16M1-5Q-8-13-7-6ZM1-9Q10-17 8-9Z" fill="var(--haven-leaf)" stroke="var(--haven-stem)" strokeWidth=".8" />
        <g transform="translate(0 -17)" fill="currentColor">
          {[0, 72, 144, 216, 288].map(angle => <ellipse key={angle} cy="-2.6" rx="2.1" ry="3.3" transform={`rotate(${angle})`} />)}
          <circle r="1.7" fill="#d8ab50" />
        </g>
      </g>
      <g id="haven-lupine">
        <path d="M0 0Q4-19 0-45" fill="none" stroke="var(--haven-stem)" strokeWidth="1.4" />
        <path d="M1-8Q-16-22-10-10ZM2-13Q18-29 12-13Z" fill="var(--haven-leaf)" />
        {Array.from({ length: 7 }, (_, i) => <g key={i} fill={i % 2 ? '#b2a1ce' : '#8f7aad'}><ellipse cx={-3 + i*.35} cy={-20-i*3.8} rx={4-i*.43} ry="2.8" /><ellipse cx={4-i*.45} cy={-22-i*3.8} rx={4-i*.43} ry="2.8" /></g>)}
      </g>
      <g id="haven-clover" fill="var(--haven-leaf)"><path d="M0 1v6" stroke="var(--haven-stem)" /><ellipse cx="-3" cy="-1" rx="4" ry="2.7" /><ellipse cx="3" cy="-1" rx="4" ry="2.7" /><ellipse cy="-4" rx="2.7" ry="4" /></g>
    </defs>
    <g fill="var(--haven-leaf)" opacity=".25">
      {Array.from({ length: 58 }, (_, i) => {
        const y = 3010 + (i * 47) % 361
        const x = Math.max(940 + (i * 83) % 492, 1190 - (y - 3010) * .9)
        // Leave a generous corridor clear through the final trail bend.
        if (y < 3140 && x > 1070 && x < 1160) return null
        return <path key={i} d={`M${x} ${y}l-3-6 4 4 2-8 1 9`} />
      })}
    </g>
    {flowers.map(({x,y,scale,kind},i) => <g key={i} transform={`translate(${x} ${y}) scale(${scale})`}><Sway phase={i}><use href="#haven-flower" color={['#FFD166','#efb7c8','#b75988','#f4f0df'][kind]} /></Sway></g>)}
    {[[1195,2812],[1310,2843],[1119,2938],[1225,2996],[1045,3052],[1390,3082],[1010,3260],[1375,3250]].map(([x,y],i) => <g key={i}>
      {[0,1,2].map(j => <g key={j} transform={`translate(${x+j*8} ${y+(j%2)*5}) scale(${.57+((i+j)%3)*.13})`}><Sway phase={i*3+j+flowers.length}><use href="#haven-lupine" /></Sway></g>)}
    </g>)}
    {[[1220,3024],[1328,3107],[1008,3205],[1295,3270],[1410,3185]].map(([x,y],i) => <g key={i}>
      {[0,1,2,3].map(j => <g key={j} transform={`translate(${x+j*8} ${y+(j%2)*7}) scale(.7)`}><Sway phase={i*4+j+90}><use href="#haven-clover" /></Sway></g>)}
    </g>)}
    <Fern x={1340} y={3260} scale={.6} /><Fern x={1038} y={3195} scale={.5} />
    <g data-petals="grounded">
      {[[1244,2825,25],[1193,2900,-16],[1128,3005,32],[1109,3068,-25],[1140,3130,14],[1097,3215,-32],[1165,3212,24],[1302,3189,-12],[1240,3245,40]].map(([x,y,angle],i) => <use key={i} href="#haven-petal" transform={`translate(${x} ${y}) rotate(${angle}) scale(.85 .5)`} fill={petalColors[i%3]} opacity=".8" />)}
    </g>
    <g transform="translate(1200 3180)">
      <g fill="url(#haven-ground-shadow)"><ellipse cx="-32" cy="6" rx="74" ry="20" /><ellipse cx="42" cy="13" rx="52" ry="12" /></g>
      <image href="/images/contact/reclining-character.webp" x="-100" y="-58" width="184" height="78" />
      {/* A closed laptop on a small woven cloth: the day's work is finished. */}
      <g transform="translate(66 38)">
        <ellipse cx="13" cy="2" rx="37" ry="13" fill="url(#haven-ground-shadow)" />
        <path d="M-16-10L20-15L44 0L5 10Z" fill="var(--ridge-mat)" />
        <path d="M-9-10L27 6M0-12L35 3M-9 1L27-6" stroke="var(--ridge-mat-stripe)" strokeWidth="1" opacity=".65" />
        <path d="M-7-8L18-12L34-3V0L9 5L-7-5Z" fill="#677c7d" />
        <path d="M-7-8L18-12L34-3L9 2Z" fill="#b8c5c1" /><path d="M11-5l5-1 3 2-5 1Z" fill="#e0e7dd" />
      </g>
      <g transform="translate(-117 8)">
        <g className={styles.meadowGlow}><ellipse className={styles.meadowHalo} cy="4" rx="78" ry="39" fill="url(#haven-glow)" /></g>
        <ellipse cy="5" rx="16" ry="6" fill="url(#haven-ground-shadow)" />
        <path d="M-5-21v-4a5 5 0 0110 0v4" fill="none" stroke="var(--ridge-trunk)" strokeWidth="2" />
        <path d="M-8-20H8L6 3H-6Z" fill="var(--ridge-window)" stroke="var(--ridge-trunk)" strokeWidth="2" />
        <path d="M-8-20H8M-7 3H7M0-19V2" stroke="var(--ridge-trunk)" strokeWidth="2" /><path d="M-3-13h2v10h-2Z" fill="#fff0c7" />
      </g>
      <g className={styles.meadowFireflies}>{[[-145,-38],[-79,-74],[-23,-48],[61,-68],[124,-35],[98,12],[-61,37],[18,53]].map(([x,y],i) => <g key={i} transform={`translate(${x} ${y})`}><g className={styles.meadowFirefly} style={{animationDelay:`${-i*1.3}s`}}><circle className={styles.meadowHalo} style={{animationDelay:`${-i*.7}s`}} r="13" fill="url(#haven-glow)" /><circle r="1.5" fill="#ffedb0" /></g></g>)}</g>
    </g>
    <g className={styles.airbornePetals} data-petals="airborne">
      {airbornePetals.map(([x,y,duration,delay],i) => <g key={i} transform={`translate(${x} ${y})`}><g className={styles.petalDrift} style={{animationDuration:`${duration}s`,animationDelay:`${delay}s`}}><use className={styles.petalWobble} href="#haven-petal" fill={petalColors[i%3]} style={{animationDelay:`${delay}s`}} /></g></g>)}
    </g>
  </g>
}
