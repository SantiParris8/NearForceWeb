'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function DynamicStats({ stat, label, icon: Icon }) {
  const elementRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={elementRef}
      style={{ y, opacity }}
      className="relative"
    >
      <div className="card-gradient p-6 relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center space-x-2">
            <Icon className="w-6 h-6 text-blue-500" />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
            >
              {stat}
            </motion.div>
          </div>
          <p className="text-gray-600">{label}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 animate-pulse" />
      </div>
    </motion.div>
  )
}