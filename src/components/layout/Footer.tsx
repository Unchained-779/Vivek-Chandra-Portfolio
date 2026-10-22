import React from 'react'
import { ArrowUp, Terminal, Shield, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#070A10] px-4 py-12 text-xs font-mono text-slate-400">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Column: Identity & Domain */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-sky-500/20 text-sky-400 text-xs font-mono">
              VC
            </span>
            <span>Vivek Chandra</span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-sky-400 font-normal">vivekchandra.in</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Full-Stack Systems &amp; Product Engineer // Patna, Bihar, India
          </div>
        </div>

        {/* Center: System Architecture Telemetry */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Strict TypeScript (zero any)</span>
          </span>
          <span>•</span>
          <span>Vite + Tailwind v4</span>
          <span>•</span>
          <span>Framer Motion Physics</span>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-slate-400">
            &copy; 2026 Vivek Chandra.
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-300 hover:border-white/30 hover:text-white transition-colors"
            title="Return to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  )
}
