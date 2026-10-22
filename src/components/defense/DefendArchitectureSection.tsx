import React, { useState } from 'react'
import { defenseDrillsData } from '@/data/defenseDrillsData'
import {
  ShieldAlert,
  ChevronRight,
  Code2,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Flame,
} from 'lucide-react'

export const DefendArchitectureSection: React.FC = () => {
  const [selectedDrillId, setSelectedDrillId] = useState<string>(defenseDrillsData[0].id)

  const activeDrill = defenseDrillsData.find((d) => d.id === selectedDrillId) || defenseDrillsData[0]

  return (
    <section id="architecture-drill" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-indigo-400 mb-2">
          <ShieldAlert className="h-4 w-4" />
          <span>SYSTEM DESIGN DRILL // INTERVIEW DEFENSE WORKBENCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Defend My Architecture
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
          Interactive evaluation console for engineering managers and technical interviewers.
          Select any real-world architectural dilemma to inspect Vivek's production rationale, failure-mode analysis, and code implementations.
        </p>
      </div>

      {/* Main Grid: Left Questions List, Right Active Defense Drill */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Questions Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Select System Drill:</span>
            <span className="text-sky-400">5 Scenarios</span>
          </div>

          {defenseDrillsData.map((drill, idx) => {
            const isSelected = drill.id === selectedDrillId
            return (
              <div
                key={drill.id}
                onClick={() => setSelectedDrillId(drill.id)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected
                    ? 'border-indigo-400 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                    : 'border-white/[0.08] bg-[#0E131F]/60 hover:border-white/20 hover:bg-[#0E131F]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                  <span className="text-indigo-400 font-semibold">{drill.category}</span>
                  <span className="text-slate-500">0{idx + 1}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white flex items-center justify-between gap-2">
                  <span>{drill.question}</span>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Detailed Architecture Defense Sheet (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/[0.12] bg-[#0E131F]/90 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-5">
            {/* Drill Category & Question */}
            <div>
              <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-indigo-300 mb-2">
                {activeDrill.category}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                "{activeDrill.question}"
              </h3>
            </div>

            {/* Quick Take Summary */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-400 mb-1">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>EXECUTIVE ANSWER / CORE INTUITION</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {activeDrill.quickTake}
              </p>
            </div>

            {/* In-Depth Rationale */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-sky-400 font-semibold uppercase tracking-wider">
                Production Rationale &amp; Mechanics:
              </div>
              <ul className="space-y-2 pl-4 list-disc text-xs text-slate-300 leading-relaxed">
                {activeDrill.rationale.map((point, pIdx) => (
                  <li key={pIdx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Trade-Offs Callout */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-amber-400 mb-1">
                <Flame className="h-3.5 w-3.5" />
                <span>ARCHITECTURAL TRADE-OFF &amp; COMPROMISE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDrill.tradeOffs}
              </p>
            </div>

            {/* Code / Schema Implementation */}
            {activeDrill.codeSnippet && (
              <div className="rounded-xl border border-white/[0.08] bg-black/70 p-4 space-y-1.5 overflow-x-auto">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-white/[0.08] pb-1.5">
                  <span className="flex items-center gap-1.5 text-sky-300">
                    <Code2 className="h-3 w-3" />
                    <span>Production Implementation Snippet</span>
                  </span>
                  <span className="text-slate-500">TypeScript (Strict)</span>
                </div>
                <pre className="font-mono text-xs text-sky-200 pt-2 leading-relaxed whitespace-pre">
                  {activeDrill.codeSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
