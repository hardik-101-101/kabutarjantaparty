import { create } from 'zustand'

export const useChaosStore = create((set) => ({
  // UI State
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),

  // Performance
  dpr: 1.5,
  setDpr: (dpr) => set({ dpr }),

  // Loading
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),

  // Scroll
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  // Mouse
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (pos) => set({ mousePosition: pos }),

  // Theme
  isDark: true,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}))
