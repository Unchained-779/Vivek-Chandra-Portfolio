import React, { useEffect, useRef } from 'react'

export const MagneticVectorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const SPACING = 56
    const VECTOR_LENGTH = 10
    const HALF_LEN = VECTOR_LENGTH / 2
    const INFLUENCE_RADIUS = 180
    const DEFAULT_ANGLE = Math.PI / 4 // 45 degrees

    // Mouse coordinates (target and smoothly lerped display)
    const mouse = {
      targetX: -9999,
      targetY: -9999,
      currentX: -9999,
      currentY: -9999,
      isActive: false,
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.resetTransform?.()
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      if (!mouse.isActive) {
        mouse.currentX = e.clientX
        mouse.currentY = e.clientY
        mouse.isActive = true
      }
    }

    const handleMouseLeave = () => {
      mouse.targetX = -9999
      mouse.targetY = -9999
      mouse.isActive = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      // Smoothly lerp mouse position for silky smooth vector field reaction
      if (mouse.isActive) {
        mouse.currentX += (mouse.targetX - mouse.currentX) * 0.18
        mouse.currentY += (mouse.targetY - mouse.currentY) * 0.18
      } else {
        mouse.currentX += (-9999 - mouse.currentX) * 0.1
        mouse.currentY += (-9999 - mouse.currentY) * 0.1
      }

      ctx.lineWidth = 1
      ctx.lineCap = 'square'

      const defaultVx = Math.cos(DEFAULT_ANGLE)
      const defaultVy = Math.sin(DEFAULT_ANGLE)

      for (let x = SPACING; x < width; x += SPACING) {
        for (let y = SPACING; y < height; y += SPACING) {
          const dx = mouse.currentX - x
          const dy = mouse.currentY - y
          const dist = Math.hypot(dx, dy)

          let angle = DEFAULT_ANGLE
          let factor = 0

          if (dist < INFLUENCE_RADIUS && dist > 0.001) {
            // Cubic ease-out decay for natural magnetic pull
            const normalized = 1 - dist / INFLUENCE_RADIUS
            factor = normalized * normalized

            const targetVx = dx / dist
            const targetVy = dy / dist

            const blendedVx = (1 - factor) * defaultVx + factor * targetVx
            const blendedVy = (1 - factor) * defaultVy + factor * targetVy

            angle = Math.atan2(blendedVy, blendedVx)
          }

          // Interpolate stroke color:
          // calm 45-deg: rgba(243, 239, 234, 0.06)
          // near cursor: rgba(255, 77, 0, 0.38)
          const r = Math.round(243 + (255 - 243) * factor)
          const g = Math.round(239 + (77 - 239) * factor)
          const b = Math.round(234 + (0 - 234) * factor)
          const a = 0.06 + (0.38 - 0.06) * factor

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`

          const cosA = Math.cos(angle)
          const sinA = Math.sin(angle)

          ctx.beginPath()
          ctx.moveTo(x - HALF_LEN * cosA, y - HALF_LEN * sinA)
          ctx.lineTo(x + HALF_LEN * cosA, y + HALF_LEN * sinA)
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#0C0B09',
      }}
      aria-hidden="true"
    />
  )
}
