import React from 'react'
import { motion } from 'framer-motion'

export default function GlitchText({ text, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative inline-block ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute top-0 left-0 -ml-0.5 text-chaos-neon-pink opacity-70 animate-glitch"
        style={{ clipPath: 'inset(0 0 50% 0)', animationDelay: '0.1s' }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 ml-0.5 text-chaos-neon-cyan opacity-70 animate-glitch"
        style={{ clipPath: 'inset(50% 0 0 0)', animationDelay: '0.2s' }}
        aria-hidden="true"
      >
        {text}
      </span>
    </motion.div>
  )
}
