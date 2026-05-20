# 🕊️ KABUTARJANTAPARTY — Complete Project Overview

## Project Architecture

### Full-Stack Structure
```
kabutarjantaparty/
├── backend/                    # Node.js + Express API
│   ├── server.js              # Main server with security, compression, rate limiting
│   ├── routes/
│   │   ├── health.js          # Health check & system status
│   │   └── stats.js           # Viral movement statistics API
│   └── package.json           # Backend dependencies
│
├── frontend/                   # React 18 + Vite SPA
│   ├── index.html             # SEO-optimized HTML with critical CSS
│   ├── vite.config.js         # Build optimization, code splitting, compression
│   ├── tailwind.config.js     # Custom chaos theme with neon colors
│   ├── postcss.config.js      # Tailwind + Autoprefixer
│   └── src/
│       ├── main.jsx           # Entry point with progressive loader
│       ├── App.jsx            # Main app with 3D canvas + sections
│       ├── index.css          # Global styles, grain, scrollbar, cursor
│       ├── store.js           # Zustand state management
│       │
│       ├── components/         # 8 Reusable UI Components
│       │   ├── Navbar.jsx          # Glassmorphism nav with mobile overlay
│       │   ├── CustomCursor.jsx    # Magnetic cursor with dot
│       │   ├── CursorGlow.jsx      # Radial glow follows mouse
│       │   ├── ScrollProgress.jsx  # Top progress bar
│       │   ├── GrainOverlay.jsx    # Animated noise texture
│       │   ├── LoadingFallback.jsx # Suspense fallback
│       │   ├── MagneticButton.jsx  # Magnetic hover effect button
│       │   └── GlitchText.jsx      # RGB split glitch text
│       │
│       ├── sections/           # 5 Page Sections (Lazy Loaded)
│       │   ├── HeroSection.jsx       # Fullscreen 3D hero + slogan
│       │   ├── ManifestoSection.jsx  # 6-card grid with 3D tilt
│       │   ├── TimelineSection.jsx   # Alternating timeline
│       │   ├── RevolutionSection.jsx # Marquee + stats
│       │   └── CTASection.jsx        # Final call-to-action
│       │
│       ├── scenes/             # 5 3D Scene Components
│       │   ├── Scene3D.jsx           # Main scene composition
│       │   ├── ChaosCockroach.jsx    # Procedural abstract 3D object
│       │   ├── ParticleField.jsx     # GPU instanced particles (custom shader)
│       │   ├── FloatingShapes.jsx    # Wireframe geometric shapes
│       │   └── NeonGrid.jsx          # Cyberpunk floor grid
│       │
│       ├── hooks/              # 3 Custom React Hooks
│       │   ├── useMousePosition.js   # Normalized mouse coords
│       │   ├── useScrollProgress.js  # 0-1 scroll progress
│       │   └── useReducedMotion.js   # Accessibility preference
│       │
│       ├── shaders/            # 2 GLSL Shader Programs
│       │   ├── noiseShader.js        # Animated grain noise
│       │   └── distortionShader.js   # Vertex distortion effect
│       │
│       ├── animations/         # GSAP Animation Utilities
│       │   └── animationUtils.js     # fadeInUp, parallax, textReveal, etc.
│       │
│       └── assets/             # Static assets folder
│
├── .env.example              # Environment variable template
├── .gitignore                # Git ignore rules
├── package.json              # Root workspace scripts
└── README.md                 # Documentation
```

## 🎨 Design System

### Colors (Chaos Theme)
| Token | Hex | Usage |
|-------|-----|-------|
| chaos-black | #0a0a0f | Background |
| chaos-dark | #12121a | Cards |
| chaos-gray | #1a1a2e | Borders |
| neon-pink | #ff006e | Primary accent |
| neon-cyan | #00f5ff | Secondary accent |
| neon-green | #39ff14 | Success/CTA |
| neon-yellow | #ffea00 | Warning |
| neon-purple | #bc13fe | Tertiary |
| neon-orange | #ff6b35 | Alert |

### Typography
- **Display**: Inter (300-900 weights)
- **Mono**: JetBrains Mono (code, labels, stats)

### Effects
- Glassmorphism: `backdrop-filter: blur(20px)` + `bg-opacity: 0.6`
- Neon Glow: `text-shadow` multi-layer
- Grain Overlay: SVG noise texture with CSS animation
- Custom Cursor: Mix-blend-mode difference

## ⚡ Performance Optimizations

### Build Level
- **Code Splitting**: Manual chunks (three-vendor, animation-vendor, ui-vendor)
- **Compression**: Gzip + Brotli via vite-plugin-compression2
- **Minification**: Terser with console/debugger removal
- **Tree Shaking**: ES modules + dead code elimination

### Runtime Level
- **Adaptive DPR**: PerformanceMonitor adjusts pixel ratio (1.0-2.0)
- **On-Demand Rendering**: `frameloop="demand"` — only renders when needed
- **Lazy Loading**: All sections loaded via React.lazy + Suspense
- **Instanced Meshes**: Particle system uses GPU instancing
- **Custom Shaders**: Procedural geometry — zero external model files

### Network Level
- **Express Compression**: gzip level 6 for API responses
- **Static Cache**: 1-year max-age for built assets
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet CSP**: Strict content security policy

## 🎯 SEO & Accessibility

### SEO
- Semantic HTML5 structure
- Meta tags (Open Graph, Twitter Cards)
- Preconnect to Google Fonts
- Critical CSS inlined in `<head>`
- Semantic heading hierarchy

### Accessibility
- `prefers-reduced-motion` media query support
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus-visible states
- Color contrast compliance (WCAG AA)

## 🚀 Deployment

### Development
```bash
npm run install:all   # Install all dependencies
npm run dev           # Start frontend (5173) + backend (3001)
```

### Production
```bash
npm run build         # Build frontend to /dist
npm start             # Start production server
```

### Environment Variables
```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

## 📊 Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

## 🎮 Interactive Features

| Feature | Tech | Description |
|---------|------|-------------|
| 3D Hero | R3F + Drei | Procedural abstract object with particles |
| Mouse Parallax | Custom Hook | Normalized mouse position for 3D camera |
| Smooth Scroll | Lenis | Inertia-based scrolling with GSAP sync |
| Magnetic Buttons | GSAP | Buttons follow cursor on hover |
| Glitch Text | CSS | RGB-split animation on headlines |
| Scroll Progress | GSAP | Gradient progress bar at top |
| Card Tilt | Framer Motion | 3D perspective hover on manifesto cards |
| Marquee | GSAP ScrollTrigger | Speed-linked infinite scroll text |
| Custom Cursor | GSAP | Two-layer cursor with glow effect |
| Loading Screen | Progressive | Animated bar with random increments |

## 🔧 Tech Stack Details

### Frontend Dependencies
- react ^18.2.0
- @react-three/fiber ^8.15.0 (3D renderer)
- @react-three/drei ^9.92.0 (3D helpers)
- three ^0.160.0 (3D engine)
- @react-three/postprocessing ^2.15.0 (effects)
- framer-motion ^10.16.0 (React animations)
- gsap ^3.12.0 (timeline animations)
- lenis ^1.0.0 (smooth scroll)
- zustand ^4.4.0 (state management)
- lucide-react ^0.294.0 (icons)

### Backend Dependencies
- express ^4.18.2
- compression ^1.7.4
- helmet ^7.1.0
- express-rate-limit ^7.1.5

### Dev Dependencies
- vite ^5.0.8 (build tool)
- tailwindcss ^3.3.6 (styling)
- @vitejs/plugin-react ^4.2.1
- vite-plugin-compression2 ^0.11.0
