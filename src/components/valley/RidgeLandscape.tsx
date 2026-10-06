'use client'

import { useEffect, useRef, type CSSProperties, type MutableRefObject } from 'react'
import { ridgeCamera } from './ridge-camera'
import { OpenObservatory, TradeOutpost } from './ProjectLandmarks'
import TimberWorkshop, { WorkshopRiver } from './TimberWorkshop'
import styles from './RidgeLandscape.module.scss'
import FloralHaven from './FloralHaven'

function Pine({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-3 0L-2-88H3L4 0" fill="var(--ridge-trunk)" />
    <path d="M0-130L-24-79H-14L-36-42H-21L-46-9Q0 6 44-9L23-43H35L14-80H24Z" fill="var(--ridge-pine)" />
    <path d="M0-130L0-13L-35-10L-19-42H-29L-11-80H-20Z" fill="var(--ridge-pine-light)" opacity=".65" />
  </g>
}
/** Overlapping translucent wisps have no shared hard silhouette. */
function Cloud({ x, y, scale = 1, delay = '0s' }: { x: number; y: number; scale?: number; delay?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g className={styles.cloudWisps} style={{ animationDelay: delay }} fill="url(#ridge-cloud-vapor)">
      <ellipse cx="0" cy="8" rx="150" ry="21" opacity=".6" />
      <ellipse cx="-40" cy="-2" rx="70" ry="28" />
      <ellipse cx="16" cy="-12" rx="64" ry="34" />
      <ellipse cx="70" cy="0" rx="72" ry="25" opacity=".8" />
      <ellipse cx="-2" cy="19" rx="190" ry="12" opacity=".3" />
    </g>
  </g>
}

/** One continuous illustrated mountainside; scroll moves its layers at different depths. */
export default function RidgeLandscape({ progress, motion, compact }: { progress: MutableRefObject<number>; motion: boolean; compact: boolean }) {
  const terrain = useRef<SVGGElement>(null)
  const mountains = useRef<SVGGElement>(null)
  const foreground = useRef<SVGGElement>(null)
  const sky = useRef<SVGGElement>(null)
  const rays = useRef<SVGGElement>(null)
  const stratus = useRef<SVGGElement>(null)
  const framing = useRef<SVGGElement>(null)
  const contactMist = useRef<HTMLDivElement>(null)
  const readingMist = useRef<HTMLDivElement>(null)
  const illustration = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const update = () => {
      const camera = ridgeCamera(progress.current, motion)
      const position = motion ? progress.current : Math.round(progress.current)
      const contactBlend = Math.max(0, Math.min(1, position - 6))
      // On phones, the final clearing rests below the contact copy.
      terrain.current?.setAttribute('transform', `translate(0 ${camera.terrain + (compact ? contactBlend * 10 : 0)})`)
      mountains.current?.setAttribute('transform', `translate(0 ${camera.mountains})`)
      foreground.current?.setAttribute('transform', `translate(0 ${camera.foreground})`)
      foreground.current?.setAttribute('opacity', `${Math.max(0, 1 - progress.current)}`)
      sky.current?.setAttribute('transform', `translate(0 ${camera.sky})`)
      rays.current?.setAttribute('transform', `translate(0 ${camera.sky})`)
      stratus.current?.setAttribute('transform', `translate(0 ${camera.terrain * .3})`)
      framing.current?.setAttribute('transform', `translate(0 ${camera.foreground})`)
      framing.current?.setAttribute('opacity', `${.2 * Math.max(0, 1 - progress.current * 2)}`)
      // Reduce the reading veil by 45% around the workshops, preserving arrival's contrast.
      const workshopBlend = Math.max(0, 1 - Math.abs((motion ? progress.current : Math.round(progress.current)) - 1))
      readingMist.current?.style.setProperty('opacity', `${(1 - workshopBlend * .45) * (1 - contactBlend)}`)
      readingMist.current?.style.setProperty('--mist-width', `${100 - workshopBlend * 26}%`)
      contactMist.current?.style.setProperty('opacity', `${contactBlend}`)
      const workFraming = Math.max(0, Math.min(1, position, 5 - position))
      illustration.current?.setAttribute('viewBox', compact ? `${490 + workFraming * 240 + contactBlend * 215} 0 950 900` : '0 0 1440 900')
    }
    update()
    window.addEventListener('valley-progress', update)
    return () => window.removeEventListener('valley-progress', update)
  }, [progress, motion, compact])

  return <div className={styles.landscape} data-motion={motion ? 'on' : 'off'}>
    <svg ref={illustration} viewBox={compact ? '490 0 950 900' : '0 0 1440 900'} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ridge-sky" x2="0" y2="1"><stop stopColor="var(--ridge-sky-top)" /><stop offset="1" stopColor="var(--ridge-sky-bottom)" /></linearGradient>
        <linearGradient id="ridge-rock" x2=".8" y2="1"><stop stopColor="var(--ridge-rock)" /><stop offset="1" stopColor="var(--ridge-rock-dark)" /></linearGradient>
        <linearGradient id="ridge-trail-fade" gradientUnits="userSpaceOnUse" x1="0" y1="3060" x2="0" y2="3150"><stop stopColor="white" /><stop offset="1" stopColor="black" /></linearGradient>
        <linearGradient id="ridge-trail-edge-fade" gradientUnits="userSpaceOnUse" x1="0" y1="2970" x2="0" y2="3110"><stop stopColor="white" /><stop offset="1" stopColor="black" /></linearGradient>
        <mask id="ridge-trail-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="3760"><path d="M0 0H1440V3760H0Z" fill="url(#ridge-trail-fade)" /></mask>
        <mask id="ridge-trail-edge-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="3760"><path d="M0 0H1440V3760H0Z" fill="url(#ridge-trail-edge-fade)" /></mask>
        <radialGradient id="ridge-sun"><stop stopColor="var(--ridge-sun)" stopOpacity=".3" /><stop offset="1" stopColor="var(--ridge-sun)" stopOpacity="0" /></radialGradient>
        {['far', 'middle', 'near'].map((tier, i) => <linearGradient key={tier} id={`ridge-depth-${tier}`} gradientUnits="userSpaceOnUse" x1="0" y1={220 + i * 150} x2="0" y2={730 + i * 140}><stop stopColor={`var(--ridge-${tier})`} /><stop offset="1" stopColor="var(--ridge-haze)" /></linearGradient>)}
        <radialGradient id="ridge-rays">
          <stop stopColor="var(--ridge-ray)" stopOpacity=".28" /><stop offset=".28" stopColor="var(--ridge-ray)" stopOpacity=".18" /><stop offset=".58" stopColor="var(--ridge-ray)" stopOpacity=".065" /><stop offset="1" stopColor="var(--ridge-ray)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ridge-cloud-vapor"><stop stopColor="var(--ridge-cloud)" stopOpacity=".8" /><stop offset=".32" stopColor="var(--ridge-cloud)" stopOpacity=".55" /><stop offset=".7" stopColor="var(--ridge-cloud)" stopOpacity=".16" /><stop offset="1" stopColor="var(--ridge-cloud)" stopOpacity="0" /></radialGradient>
        <radialGradient id="ridge-lantern-glow"><stop stopColor="#ffda8e" stopOpacity=".4" /><stop offset="1" stopColor="#ffda8e" stopOpacity="0" /></radialGradient>
        <radialGradient id="ridge-stratus"><stop stopColor="var(--ridge-cloud)" stopOpacity=".3" /><stop offset=".4" stopColor="var(--ridge-cloud)" stopOpacity=".2" /><stop offset="1" stopColor="var(--ridge-cloud)" stopOpacity="0" /></radialGradient>
        <pattern id="ridge-weave" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 2H10M2 0V10" stroke="var(--ridge-mat-thread)" strokeWidth=".5" opacity=".35" /></pattern>
        <g id="ridge-blossom"><path d="M-6 0C-30-7-16-23 0-9C13-27 30-12 13 1C31 11 15 26 2 12C-10 29-28 14-6 0" fill="var(--ridge-blossom-light)" /></g>
      </defs>
      <path fill="url(#ridge-sky)" d="M0 0H1440V900H0Z" />
      <g ref={sky}>
        <circle cx="1090" cy="210" r="215" fill="url(#ridge-sun)" />
        <circle cx="1090" cy="210" r="42" fill="var(--ridge-sun)" />
        <g className={styles.clouds}>
          <Cloud x={711} y={179} scale={.85} />
          <Cloud x={1245} y={129} scale={1.05} delay="-11s" />
          <Cloud x={881} y={280} scale={.65} delay="-23s" />
        </g>
        <g fill="none" stroke="var(--ridge-far)" strokeWidth="1.6" strokeLinecap="round"><path d="M959 253q7-6 13 0q7-7 13-2M995 238q5-5 10 0q5-6 11-1M1027 262q4-4 8 0q4-5 9-1M931 274q4-4 8 0q4-5 9-1" /></g>
      </g>
      <g ref={mountains}>
        <path d="M0 466L118 354L196 391L360 235L450 336L541 263L648 369L805 221L867 309L930 248L1115 442L1270 272L1440 424V1400H0Z" fill="url(#ridge-depth-far)" />
        <path d="M291 310L360 235L427 309L378 293L358 268L334 298ZM736 290L805 221L866 309L822 281L800 252L781 279Z" fill="var(--ridge-snow)" opacity=".6" />
        <path d="M0 537L185 431L267 474L421 375L555 521L711 409L810 490L946 368L1090 478L1220 407L1440 556V1400H0Z" fill="url(#ridge-depth-middle)" />
        <path d="M421 375L380 595L555 521ZM946 368L901 650L1090 478Z" fill="var(--ridge-far)" opacity=".45" />
        <path d="M0 666Q185 477 327 554T594 618Q704 483 815 566T1050 574Q1240 434 1440 645V1500H0Z" fill="url(#ridge-depth-near)" />
        <path d="M0 730Q354 593 648 690T1440 623V1500H0Z" fill="var(--ridge-mist)" opacity=".42" />
        <path d="M459 689Q602 616 733 667T969 668" fill="none" stroke="var(--ridge-near)" strokeWidth="2" opacity=".16" />
        <g opacity=".24" style={{'--ridge-pine':'var(--ridge-near)', '--ridge-pine-light':'var(--ridge-near)'} as CSSProperties}>
          {[[655,625,.26],[680,615,.34],[706,618,.22],[844,655,.28],[874,662,.4],[907,659,.27],[937,645,.33],[979,642,.24]].map(([x,y,scale],i) => <Pine key={i} x={x} y={y} scale={scale} />)}
        </g>
        {[ [726, 579, .3], [762, 598, .4], [1200, 560, .5], [1285, 587, .65], [1324, 573, .4], [632, 641, .5], [563, 636, .4] ].map(([x,y,s],i) => <Pine key={i} x={x} y={y} scale={s} />)}
      </g>
      {/* Feathered light volumes fade across their width and length, with no triangle edges. */}
      <g ref={rays} className={styles.sunRays} fill="url(#ridge-rays)">
        <g transform="translate(1090 215)">
          <ellipse className={styles.rayVeil} cx="0" cy="250" rx="65" ry="315" transform="rotate(39)" />
          <ellipse className={styles.rayVeil} cx="0" cy="232" rx="37" ry="285" transform="rotate(19)" style={{ animationDelay: '-8s' }} />
          <ellipse className={styles.rayVeil} cx="0" cy="215" rx="46" ry="270" transform="rotate(-11)" style={{ animationDelay: '-17s' }} />
        </g>
      </g>
      <g ref={stratus} fill="url(#ridge-stratus)">
        <g className={styles.stratus}><ellipse cx="894" cy="420" rx="223" ry="23" /><ellipse cx="1199" cy="515" rx="168" ry="18" /></g>
        <g className={styles.stratusSlow}><ellipse cx="628" cy="531" rx="180" ry="19" /><ellipse cx="890" cy="610" rx="155" ry="16" /></g>
      </g>
      <g ref={terrain}>
        {/* The ridge grows out of the right-hand mountainside and opens into the final meadow. */}
        <path d="M1440 460C1300 456 1327 540 1200 562C1116 558 1095 581 995 580L878 632L820 689L908 766C1102 804 1103 912 1068 987C987 1110 856 1190 900 1336C945 1490 1168 1543 1161 1960C1152 2140 851 2189 876 2380C899 2560 1164 2591 1150 2749C1140 2907 1006 3024 861 3127Q596 3315 0 3400V3760H1440Z" fill="url(#ridge-rock)" />
        <path d="M1440 491C1287 482 1312 557 1196 582L999 608L884 650L842 686L925 741C1103 783 1166 912 1095 1020C986 1184 911 1202 943 1321C987 1487 1218 1539 1194 1980C1174 2161 901 2223 921 2378C938 2540 1220 2590 1188 2772C1160 2930 1030 3015 907 3147Q600 3350 0 3450V3760H1440Z" fill="var(--ridge-grass)" />
        {/* Facets give the grounded cliff depth, without separate island bases. */}
        <path d="M878 632L820 689L908 766L1005 858L955 722ZM1095 1020L1068 987L933 1181L943 1321L1010 1160ZM1194 1980L1161 1960L876 2310L921 2378L996 2256" fill="var(--ridge-rock-dark)" opacity=".5" />
        <path d="M1440 604Q1314 586 1220 644T1073 661Q949 652 957 692C965 726 1131 753 1188 823S1196 978 1098 1090S1002 1236 1046 1321S1254 1467 1287 1576S1238 2063 1110 2145S974 2289 1012 2388S1292 2577 1283 2691C1278 2848 1110 2964 1108 3077Q1109 3115 1150 3132" fill="none" stroke="var(--ridge-path-edge)" strokeWidth="34" strokeLinecap="round" mask="url(#ridge-trail-edge-mask)" />
        <path d="M1440 604Q1314 586 1220 644T1073 661Q949 652 957 692C965 726 1131 753 1188 823S1196 978 1098 1090S1002 1236 1046 1321S1254 1467 1287 1576S1238 2063 1110 2145S974 2289 1012 2388S1292 2577 1283 2691C1278 2848 1110 2964 1108 3077Q1109 3115 1150 3132" fill="none" stroke="var(--ridge-path)" strokeWidth="25" strokeLinecap="round" mask="url(#ridge-trail-mask)" />
        {/* A woven mat lies directly on the grass, just above the trail. */}
        <g>
          <path d="M972 625L1103 595L1183 633L1042 669Z" fill="var(--ridge-shadow)" opacity=".15" />
          <g transform="matrix(1 -.23 .95 .44 975 616)">
            <path d="M0 4H134V78H0Z" fill="var(--ridge-shadow)" opacity=".25" />
            <path d="M0 0H134V74H0Z" fill="var(--ridge-mat)" />
            <path d="M0 0H134V74H0Z" fill="url(#ridge-weave)" />
            <path d="M0 10H134M0 64H134" stroke="var(--ridge-mat-stripe)" strokeWidth="5" />
            <path d="M15 0V74M119 0V74" stroke="var(--ridge-mat-thread)" strokeWidth="3" opacity=".7" />
            {Array.from({length:18},(_,i) => <path key={i} d={`M${i*7.5} 0v-5M${i*7.5} 74v5`} stroke="var(--ridge-mat)" strokeWidth="1.5" />)}
          </g>
          <ellipse cx="1061" cy="625" rx="47" ry="10" fill="var(--ridge-shadow)" opacity=".18" />
          {/* Mirror the approved artwork so the laptop faces into the page. */}
          <image href="/images/arrival/seated-sikh-2d.webp" x="-1120" y="488" width="118" height="151" transform="scale(-1 1)" />
          <g transform="translate(1140 630)">
            <ellipse cy="4" rx="13" ry="4" fill="var(--ridge-shadow)" opacity=".2" />
            <path d="M7-13C22-17 21-1 9-3" fill="none" stroke="var(--ridge-mat)" strokeWidth="3" />
            <path d="M-8-14H9L7 1Q0 7-7 1Z" fill="var(--ridge-mat)" />
            <ellipse cy="-14" rx="8" ry="3" fill="var(--ridge-trunk)" />
            <path className={styles.mugSteam} d="M-2-21C-10-28 5-31-1-39M5-24C1-29 12-34 7-40" fill="none" stroke="var(--ridge-cloud)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <g fill="var(--ridge-blossom)">{[[995,640,20],[1093,646,-24],[1167,641,40],[1130,664,-20],[1175,600,15],[1202,628,-35],[1010,658,20]].map(([x,y,r],i) => <ellipse key={i} cx={x} cy={y} rx="3.5" ry="1.6" transform={`rotate(${r} ${x} ${y})`} />)}</g>
          <ellipse className={styles.lanternPool} cx="1133" cy="624" rx="139" ry="45" fill="url(#ridge-lantern-glow)" />
        </g>
        {/* Broad, asymmetric blossom canopy. */}
        <g>
          <path d="M1198 614C1185 552 1193 496 1169 447L1130 407L1138 400L1181 433L1192 390L1200 391L1196 459L1228 429L1270 419L1274 428L1237 441L1203 489L1216 614Z" fill="var(--ridge-trunk)" />
          <path d="M1070 420C1009 405 1037 364 1071 363C1067 320 1108 313 1138 329C1153 279 1212 293 1224 319C1261 296 1300 322 1291 346C1355 332 1392 376 1356 403C1387 438 1332 457 1300 441C1274 468 1236 451 1214 439C1170 465 1126 449 1124 432C1106 445 1081 440 1070 420Z" fill="var(--ridge-blossom)" />
          <path d="M1049 375C1055 358 1081 361 1095 366C1077 330 1122 315 1143 341C1154 299 1205 308 1214 337C1255 307 1290 337 1271 361C1319 346 1351 374 1343 390C1299 378 1272 399 1246 386C1223 408 1184 398 1166 384C1127 407 1095 385 1049 375Z" fill="var(--ridge-blossom-light)" />
          {[[1104,380,.35],[1177,352,.35],[1248,375,.4],[1308,413,.3],[1151,422,.3]].map(([x,y,s],i) => <use key={i} href="#ridge-blossom" transform={`translate(${x} ${y}) scale(${s})`} />)}
          <circle className={styles.lanternPool} cx="1226" cy="494" r="54" fill="url(#ridge-lantern-glow)" />
          <path d="M1226 450V482" stroke="var(--ridge-trunk)" strokeWidth="2" /><rect x="1218" y="482" width="16" height="23" rx="3" fill="var(--ridge-window)" stroke="var(--ridge-trunk)" strokeWidth="3" />
        </g>
        <g className={styles.petals} fill="var(--ridge-blossom)"><ellipse cx="1145" cy="487" rx="4" ry="2" transform="rotate(25 1145 487)" /><ellipse cx="1285" cy="521" rx="3" ry="5" /><ellipse cx="1108" cy="551" rx="4" ry="2" /></g>
        <g className={styles.fireflies} fill="var(--ridge-window)">{[[1120,570],[1260,550],[975,602],[1300,476],[1158,525]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2.5" />)}</g>
        <Pine x={1382} y={585} scale={1.55} /><Pine x={1343} y={626} scale={.8} />
        <WorkshopRiver />
        <Pine x={1400} y={879} scale={1.2} /><Pine x={1324} y={834} scale={.8} />
        <TimberWorkshop /><Pine x={1480} y={1095} scale={1.45} />
        <OpenObservatory />
        <Pine x={1338} y={1244} scale={1.4} /><Pine x={1385} y={1287} scale={.8} />
        <TradeOutpost />
        {/* Gorge and its stone bridge. */}
        <path d="M1440 2125C1359 2101 1316 2137 1273 2168S1113 2236 996 2250L885 2295L911 2355C1054 2288 1197 2292 1305 2224S1390 2183 1440 2201Z" fill="var(--ridge-rock-dark)" />
        <path d="M1091 2115L1172 2145V2280L1150 2289V2233C1150 2209 1121 2199 1121 2225V2301L1091 2310Z" fill="var(--ridge-wall-shade)" />
        <path d="M1081 2113L1098 2103L1183 2136L1172 2154Z" fill="var(--ridge-path)" />
        <path d="M1086 2103L1177 2137M1086 2093L1177 2127" fill="none" stroke="var(--ridge-wall)" strokeWidth="6" />
        <Pine x={1301} y={2411} scale={1.7} /><Pine x={1400} y={2454} scale={1.1} /><Pine x={1244} y={2431} scale={.8} />
        <FloralHaven />

      </g>
      <g ref={foreground}>
        <path d="M0 812Q124 717 229 805T433 900H0Z" fill="var(--ridge-foreground)" />
        <g style={{'--ridge-pine':'var(--ridge-foreground)', '--ridge-pine-light':'var(--ridge-foreground)'} as CSSProperties}><Pine x={-10} y={900} scale={1.8} /><g opacity=".48"><Pine x={128} y={848} scale={.85} /><Pine x={204} y={889} scale={1.1} /></g><Pine x={1437} y={955} scale={2.1} /></g>
      </g>
    </svg>
    <div ref={readingMist} className={styles.readingMist} />
    <div ref={contactMist} className={styles.contactMist} />
    <svg className={styles.cornerPines} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g ref={framing} opacity=".2"><Pine x={105} y={862} scale={.85} /><Pine x={179} y={901} scale={1.05} /></g>
    </svg>
  </div>
}
