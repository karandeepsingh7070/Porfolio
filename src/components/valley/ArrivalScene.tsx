'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { arrivalColors, arrivalGables, arrivalSprites, buildArrival, type ArrivalBlock, type ArrivalFinish } from './arrival-model'

const blocks = buildArrival()
const batches = Object.entries(blocks.reduce((all, block) => {
  (all[block.finish] ??= []).push(block)
  return all
}, {} as Record<ArrivalFinish, ArrivalBlock[]>)) as [ArrivalFinish, ArrivalBlock[]][]

function Masonry({ blocks: instances, color, glow }: { blocks: ArrivalBlock[]; color: string; glow: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  useEffect(() => {
    const matrix = new THREE.Object3D()
    instances.forEach((block, index) => {
      matrix.position.set(...block.at)
      matrix.scale.set(...block.size)
      matrix.rotation.set(...(block.rotation ?? [0, 0, 0]))
      matrix.updateMatrix()
      mesh.current!.setMatrixAt(index, matrix.matrix)
    })
    mesh.current!.instanceMatrix.needsUpdate = true
    mesh.current!.computeBoundingSphere()
  }, [instances])
  return <instancedMesh ref={mesh} args={[undefined, undefined, instances.length]} castShadow receiveShadow>
    <boxGeometry />
    <meshStandardMaterial color={color} roughness={1} emissive={glow ? color : '#000000'} emissiveIntensity={glow ? .85 : 0} />
  </instancedMesh>
}

function Gable({ dark }: { dark: boolean }) {
  const geometry = useMemo(() => {
    const { width: w, height: h, depth: d } = arrivalGables[0]
    const shape = new THREE.Shape()
    shape.moveTo(-w / 2, 0); shape.lineTo(w / 2, 0); shape.lineTo(0, h); shape.closePath()
    const result = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false })
    result.translate(0, 0, -d / 2)
    return result
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <mesh geometry={geometry} position={arrivalGables[0].at} castShadow receiveShadow>
    <meshStandardMaterial color={arrivalColors(dark).wall} roughness={1} />
  </mesh>
}

function GardenIllustrations({ dark }: { dark: boolean }) {
  const images = useMemo(() => Array.from(new Set(arrivalSprites.map(sprite => sprite.image))), [])
  const textures = useLoader(THREE.TextureLoader, images)
  useEffect(() => {
    textures.forEach(texture => { texture.colorSpace = THREE.SRGBColorSpace; texture.needsUpdate = true })
  }, [textures])
  return <>
    {arrivalSprites.map((item, i) => <sprite key={i} position={item.at} scale={[...item.size, 1]} center={new THREE.Vector2(.5, 0)}>
      <spriteMaterial map={textures[images.indexOf(item.image)]} transparent alphaTest={.06} depthWrite color={dark ? '#b8c0ae' : '#ffffff'} toneMapped={false} />
    </sprite>)}
    {/* Grounded, soft illustrated contact shadows without a second render loop. */}
    {arrivalSprites.map((item, i) => <mesh key={i} position={[item.at[0], 3.095, item.at[2]]} rotation={[-Math.PI / 2, 0, 0]} scale={item.kind === 'character' ? [1.0, .6, 1] : [.9, .45, 1]}>
      <circleGeometry args={[.7, 32]} /><meshBasicMaterial color="#5d6448" transparent opacity={.10} depthWrite={false} />
    </mesh>)}
  </>
}

function ChimneySmoke({ dark }: { dark: boolean }) {
  return <group position={[4.39, 6.85, -3.29]}>
    {[[0, .1, 0, .12], [.04, .35, -.02, .17], [.17, .65, -.05, .22], [.31, .99, -.09, .27]].map(([x, y, z, s], i) => <mesh key={i} position={[x, y, z]} scale={[s, s * 1.2, s]}>
      <sphereGeometry args={[1, 12, 8]} /><meshBasicMaterial color={dark ? '#bbc8ad' : '#d1c8b8'} transparent opacity={.19 - i * .035} depthWrite={false} />
    </mesh>)}
  </group>
}

/** A fixed character vignette. Scrolling only changes the camera. */
export default function ArrivalScene({ dark }: { dark: boolean }) {
  const palette = arrivalColors(dark)
  return <group name="arrival-garden">
    {batches.map(([finish, instances]) => <Masonry key={finish} blocks={instances} color={palette[finish]} glow={finish === 'glass'} />)}
    <Gable dark={dark} />
    <GardenIllustrations dark={dark} />
    <ChimneySmoke dark={dark} />
    <pointLight position={[4.42, 4.2, -1.12]} color="#ffcb79" intensity={dark ? 2.4 : .5} distance={4} decay={2} />
    <pointLight position={[-.5, 4.8, 1]} color="#ffe3ac" intensity={dark ? 1.8 : .4} distance={5} decay={2} />
  </group>
}
