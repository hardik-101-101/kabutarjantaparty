# KABUTARJANTAPARTY 🕊️⚡

> Join the pigeon party. Secular. Socialist. Digital.

A production-ready, ultra-lightweight 3D digital experience built with React, Three.js, and modern web technologies.

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS
- **3D**: React Three Fiber + Drei + Postprocessing
- **Animations**: Framer Motion + GSAP + Lenis
- **Backend**: Node.js + Express
- **State**: Zustand

## 📁 Project Structure

```
kabutarjantaparty/
├── backend/
│   ├── server.js          # Express server
│   ├── routes/
│   │   ├── health.js      # Health check endpoint
│   │   └── stats.js       # Stats API
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── sections/      # Page sections
│   │   ├── scenes/        # 3D scenes
│   │   ├── hooks/         # Custom hooks
│   │   ├── shaders/       # GLSL shaders
│   │   ├── animations/    # Animation utilities
│   │   ├── App.jsx        # Main app
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── package.json
```

## 🛠️ Setup

```bash
# Install all dependencies
npm run install:all

# Start development (frontend + backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Features

- **Immersive 3D Hero**: Procedural abstract 3D objects with particle systems
- **Scroll Storytelling**: GSAP ScrollTrigger-powered animations
- **Performance Optimized**: Adaptive DPR, on-demand rendering, code splitting
- **Custom Cursor**: Magnetic hover effects with glow
- **Glassmorphism UI**: Modern frosted glass cards
- **Responsive**: Mobile-first design
- **SEO Ready**: Meta tags, semantic HTML
- **Accessibility**: Keyboard navigation, reduced motion support

## 📊 Performance

- Lighthouse score target: 90+
- Code splitting with React.lazy + Suspense
- GPU-optimized instanced particles
- Adaptive pixel ratio for low-end devices
- Gzip + Brotli compression

## 📝 License

No rights reserved. Steal this code. Spread the chaos. 
