'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { createContext, useContext, useEffect, useMemo, useRef, type MutableRefObject, type ReactNode } from 'react'
import * as THREE from 'three'
import { STOPS, travelerPosition, mixPoint, smoothStep, type Point } from './journey-math'
import { buildArchitecture, type Finish, type Solid, type Plant } from './still-architecture'
import { daylightPalette, forestPalette } from './still-palette'
import ArrivalScene from './ArrivalScene'

type WorldProps = { progress: MutableRefObject<number>; dark: boolean; compact: boolean; onReady: () => void; onFailure: () => void }
type Resources = { box: THREE.BoxGeometry; leaf: THREE.LatheGeometry; blossom: THREE.IcosahedronGeometry; arch: THREE.ExtrudeGeometry; materials: Record<Finish, THREE.MeshStandardMaterial> }
const Context = createContext<Resources>(null!)
const architecture = buildArchitecture()
const batches = Object.entries(architecture.solids.reduce((all, solid) => { (all[solid.finish] ??= []).push(solid); return all }, {} as Record<Finish, Solid[]>)) as [Finish, Solid[]][]

function Resources({ dark, children }: { dark: boolean; children: ReactNode }) {
  const resources = useMemo<Resources>(() => {
    const colors = dark ? forestPalette : daylightPalette
    const outline = new THREE.Shape()
    outline.moveTo(-.5, 0); outline.lineTo(-.5, .9); outline.absarc(0, .9, .5, Math.PI, 0, true)
    outline.lineTo(.5, 0); outline.lineTo(.34, 0); outline.lineTo(.34, .9); outline.absarc(0, .9, .34, 0, Math.PI, false); outline.lineTo(-.34, 0); outline.closePath()
    const arch = new THREE.ExtrudeGeometry(outline, { depth: .17, bevelEnabled: true, bevelSize: .015, bevelThickness: .015, bevelSegments: 1, curveSegments: 16 })
    return {
      box: new THREE.BoxGeometry(1, 1, 1),
      leaf: new THREE.LatheGeometry([new THREE.Vector2(.02, 0), new THREE.Vector2(.22, .16), new THREE.Vector2(.3, .55), new THREE.Vector2(.23, 1.1), new THREE.Vector2(.11, 1.7), new THREE.Vector2(0, 2.2)], 9),
      blossom: new THREE.IcosahedronGeometry(1, 1), arch,
      materials: Object.fromEntries(Object.entries(colors).map(([name, color]) => [name, new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0 })])) as Resources['materials'],
    }
  }, [dark])
  useEffect(() => () => { Object.values(resources).forEach(value => { if ('dispose' in value) value.dispose(); }); Object.values(resources.materials).forEach(m => m.dispose()) }, [resources])
  return <Context.Provider value={resources}>{children}</Context.Provider>
}

function MasonryBatch({ finish, solids }: { finish: Finish; solids: Solid[] }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const { box, materials } = useContext(Context)
  useEffect(() => {
    const transform = new THREE.Object3D()
    solids.forEach((solid, i) => { transform.position.set(...solid.at); transform.scale.set(...solid.size); transform.updateMatrix(); ref.current!.setMatrixAt(i, transform.matrix) })
    ref.current!.instanceMatrix.needsUpdate = true
    ref.current!.computeBoundingSphere()
  }, [solids, box, materials, finish])
  return <instancedMesh ref={ref} args={[box, materials[finish], solids.length]} castShadow receiveShadow />
}
function Block({ at, size, finish = 'ivory' }: { at: Point; size: Point; finish?: Finish }) {
  const { box, materials } = useContext(Context)
  return <mesh geometry={box} material={materials[finish]} position={at} scale={size} castShadow receiveShadow />
}
function Tree({ at, size, flower }: Plant) {
  const { leaf, blossom, materials } = useContext(Context)
  return <group position={at} scale={size}>
    <Block at={[0, .32, 0]} size={[.065, .65, .065]} finish="gold" />
    {flower ? <>
      <Block at={[-.13, .65, 0]} size={[.3, .055, .055]} finish="gold" />
      {[[0, 1.1, 0, .42], [-.3, .91, 0, .3], [.3, 1.03, .03, .32], [.07, 1.34, -.04, .29], [-.13, 1.07, .26, .28]].map(([x, y, z, s], i) => <mesh key={i} geometry={blossom} material={materials.pink} position={[x, y, z]} scale={[s, s * .8, s]} castShadow />)}
    </> : <mesh geometry={leaf} material={materials.deep} position={[0, .35, 0]} castShadow />}
  </group>
}
function Palm({ at, size }: Plant) {
  const { materials } = useContext(Context)
  const frond = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0); shape.quadraticCurveTo(.6, .47, 1.15, -.27)
    shape.quadraticCurveTo(.57, .13, 0, 0)
    return new THREE.ShapeGeometry(shape, 10)
  }, [])
  useEffect(() => () => frond.dispose(), [frond])
  return <group position={at} scale={size}>
    <Block at={[0, .8, 0]} size={[.08, 1.6, .08]} finish="gold" />
    {Array.from({ length: 7 }, (_, i) => <group key={i} position={[0, 1.6, 0]} rotation={[0, i * Math.PI * 2 / 7, 0]}>
      <mesh geometry={frond} rotation={[-.3, 0, 0]} castShadow>
        <meshStandardMaterial color={forestPalette[i % 2 ? 'teal' : 'deep']} side={THREE.DoubleSide} roughness={1} />
      </mesh>
    </group>)}
    <mesh position={[0, 1.61, 0]} scale={.11} material={materials.gold}><sphereGeometry args={[1, 8, 6]} /></mesh>
  </group>
}
function Vine({ at }: { at: Point }) {
  const { materials, blossom } = useContext(Context)
  const geometry = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(.13, -.6, .04), new THREE.Vector3(-.03, -1.2, .1), new THREE.Vector3(.1, -1.95, .03),
  ]), 12, .016, 4, false), [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <group position={at}>
    <mesh geometry={geometry} material={materials.deep} />
    {Array.from({ length: 6 }, (_, i) => <mesh key={i} geometry={blossom} material={materials.teal} position={[i % 2 ? .14 : -.08, -.2 - i * .29, .07]} scale={[.12, .055, .045]} rotation={[0, 0, i % 2 ? .5 : -.5]} />)}
  </group>
}
function Lift({ index, progress }: { index: number; progress: MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null), a = STOPS[index], b = STOPS[index + 1]
  useFrame(() => {
    if (!ref.current) return
    const p = progress.current, traveler = travelerPosition(p)
    ref.current.position.y = p <= index ? a[1] : p >= index + 1 ? b[1] : traveler[1]
  })
  return <group ref={ref} position={[b[0], a[1], a[2]]}>
    <Block at={[0, -.12, 0]} size={[1.12, .24, 1.12]} finish="gold" />
    <Block at={[0, .02, 0]} size={[.97, .04, .97]} />
  </group>
}
function Water({ dark }: { dark: boolean }) {
  return <group>
    {STOPS.map(([x, , z], i) => <group key={i} position={[x, -1.73, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh><circleGeometry args={[3.3, 48]} /><meshBasicMaterial color={dark ? '#80b3b8' : daylightPalette.teal} transparent opacity={.06} depthWrite={false} /></mesh>
      {[2.5, 3, 3.6].map(radius => <mesh key={radius}><ringGeometry args={[radius, radius + .015, 64]} /><meshBasicMaterial color={dark ? '#689a9e' : daylightPalette.deep} transparent opacity={.16} depthWrite={false} side={THREE.DoubleSide} /></mesh>)}
    </group>)}
  </group>
}
function Landscape({ dark }: { dark: boolean }) {
  const { arch, materials } = useContext(Context)
  return <>
    {batches.map(([finish, solids]) => <MasonryBatch key={finish} finish={finish} solids={solids} />)}
    {architecture.plants.map((plant, i) => dark && !plant.flower ? <Palm key={i} {...plant} /> : <Tree key={i} {...plant} />)}
    {dark && architecture.portals.map((portal, i) => <Vine key={i} at={[portal.at[0] + .85, portal.at[1] + .4, portal.at[2] + 1.6]} />)}
    {architecture.portals.map((portal, i) => <mesh key={i} geometry={arch} material={materials.ivory} position={portal.at} castShadow />)}
    <Water dark={dark} />
  </>
}
function SceneRig({ progress, compact, dark, onReady, onFailure }: WorldProps) {
  const { camera, size, invalidate, gl, scene } = useThree()
  const light = useRef<THREE.DirectionalLight>(null), ready = useRef(false), frame = useRef<number>()
  const callbacks = useRef({ onReady, onFailure }); callbacks.current = { onReady, onFailure }
  const target = useMemo(() => new THREE.Object3D(), [])
  useEffect(() => {
    const update = () => invalidate()
    const lost = (event: Event) => { event.preventDefault(); callbacks.current.onFailure() }
    window.addEventListener('valley-progress', update); gl.domElement.addEventListener('webglcontextlost', lost); invalidate()
    return () => { window.removeEventListener('valley-progress', update); gl.domElement.removeEventListener('webglcontextlost', lost); if (frame.current) cancelAnimationFrame(frame.current) }
  }, [gl, invalidate])
  useEffect(() => { invalidate() }, [compact, dark, size, invalidate])
  useFrame(() => {
    const p = Math.max(0, Math.min(6, progress.current)), i = Math.min(5, Math.floor(p)), t = smoothStep((p - i - .08) / .86)
    const focus = mixPoint(STOPS[i], STOPS[i + 1], t)
    const overview = smoothStep(progress.current - 6)
    const arrival = 1 - smoothStep(p)
    const center = mixPoint([focus[0] + 1.3, THREE.MathUtils.lerp(compact ? focus[1] * .5 : focus[1] - 1.1, 4.1, arrival), focus[2] - 1.2], [20, 2.5, -11], overview)
    const normalZoom = Math.min(size.width * (compact ? .94 : .57) / 12.7, size.height / (compact ? focus[1] + 5 : 11.6))
    const arrivalZoom = Math.min(size.width * (compact ? .92 : .54) / 11.8, size.height / 8.6)
    const zoom = THREE.MathUtils.lerp(THREE.MathUtils.lerp(normalZoom, arrivalZoom, arrival), Math.min(size.width / 51, size.height / 28), overview)
    // Text changes sides at Overwatch and Experience; reserve its negative space.
    const side = [-1, -1, 1, -1, 1, -1, -1]
    const composition = THREE.MathUtils.lerp(side[i], side[i + 1], t) * (1 - overview)
    const shift = compact ? 0 : size.width / zoom * .19 * composition
    const aim = new THREE.Vector3(center[0] + shift * .707, center[1], center[2] - shift * .707)
    camera.position.copy(aim).add(new THREE.Vector3(24, 24, 24)); camera.lookAt(aim)
    const ortho = camera as THREE.OrthographicCamera
    ortho.zoom = zoom; ortho.updateProjectionMatrix()
    target.position.set(...center)
    if (light.current) { light.current.position.set(center[0] - 8, center[1] + 18, center[2] + 10); light.current.target = target }
    scene.updateMatrixWorld()
    if (!ready.current) { ready.current = true; frame.current = requestAnimationFrame(() => callbacks.current.onReady()) }
  })
  return <>
    <primitive object={target} />
    <ambientLight intensity={dark ? .9 : 1.3} />
    <hemisphereLight args={[dark ? '#dce7bc' : '#fff4db', dark ? '#376c51' : '#88afa0', dark ? 1.1 : 1.3]} />
    <directionalLight ref={light} intensity={dark ? 1.25 : 2.3} color={dark ? '#e6dcac' : '#fff3d8'} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={14} shadow-camera-bottom={-14} shadow-camera-near={.1} shadow-camera-far={60} shadow-bias={-.0002} shadow-normalBias={.025} shadow-radius={3} />
  </>
}
export default function WorldScene(props: WorldProps) {
  return <Canvas orthographic camera={{ near: .1, far: 180, position: [24, 24, 24] }} frameloop="demand" dpr={[1, props.compact ? 1.2 : 1.5]} shadows gl={{ antialias: true, alpha: true }} style={{ pointerEvents: 'none' }} onCreated={({ gl }) => { gl.setClearColor(0, 0); gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = .95 }}>
    <Resources dark={props.dark}>
      <SceneRig {...props} /><Landscape dark={props.dark} />
      <Lift index={2} progress={props.progress} /><Lift index={4} progress={props.progress} />
      <ArrivalScene dark={props.dark} />
    </Resources>
  </Canvas>
}
