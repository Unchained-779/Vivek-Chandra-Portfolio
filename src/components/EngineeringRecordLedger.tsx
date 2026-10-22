import React, { useState } from 'react'

interface RecordRow {
  id: string
  indexDate: string
  title: string
  organization: string
  headline: string
  details: string
  metrics: { label: string; value: string }[]
  tags: string[]
}

const RECORDS: RecordRow[] = [
  {
    id: 'sih-2025',
    indexDate: '01 // DEC 2025',
    title: 'LEO-PNT Satellite Positioning System',
    organization: 'Smart India Hackathon (SIH) Grand Finale · Ministry of Defence, Pune',
    headline: 'National Finalist (Hardware & Software Edition) — Selected among top engineering teams nationwide',
    details:
      'Collaborated on low-latency Low Earth Orbit (LEO) satellite Positioning, Navigation, and Timing (PNT) logic under severe embedded memory and computational constraints for the Ministry of Defence. Formulated algorithmic optimizations for Doppler shift carrier frequency compensation and pseudorange calculations to ensure precision timing and navigation resilience under signal attenuation.',
    metrics: [
      { label: 'HONOR', value: 'NATIONAL FINALIST (SIH 2025)' },
      { label: 'ORGANIZER', value: 'MINISTRY OF DEFENCE, PUNE' },
      { label: 'DOMAIN', value: 'AEROSPACE COMPUTING & LEO PNT' },
      { label: 'CONSTRAINTS', value: 'EMBEDDED MEMORY & LOW-LATENCY' },
    ],
    tags: [
      'Embedded C++',
      'Doppler Shift Compensation',
      'Pseudorange Calculations',
      'Low-Latency Algorithms',
      'Satellite Navigation Resilience',
    ],
  },
  {
    id: 'intelliod',
    indexDate: '02 // JUNE 2026',
    title: 'Intelliod Pvt. Ltd. (Full Stack Intern)',
    organization: 'Full Stack Developer Intern — On-Site Engineering · Visakhapatnam, IN',
    headline: 'Engineered geofenced attendance & break verification modules for enterprise Employee Management System (EMS)',
    details:
      'Engineered a 50m-radius geofenced attendance and break verification module for the internal enterprise Employee Management System (EMS), strictly restricting check-ins and break timestamps to verified office premises. Built Node.js/Express REST APIs and optimized MongoDB aggregation pipelines (cutting query latency by over 30%), integrating frontend HTML5 Geolocation with backend coordinate distance validation (Haversine formula) to eliminate remote location spoofing.',
    metrics: [
      { label: 'ROLE', value: 'FULL STACK DEVELOPER INTERN' },
      { label: 'PERFORMANCE', value: '30%+ EMS QUERY LATENCY REDUCTION' },
      { label: 'ACCURACY', value: '50M GEOFENCE COORDINATE RADIUS' },
      { label: 'SECURITY', value: 'ZERO LOCATION SPOOFING TOLERANCE' },
    ],
    tags: [
      'Node.js & Express',
      'MongoDB Aggregation Pipelines',
      'Haversine Distance Formula',
      'HTML5 Geolocation APIs',
      'Agile Production Sprints',
    ],
  },
  {
    id: 'gdg-bce',
    indexDate: '03 // OCT 2025 – PRESENT',
    title: 'Google Developer Groups (GDG) on Campus',
    organization: 'Event Management Lead · Bakhtiyarpur College of Engineering (BCE Patna)',
    headline: 'Spearheading campus developer ecosystem, hackathons, and technical bootcamps for 500+ students',
    details:
      'Spearheaded campus technical strategy, organized multi-track hackathons and hands-on full-stack developer bootcamps, and managed technical logistics and mentorship for 500+ student developers. Bridged industry standards with academic engineering, running workshops on Git workflows, distributed backends, and cloud deployment pipelines.',
    metrics: [
      { label: 'ROLE', value: 'EVENT MANAGEMENT LEAD' },
      { label: 'COMMUNITY IMPACT', value: '500+ STUDENT DEVELOPERS EMPOWERED' },
      { label: 'CHAPTER', value: 'GDG ON CAMPUS — BCE PATNA' },
      { label: 'KEY FOCUS', value: 'SYSTEMS, FULL-STACK & CLOUD' },
    ],
    tags: [
      'Technical Leadership',
      'Developer Mentorship',
      'Hackathon Organization',
      'Public Engineering Workshops',
      'Community Architecture',
    ],
  },
  {
    id: 'viksit-bharat',
    indexDate: '04 // MAY 2027 (EXP.)',
    title: 'Viksit Bharat Youth Parliament & Academics',
    organization: 'State Delegate (Bihar Assembly) & B.Tech CSE Undergrad · BCE Patna (7.98 CGPA)',
    headline: 'State-Level Delegate & Top CS Academic Standing with 4 NPTEL Core Specializations',
    details:
      'Qualified as a State Delegate in the Viksit Bharat Youth Parliament, presenting technology-driven national development frameworks before the Assembly Chairperson at the Bihar Legislative Assembly, Patna. Maintaining a 7.98 / 10 CGPA in Computer Science & Engineering at BCE Patna. Completed 4 rigorous NPTEL certifications spanning DSA, Graph Algorithms, Operating Systems, and DBMS.',
    metrics: [
      { label: 'ACADEMIC CGPA', value: '7.98 / 10 (B.TECH CSE)' },
      { label: 'HONOR', value: 'STATE DELEGATE (BIHAR ASSEMBLY)' },
      { label: 'INSTITUTION', value: 'BCE PATNA (AFFIL. BEU)' },
      { label: 'NPTEL CERTIFIED', value: '4 SPECIALIZED CS FOUNDATIONS' },
    ],
    tags: [
      'Data Structures & Algorithms (Python)',
      'Graph Algorithms',
      'Operating Systems',
      'Database Management Systems (DBMS)',
      'Public Governance Frameworks',
    ],
  },
]

export const EngineeringRecordLedger: React.FC = () => {
  // Default open on Row 01 as specified in prompt
  const [expandedId, setExpandedId] = useState<string | null>('sih-2025')

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="record"
      className="relative w-full"
      style={{
        backgroundColor: '#0C0B09',
        borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
      }}
    >
      {/* 12-Column Blueprint Outer Container */}
      <div
        className="relative mx-auto w-full max-w-[1400px]"
        style={{
          borderLeft: '1px solid rgba(243, 239, 234, 0.09)',
          borderRight: '1px solid rgba(243, 239, 234, 0.09)',
        }}
      >
        {/* Structural Crosshairs (+) */}
        <span
          className="pointer-events-none absolute z-20 font-mono-code font-bold text-[#FF4D00]"
          style={{ top: 0, left: 0, transform: 'translate(-50%, -50%)', fontSize: '13px' }}
        >
          +
        </span>
        <span
          className="pointer-events-none absolute z-20 font-mono-code font-bold text-[#FF4D00]"
          style={{ top: 0, right: 0, transform: 'translate(50%, -50%)', fontSize: '13px' }}
        >
          +
        </span>

        {/* Section Master Header */}
        <div
          className="flex flex-col md:flex-row md:items-baseline justify-between gap-4"
          style={{
            padding: '32px clamp(20px, 4vw, 48px)',
            borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <span
              className="font-mono-code font-semibold tracking-widest text-[#FF4D00] whitespace-nowrap shrink-0"
              style={{ fontSize: '11px', letterSpacing: '0.2em' }}
            >
              INDEX // 03
            </span>
            <h2
              className="font-syne font-bold text-[#F3EFEA] tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Engineering Record &amp; Honors Ledger
            </h2>
          </div>

          <span
            className="font-mono-code text-[#8A847C] tracking-wider shrink-0"
            style={{ fontSize: '10px' }}
          >
            SELECT ROW TO INSPECT TECHNICAL SPECIFICATION
          </span>
        </div>

        {/* 4 Interactive Architectural Rows Stack */}
        <div className="divide-y divide-[rgba(243,239,234,0.09)]">
          {RECORDS.map((row) => {
            const isExpanded = expandedId === row.id

            return (
              <div
                key={row.id}
                className="transition-colors duration-150"
                style={{
                  backgroundColor: isExpanded ? '#12110E' : 'transparent',
                }}
              >
                {/* Full-Width Row Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleRow(row.id)}
                  data-interactive="true"
                  className="w-full text-left transition-all duration-150 cursor-pointer block"
                  style={{
                    padding: '32px clamp(20px, 4vw, 48px)',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    borderRadius: '0px',
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Column 1: Date & Index */}
                    <div className="md:col-span-2">
                      <span
                        className="font-mono-code font-semibold tracking-wider transition-colors duration-150"
                        style={{
                          fontSize: '11px',
                          color: isExpanded ? '#FF4D00' : '#8A847C',
                          letterSpacing: '0.12em',
                        }}
                      >
                        {row.indexDate}
                      </span>
                    </div>

                    {/* Column 2: Title */}
                    <div className="md:col-span-4">
                      <h3
                        className="font-syne font-bold transition-colors duration-150 tracking-tight"
                        style={{
                          fontSize: 'clamp(20px, 2.2vw, 24px)',
                          margin: 0,
                          lineHeight: 1.2,
                          color: isExpanded ? '#F3EFEA' : 'rgba(243, 239, 234, 0.9)',
                        }}
                      >
                        {row.title}
                      </h3>
                    </div>

                    {/* Column 3: Organization & Honor */}
                    <div className="md:col-span-4">
                      <span
                        className="font-instrument italic block"
                        style={{
                          fontSize: 'clamp(18px, 2vw, 22px)',
                          lineHeight: 1.25,
                          color: isExpanded ? '#FF4D00' : '#8A847C',
                        }}
                      >
                        {row.organization}
                      </span>
                    </div>

                    {/* Column 4: Interactive Indicator */}
                    <div className="md:col-span-2 flex justify-start md:justify-end">
                      <span
                        className="font-mono-code font-medium transition-all duration-150 inline-flex items-center gap-1.5"
                        style={{
                          fontSize: '11px',
                          letterSpacing: '0.08em',
                          color: isExpanded ? '#FF4D00' : '#8A847C',
                        }}
                      >
                        {isExpanded ? '[ − COLLAPSE DOSSIER ]' : '[ + EXPAND DOSSIER ]'}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expanded Architectural Drawer */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '0 clamp(20px, 4vw, 48px) 36px clamp(20px, 4vw, 48px)',
                      borderTop: '1px solid rgba(243, 239, 234, 0.06)',
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                      {/* Left 7 Columns: Detailed Engineering Narrative */}
                      <div className="lg:col-span-7 space-y-4">
                        <div
                          className="font-mono-code text-[#FF4D00] text-[10px] tracking-widest uppercase"
                        >
                          TECHNICAL SPECIFICATION &amp; PRODUCTION EXECUTION
                        </div>

                        <div
                          className="font-syne font-semibold text-[#F3EFEA] text-[15px] leading-snug"
                        >
                          {row.headline}
                        </div>

                        <p
                          className="font-jakarta text-[#8A847C] text-[14px] leading-relaxed m-0"
                        >
                          {row.details}
                        </p>

                        {/* Technical Tags */}
                        <div className="pt-2">
                          <div
                            className="font-mono-code text-[#8A847C] text-[10px] tracking-widest uppercase mb-2"
                          >
                            VERIFIED COMPETENCIES:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {row.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono-code inline-flex items-center"
                                style={{
                                  fontSize: '10.5px',
                                  color: '#F3EFEA',
                                  backgroundColor: '#0C0B09',
                                  border: '1px solid rgba(243, 239, 234, 0.12)',
                                  padding: '6px 12px',
                                }}
                              >
                                <span
                                  style={{
                                    width: '4px',
                                    height: '4px',
                                    backgroundColor: '#FF4D00',
                                    marginRight: '6px',
                                  }}
                                />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right 5 Columns: Quantified Verification Metrics Strip */}
                      <div className="lg:col-span-5">
                        <div
                          className="p-5"
                          style={{
                            backgroundColor: '#0C0B09',
                            border: '1px solid rgba(243, 239, 234, 0.09)',
                          }}
                        >
                          <div
                            className="font-mono-code text-[#FF4D00] text-[10px] tracking-widest uppercase mb-4"
                          >
                            AUTHENTICATED METRICS &amp; GOVERNANCE
                          </div>

                          <div className="space-y-3">
                            {row.metrics.map((metric) => (
                              <div
                                key={metric.label}
                                className="border-b border-white/[0.04] pb-2.5 last:border-b-0 last:pb-0"
                              >
                                <div
                                  className="font-mono-code text-[#8A847C] text-[10px] tracking-wider uppercase"
                                >
                                  {metric.label}
                                </div>
                                <div
                                  className="font-mono-code text-[#F3EFEA] font-semibold text-[12px] mt-0.5 tracking-wide"
                                >
                                  {metric.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
