'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function CountUp({ end, duration = 2 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true })

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true)
      let startTime = null
      const endNum = parseFloat(end.replace(/[^0-9.-]+/g, ""))
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = (currentTime - startTime) / (duration * 1000)
        
        if (progress < 1) {
          const currentCount = Math.round(endNum * progress)
          setCount(currentCount)
          requestAnimationFrame(animate)
        } else {
          setCount(endNum)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [end, duration, isInView, isVisible])

  return (
    <span ref={countRef}>
      {end.startsWith('$') ? '$' : ''}
      {count}
      {end.endsWith('%') ? '%' : ''}
      {end.endsWith('M+') ? end : end.endsWith('+') ? end : ''}
    </span>
  )
}

export default function DynamicStats({ stat, label, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="card-gradient p-6 relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center space-x-2">
            <Icon className="w-6 h-6 text-blue-500" />
            <h3 className="text-4xl font-bold bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              <CountUp end={stat} />
            </h3>
          </div>
          <p className="text-gray-600">{label}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 animate-pulse" />
      </div>
    </motion.div>
  )
}