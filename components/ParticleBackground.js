'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    let mouse = { x: 0, y: 0 }
    let frameCount = 0

    function setCanvasSize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener('resize', setCanvasSize)
    window.addEventListener('mousemove', handleMouseMove)
    setCanvasSize()

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 3
        this.speedX = (Math.random() * 0.3 - 0.15) * 0.3
        this.speedY = (Math.random() * 0.3 - 0.15) * 0.3
        this.life = 0
        this.maxLife = Math.random() * 300 + 300
        // Make particles more visible with darker blues
        this.color = Math.random() < 0.5 ? 
          'rgba(30, 144, 255,' :  // Dodger Blue
          'rgba(0, 102, 204,'     // Darker Sky Blue
      }

      update() {
        if (frameCount % 2 === 0) {
          this.life++
          if (this.life >= this.maxLife) {
            this.reset()
          }

          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            const force = (150 - distance) / 150
            this.speedX -= (dx / distance) * force * 0.075
            this.speedY -= (dy / distance) * force * 0.075
          }

          this.x += this.speedX
          this.y += this.speedY

          if (this.x < 0 || this.x > canvas.width) this.speedX *= -0.75
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -0.75
        }
      }

      draw() {
        const opacity = (1 - (this.life / this.maxLife)) * 0.9 // Increased opacity
        ctx.fillStyle = this.color + opacity + ')'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < 70; i++) {
      particles.push(new Particle())
    }

    function drawLines() {
      particles.forEach((p1, i) => {
        const nearest = particles
          .slice(i + 1)
          .sort((a, b) => {
            const distA = Math.hypot(p1.x - a.x, p1.y - a.y)
            const distB = Math.hypot(p1.x - b.x, p1.y - b.y)
            return distA - distB
          })
          .slice(0, 3)

        nearest.forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.6 // Increased line opacity
            ctx.strokeStyle = `rgba(30, 144, 255, ${opacity})` // Darker blue for lines
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
    }

    function animate() {
      frameCount++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      drawLines()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(to bottom, #ffffff, #edf5ff)' }}
    />
  )
}