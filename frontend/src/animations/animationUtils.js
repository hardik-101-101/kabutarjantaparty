import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Entrance animations
export const fadeInUp = (element, delay = 0, duration = 0.8) => {
  gsap.fromTo(element, 
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, delay, duration, ease: 'power2.out' }
  )
}

export const fadeInScale = (element, delay = 0, duration = 0.8) => {
  gsap.fromTo(element,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, delay, duration, ease: 'power2.out' }
  )
}

export const staggerChildren = (container, childSelector, stagger = 0.1) => {
  gsap.fromTo(container.querySelectorAll(childSelector),
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    }
  )
}

// Scroll-triggered parallax
export const parallax = (element, speed = 0.5) => {
  gsap.to(element, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Text reveal animation
export const textReveal = (element, duration = 1) => {
  const chars = element.querySelectorAll('.char')
  gsap.fromTo(chars,
    { opacity: 0.1 },
    {
      opacity: 1,
      stagger: 0.02,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: 0.5,
      },
    }
  )
}

// Magnetic button effect
export const magneticEffect = (element, strength = 0.3) => {
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Cleanup utility
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(st => st.kill())
  gsap.killTweensOf('*')
}
