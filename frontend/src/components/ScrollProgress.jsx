import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === document.body) st.kill()
      })
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-white/5">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-chaos-neon-cyan via-chaos-neon-pink to-chaos-neon-green origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
