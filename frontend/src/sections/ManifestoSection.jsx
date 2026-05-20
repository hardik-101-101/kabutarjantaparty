import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Megaphone, MessageCircle, Wifi, Game, SearchX, Heart, Flame, Brain } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const manifestoPoints = [
  {
    icon: Megaphone,
    title: 'Sabka Saath, Sabka Vikas',
    description: 'Modi ji ne bola tha.',
    color: '#ff006e',
  },
  {
    icon: MessageCircle,
    title: 'Free IPhone Seva',
    description: 'Everyone gets an IPhone 17 Pro Max 2TB',
    color: '#00f5ff',
  },
  {
    icon: Wifi,
    title: 'Get Salary on Scrolling',
    description: 'Sabka Saath, Sabka Vikas',
    color: '#39ff14',
  },
  {
    icon: Game,
    title: 'PS5 Seva',
    description: 'Everyone gets a PS5 with 100 exclusive games',
    color: '#bc13fe',
  },
  {
    icon: SearchX,
    title: 'No more exams',
    description: 'Just Aura Farming',
    color: '#ffea00',
  },
  {
    icon: Heart,
    title: 'Everyone gets one sponsored international trip',
    description: 'Hum bhi ghum rahe hain,tum bhi ghumo.Enjoy!',
    color: '#ff6b35',
  },
]

function ManifestoCard({ point, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, rotateX: 45, y: 100 }}
      animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ 
        rotateY: 5, 
        rotateX: -5, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="glass-card p-8 relative group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      {/* Glow border on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          boxShadow: `0 0 40px ${point.color}20, inset 0 0 40px ${point.color}10`,
        }}
      />

      <div className="relative z-10">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${point.color}15` }}
        >
          <point.icon className="w-6 h-6" style={{ color: point.color }} />
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
          {point.title}
        </h3>

        <p className="text-chaos-text-secondary text-sm leading-relaxed">
          {point.description}
        </p>
      </div>

      {/* Corner accent */}
      <div 
        className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: point.color }}
      />
    </motion.div>
  )
}

export default function ManifestoSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    if (!section || !title) return

    // Background gradient morphing
    gsap.to(section, {
      background: 'radial-gradient(ellipse at 30% 50%, rgba(255,0,110,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(0,245,255,0.05) 0%, transparent 50%)',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section || st.vars.trigger === title) st.kill()
      })
    }
  }, [])

  return (
    <section 
      id="manifesto" 
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-chaos-neon-cyan font-mono text-sm tracking-widest mb-4 block">
            // MANIFESTO_V2.0
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            THE <span className="text-gradient">KABUTAR</span> AURA
          </h2>
          <p className="text-chaos-text-secondary max-w-2xl mx-auto text-lg">
            We Don't Hustle,We Farm ∞ Aura
          </p>
        </motion.div>

        {/* Manifesto Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manifestoPoints.map((point, i) => (
            <ManifestoCard key={i} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
