// One isometric basis for the deck, landings, facade and character's feet.
// Along the bridge: (1, -.5). Across the deck: (1, .5). Height stays vertical.
export const BRIDGE = { x: 1130, y: 2230, length: 140, halfWidth: 22, height: 70 }
export function bridgePoint(along: number, across = 0, height = 0) {
  return [BRIDGE.x + along + across, BRIDGE.y - along * .5 + across * .5 - height]
}
export const bridgeEntrance = bridgePoint(BRIDGE.length)
export const bridgeExit = bridgePoint(0)
export const bridgeCrossing = [120, 70, 20].map(along => bridgePoint(along))
export const bridgeDeckTransform = `matrix(1 -.5 1 .5 ${BRIDGE.x} ${BRIDGE.y})`
export const bridgeFaceTransform = `matrix(1 -.5 0 1 ${BRIDGE.x + BRIDGE.halfWidth} ${BRIDGE.y + BRIDGE.halfWidth * .5})`
