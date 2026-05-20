import React from 'react'
import { motion } from 'framer-motion'
import GlitchText from '../components/GlitchText'
import MagneticButton from '../components/MagneticButton'

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static hero background image only */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: 'url(/kabutar.jpeg)', opacity: 1 }} />

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-chaos-neon-cyan/30 bg-chaos-neon-cyan/5 text-chaos-neon-cyan text-xs font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-chaos-neon-green animate-pulse" />
            MOVEMENT_STATUS: ACTIVE
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-4"
        >
          <span className="block text-white">VOICE OF THE</span>
          <span className="block text-gradient">LAZY &</span>
          <span className="block text-white">UNEMPLOYED</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-sm sm:text-base md:text-lg text-chaos-text-secondary font-mono tracking-wide">
            <GlitchText text="Secular. Socialist. Democratic. Lazy." delay={1.2} />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            href="#join"
            className="px-8 py-4 bg-chaos-neon-cyan text-chaos-black font-bold text-sm tracking-wider rounded-full hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-shadow"
          >
            JOIN THE MOVEMENT
          </MagneticButton>

          <MagneticButton
            href="#manifesto"
            className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-wider rounded-full hover:border-chaos-neon-pink hover:text-chaos-neon-pink transition-colors"
          >
            READ MANIFESTO
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: '42K+', label: 'Members' },
            { value: '∞', label: 'Aura' },
            { value: '0', label: 'Jobs Found' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-chaos-text-muted font-mono mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-chaos-text-muted font-mono">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-chaos-neon-cyan to-transparent"
        />
      </motion.div>
    </section>
  )
}
