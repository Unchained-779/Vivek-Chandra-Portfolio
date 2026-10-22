import React from 'react'
import { projectsData } from '@/data/projectsData'
import { ProjectWorkbenchCard } from './ProjectWorkbenchCard'
import { Layers } from 'lucide-react'

export const FlagshipProjectsSection: React.FC = () => {
  return (
    <section id="flagship-systems" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-24">
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-sky-400 mb-2">
          <Layers className="h-4 w-4" />
          <span>PRODUCTION-GRADE SYSTEMS // PROOF OF WORK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Flagship Engineering Showcase
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
          Comprehensive architectural workbenches for production software systems designed and deployed by Vivek Chandra.
          Each project features decoupled storage adapters, atomic concurrency safety, and verified integration suites.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-10 sm:space-y-12">
        {projectsData.map((project, idx) => (
          <ProjectWorkbenchCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  )
}
