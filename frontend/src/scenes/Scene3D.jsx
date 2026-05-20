import React, { Suspense } from 'react'
import { useThree } from '@react-three/fiber'
import ChaosCockroach from './ChaosCockroach'
import ParticleField from './ParticleField'
import FloatingShapes from './FloatingShapes'
import NeonGrid from './NeonGrid'

function AdaptiveCamera() {
  const { camera } = useThree()

  React.useEffect(() => {
    camera.position.set(0, 1, 8)
  }, [camera])

  return null
}

export default function Scene3D() {
  return (
    <Suspense fallback={null}>
      <AdaptiveCamera />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={1} color="#ff006e" distance={15} />
      <pointLight position={[5, -3, 5]} intensity={0.8} color="#00f5ff" distance={15} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#bc13fe" distance={12} />

      {/* Main 3D elements */}
      <ChaosCockroach position={[0, 0, 0]} scale={1.2} />

      {/* Particle systems */}
      <ParticleField count={150} color="#00f5ff" />
      <ParticleField count={100} color="#ff006e" />
      <ParticleField count={80} color="#39ff14" />

      {/* Floating shapes */}
      <FloatingShapes />

      {/* Floor grid */}
      <NeonGrid />

      {/* Fog */}
      <fog attach="fog" args={['#0a0a0f', 8, 20]} />
    </Suspense>
  )
}
