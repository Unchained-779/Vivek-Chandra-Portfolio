import React, { useEffect, useRef, useState } from 'react'

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPointerFine, setIsPointerFine] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  )

  const centerDotRef = useRef<HTMLDivElement | null>(null)
  const outerFrameRef = useRef<HTMLDivElement | null>(null)

  // Tracking refs for smooth lerp
  const mousePos = useRef({ x: -100, y: -100 })
  const framePos = useRef({ x: -100, y: -100 })
  const frameAngle = useRef(0)
  const frameSize = useRef(28)
  const isHoveredRef = useRef(false)

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  useEffect(() => {
    // Only mount precision custom cursor on desktop pointer devices
    const fineQuery = window.matchMedia('(pointer: fine)')

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches)
    }

    fineQuery.addEventListener('change', handlePointerChange)

    if (!fineQuery.matches) {
      return () => fineQuery.removeEventListener('change', handlePointerChange)
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (!isVisible) setIsVisible(true)

      // Directly update center dot for zero-latency crosshair precision
      if (centerDotRef.current) {
        centerDotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`
      }

      // Check for interactive targets under pointer
      const target = e.target as HTMLElement | null
      const isInteractive = !!target?.closest(
        'a, button, input, textarea, select, [role="button"], [data-interactive="true"], [tabindex]:not([tabindex="-1"])'
      )
      setIsHovered(isInteractive)
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    // Animation loop for outer square lerp (0.18) & rotation
    let animId: number

    const render = () => {
      // Lerp position
      framePos.current.x += (mousePos.current.x - framePos.current.x) * 0.18
      framePos.current.y += (mousePos.current.y - framePos.current.y) * 0.18

      // Lerp size & angle
      const targetSize = isHoveredRef.current ? 44 : 28
      const targetAngle = isHoveredRef.current ? 45 : 0

      frameSize.current += (targetSize - frameSize.current) * 0.22
      frameAngle.current += (targetAngle - frameAngle.current) * 0.22

      if (outerFrameRef.current) {
        const half = frameSize.current / 2
        outerFrameRef.current.style.width = `${frameSize.current}px`
        outerFrameRef.current.style.height = `${frameSize.current}px`
        outerFrameRef.current.style.transform = `translate3d(${framePos.current.x - half}px, ${framePos.current.y - half}px, 0) rotate(${frameAngle.current}deg)`
        outerFrameRef.current.style.borderColor = isHoveredRef.current
          ? '#FF4D00'
          : 'rgba(243, 239, 234, 0.35)'
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      fineQuery.removeEventListener('change', handlePointerChange)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [isVisible])

  if (!isPointerFine) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
      aria-hidden="true"
    >
      {/* 28px outer square bracket frame lerping (0.18), rotating 45° and expanding to 44px on hover */}
      <div
        ref={outerFrameRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          border: '1px solid rgba(243, 239, 234, 0.35)',
          borderRadius: '0px',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          willChange: 'transform, width, height, border-color',
          transition: 'border-color 0.15s ease',
        }}
      />

      {/* Crisp 6px Signal Orange center crosshair square */}
      <div
        ref={centerDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#FF4D00',
          borderRadius: '0px',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
