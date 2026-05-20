import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function NeonGrid() {
  const gridRef = useRef()
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta
    if (gridRef.current) {
      // Subtle pulse effect
      const pulse = 1 + Math.sin(timeRef.current * 0.5) * 0.1
      gridRef.current.material.opacity = 0.15 * pulse
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, '#00f5ff', '#1a1a2e']}
      position={[0, -4, 0]}
    >
      <meshBasicMaterial
        color="#00f5ff"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </gridHelper>
  )
}
