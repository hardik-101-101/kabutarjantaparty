import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Rocket, Globe, Users, Crown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  {
    year: 'REQ / 01',
    title: 'Unemployed',
    description: 'A single tweet sparked what would become the largest digital movement inBy force, by choice, or by principle. We don`t ask. internet history.',
    icon: Rocket,
    color: '#ff006e',
  },
  {
    year: 'REQ / 02',
    title: 'Lazy',
    description: 'Physically only. The brain may continue to spiral.',
    icon: Users,
    color: '#39ff14',
  },
  {
    year: 'REQ / 03',
    title: 'Chronically online',
    description: 'Minimum 11 hours a day, including bathroom breaks.',
    icon: Globe,
    color: '#00f5ff',
  },
  
  {
    year: 'REQ / 04',
    title: 'Have ∞ aura',
    description: '∞',
    icon: Crown,
    color: '#bc13fe',
  },
]

function TimelineCard({ event, index, isLeft }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
    >
      {/* Card */}
      <div className="flex-1 glass-card p-8 relative group hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-start gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${event.color}15` }}
          >
            <event.icon className="w-6 h-6" style={{ color: event.color }} />
          </div>
          <div>
            <span 
              className="text-xs font-mono tracking-wider block mb-2"
              style={{ color: event.color }}
            >
              {event.year}
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
            <p className="text-chaos-text-secondary text-sm leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{ boxShadow: `0 0 60px ${event.color}15` }}
        />
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-shrink-0 w-4 h-4 rounded-full border-2 border-white/20 bg-chaos-black relative z-10">
        <div 
          className="absolute inset-0.5 rounded-full animate-pulse"
          style={{ backgroundColor: event.color }}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}

export default function TimelineSection() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    gsap.fromTo(line, 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-chaos-neon-pink font-mono text-sm tracking-widest mb-4 block">
            Membership
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Are you <span className="text-gradient"> eligible to join? </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div 
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-chaos-neon-cyan via-chaos-neon-pink to-chaos-neon-purple origin-top"
            style={{ transform: 'translateX(-50%)' }}
          />

          {/* Events */}
          <div className="space-y-16 md:space-y-24">
            {timelineEvents.map((event, i) => (
              <TimelineCard 
                key={i} 
                event={event} 
                index={i} 
                isLeft={i % 2 === 0} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
