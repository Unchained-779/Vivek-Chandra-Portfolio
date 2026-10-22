import React from 'react'
import { Award, Compass, Radio, Cpu, Shield, ExternalLink } from 'lucide-react'

export const DefenseSpotlightCard: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-8">
      <div className="relative rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#0E131F]/90 to-sky-500/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Eyebrow & Ministry of Defence Honor Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 font-mono text-xs font-bold text-amber-300">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>NATIONAL FINALIST — SIH 2025 GRAND FINALE</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-xs text-slate-300">
                Ministry of Defence, Pune (Hardware &amp; Software Edition)
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>LEO-PNT Positioning &amp; Navigation System</span>
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Selected among top engineering teams nationwide to architect low-latency{' '}
              <span className="text-sky-300 font-semibold">Low Earth Orbit (LEO) satellite Positioning, Navigation, and Timing (PNT)</span>{' '}
              algorithms under severe embedded memory and real-time computational constraints. Formulated algorithmic optimizations for Doppler shift compensation and pseudorange calculations to ensure mission-critical navigation resilience.
            </p>

            {/* Technical Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400 font-semibold mb-1">
                  <Radio className="h-3 w-3" />
                  <span>Doppler Compensation</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Fast algorithmic phase correction for high-velocity LEO constellations.
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-sky-400 font-semibold mb-1">
                  <Compass className="h-3 w-3" />
                  <span>Pseudorange Logic</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Sub-meter positioning accuracy under constrained hardware clock drifts.
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 font-semibold mb-1">
                  <Shield className="h-3 w-3" />
                  <span>Embedded Memory Safety</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Zero memory fragmentation under continuous satellite telemetry cycles.
                </div>
              </div>
            </div>
          </div>

          {/* Right Trophy Badge */}
          <div className="shrink-0 flex flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-black/50 p-6 text-center">
            <span className="text-4xl mb-2">🇮🇳</span>
            <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
              National Finalist
            </span>
            <span className="font-mono text-[11px] text-slate-400 mt-1">December 2025</span>
            <span className="mt-3 inline-block rounded-full bg-amber-500/20 px-3 py-1 font-mono text-[10px] text-amber-200 font-semibold">
              Ministry of Defence
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
