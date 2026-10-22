import React, { useState } from 'react'
import {
  ExternalLink,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Workflow,
  AlertTriangle,
  Code,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/SocialIcons'
import { Project } from '@/types/portfolio'

interface ProjectWorkbenchCardProps {
  project: Project
  index: number
}

export const ProjectWorkbenchCard: React.FC<ProjectWorkbenchCardProps> = ({
  project,
  index,
}) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'architecture' | 'innovations'>('problem')
  const [expandedInnovation, setExpandedInnovation] = useState<number | null>(1)
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0)

  return (
    <article className="rounded-2xl border border-white/[0.1] bg-[#0E131F]/80 backdrop-blur-xl shadow-2xl overflow-hidden transition-all hover:border-white/[0.18]">
      {/* Top Header: Title, Category, Links & Badges */}
      <div className="border-b border-white/[0.08] bg-black/30 p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-semibold text-sky-400">
                FLAGSHIP 0{index + 1} // {project.period}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-slate-400 font-mono">{project.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2">
            {project.links.liveApp && (
              <a
                href={project.links.liveApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-500/20"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live App</span>
              </a>
            )}

            {project.links.swaggerDocs && (
              <a
                href={project.links.swaggerDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3.5 py-2 text-xs font-semibold text-sky-300 transition-all hover:border-sky-400 hover:bg-sky-500/20"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Swagger Docs</span>
              </a>
            )}

            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Status Badges & Tech Stack */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.statusBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1 rounded-full border border-sky-500/20 bg-sky-500/5 px-2.5 py-0.5 text-[11px] font-mono font-medium text-sky-300"
              >
                <CheckCircle2 className="h-3 w-3 text-sky-400" />
                <span>{badge}</span>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Tab Navigation Bar */}
      <div className="flex border-b border-white/[0.08] bg-black/20 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setActiveTab('problem')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all ${
            activeTab === 'problem'
              ? 'border-sky-400 text-sky-400 bg-sky-500/[0.03]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>1. Problem &amp; Impact</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all ${
            activeTab === 'architecture'
              ? 'border-sky-400 text-sky-400 bg-sky-500/[0.03]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Workflow className="h-3.5 w-3.5" />
          <span>2. Interactive System Architecture</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('innovations')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all ${
            activeTab === 'innovations'
              ? 'border-sky-400 text-sky-400 bg-sky-500/[0.03]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>3. Engineering Deep-Dive &amp; Specs ({project.innovations.length})</span>
        </button>
      </div>

      {/* Tab Content Panes */}
      <div className="p-5 sm:p-6">
        {/* Tab 1: Problem Statement */}
        {activeTab === 'problem' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>CORE ENGINEERING PROBLEM STATEMENT</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <div className="font-mono text-xs text-sky-400 mb-1">Architecture Goal</div>
                <div className="text-xs font-semibold text-slate-100">
                  Zero Concurrency Race Conditions
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Guarantees ACID reservation and eliminates phantom uploads before disk allocation.
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <div className="font-mono text-xs text-indigo-400 mb-1">Security Boundary</div>
                <div className="text-xs font-semibold text-slate-100">
                  Total IDOR &amp; Traversal Immunity
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Decouples client metadata from disk identifiers; enforces strict hierarchical authorization.
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <div className="font-mono text-xs text-emerald-400 mb-1">Production Quality</div>
                <div className="text-xs font-semibold text-slate-100">
                  Automated Verification &amp; Rollback
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Automated cleanup unlinks partial artifacts if mid-stream spoofing or network failure occurs.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive System Architecture (With pulsing animated SVG flows) */}
        {activeTab === 'architecture' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-sky-400">
                <Workflow className="h-3.5 w-3.5" />
                <span>PULSING PACKET DATA FLOW — CLICK ANY NODE TO INSPECT DETAILS</span>
              </span>
              <span className="hidden sm:inline text-emerald-400">● 60fps Active Bus</span>
            </div>

            {/* Desktop / Tablet Animated Architecture Pipeline */}
            <div className="relative rounded-xl border border-white/[0.08] bg-black/40 p-4 sm:p-6 overflow-x-auto">
              <div className="min-w-[680px]">
                {/* SVG Connector Line with Pulsing Animated Dash Offset */}
                <div className="relative mb-6">
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 700 32" fill="none">
                    {/* Background track line */}
                    <path
                      d="M 50 16 L 650 16"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="2"
                    />
                    {/* Animated Pulsing Data Line */}
                    <path
                      d="M 50 16 L 650 16"
                      stroke="#38BDF8"
                      strokeWidth="2.5"
                      className="animate-svg-flow"
                    />
                  </svg>
                </div>

                {/* Architecture Nodes Grid */}
                <div className="grid grid-cols-5 gap-3">
                  {project.architectureFlow.map((node, nIdx) => {
                    const isSelected = selectedNodeIndex === nIdx
                    return (
                      <div
                        key={node.title}
                        onClick={() => setSelectedNodeIndex(nIdx)}
                        className={`cursor-pointer rounded-xl border p-3 transition-all relative ${
                          isSelected
                            ? 'border-sky-400 bg-sky-500/10 shadow-lg shadow-sky-500/10 scale-[1.02]'
                            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold"
                            style={{
                              backgroundColor: `${node.color}20`,
                              color: node.color,
                            }}
                          >
                            {node.tag}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            0{nIdx + 1}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {node.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                          {node.subtitle}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Selected Node Technical Inspection Drawer */}
            {project.architectureFlow[selectedNodeIndex] && (
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono font-bold text-sm"
                    style={{
                      backgroundColor: `${project.architectureFlow[selectedNodeIndex].color}25`,
                      color: project.architectureFlow[selectedNodeIndex].color,
                    }}
                  >
                    0{selectedNodeIndex + 1}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-sky-400">
                      INSPECTING NODE // {project.architectureFlow[selectedNodeIndex].tag}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {project.architectureFlow[selectedNodeIndex].title}
                    </div>
                    <div className="text-xs text-slate-300">
                      {project.architectureFlow[selectedNodeIndex].subtitle}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right font-mono text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold">Strict Boundary</span> // Zero Leaks
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Engineering Deep-Dive & Innovations */}
        {activeTab === 'innovations' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {project.innovations.map((inv) => {
              const isExpanded = expandedInnovation === inv.number
              return (
                <div
                  key={inv.number}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-colors hover:border-white/[0.14]"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedInnovation(isExpanded ? null : inv.number)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 font-mono text-xs font-bold text-sky-400">
                        {inv.number}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {inv.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-white/[0.06] bg-black/30 p-4 space-y-3">
                      <p className="text-xs text-sky-300 font-medium leading-relaxed">
                        {inv.summary}
                      </p>

                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300">
                        {inv.technicalDetails.map((detail, dIdx) => (
                          <li key={dIdx} className="leading-relaxed">
                            {detail}
                          </li>
                        ))}
                      </ul>

                      {inv.codeSnippet && (
                        <div className="rounded-lg border border-white/[0.08] bg-black/60 p-3 overflow-x-auto">
                          <div className="text-[10px] font-mono text-slate-500 mb-1 flex items-center gap-1.5">
                            <Code className="h-3 w-3 text-sky-400" />
                            <span>Verified Implementation Snippet:</span>
                          </div>
                          <pre className="font-mono text-xs text-sky-200 leading-relaxed whitespace-pre">
                            {inv.codeSnippet}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </article>
  )
}
