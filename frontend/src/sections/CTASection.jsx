import React, { useRef, useEffect, Suspense, lazy } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Twitter, Github, MessageCircle, ArrowRight, Sparkles, Instagram } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Scene3D = lazy(() => import('../scenes/Scene3D'))

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/kabutarjantaparty?igsh=MWVzcTV1czIwcW9qZw==', color: '#00f5ff' },
  { icon: Github, label: 'GitHub', href: '#', color: '#ff006e' },
  { icon: MessageCircle, label: 'Discord', href: '#', color: '#39ff14' },
]

const floatingCards = [
  { title: 'Headquarters', desc: 'Everywhere', color: '#39ff14' },
  { title: 'HARDIK JAIN', desc: 'Founder', color: '#ff006e' },
  { title: 'Eyes', desc: 'On everyone', colxor: '#00f5ff' },
]

export default function CTASection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Pulsating ambient light effect
    gsap.to(section, {
      background: 'radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.03) 0%, transparent 60%)',
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section 
      id="join" 
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas
          dpr={[1, 1.5]}
          frameloop="demand"
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ antialias: false, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 5]} intensity={2} color="#ff006e" />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00f5ff" />

            {/* Giant floating logo shape */}
            <mesh rotation={[0.5, 0.5, 0]}>
              <icosahedronGeometry args={[2, 1]} />
              <meshStandardMaterial
                color="#0a0a0f"
                emissive="#bc13fe"
                emissiveIntensity={0.3}
                wireframe
                transparent
                opacity={0.3}
              />
            </mesh>

            <EffectComposer>
              <Bloom intensity={0.8} luminanceThreshold={0.3} mipmapBlur />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Giant Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-chaos-neon-cyan/20 to-chaos-neon-pink/20 border border-white/10 mb-8">
            <Sparkles className="w-12 h-12 text-chaos-neon-cyan" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-6"
        >
        JOIN<span className="text-gradient">KABUTARJANTAPARTY</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-chaos-text-secondary max-w-2xl mx-auto mb-12"
        >
          The revolution needs you. Not your resume. Not your credentials. Just your energy.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <MagneticButton
            href="https://docs.google.com/forms/d/e/1FAIpQLSfKCHwpYUATnQNAgH_-bmDqPcmW-pcrIQIle_Q6OFbJYJosRg/viewform?usp=publish-editor"
            className="px-12 py-5 bg-gradient-to-r from-chaos-neon-cyan via-chaos-neon-pink to-chaos-neon-purple text-chaos-black font-black text-lg tracking-wider rounded-full hover:shadow-[0_0_60px_rgba(0,245,255,0.3)] transition-shadow group"
          >
            <span className="flex items-center gap-3">
              INITIATE_JOIN SEQUENCE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </MagneticButton>
        </motion.div>

        {/* Floating UI Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16"
        >
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-6 text-left group cursor-pointer"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
              </div>
              <h4 className="text-white font-bold mb-1 group-hover:text-gradient transition-all">
                {card.title}
              </h4>
              <p className="text-chaos-text-muted text-xs">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center gap-6"
        >
          {socialLinks.map((social, i) => (
            <MagneticButton
              key={i}
              href={social.href}
              className="w-14 h-14 rounded-full glass-card flex items-center justify-center group"
            >
              <social.icon 
                className="w-5 h-5 text-chaos-text-muted group-hover:text-white transition-colors" 
                style={{ '--hover-color': social.color }}
              />
            </MagneticButton>
          ))}
        </motion.div>

        {/* Pulsating ambient lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-chaos-neon-cyan/10 blur-3xl"
          />
          <motion.div
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-chaos-neon-pink/10 blur-3xl"
          />
        </div>
      </div>
    </section>
  )
}
