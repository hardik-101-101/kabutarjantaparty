import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Sparkles, Zap, Target } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const revolutionStats = [
  { icon: Sparkles, value: '∞', label: 'Creativity', color: '#ff006e' },
  { icon: Zap, value: '0ms', label: 'Tolerance', color: '#00f5ff' },
  { icon: Target, value: '100%', label: 'Chaos', color: '#39ff14' },
]

export default function RevolutionSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const marquee = marqueeRef.current
    if (!section || !text || !marquee) return

    // Text reveal animation
    const chars = text.querySelectorAll('.char')
    gsap.fromTo(chars, 
      { opacity: 0.1, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 0.5,
        },
      }
    )

    // Marquee speed based on scroll
    gsap.to(marquee, {
      x: '-50%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section || st.vars.trigger === text) st.kill()
      })
    }
  }, [])

  const headlineText = 'DIGITAL REVOLUTION'

  return (
    <section 
      id="revolution" 
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Animated background shader effect (CSS-based) */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255,0,110,0.1) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(0,245,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(188,19,254,0.1) 0%, transparent 50%)',
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-16 -mx-6">
          <div 
            ref={marqueeRef}
            className="flex whitespace-nowrap"
            style={{ width: '200%' }}
          >
            {[...Array(4)].map((_, i) => (
              <span 
                key={i} 
                className="text-6xl sm:text-8xl md:text-9xl font-black text-white/5 tracking-tighter mx-8 select-none"
              >
                KABUTAR REVOLUTION • DIGITAL ANARCHY • MEME WARFARE • 
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Large Typography */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="text-chaos-neon-green font-mono text-sm tracking-widest">
                // THE_REVOLUTION_IS_NOW
              </span>
            </motion.div>

            <h2 
              ref={textRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
            >
              {headlineText.split('').map((char, i) => (
                <span 
                  key={i} 
                  className="char inline-block"
                  style={{ 
                    color: i < 7 ? '#ffffff' : 'transparent',
                    WebkitTextStroke: i >= 7 ? '1px rgba(255,255,255,0.3)' : 'none',
                  }}
                >
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-chaos-text-secondary mt-8 max-w-lg leading-relaxed"
            >
              We are not asking for permission. We are not waiting for approval. 
              The digital revolution is happening right now, in group chats, 
              in the comments section. You are already part of it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 flex items-center gap-2 text-chaos-neon-cyan font-mono text-sm group cursor-pointer"
            >
              <span>READ_FULL_MANIFESTO</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.div>
          </div>

          {/* Right: Stats Cards */}
          <div className="space-y-6">
            {revolutionStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02, x: -10 }}
                className="glass-card p-6 flex items-center gap-6 group cursor-pointer"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-sm text-chaos-text-muted">{stat.label}</div>
                </div>
                <div 
                  className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: stat.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
