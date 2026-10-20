import { useWorkshop } from './WorkshopContext'
import styles from './RidgeLandscape.module.scss'

// One continuous channel curves past the workshop and back into the forest.
const RIVER = 'M1470 796C1392 801 1374 857 1394 936S1425 1041 1398 1111S1380 1225 1470 1290'

export function Waypoint({ x, y, number, active }: { x: number; y: number; number: string; active: boolean }) {
  return <g transform={`translate(${x} ${y})`} className={styles.waypoint} data-active={active}>
    <ellipse cx="8" cy="5" rx="27" ry="8" transform="rotate(14 8 5)" fill="var(--ridge-shadow)" opacity=".16" />
    <ellipse className={styles.waypointHalo} cy="-18" rx="48" ry="54" fill="url(#ridge-lantern-glow)" />
    <path d="M-3 2V-43H4V2" fill="var(--ridge-timber-dark)" />
    <path d="M4 2L7 0V-43H4Z" fill="var(--ridge-timber-shade)" />
    <g transform="translate(0 -50) skewY(14)">
      <path d="M-22-13L-18-16H22L29-3L25 0L18-13ZM25 0L29-3L22 10L18 13Z" fill="var(--ridge-timber-shade)" />
      <path className={styles.waypointBoard} d="M-22-13H18L25 0L18 13H-22Z" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
      <text y="5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fontWeight="500" fill="var(--ridge-timber-dark)">{number}</text>
      <circle cx="-16" r="1.5" fill="var(--ridge-timber-dark)" />
    </g>
  </g>
}

/** Water sits behind the bank vegetation as well as the workshop. */
export function WorkshopRiver() {
  return <g>
    {/* The river enters and leaves beyond the hillside, with a continuous bank and current. */}
    <path d={RIVER}
      fill="none" stroke="var(--ridge-rock-dark)" strokeWidth="31" opacity=".22" />
    <path d={RIVER}
      fill="none" stroke="var(--ridge-water)" strokeWidth="23" />
    <path className={styles.streamCurrent} d={RIVER}
      fill="none" stroke="var(--ridge-mist)" strokeWidth="1.5" strokeDasharray="16 32 7 36" strokeLinecap="round" opacity=".65" />
    {/* Before the observatory, the canal bends beyond the right edge of the ridge,
        leaving a continuous building terrace through the trading outpost. */}
    <path d="M1459 1285C1495 1390 1440 1428 1445 1530S1513 1960 1445 2050S1410 2200 1460 2280L1492 2246C1462 2183 1432 2138 1480 2070S1532 1642 1475 1520S1535 1388 1481 1278Z" fill="var(--ridge-water)" stroke="var(--ridge-rock-dark)" strokeWidth="4" strokeOpacity=".18" />
    <path className={`${styles.streamCurrent} ${styles.lowerCurrent}`} d="M1470 1290C1514 1390 1453 1440 1460 1525S1525 1690 1463 2060S1435 2185 1475 2263" fill="none" stroke="var(--ridge-mist)" strokeWidth="2" strokeDasharray="23 52 9 70" strokeLinecap="round" opacity=".45" />
    <g fill="var(--ridge-rock-dark)" opacity=".55"><ellipse cx="1375" cy="912" rx="8" ry="4" transform="rotate(-18 1375 912)" /><ellipse cx="1423" cy="1086" rx="10" ry="5" transform="rotate(-24 1423 1086)" /><ellipse cx="1380" cy="1184" rx="7" ry="4" /></g>
  </g>
}

/** Authored in the same world coordinates as the unbroken ridge trail. */
export default function TimberWorkshop() {
  const { active } = useWorkshop()
  return <g data-workshop-landmark={active}>
    <g transform="translate(1275 960) scale(.9)" className={styles.mountainCabin}>
      {/* An uneven grassy bank and outcrops seat the workshop on the dry riverbank. */}
      <path d="M-147-11Q-154-34-118-42L-79-29Q-19-39 19-22L100-33Q120-26 124 2L125 28Q108 48 72 45L29 62L-53 38Q-110 38-142 16Z" fill="var(--ridge-grass-light)" />
      <path d="M-150-19L-145-38L-127-47L-109-32L-116-17Z" fill="var(--ridge-rock)" />
      <path d="M-145-38L-127-47L-129-26L-150-19Z" fill="var(--ridge-wall-shade)" />
      <ellipse cx="-8" cy="18" rx="128" ry="27" fill="var(--ridge-shadow)" opacity=".18" />
      {/* Weathered timber above a substantial fieldstone footing. */}
      <path d="M-105-112L34-79V21L-105-13Z" fill="var(--ridge-timber)" />
      <path d="M34-79L109-118V-18L34 21Z" fill="var(--ridge-timber-shade)" />
      <path d="M34-79L66-186L109-118Z" fill="var(--ridge-timber)" />
      <g fill="none" stroke="var(--ridge-timber-dark)" strokeWidth="1.3" opacity=".3">
        {[-94,-79,-64,-49,-34,-19].map(y => <path key={y} d={`M-104 ${y}l138 34l75-38`} />)}
      </g>
      <path d="M-105-36L34-2L109-41V7L34 45L-105 10Z" fill="var(--ridge-wall-shade)" />
      <path d="M34-2L109-41V7L34 45Z" fill="var(--ridge-rock)" />
      <g fill="none" stroke="var(--ridge-rock-dark)" strokeWidth="1.6" opacity=".42">
        <path d="M-105-20L34 14L109-24M-105-4L34 30L109-8M-83-30V-15M-43-21V-5M0-10V5M-65-10V5M-22 0V16M17 10V26M57-14V2M87-29V-13M72-5V11M49 22V36M95-1V14" />
      </g>
      {/* A steep slate roof with staggered shingle courses and deep protective eaves. */}
      <path d="M-130-112L-64-220L68-186L34-68Z" fill="var(--ridge-roof)" />
      <g fill="var(--ridge-roof-light)" opacity=".4">
        <path d="M-66-207L-44-202L-53-185L-76-191ZM-16-193L9-187L2-169L-25-176ZM31-160L53-154L47-135L23-142ZM-94-162L-71-155L-82-138L-106-145ZM-49-126L-21-119L-28-101L-60-109Z" />
      </g>
      <g stroke="var(--ridge-roof-light)" fill="none" opacity=".55" strokeWidth="1.5">
        <path d="M-76-200L62-164M-88-181L56-143M-100-161L50-121M-112-141L44-100M-124-121L38-79" />
        <path d="M-42-214L-52-194M-12-207L-20-186M18-199L11-178M48-191L42-170M-65-197L-77-178M-32-188L-42-169M3-179L-5-159M37-170L31-150M-64-174L-76-155M-27-165L-37-145M9-155L1-135M44-146L38-125M-91-158L-102-139M-56-149L-67-129M-20-139L-29-119M17-129L10-109M-81-131L-92-112M-44-122L-54-102M-7-112L-15-91M29-102L23-83" />
      </g>
      <path d="M-130-112L34-68V-60L-130-104Z" fill="var(--ridge-timber-dark)" />
      {/* A king-post truss follows the gable plane; the roof trim caps each joint. */}
      <g fill="none" stroke="var(--ridge-timber-dark)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="butt">
        <path d="M34-79L109-118M70-98V-170" />
        <path d="M58-132L70-98L91-140" />
      </g>
      <path d="M34-68L68-186L123-112L115-104L70-166L44-62Z" fill="var(--ridge-roof-light)" />
      <path d="M-68-221L-63-226L71-191L68-184Z" fill="var(--ridge-roof-light)" />
      <path d="M-118-103l1 10m27-3v9m28-1v9m30-1v9m29-1v9" stroke="var(--ridge-timber-dark)" strokeWidth="4" />
      {/* A low masonry chimney and soft smoke lend the cabin a lived-in silhouette. */}
      <path d="M-56-204V-254L-34-262L-19-251V-194L-34-188Z" fill="var(--ridge-wall-shade)" />
      <path d="M-34-262L-19-251V-194L-34-188Z" fill="var(--ridge-rock)" />
      <path d="M-59-254L-35-264L-16-253V-246L-35-253L-59-246Z" fill="var(--ridge-rock-dark)" />
      <path d="M-55-233L-34-240L-20-233M-55-217L-34-224L-20-217M-43-237V-222M-29-221V-201" fill="none" stroke="var(--ridge-rock-dark)" strokeWidth="1.4" opacity=".45" />
      <g className={styles.smoke} fill="none" stroke="var(--ridge-cloud)" strokeWidth="7" strokeLinecap="round"><path d="M-36-273C-48-284-22-293-34-306" opacity=".55" /><path d="M-32-318Q-43-329-32-340" opacity=".25" /></g>
      <path d="M-105-101V-35M34-61V-2M108-107V-41" stroke="var(--ridge-timber-dark)" strokeWidth="7" />
      <path d="M-103-87L-87-96M17-63L33-44" stroke="var(--ridge-timber-dark)" strokeWidth="4" />
      <path d="M-89-90L-61-83V-17L-89-24Z" fill="var(--ridge-timber-dark)" />
      <path d="M-83-81L-67-77V-48L-83-52Z" fill="var(--ridge-window)" opacity=".8" />
      <circle cx="-68" cy="-35" r="2" fill="var(--ridge-window)" />
      <path d="M-43-80L15-65V-24L-43-39Z" fill="var(--ridge-window)" stroke="var(--ridge-timber-dark)" strokeWidth="4" />
      <path d="M-24-75V-34M-4-70V-29M-43-60L15-45" stroke="var(--ridge-timber-dark)" strokeWidth="3" />
      <path d="M-56-83L-47-81V-40L-56-43ZM19-64L29-61V-21L19-24Z" fill="var(--ridge-roof)" />
      <path d="M-55-76l8 2m-8 11l8 2m-8 11l8 2M20-56l8 2m-8 11l8 2m-8 11l8 2" stroke="var(--ridge-roof-light)" strokeWidth="2" />
      <path d="M-45-35L16-20L18-10L-44-25Z" fill="var(--ridge-timber-shade)" />
      <path d="M-40-35q3-13 8-2q5-12 10 3q7-13 10 3q5-10 10 3q5-12 13 3" fill="var(--ridge-pine-light)" />
      <path d="M54-80L88-97V-65L54-48Z" fill="var(--ridge-window)" stroke="var(--ridge-timber-dark)" strokeWidth="4" />
      <path d="M71-89V-57" stroke="var(--ridge-timber-dark)" strokeWidth="3" />
      {/* A narrow porch meets irregular stone steps, rather than a freestanding platform. */}
      <path d="M-115-12L34 26L36 34L-116-4Z" fill="var(--ridge-deck)" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
      <path d="M-55 3L34 26L19 59L-73 35Z" fill="var(--ridge-deck)" />
      <path d="M-73 35L19 59V66L-73 42Z" fill="var(--ridge-timber-shade)" />
      <path d="M-61 15L29 38M-66 26L23 49" stroke="var(--ridge-timber-dark)" strokeWidth="1" opacity=".25" />
      <path d="M-112-4L-66 8L-82 19L-128 7Z" fill="var(--ridge-wall)" />
      <path d="M-128 7L-82 19V26L-128 14Z" fill="var(--ridge-rock)" />
      <path d="M-127 14L-82 26L-94 36L-140 24Z" fill="var(--ridge-wall-shade)" />
      <path d="M-140 24L-94 36V42L-140 30Z" fill="var(--ridge-rock-dark)" opacity=".65" />
      <path d="M-144 37L-117 44L-124 52L-150 45ZM-155 53L-138 58L-145 65L-161 60Z" fill="var(--ridge-wall-shade)" />
      {/* Bench-seated builder faces the valley; the doorway and steps stay clear. */}
      <ellipse cx="-22" cy="43" rx="29" ry="7" fill="var(--ridge-shadow)" opacity=".15" />
      <path d="M-35 9L13 21L27 12L-21 0Z" fill="var(--ridge-timber)" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
      <path d="M-29 11V36M10 21V48M23 14V35" stroke="var(--ridge-timber-dark)" strokeWidth="3" />
      <image href="/images/workshop/porch-character.webp" x="-48" y="-42" width="60" height="90" />
      {/* Small side table, with power routed neatly along the wall. */}
      <path d="M-62 9L-44 14L-35 8L-53 3Z" fill="var(--ridge-timber)" />
      <path d="M-58 10V29M-43 14V34" stroke="var(--ridge-timber-dark)" strokeWidth="2.5" />
      <path d="M-42 10Q-48 21-32 28L22 42Q41 42 43 21V-3" fill="none" stroke="var(--ridge-timber-dark)" strokeWidth="1.3" />
      <path d="M37-19L51-26V-4L37 3Z" fill="var(--ridge-roof)" stroke="var(--ridge-timber-dark)" strokeWidth="1.5" />
      <path d="M40-16L48-20M40-11L48-15M44-19V-7" stroke="var(--ridge-water)" strokeWidth="1" />
      <circle className={styles.lanternPool} cx="-116" cy="-57" r="34" fill="url(#ridge-lantern-glow)" />
      <path d="M-105-79h-11v13" fill="none" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
      <rect x="-120" y="-66" width="8" height="15" rx="2" fill="var(--ridge-window)" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
      {/* Broadcast mast: project 01 brings its signal to life. */}
      <g className={styles.broadcast} data-active={active === 0} transform="translate(88 -39) scale(.8)">
        <path d="M-39-181V-244M-52-215H-26M-48-229H-30M-39-204L-57-181M-39-204L-22-174" stroke="var(--ridge-timber-dark)" strokeWidth="3" fill="none" />
        <path d="M-36-225Q-14-220-7-243Q-29-250-36-225Z" fill="var(--ridge-wall)" stroke="var(--ridge-roof)" strokeWidth="2" />
        <path d="M-26-234L-12-250" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
        <circle cx="-39" cy="-247" r="4" fill="var(--ridge-window)" />
        <g transform="translate(-12 -250)">
          <g className={styles.signal} fill="none" stroke="var(--ridge-window)" strokeWidth="1.6" strokeLinecap="round">
            {[0, 1].map(wave => <path key={wave} className={styles.signalWave} d="M2-16Q15-15 17-2" vectorEffect="non-scaling-stroke" />)}
          </g>
        </g>
      </g>
      {/* Low ferns, moss and loose stones soften the junction with the hill. */}
      <g fill="var(--ridge-pine-light)">
        <path d="M-127 0Q-150-8-144-22Q-129-17-127 0Q-129-28-116-31Q-110-17-127 0Q-112-19-102-12Q-109 1-127 0Z" />
      </g>
      <path d="M-119 28l11-4l10 7l-5 7l-17-3Z" fill="var(--ridge-rock)" />
      <path d="M-113 26l7-1l5 5l-11 1Z" fill="var(--ridge-pine-light)" opacity=".7" />
    </g>
    <Waypoint x={1110} y={1005} number="01" active={active === 0} />
    {/* A modest field station borrows the open-air working detail from Concept B. */}
    <g transform="translate(1190 1090) scale(.7)" className={styles.fieldStation} data-active={active === 1}>
      <ellipse cy="12" rx="84" ry="20" fill="var(--ridge-shadow)" opacity=".15" />
      <path d="M-69-5L24 18L73-8L-14-32Z" fill="var(--ridge-deck)" />
      <path d="M-53-65V3M48-39V8" stroke="var(--ridge-timber-dark)" strokeWidth="5" />
      <path d="M-71-79L-22-101L74-77L28-53Z" fill="var(--ridge-roof)" />
      <path d="M-71-79L28-53V-43L-71-69Z" fill="var(--ridge-roof-light)" />
      <path d="M-45-24L22-7L45-20L-21-38Z" fill="var(--ridge-timber)" />
      <path d="M-38-23V0M20-7V14M37-19V-4" stroke="var(--ridge-timber-dark)" strokeWidth="4" />
      <path className={styles.fieldScreen} d="M-27-59L9-50V-24L-27-33Z" stroke="var(--ridge-timber-dark)" strokeWidth="4" />
      <path d="M-23-36L-13-46L-7-38L-1-43L5-30" fill="none" stroke="var(--ridge-mist)" strokeWidth="2" />
      <path d="M23-28L38-24L28-19L13-23Z" fill="var(--ridge-mist)" />
      <circle className={styles.stationGlow} cx="45" cy="-47" r="44" fill="url(#ridge-lantern-glow)" />
      <path d="M45-62V-51" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
      <rect className={styles.stationLantern} x="40" y="-51" width="10" height="15" rx="2" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
    </g>
    <Waypoint x={1105} y={1133} number="02" active={active === 1} />
  </g>
}
