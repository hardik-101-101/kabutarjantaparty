import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingShape({ geometry, position, color, speed, delay }) {
  const meshRef = useRef()
  const timeRef = useRef(delay)

  useFrame((state, delta) => {
    timeRef.current += delta
    const mesh = meshRef.current
    if (!mesh) return

    mesh.rotation.x = timeRef.current * speed * 0.5
    mesh.rotation.y = timeRef.current * speed * 0.3
    mesh.position.y = position[1] + Math.sin(timeRef.current * speed) * 0.5
  })

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.7}
        wireframe
      />
    </mesh>
  )
}

export default function FloatingShapes() {
  const shapes = useMemo(() => [
    { geo: <octahedronGeometry args={[0.5, 0]} />, pos: [-3, 2, -2], color: '#ff006e', speed: 0.8, delay: 0 },
    { geo: <tetrahedronGeometry args={[0.4, 0]} />, pos: [3, -1, -3], color: '#00f5ff', speed: 1.2, delay: 1 },
    { geo: <boxGeometry args={[0.6, 0.6, 0.6]} />, pos: [-2, -2, -1], color: '#39ff14', speed: 0.6, delay: 2 },
    { geo: <icosahedronGeometry args={[0.3, 0]} />, pos: [2, 3, -4], color: '#bc13fe', speed: 1.0, delay: 0.5 },
    { geo: <torusGeometry args={[0.4, 0.1, 8, 16]} />, pos: [0, -3, -2], color: '#ffea00', speed: 0.9, delay: 1.5 },
    { geo: <dodecahedronGeometry args={[0.35, 0]} />, pos: [-4, 0, -3], color: '#ff6b35', speed: 1.1, delay: 0.8 },
  ], [])

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          geometry={shape.geo}
          position={shape.pos}
          color={shape.color}
          speed={shape.speed}
          delay={shape.delay}
        />
      ))}
    </group>
  )
}
