import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function MagneticButton({ children, className = '', onClick, href }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  const Component = href ? motion.a : motion.button
  const props = href ? { href } : { onClick }

  return (
    <Component
      ref={ref}
      className={`relative inline-flex items-center justify-center overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-chaos-neon-cyan via-chaos-neon-pink to-chaos-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10">{children}</span>
    </Component>
  )
}
