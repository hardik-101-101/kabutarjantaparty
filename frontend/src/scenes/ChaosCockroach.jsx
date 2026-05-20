import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ChaosCockroach({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const timeRef = useRef(0)

  // Procedural geometry - no external models needed
  const bodyGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 2)
    // Distort vertices for organic look
    const positions = geo.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      const noise = Math.sin(x * 3) * Math.cos(y * 2) * Math.sin(z * 4) * 0.3
      positions.setXYZ(i, x + noise, y + noise * 0.5, z + noise)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  // Legs using instanced meshes for performance
  const legsData = useMemo(() => {
    const legs = []
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      legs.push({
        position: [Math.cos(angle) * 1.2, Math.sin(angle) * 0.3, Math.sin(angle) * 1.2],
        rotation: [0, angle, Math.PI / 4],
        scale: [0.1, 0.8, 0.1],
      })
    }
    return legs
  }, [])

  // Antennae
  const antennaeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(0.3, 1.5, 0.2),
      new THREE.Vector3(0.1, 2.2, -0.1),
    ])
    return new THREE.TubeGeometry(curve, 20, 0.03, 8, false)
  }, [])

  useFrame((state, delta) => {
    timeRef.current += delta
    const group = groupRef.current
    if (!group) return

    // Floating animation
    group.position.y = position[1] + Math.sin(timeRef.current * 0.8) * 0.3
    group.rotation.y = timeRef.current * 0.15
    group.rotation.x = Math.sin(timeRef.current * 0.5) * 0.1
    group.rotation.z = Math.cos(timeRef.current * 0.3) * 0.05

    // Subtle breathing scale
    const breathe = 1 + Math.sin(timeRef.current * 2) * 0.02
    group.scale.setScalar(scale * breathe)
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main body */}
      <mesh geometry={bodyGeometry} castShadow>
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.4}
          metalness={0.6}
          emissive="#ff006e"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Inner glow core */}
      <mesh scale={0.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#0a0a0f"
          emissive="#00f5ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Legs */}
      {legsData.map((leg, i) => (
        <mesh
          key={i}
          position={leg.position}
          rotation={leg.rotation}
          scale={leg.scale}
        >
          <capsuleGeometry args={[1, 1, 4, 8]} />
          <meshStandardMaterial
            color="#12121a"
            roughness={0.3}
            metalness={0.8}
            emissive="#bc13fe"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}

      {/* Antennae */}
      <mesh geometry={antennaeGeometry} position={[0.2, 0.8, 0]}>
        <meshStandardMaterial
          color="#39ff14"
          emissive="#39ff14"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh geometry={antennaeGeometry} position={[-0.2, 0.8, 0]} rotation={[0, 0, Math.PI]}>
        <meshStandardMaterial
          color="#39ff14"
          emissive="#39ff14"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Point lights for glow */}
      <pointLight color="#ff006e" intensity={2} distance={4} position={[0, 0, 0]} />
      <pointLight color="#00f5ff" intensity={1} distance={3} position={[0, 1, 0]} />
    </group>
  )
}
