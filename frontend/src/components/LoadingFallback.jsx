import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-chaos-neon-cyan font-mono text-sm"
      >
        LOADING_SECTOR...
      </motion.div>
    </div>
  )
}
