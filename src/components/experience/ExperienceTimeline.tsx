import React from 'react'
import { timelineData } from '@/data/timelineData'
import { Briefcase, Users, Award, GraduationCap, MapPin, Calendar } from 'lucide-react'

export const ExperienceTimeline: React.FC = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'experience':
        return {
          icon: <Briefcase className="h-3.5 w-3.5 text-sky-400" />,
          label: 'PRODUCTION INTERNSHIP',
          color: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
        }
      case 'leadership':
        return {
          icon: <Users className="h-3.5 w-3.5 text-amber-400" />,
          label: 'CAMPUS LEADERSHIP / DELEGATE',
          color: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
        }
      case 'education':
        return {
          icon: <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />,
          label: 'DEGREE & HONORS',
          color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
        }
      default:
        return {
          icon: <Award className="h-3.5 w-3.5 text-indigo-400" />,
          label: 'ENGINEERING',
          color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
        }
    }
  }

  return (
    <section id="experience" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400 mb-2">
          <Briefcase className="h-4 w-4" />
          <span>PROVEN TRACK RECORD // TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Experience, Leadership &amp; Education
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
          Production engineering internships, Google Developer Groups campus leadership, parliamentary state delegation, and core CS academics.
        </p>
      </div>

      {/* Vertical Glowing Node Timeline */}
      <div className="relative border-l-2 border-white/[0.08] ml-4 sm:ml-8 space-y-12">
        {timelineData.map((item, idx) => {
          const badge = getTypeBadge(item.type)
          return (
            <div key={item.id} className="relative pl-6 sm:pl-10 group">
              {/* Glowing Timeline Node Dot */}
              <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-sky-400 bg-[#0A0D14] shadow-md shadow-sky-500/50 transition-transform group-hover:scale-125">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              </div>

              {/* Card Container */}
              <div className="rounded-2xl border border-white/[0.1] bg-[#0E131F]/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl transition-all hover:border-white/[0.2] hover:bg-[#0E131F]">
                {/* Header Row: Badge & Period */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 font-mono text-[11px] font-semibold ${badge.color}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>

                  <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar className="h-3.5 w-3.5 text-sky-400" />
                      <span>{item.period}</span>
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Role and Organization */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {item.role}
                </h3>
                <div className="text-sm font-semibold text-sky-400 mt-0.5">
                  {item.organization}
                </div>

                {/* Metric Callout Chips */}
                <div className="flex flex-wrap gap-2 my-4">
                  {item.metricHighlights.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-lg border border-white/[0.08] bg-black/40 px-3 py-1 font-mono text-xs text-emerald-300 font-medium"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Bullets List */}
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc leading-relaxed">
                  {item.descriptionBullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
