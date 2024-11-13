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

    function setCanvasSize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', setCanvasSize)
    setCanvasSize()

    // Handle mouse movement
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.life = 0
        this.maxLife = Math.random() * 100 + 100
      }

      update() {
        this.life++
        if (this.life >= this.maxLife) {
          this.reset()
        }

        // Add mouse interaction
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          const force = (100 - distance) / 100
          this.speedX -= (dx / distance) * force * 0.2
          this.speedY -= (dy / distance) * force * 0.2
        }

        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -0.9
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -0.9
      }

      draw() {
        const opacity = 1 - (this.life / this.maxLife)
        ctx.fillStyle = `rgba(66, 153, 225, ${opacity * 0.5})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle())
    }

    function drawLines() {
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.3
            ctx.strokeStyle = `rgba(66, 153, 225, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
    }

    function animate() {
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
      window.removeEventListener('mousemove', null)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}
    />
  )
}