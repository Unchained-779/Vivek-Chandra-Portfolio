import React, { useEffect, useState } from 'react'

export const BackgroundAtmosphere: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      <div
        className="absolute -inset-px transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.06), transparent 70%)`,
        }}
      />

      {/* Structural Hairline Grid Matrix */}
      <div className="absolute inset-0 bg-noise opacity-40" />

      {/* Ambient Top Subtle Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[380px] w-[900px] rounded-full bg-gradient-to-b from-[#38BDF8]/10 via-[#818CF8]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Ambient Bottom Right Accent */}
      <div className="absolute -bottom-40 -right-40 h-[400px] w-[500px] rounded-full bg-gradient-to-t from-[#818CF8]/08 to-transparent blur-3xl pointer-events-none" />
    </div>
  )
}
