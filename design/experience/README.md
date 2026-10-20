# The stone bridge — Experience

A compact stone footbridge spans a shallow grassy hollow with one semicircular arch. There is no river layer. The same walking path meets both bridge landings; signpost 03 marks the upper entrance. A small pair of pines and stones frame the lower bank. The illustration uses the existing day/night palette.

The three existing career entries retain their original dates and achievements. Frosted cards, a vertical thread and numbered nodes provide hierarchy. The card nearest the viewport reading line selects one of three bridge positions; keyboard focus also selects a milestone. Reverse scrolling reconstructs the selection. Motion off and reduced motion disable the crossing transition, step bob.

The walking sprite was generated with built-in ImageGen from the established arrival character. Source: `bridge-character-source.png`. Served asset: `public/images/experience/bridge-character.webp` (480px tall, WebP quality 92, alpha preserved). The generated exterior color has zero alpha; inspected against meadow green.

## Exact generation prompt

Use case: illustration-story. Create a transparent full-body sprite of the same Sikh character as the reference, preserving the exact simple flat 2D illustration style. He walks toward the lower LEFT across a mountain stone bridge (do not draw bridge), looking gently out to the left over the valley. Elevated three-quarter camera, relaxed walking stride with one foot ahead and separate articulated legs. Carry a small brown laptop messenger bag with a strap across his sage green kurta. Saffron layered turban fully covers ears, warm brown skin, rounded dark beard and moustache, ivory trousers, brown shoes, silver kara on right wrist. Friendly thoughtful expression. Broad simple flat colors, minimal facial detail, no outlines or realistic shading. Full body including shoes, no cropped limbs. Only character and bag, no scenery, no floor, no cast shadow, no halo or glow, no text. True transparent alpha right up to clean antialiased edges. Modest margins, portrait canvas, readable at 85 pixels tall.

## Geometry correction

`bridge-layout.ts` defines one isometric basis: along the deck (1, −0.5), across it (1, 0.5), with vertical height. Both ground-trail approaches stop at the shared landings; the intervening ground segment is removed. Only the deck carries the beige crossing. The 140-unit span has one 76-unit circular arch opening and a subtle ground shadow. Trees and stones frame the hillside, signpost 03 sits beside the upper landing, and the shop retains its authored position alongside the freelance heading. Cards use 16px vertical padding, 14px body type, emerald badges and aligned 26px timeline nodes.
