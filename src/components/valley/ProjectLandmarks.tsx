import { useWorkshop } from './WorkshopContext'
import { Waypoint } from './TimberWorkshop'
import styles from './RidgeLandscape.module.scss'

export function OpenObservatory() {
  const { active } = useWorkshop()
  const radio = active === 2 || (active >= 4 && active < 10)
  const archive = active === 3
  return <g className={styles.openObservatory} transform="translate(1250 1450)" data-radio={radio} data-archive={archive}>
    <ellipse cy="75" rx="153" ry="38" fill="var(--ridge-grass-light)" />
    <ellipse cx="10" cy="61" rx="125" ry="23" fill="var(--ridge-shadow)" opacity=".2" />
    {/* Raised reading deck, stone tower and shaded archive beneath. */}
    <path d="M-111 0V70M-30 23V91M111-12V58M61 12V83" stroke="var(--ridge-timber-dark)" strokeWidth="7" />
    <path d="M-109 59L-29 30M-30 81L58 17M62 75L111 15" stroke="var(--ridge-timber-shade)" strokeWidth="4" />
    <path d="M-129-12L39 28L132-18L-34-57Z" fill="var(--ridge-deck)" />
    <path d="M-129-12L39 28V37L-129-3ZM39 28L132-18V-9L39 37Z" fill="var(--ridge-timber-shade)" />
    <path d="M-105-17L44 19M-81-29L66 7M-55-40L94-5" stroke="var(--ridge-timber-dark)" strokeWidth="1" opacity=".25" />
    <path d="M-47-182Q-6-205 37-182V-26Q-5-4-47-26Z" fill="var(--ridge-wall)" />
    <path d="M-4-194Q19-192 37-182V-26Q15-12-4-13Z" fill="var(--ridge-wall-shade)" />
    <g fill="none" stroke="var(--ridge-rock)" strokeWidth="1.4" opacity=".65">
      <path d="M-46-155Q-4-137 36-155M-46-118Q-4-100 36-118M-46-81Q-4-63 36-81M-46-44Q-4-26 36-44M-22-164V-147M17-149V-130M-20-126V-109M16-112V-92M-22-90V-72M16-75V-54" />
    </g>
    <path d="M-56-183Q-56-243-6-250Q46-240 46-183Q-5-160-56-183Z" fill="var(--ridge-roof)" />
    <path d="M-6-250Q9-224 7-173Q-19-168-35-176Q-35-226-6-250Z" fill="var(--ridge-roof-light)" />
    <path d="M-58-183Q-4-160 48-183" fill="none" stroke="var(--ridge-timber-dark)" strokeWidth="5" />
    <path d="M-6-250V-262" stroke="var(--ridge-deck)" strokeWidth="3" />
    <circle cx="-6" cy="-263" r="4" fill="var(--ridge-deck)" />
    <path d="M-31-126V-145Q-18-165-7-143V-121Z" fill="var(--ridge-window)" stroke="var(--ridge-timber-dark)" strokeWidth="3" />
    <path d="M9-126V-143Q20-160 29-146V-131Z" fill="var(--ridge-window)" stroke="var(--ridge-timber-dark)" strokeWidth="3" />
    <path d="M-26-23V-65Q-9-89 7-62V-16Z" fill="var(--ridge-timber-dark)" />
    <path d="M-19-24V-59Q-10-70 0-57V-20Z" fill="var(--ridge-window)" opacity=".7" />
    {/* The shared character looks through the eyepiece, grounded on the reading deck. */}
    <ellipse cx="58" cy="-10" rx="13" ry="3" fill="var(--ridge-shadow)" opacity=".16" />
    <image href="/images/observatory/telescope-character.webp" x="45" y="-85" width="54" height="81" />
    {/* Rolled parchment and books remain readable at scene scale. */}
    <path d="M-95-32L-61-24L-70-8L-104-16Z" fill="var(--ridge-wall)" />
    <path d="M-95-32Q-88-39-84-30M-104-16Q-112-12-106-9L-76-1Q-70-1-70-8" fill="none" stroke="var(--ridge-deck)" strokeWidth="3" />
    <path d="M-94-23l19 5m-22 0l13 3" stroke="var(--ridge-timber-shade)" strokeWidth="1" />
    <path d="M-66-20l17 4v8l-17-4Z" fill="var(--ridge-roof)" />
    {/* A pulsing pub-sub mast and a lit archive mark the two projects. */}
    <g transform="translate(-82 -97)">
      <path d="M0-68V77M0 34L-17 74M0 34L17 82M-13-37H13M-10-52H10" stroke="var(--ridge-timber-dark)" strokeWidth="3" fill="none" />
      <circle cy="-71" r="4" fill="var(--ridge-window)" />
      <g className={styles.librarySignal} transform="translate(0 -71)" fill="none" stroke="var(--ridge-window)" strokeWidth="1.5">
        {[0, 1, 2].map(i => <circle key={i} className={styles.libraryPulse} r={12 + i * 12} />)}
      </g>
    </g>
    <g className={styles.archive} transform="translate(9 58)">
      <ellipse className={styles.archiveGlow} cy="9" rx="65" ry="27" fill="url(#ridge-lantern-glow)" />
      <path d="M-27-22L10-34L39-21L2-8Z" fill="var(--ridge-deck)" />
      <path d="M-27-22L2-8V22L-27 8Z" fill="var(--ridge-timber-shade)" />
      <path className={styles.archiveDoor} d="M2-8L39-21V9L2 22Z" stroke="var(--ridge-timber-dark)" strokeWidth="3" />
      <path d="M9-6V18M31-14V12" stroke="var(--ridge-deck)" strokeWidth="2" />
      <circle cx="21" cy="2" r="4" fill="var(--ridge-timber-dark)" /><path d="M21 1V7" stroke="var(--ridge-window)" strokeWidth="1.5" />
    </g>
    <path d="M-126 7L-93 15V22L-126 14ZM-135 20L-101 28V35L-135 27Z" fill="var(--ridge-wall-shade)" />
    <Waypoint x={-150} y={34} number="01" active={radio} />
    <Waypoint x={-79} y={122} number="02" active={archive} />
  </g>
}

export function TradeOutpost() {
  const { active } = useWorkshop()
  return <g className={styles.tradeOutpost} data-active={active === 10} transform="translate(1290 2010)">
    {/* Set the shop back from the trail; the signpost stays at the path junction. */}
    <g transform="translate(18 -16)">
    {/* Close earth contact follows the walls, without a separate platform. */}
    <path d="M-84-5L-68-7L27 16L88-17L99-12L95-3L36 30L15 28L-72 8L-86 3Z" fill="var(--ridge-path-edge)" opacity=".45" />
    <path d="M-75-7L29 17L91-16V-9L29 24L-75 0Z" fill="var(--ridge-rock)" />
    <path d="M29 17L91-16V-9L29 24Z" fill="var(--ridge-rock-dark)" />
    <path d="M-48-1V6M-13 7V14M57 2V9M79-10V-3" stroke="var(--ridge-rock-dark)" strokeWidth="1" opacity=".55" />
    <path d="M-75 0L29 24L91-9" fill="none" stroke="var(--ridge-shadow)" strokeWidth="2" opacity=".5" />
    <path d="M68 3L84 10L126-7L126-11L107-15Z" fill="var(--ridge-shadow)" opacity=".22" />
    <path d="M-75-115L29-91V17L-75-7Z" fill="var(--ridge-timber)" />
    <path d="M29-91L91-124V-16L29 17Z" fill="var(--ridge-timber-shade)" />
    <path d="M-90-119L-27-165L103-135L34-88Z" fill="var(--ridge-roof)" />
    <path d="M-90-119L34-88V-80L-90-111ZM34-88L103-135V-127L34-80Z" fill="var(--ridge-roof-light)" />
    <path d="M-71-105V-9M28-81V14M89-111V-16" stroke="var(--ridge-timber-dark)" strokeWidth="4" />
    <path d="M-58-78L13-61V-20L-58-37Z" fill="var(--ridge-window)" stroke="var(--ridge-timber-dark)" strokeWidth="3" />
    <path d="M-56-75L11-59V-22L-56-38Z" fill="var(--ridge-wall)" opacity=".22" />
    {/* Reuse the arrival character, with the counter concealing the seated pose. */}
    <defs>
      <clipPath id="trade-outpost-character-window">
        <path d="M-56-75L11-59V-22L-56-38Z" />
      </clipPath>
    </defs>
    <g className={styles.shopActivity} clipPath="url(#trade-outpost-character-window)">
      <image href="/images/arrival/seated-sikh-2d.webp" x="-56" y="-58" width="32" height="40" />
    </g>
    <path d="M-23-70V-28" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
    <g transform="translate(-16 -35) skewY(14.036243)" stroke="var(--ridge-timber-shade)" strokeWidth=".8">
      <path d="M0 0H11V5H0Z" fill="var(--ridge-wall)" /><ellipse cy="2.5" rx="2" ry="2.5" fill="var(--ridge-wall)" />
      <path d="M2-5H13V0H2Z" fill="var(--ridge-wall)" /><ellipse cx="2" cy="-2.5" rx="2" ry="2.5" fill="var(--ridge-wall)" />
      <path d="M16-3H24V5H16Z" fill="var(--ridge-roof)" /><path d="M18-1H22V2H18Z" fill="var(--ridge-water)" stroke="none" />
    </g>
    <path d="M-62-37L14-19L19-23L-57-41Z" fill="var(--ridge-deck)" />
    <path d="M-62-37L14-19V-16L-62-34Z" fill="var(--ridge-timber-dark)" />
    <path d="M45-62L73-77V-8L45 7Z" fill="var(--ridge-timber-dark)" /><path d="M50-58L68-68V-40L50-31Z" fill="var(--ridge-window)" />
    {/* Canvas awning, hanging shop board and lanterns. */}
    {/* A single shear keeps every canvas edge parallel to the roof's 1:4 pitch. */}
    <g transform="translate(-76 -89) matrix(1 .25 0 1 0 0)">
      <path d="M0 0H106L91 15H-15Z" fill="var(--ridge-wall)" />
      {[15, 47, 79].map(x => <path key={x} d={`M${x} 0h14l-15 15h-14Z`} fill="var(--ridge-roof-light)" />)}
      <path d="M-15 15H91V23H-15Z" fill="var(--ridge-deck)" />
    </g>
    {/* Wall plate, projecting arm and diagonal brace carry two vertical chains. */}
    <path d="M78-111V-92M78-108L112-99M78-95L100-102" stroke="var(--ridge-timber-dark)" strokeWidth="2.5" fill="none" />
    <path d="M83-106.75V-90.85M108-100.5V-85.15" stroke="var(--ridge-timber-dark)" strokeWidth="1.2" fill="none" />
    <path d="M78-92L113-84V-65L78-73Z" fill="var(--ridge-deck)" stroke="var(--ridge-timber-dark)" strokeWidth="2" />
    <path d="M85-84l20 5m-20 0l13 3" stroke="var(--ridge-timber-shade)" strokeWidth="2" />
    {/* Wall plates and braced arms carry short vertical lantern chains. */}
    {[{ x: -71, y: -25 }, { x: 28, y: -1 }].map(({ x, y }) => <g key={x} transform={`translate(${x} ${y})`}>
      <path d="M-2-31H2V-17H-2Z" fill="var(--ridge-timber-dark)" />
      <path d="M0-28L-13-31V-23M0-20L-10-30" fill="none" stroke="var(--ridge-timber-dark)" strokeWidth="2" strokeLinejoin="round" />
      <g transform="translate(-13 -3)">
      <circle className={styles.shopGlow} r="39" fill="url(#ridge-lantern-glow)" />
      <path d="M0-20V-10" stroke="var(--ridge-timber-dark)" strokeWidth="1.3" />
      <rect x="-4" y="-10" width="8" height="13" rx="2" fill="var(--ridge-window)" stroke="var(--ridge-timber-dark)" strokeWidth="1.5" />
      </g>
    </g>)}
    {[{x:80,y:1},{x:108,y:-12},{x:108,y:-31}].map(({x,y}) => <g key={y} transform={`translate(${x} ${y})`} stroke="var(--ridge-timber-dark)" strokeWidth="1.2">
      <path d="M-12-18L2-25L16-20L2-12Z" fill="var(--ridge-deck)" /><path d="M-12-18L2-12V7L-12 1Z" fill="var(--ridge-timber)" /><path d="M2-12L16-20V0L2 7Z" fill="var(--ridge-timber-shade)" /><path d="M-9-13L-1 1M5-9L13-1" fill="none" />
    </g>)}
    {/* Small tufts overlap the footing to seat it into the hillside. */}
    <path d="M-76 2l-7-9l5 2l1-7l4 10l7-3l-5 10ZM19 23l-5-8l6 3l3-6l1 9l8-4l-5 9ZM92-7l-4-7l5 3l4-7l-1 10l6-2l-6 7Z" fill="var(--ridge-pine-light)" />
    </g>
    <Waypoint x={-134} y={49} number="03" active={active === 10} />
    <g transform="translate(-134 14) matrix(1 .25 0 1 0 0)" fill="var(--ridge-deck)" stroke="var(--ridge-timber-dark)" strokeWidth="1.5">
      <path d="M-23 0H20L26 7L20 14H-23Z" /><path d="M23 20H-18L-25 27L-18 34H23Z" />
    </g>
  </g>
}
