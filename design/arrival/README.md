# Arrival — under the blossoms

The first implemented stationary character vignette. The character sits diagonally, cross-legged on a picnic mat under a cherry tree, working on his laptop. The companion terrace holds a rural cottage, a chimney, warm windows and two orchard trees.

## Files

- [Current 2D character source](./seated-sikh-2d-source.png), a flat illustrated adaptation of the seated pose, retaining the identity from [character sheet v2](../characters/sikh-boy-character-sheet-v2.png).
- [Current character delivery WebP](../../public/images/arrival/seated-sikh-2d.webp): full dimensions with alpha, encoded at quality 92 for delivery (approximately 91 KiB).
- [Still-style cherry tree SVG](../../public/images/arrival/cherry-tree-still.svg): adapted directly from the user's Still game, `web/game.js` / `flowerTree()`. A scalloped silhouette, two pink fills, four small blossom marks and a simple branching trunk. This replaces the detailed painted tree.
- [Exact ImageGen prompts](./prompts.md) and [2D character edit prompt](./character-2d.prompt.txt). Character artwork uses the built-in tool.
- Earlier detailed [character](./seated-sikh-source.png) and [painted tree](./cherry-tree-source.png) sources are retained as superseded iterations, not used by the scene.
- [Orchard tree SVG](../../public/images/arrival/orchard-tree.svg): authored vector with sage foliage, branch silhouette and leaf accents.

## Implementation

The illustration cards stay anchored at their scene positions; there is no walking character. The camera changes position with scrolling. A shared authored model drives the live 3D architecture and static fallback. Warm windows and path lanterns are emissive, with additional cottage light at dusk. Smoke is a stationary sculpted plume, and petals remain on the ground. Existing dark-mode rain follows the portfolio's motion preference.

Character colors and features follow v2: saffron turban covering ears, dark beard and moustache, green kurta, ivory trousers, brown shoes, and a right-wrist kara. Rendering now uses flat 2D shapes, a simplified face and broad turban folds, following the user's Still / Monument Valley direction. Future sections should reuse this simplified style and identity while authoring their own stationary pose.
