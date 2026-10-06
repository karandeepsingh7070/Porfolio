# Portfolio direction: from the ridge to the valley

Revised 5 October 2026. This direction supersedes the architectural route documented below.

## Current experience

A continuous, illustrated mountainside replaces the active WebGL presentation. Arrival looks across layered mountains from a picnic overlook on the grassy ridge. The existing Sikh character sits with a laptop beneath a blossom tree. A visible winding trail connects the overlook to workshops, woodland terraces, a gorge bridge, a sheltered garden and a lakeside cabin.

The palette is warm mist, sage terrain, blue-green atmospheric mountains and restrained blossom pink. Nightfall lights the same landscape with warm windows, a hanging lantern and fireflies; it does not replace the vegetation. The interface uses the existing Bricolage Grotesque / Outfit / JetBrains Mono typography, a translucent fixed header and an altitude readout.

## Picnic overlook and atmospheric depth — 5 October

The arrival deck is replaced by a cream woven mat with rust and sage stripes, fringe, a contact shadow, a steaming mug and scattered fallen petals. The existing character artwork is mirrored to face the content. A warm radial lantern pool lights the character and mat in nightfall; the hanging lantern has a matching halo.

Each mountain tier now uses its own vertical atmospheric gradient. Slow stratus ribbons move at 0.3 times the terrain's descent, distinct from the farther mountains. Three feathered sunlight volumes, birds near the valley pass and low-contrast pine silhouettes add depth. Clouds use overlapping radial wisps with transparent edges; both clouds and rays dissolve slowly with staggered opacity cycles. The rays follow the same scroll transform as the sun, and mountain mist ribbons fade radially without hard ellipse tips. All ambient motion observes the existing motion preference.

The previous desktop text-shaped mist panel is removed. A single broad scene-wide gradient lets the mountains fade into the page background. Darker daylight copy and brighter nightfall copy preserve a calculated worst-case contrast of 7.83:1 and 7.86:1 respectively across the desktop hero reading width. Mobile retains a softly tapered reading veil sized to its content, with the picnic vignette placed below it. Heading leading remains 1.15, and the glass header, chapter indicator and motion-aware CTA remain.

The miniature hero cottage and river ribbons remain removed. The walking trail provides the continuous route to the larger workshop cottages; the final lake remains.

## Open library and riverside outpost — 6 October

Open-source work shares a stone observatory on a raised reading deck, with parchment, books, a brass telescope and a radio mast. Overwatch TS and the expanded developer tools light signpost 01 and the mast; LLM Recall lights signpost 02 and the archive chest under the deck. Selection follows scrolling, pointer hover and keyboard focus, and excludes collapsed tool entries. The generic houses at those stops are removed.

A separate freelance stop introduces a riverside shop with a striped awning, hanging signage, lanterns, indoor silhouettes and dock crates. Its copy describes general services until specific client case studies are supplied. The lower river broadens and its current moves more slowly. The downstream terrain and camera stops extend together to retain the bridge, garden and lake framing.

Landmarks remain fully opaque throughout scrolling: there are no section-triggered structure fades or visibility switches. Physical spacing and camera movement create the transitions. The outdoor kiosk sits closer to the broadcast workshop. Mobile framing follows all work landmarks, and reduced motion and the motion toggle stop pulse/current animations. Preview images have rounded inset frames, thin borders and quiet shadows; technology lists use discrete, theme-aware pills.

## Movement and reading

### Section 02 — timber workshop and watermill

Selected work now centers on a timber studio beside a narrow millrace. The pitched green roof, exposed framing, lit workshop windows, porch bench, stacked logs and slowly turning waterwheel extend the ridge's existing SVG illustration. A broadcast antenna represents Monumental Sports Network; a smaller open-air field station with a screen and lantern represents My Outdoor TV. Both sit beside the original uninterrupted walking path, behind the foreground pines.

Numbered wooden posts match the two project cards. Hover and keyboard focus select a landmark; otherwise the card nearest the viewport center controls the highlight, including on reverse scroll. The cards retain ordinary external links and server-rendered content, with translucent surfaces, readable technology pills and callouts backed by the existing project descriptions. The scene is decorative and does not add inaccessible SVG controls.

The reading mist loses 45% opacity around the workshop chapter and returns to its original strength at adjacent stops. The departing arrival foreground fades away before it can expose a hard lower edge. On phones the camera frames the workshop farther to the right; cards retain stronger surfaces for contrast. Daylight and nightfall share the same illustration. Motion off and reduced motion stop the waterwheel, stream and signal animation and retain still chapter framing.

`TimberWorkshop.tsx` owns the illustrated settlement. `WorkshopContext.tsx` coordinates cards and landmarks without rebuilding the landscape on every scroll frame. No dependencies or generated bitmap assets were added.

The workshop refinement moves post 01 down-left clear of the porch, gives both signboards the timber scene's 14-degree perspective and grounded shadows, and sets post 02 apart from the field station. The millrace bends through the wheel's lower paddle arc, with a foreground water lip and foam at contact. Three staggered wave arcs expand from the dish feed; motion off and reduced motion retain still arcs. The desktop reading veil narrows by 18% at the workshop stop and returns to its original width at adjacent chapters, revealing more central hills and pines without changing the mobile reading veil.

The mountain-mill revision gives the cabin a steeper slate roof with staggered shingles, deeper eaves, a fieldstone footing and chimney, shutters, a planter and a warm porch lantern. A narrow porch meets irregular stone steps; ferns, mossy stones and an uneven grassy bank connect the structure to the hill. The smaller broadcast mast and waterwheel retain the project identity. All additions use the existing illustration palette and motion controls.

The subsequent card pass uses defined white translucent technology pills with green borders, white numbers on teal badges in both themes, a close emerald-tinted shadow on active cards, and a single vertically centered footer row. The workshop mist width is now 74% of the viewport (26% narrower than the original), with adjacent chapters and mobile retaining their original veil widths.

The settlement layout now clears the approach: post 01 sits up-left of the cabin grounds, and the kiosk occupies its own downhill clearing with post 02. The generic cabin directly below that stop is removed. A masonry abutment supports the waterwheel axle; the wheel and millrace shift together to the right, and the stacked logs and nearby loose props are removed. The door lantern moves left of the frame. The original roof and chimney stay, with two staggered broadcast arcs.

A new bench-seated pose of the approved Sikh character works on a laptop beneath the porch window, facing the valley. The scene supplies a timber bench, wider porch deck, side table and mug, plus a cable to a small wall-mounted power box. The transparent character asset and exact built-in ImageGen prompts are recorded in `design/workshop/character-prompt.md`; the source is preserved alongside it and a 35 KiB WebP is served from `public/images/workshop/porch-character.webp`.

`RidgeLandscape.tsx` authors a single SVG landscape. `ridge-camera.ts` evaluates chapter positions directly with eased descents, slower background mountains and faster foreground silhouettes. Existing DOM section measurements preserve reading rests and adapt to expanded case studies. Reversing scroll and anchor jumps reconstruct the same scene, without accumulated animation state. Ambient clouds, smoke, petals and fireflies use CSS animation.

Text stays on a consistent left reading edge. A broad mist gradient protects its contrast without a rectangular desktop panel. On phones the hero puts text above the overlook, and subsequent sections use translucent reading surfaces. Motion off and reduced motion disable ambient animation and show still chapter compositions. No WebGL or new runtime dependencies are loaded by the active journey.

## Soundtrack — 6 October

Optional lo-fi piano accompanies the walk. It starts off; the visitor turns it on from the journey bar beside the motion toggle, and the choice is remembered. Browsers block sound before an interaction, so a returning listener's music resumes on their first click or key press. Music fades out and pauses while the tab is hidden and fades back in on return.

Tracks play in shuffled rounds without immediate repeats. Each plays a 70–150 second stretch (at most 60% of the track) that begins at least 12% into it, so the opening bars are rarely heard. Consecutive stretches overlap in a 7-second equal-power crossfade; the 15-second cue plays whole with proportionally shorter fades, and skipping crossfades in 2.5 seconds. Two streaming media elements feed Web Audio gain nodes (iOS ignores `audio.volume`), and only the portion being heard is downloaded. Nothing loads until sound is first turned on.

The control has no artwork: three small level bars (still when motion is off), the title in ink and the artist in the muted tone, inside a fixed-width label so the bar does not shift between tracks. On phones the bar shows only the level bars; each new track is named for six seconds in a note stacked above the scene caption. The contact footer credits every artist and links the Pixabay profiles.

Source MP3s were loudness-matched to −18 LUFS (true peak −1.5 dBTP, linear two-pass `loudnorm`) and encoded as 128 kbps AAC in fast-start M4A in `public/audio/`, about 14 MB in total.

## Files and checks

- `RidgeLandscape.tsx` and `RidgeLandscape.module.scss`: connected terrain, illustrated landmarks and atmospheric themes.
- `ridge-camera.ts`: bounded, deterministic parallax and altitude.
- `ValleyJourney.tsx`: measured document progress, direct navigation, theme and motion controls.
- `PortfolioContent.tsx`: existing project evidence with updated chapter labels and hero copy.
- `Soundtrack.tsx`, `soundtrack-player.ts` and `soundtrack-plan.ts`: the journey-bar control, two-deck crossfading player and pure stretch/shuffle/fade planning; tracks are listed in `src/data/soundtrack.ts`.
- `npm run test:soundtrack`: served files, mid-track stretches, short cues, shuffle rounds and equal-power fades.
- `npm run test:ridge`: descent continuity, depth ordering, static chapter positions, anchors, disclosure-height changes, scroll reversal and bounds.

The previous 3D components and source assets are retained as inactive design history. The active page no longer imports `WorldScene`, `ValleyPoster` or `ForestRain`.

---

# Historical direction (superseded)

# Portfolio direction: a walk through Still

Revised 4 October 2026, on `codex/monument-valley-portfolio`.
This supersedes the rejected Circuit Valley concept and its repeated floating platforms.

## Design read

A developer portfolio for people reviewing Karan's work, using the quiet architectural language of the user's Still game. The landscape is a traversable place. Scroll takes the visitor along its paths; readable project evidence accompanies the journey.

Design variance 7, motion intensity 6, visual density 3. Custom architecture with the existing Next.js, SCSS and typography, without a component design system.

## Reference audit

Reference folder: `/Users/nexg/Desktop/Learning/Games` (saved project: Still).
Inspected its source and the running Tidal Sanctuary and Last Observatory in the browser.

The useful reference is the game itself, particularly `web/game.js`, rather than just the atlas thumbnails:

- `block()` gives long piers recessed faces, footings, capital bands, consistent face shading and engraved walkable stones.
- `drawSanctuary()` uses an open pavilion with slender pilasters, a recessed portal and a layered, coloured cornice.
- `tree()` and `flowerTree()` create distinct cypress and flowering silhouettes that establish scale.
- `web/engine.js` describes routes as nodes, bridges, different elevations and moving platforms. The Suspended Library and Rainwood Canopy demonstrate elevation changes.
- `web/journey-map.js` connects recognisable landmarks in a winding route.

Still uses a Canvas2D isometric projection. This portfolio adapts its architectural proportions into genuine Three.js geometry, with an orthographic camera. It does not embed the game, import gameplay state, or require visitors to solve puzzles.

## What was wrong with the first version

The first attempt repeated the same broad plinth seven times, put a different oversized arch on each, and moved sideways along equal spacing. That made the landscape feel like display stands. The architecture lacked Still's narrow walkways, tall recessed supports and fine material detail. A permanent text/illustration split reinforced that separation.

The replacement authors the path and its supports together. It uses irregular distances, turns, elevation changes and different spatial arrangements. The background canvas spans the viewport; the composition reserves negative space for text, changing sides at two deliberate stops.

## The scrolling experience

One area dominates at a time. Arrival opens the portfolio. The next part of the route enters the frame during a crossing; previous architecture remains at the edge before leaving the camera view. The complete route appears only in the final pullback.

| Reading stop | Architecture | Movement onward |
| --- | --- | --- |
| Arrival | Cherry blossom picnic terrace and a rural cottage with a tiled roof and chimney | A stationary character works on his laptop; the camera follows a permanently connected stone path onward |
| Platforms in production | An open court followed by a long colonnade | The path turns through the gallery toward the next garden arms |
| Overwatch TS | A crossing with gardens on separate slender supports | Travel along the path, then ride a brass lift to the upper level |
| LLM Recall API | A narrow, taller reading pavilion with recessed opening | Follow the upper causeway and turn toward the ascent |
| Experience | A sequence of stepped buttresses beneath the path | A second lift carries the route to the garden level |
| About | A roofless planted court, bench, shallow rill and flowering tree | Follow a short descending-in-frame turn toward the final outlook |
| Contact | An open belvedere with two garden edges | Pull back to reveal the completed route |

The buildings provide atmosphere and spatial landmarks. Project titles, actual screenshots, responsibilities, links and case-study details explain the engineering. There are no invented usage metrics or obligatory software-shaped buildings.

## Material and scale rules

- One walkable stone is about one world unit wide and 0.24 units thick.
- Main landings begin at height 3 and rise through 5 to 7; supports extend down to a common water plane.
- Paths are narrow. Gardens and small pavilions widen locally; there is no shared island-sized base.
- Ivory paving, sage stone, blue reflected shadow, teal roofs, restrained brass trim, pink flowering trees.
- Consistent light direction and orthographic projection establish volume. Inset facade panels, cornice bands, tile rims and tiny tesserae give close views detail.
- Cypress trees are tapered organic profiles. Flowering canopies use clustered matte forms.
- A stationary Sikh character establishes scale. Arrival uses the approved bearded character with a turban covering his ears, seated on a mat with a laptop. Further character instances will be authored one section at a time.

## UI and reading

Existing type families and portfolio content stay. The header provides direct Work, Experience, About, Contact and Resume access. The bottom rail indicates progress and exposes motion control.

On desktop, text occupies roughly a third of the viewport, protected by a page-coloured reading field. Overwatch and Experience read on the right, accompanied by a corresponding change in camera composition. The architecture can extend behind the document and toward viewport edges.

On mobile, a compact fixed scene band leaves a full-width reading area below. Tall descriptions increase real document height. Case study disclosures are ordinary accessible HTML. All project links, contact actions and navigation work without clicking 3D geometry.

Motion off and reduced motion show a static SVG derived from the new masonry data for the current chapter. The old floating-island poster has been replaced. Short mobile landscape screens prioritize the document.

## Implementation

- `still-architecture.ts`: authored masonry, gardens, plants, portals and physical connections. Static blocks are collected by material and rendered through instancing.
- `WorldScene.tsx`: actual 3D masonry, trees, portals, water rings, lifts, traveller, lighting and camera.
- `journey-math.ts`: explicit 3D route nodes, axis-aligned path interpolation and mapping from measured document bounds.
- `ValleyJourney.tsx`: document progression, navigation, theme and motion preference, lazy WebGL loading and error fallback.
- `ValleyPoster.tsx`: static architecture from the same source data.
- `PortfolioContent.tsx`: server-rendered portfolio evidence and links.

The route bends in world space. The camera follows the route while character instances stay at their structures. Existing lifts still derive their height from the route evaluation. Scroll reversal and anchor jumps evaluate the state directly.

The camera interpolates position, composition and orthographic zoom independently of the walking path, with reading rests derived from DOM bounds. Resize and details expansion recalculate those bounds. Rendering is demand-driven; movement does not cause React updates on every frame. DPR is capped and repeated masonry is instanced. No new dependency was needed for this revision.

## Validation and remaining limits

Route checks cover all endpoints, continuous movement through corners/elevations without bridge waits, reverse scroll, anchors and expanded content bounds. TypeScript, lint, production build, and browser review are performed as part of delivery.

This is a procedural architectural implementation, not a commissioned 3D asset pack. Further art direction can refine individual silhouettes. Device-specific GPU performance has not been measured on physical phones. The scope is a local branch; nothing has been published.

## Dusk: Rainwood Canopy

The user's follow-up selects Still's forest chapter for dusk. Its moss, malachite and aged-brass palette now drives a deep-green page, damp stone, green roofs, palms, hanging vines and muted golden blossoms. Daylight uses the complementary Garden of Echoes palette described below. Both modes share the same route and preserve scroll position.

Rain is a separate transparent 2D canvas over the world, inspired by Still's `drawWeather()` and `effects.js`: layered diagonal streaks and quiet rainfall rings. This avoids redrawing the 3D scene continuously while idle. It uses 115 drops on desktop and 48 on mobile, caps pixel density, and cancels its animation loop when the tab is hidden. Motion off, reduced motion and scene failure remove the rain canvas. Static views retain the forest palette and palm silhouettes.

## Daylight: Garden of Echoes

Light mode takes its theme from Still's opening chapter (`web/engine.js`, `LEVELS[0]`): warm limestone `#f6e8c9`, sandstone `#dec39d`, sage reflections `#88afa0`, jade `#48a697` / `#247b70`, and terracotta blossoms `#d9906b`. A parchment page, forest-green typography, sage dividers and jade accents extend that palette into the interface. Warm daylight and green water reflections carry it through the 3D scene; the SVG fallback uses the same materials. Cypress and flowering trees give this mode a sunlit garden character alongside Rainwood Canopy's dusk atmosphere.

## Arrival refinement — under the blossoms

Arrival now has two connected masonry terraces. On the first, a stationary character sits cross-legged on a woven picnic mat, facing diagonally and using a laptop beneath a soft illustrated cherry tree. The second holds a rural plaster-and-timber cottage with staggered clay roof tiles, an inset plank door, shuttered warm windows, a brick chimney and a small smoke plume. Two illustrated orchard trees, courtyard pots, low fencing, still fallen petals and lanterns furnish the scene.

The first causeway uses paired limestone flags, fine joints, coping stones and a permanent branch into the cottage courtyard. Stone courses and restrained foundation trim replace Arrival's former tall, narrow garden piers. Later structures retain their existing design. The roaming cone-shaped traveler has been removed; future stationary instances are a separate section-by-section task.

`arrival-model.ts` owns the static layout and theme materials. `ArrivalScene.tsx` batches masonry into instanced meshes and presents the character and trees as camera-facing illustrations. `ArrivalPoster.tsx` uses the same layout and assets for motion-off, reduced-motion and failed-WebGL views, with explicit painter layers for the cottage details. No new animation loop is introduced. The first camera framing eases into the existing route without moving the character.

Following the user's style correction, the character is a simplified 2D illustration created with built-in image generation (approximately 91 KiB as WebP). The cherry tree is now an SVG adapted directly from Still's `flowerTree()` drawing: one scalloped pink silhouette, a second highlight color and four blossom marks. The orchard trees are also SVGs. Earlier detailed character and tree PNGs are retained as superseded references in `design/arrival`; the scene uses the new flat assets. See `design/arrival/README.md` for sources and exact prompts.
