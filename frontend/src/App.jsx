import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Lazy load heavy sections for code splitting
const HeroSection = lazy(() => import('./sections/HeroSection'))
const ManifestoSection = lazy(() => import('./sections/ManifestoSection'))
const TimelineSection = lazy(() => import('./sections/TimelineSection'))
const RevolutionSection = lazy(() => import('./sections/RevolutionSection'))
const CTASection = lazy(() => import('./sections/CTASection'))

// Eager load lightweight components
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import LoadingFallback from './components/LoadingFallback'
import GrainOverlay from './components/GrainOverlay'
import CursorGlow from './components/CursorGlow'

function App({ onMount }) {
  const [dpr, setDpr] = useState(1.5)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Handle loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
      onMount?.()
    }, 800)

    return () => {
      clearTimeout(timer)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [onMount])

  return (
    <div className="relative min-h-screen bg-chaos-black">
      {/* Grain noise overlay */}
      <GrainOverlay />

      {/* Custom cursor */}
      <CustomCursor />
      <CursorGlow />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* 3D Canvas - Fixed background layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          dpr={dpr}
          frameloop="demand"
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ 
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <PerformanceMonitor
            onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))}
            onDecline={() => setDpr(1)}
            flipflops={3}
            onFallback={() => setDpr(1)}
          >
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />

            <Suspense fallback={null}>
              <ambientLight intensity={0.1} />
              <fog attach="fog" args={['#0a0a0f', 10, 25]} />

              {/* Post-processing effects */}
              <EffectComposer enabled={dpr > 1}>
                <Bloom 
                  intensity={0.6} 
                  luminanceThreshold={0.4}
                  luminanceSmoothing={0.9}
                  mipmapBlur
                />
                <ChromaticAberration 
                  offset={[0.0015, 0.001]} 
                  blendFunction={BlendFunction.NORMAL}
                />
                <Noise opacity={0.03} />
                <Vignette 
                  offset={0.3} 
                  darkness={0.7} 
                  blendFunction={BlendFunction.NORMAL}
                />
              </EffectComposer>
            </Suspense>
          </PerformanceMonitor>
        </Canvas>
      </div>

      {/* Content layers */}
      <main className="relative z-10">
        <Suspense fallback={<LoadingFallback />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <ManifestoSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <TimelineSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <RevolutionSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <CTASection />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-chaos-text-muted text-sm font-mono">
            © This is only a meme website.The entire content and manifesto is purely entertainment purposes. KABUTARJANTAPARTY is a fictional party and not real. Do not take it seriously.
          </p>
          
        </div>
      </footer>
    </div>
  )
}

export default App
