import React, { useState } from 'react'
import { skillsData } from '@/data/skillsData'
import {
  Code2,
  Server,
  Layers,
  Database,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  Cpu,
} from 'lucide-react'

export const SkillsBentoGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filterTags = [
    { label: 'All Pillars', key: 'all' },
    { label: 'Core Languages', key: 'languages' },
    { label: 'Backend Architecture', key: 'backend' },
    { label: 'Frontend & UI', key: 'frontend' },
    { label: 'Databases & ORMs', key: 'databases' },
    { label: 'AI & Security', key: 'ai' },
    { label: 'DevOps & Testing', key: 'devops' },
  ]

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="h-4 w-4" />
      case 'Server':
        return <Server className="h-4 w-4" />
      case 'Layers':
        return <Layers className="h-4 w-4" />
      case 'Database':
        return <Database className="h-4 w-4" />
      case 'ShieldCheck':
        return <ShieldCheck className="h-4 w-4" />
      case 'Terminal':
        return <Terminal className="h-4 w-4" />
      default:
        return <Cpu className="h-4 w-4" />
    }
  }

  const filteredCategories = skillsData.filter((cat) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'languages') return cat.title.includes('Languages')
    if (activeFilter === 'backend') return cat.title.includes('Backend')
    if (activeFilter === 'frontend') return cat.title.includes('Frontend')
    if (activeFilter === 'databases') return cat.title.includes('Databases')
    if (activeFilter === 'ai') return cat.title.includes('AI')
    if (activeFilter === 'devops') return cat.title.includes('DevOps')
    return true
  })

  return (
    <section id="skills-matrix" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-sky-400 mb-2">
            <Cpu className="h-4 w-4" />
            <span>TECHNICAL COMPETENCIES // 6 PILLARS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Skills Matrix
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Strict TypeScript architecture, concurrency control, distributed persistence, and haute-couture frontend design systems.
          </p>
        </div>

        {/* Strict TypeScript Guarantee Pill */}
        <div className="shrink-0 flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-2 font-mono text-xs text-sky-300">
          <CheckCircle2 className="h-4 w-4 text-sky-400" />
          <span>Strict TypeScript: Zero-`any` Policy</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {filterTags.map((tag) => (
          <button
            key={tag.key}
            onClick={() => setActiveFilter(tag.key)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeFilter === tag.key
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'border border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-white/[0.1] bg-[#0E131F]/80 p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between transition-all hover:border-white/[0.2] hover:bg-[#0E131F]"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl font-bold"
                  style={{
                    backgroundColor: `${category.accentColor}18`,
                    color: category.accentColor,
                    border: `1px solid ${category.accentColor}40`,
                  }}
                >
                  {getIcon(category.iconName)}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                      skill.highlight
                        ? 'border border-sky-500/30 bg-sky-500/10 text-sky-200 font-semibold'
                        : 'border border-white/[0.06] bg-white/[0.02] text-slate-300'
                    }`}
                  >
                    {skill.highlight && <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{category.skills.length} Capabilities</span>
              <span className="text-emerald-400">Production Tested</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
