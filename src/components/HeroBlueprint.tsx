import React, { useState } from 'react'

type SystemId = 'skybox' | 'deetx' | 'vakeel'

interface SystemSpec {
  id: SystemId
  tabIndex: string
  name: string
  code: string
  headline: string
  nodes: { label: string; desc: string; latency?: string }[]
  specs: string[]
  metrics: { title: string; val: string }[]
}

const SYSTEMS: Record<SystemId, SystemSpec> = {
  skybox: {
    id: 'skybox',
    tabIndex: '01',
    name: 'SKYBOX DRIVE',
    code: 'SYS_01 // DISTRIBUTED STORAGE ENGINE',
    headline: 'High-concurrency chunked storage with atomic quota arbitration',
    nodes: [
      { label: 'Client Stream', desc: 'Chunked Multipart Stream', latency: '<12ms' },
      { label: '$expr Atomic Quota Lock', desc: 'MongoDB ACID Concurrency Guard', latency: '3ms' },
      { label: 'Multer Guard', desc: 'MIME Type & Buffer Interceptor', latency: '1ms' },
      { label: 'IStorageProvider Disk', desc: 'UUID Disk + Range Stream Bus', latency: '4ms' },
    ],
    specs: ['100% Jest Pass Rate', 'HTTP 206 Range Streaming', 'Zero Path Traversal'],
    metrics: [
      { title: 'INTEGRITY VERIFICATION', val: 'SHA-256' },
      { title: 'CONCURRENCY LOCK', val: 'ATOMIC $expr' },
    ],
  },
  deetx: {
    id: 'deetx',
    tabIndex: '02',
    name: 'DEET-X FASHION',
    code: 'SYS_02 // ZERO-WATERFALL COMMERCE',
    headline: 'Next.js 16 Server Component pipeline with deterministic inventory locks',
    nodes: [
      { label: 'Next.js 16 Client', desc: 'RSC Parallel Streaming Tree', latency: '<15ms' },
      { label: 'Server Action Auth', desc: 'Stateless JWT Session Verification', latency: '2ms' },
      { label: 'Parallel Hydration', desc: 'Non-Blocking Edge DB Queries', latency: '8ms' },
      { label: 'ACID Order Pipeline', desc: 'Atomic Inventory Decrement', latency: '5ms' },
    ],
    specs: ['Zero-Waterfall Hydration', 'Atomic Stock Reservation', 'Strict TypeScript'],
    metrics: [
      { title: 'STOCK COLLISION RATE', val: '0.00%' },
      { title: 'TIME TO FIRST BYTE', val: '<180ms' },
    ],
  },
  vakeel: {
    id: 'vakeel',
    tabIndex: '03',
    name: 'VAKEELEASY AI',
    code: 'SYS_03 // MULTI-AGENT LEGAL VAULT',
    headline: 'Enterprise AI contract auditing with deterministic validation guardrails',
    nodes: [
      { label: 'Doc Upload Stream', desc: 'OCR & PDF Binary Chunking', latency: '<25ms' },
      { label: 'Embedding Vector Bus', desc: 'Hierarchical Section Indexing', latency: '14ms' },
      { label: 'Multi-Agent Reviewer', desc: 'Parallel Clause Cross-Auditing', latency: '42ms' },
      { label: 'Verified Risk Dossier', desc: 'Deterministic Guardrail Scoring', latency: '12ms' },
    ],
    specs: ['~60% Turnaround Boost', 'Deterministic Guardrails', 'Role-Isolated Vault'],
    metrics: [
      { title: 'CONTRACT AUDIT SPEED', val: '+58.4%' },
      { title: 'HALLUCINATION SHIELD', val: 'STRICT' },
    ],
  },
}

export const HeroBlueprint: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SystemId>('skybox')
  const system = SYSTEMS[activeTab]

  return (
    <section
      id="top"
      className="relative w-full"
      style={{
        marginTop: '56px',
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
          minHeight: 'calc(100vh - 56px)',
        }}
      >
        {/* Architectural Crosshair (+) Intersections */}
        <span
          className="pointer-events-none absolute z-20 font-mono-code font-bold text-[#FF4D00]"
          style={{ top: 0, left: 0, transform: 'translate(-50%, -50%)', fontSize: '13px' }}
        >
          +
        </span>
        <span
          className="pointer-events-none absolute z-20 hidden lg:block font-mono-code font-bold text-[#FF4D00]"
          style={{ top: 0, left: '58.333333%', transform: 'translate(-50%, -50%)', fontSize: '13px' }}
        >
          +
        </span>
        <span
          className="pointer-events-none absolute z-20 font-mono-code font-bold text-[#FF4D00]"
          style={{ top: 0, right: 0, transform: 'translate(50%, -50%)', fontSize: '13px' }}
        >
          +
        </span>
        <span
          className="pointer-events-none absolute z-20 font-mono-code font-bold text-[#FF4D00]"
          style={{ bottom: 0, left: 0, transform: 'translate(-50%, 50%)', fontSize: '13px' }}
        >
          +
        </span>
        <span
          className="pointer-events-none absolute z-20 hidden lg:block font-mono-code font-bold text-[#FF4D00]"
          style={{ bottom: 0, left: '58.333333%', transform: 'translate(-50%, 50%)', fontSize: '13px' }}
        >
          +
        </span>
        <span
          className="pointer-events-none absolute z-20 font-mono-code font-bold text-[#FF4D00]"
          style={{ bottom: 0, right: 0, transform: 'translate(50%, 50%)', fontSize: '13px' }}
        >
          +
        </span>

        {/* 12-Column Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-56px)]">
          {/* ============================================================ */}
          {/* LEFT 7 COLUMNS: Monumental Swiss Editorial Statement         */}
          {/* ============================================================ */}
          <div
            className="lg:col-span-7 flex flex-col justify-between"
            style={{
              padding: 'clamp(36px, 5vw, 64px) clamp(24px, 4vw, 48px)',
              borderRight: '1px solid rgba(243, 239, 234, 0.09)',
            }}
          >
            {/* Top Meta Row */}
            <div className="flex items-center gap-3">
              <span
                className="font-mono-code font-semibold tracking-widest text-[#FF4D00]"
                style={{ fontSize: '11px', letterSpacing: '0.2em' }}
              >
                INDEX // 00 — FULL-STACK SYSTEMS & PRODUCT ENGINEERING
              </span>
            </div>

            {/* Center Monumental Headline */}
            <div className="my-8 lg:my-auto py-4">
              <h1 className="flex flex-col tracking-tight" style={{ margin: 0 }}>
                {/* Line 1: Syne Bold */}
                <span
                  className="font-syne font-bold uppercase text-[#F3EFEA]"
                  style={{
                    fontSize: 'clamp(2.8rem, 5.2vw, 5.2rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 0.95,
                    display: 'block',
                  }}
                >
                  ENGINEERING
                </span>

                {/* Line 2: Instrument Serif Italic */}
                <span
                  className="font-instrument italic text-[#FF4D00]"
                  style={{
                    fontSize: 'clamp(3.2rem, 6vw, 6rem)',
                    lineHeight: 0.95,
                    display: 'block',
                    marginTop: '4px',
                    marginBottom: '4px',
                    fontWeight: 400,
                  }}
                >
                  deterministic backends
                </span>

                {/* Line 3: Syne Bold */}
                <span
                  className="font-syne font-bold uppercase text-[#F3EFEA]"
                  style={{
                    fontSize: 'clamp(2.6rem, 4.8vw, 4.8rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.0,
                    display: 'block',
                  }}
                >
                  &amp; HIGH-CRAFT INTERFACES.
                </span>
              </h1>
            </div>

            {/* Bottom Bio & Sharp Action Strip */}
            <div
              style={{
                marginTop: '32px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(243, 239, 234, 0.09)',
              }}
            >
              <p
                className="font-jakarta text-[#8A847C]"
                style={{
                  fontSize: '15px',
                  lineHeight: 1.75,
                  maxWidth: '540px',
                  margin: 0,
                }}
              >
                I’m <strong className="text-[#F3EFEA] font-medium">Vivek Chandra</strong> — final-year
                Computer Science undergrad at BCE Patna (7.98 CGPA) &amp; SIH 2025 National Finalist
                for the Ministry of Defence. I build concurrency-safe storage engines,
                zero-waterfall Next.js 16 storefronts, and distributed AI pipelines.
              </p>

              {/* Action Strip (gap: 0, 0px border-radius) */}
              <div className="flex flex-wrap items-center mt-7" style={{ gap: 0 }}>
                <a
                  href="#works"
                  className="inline-flex items-center justify-center font-mono-code font-semibold transition-all duration-150"
                  style={{
                    backgroundColor: '#FF4D00',
                    color: '#0C0B09',
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    padding: '16px 28px',
                    textDecoration: 'none',
                    border: '1px solid #FF4D00',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E04400'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF4D00'
                  }}
                >
                  EXPLORE SELECTED WORKS →
                </a>

                <a
                  href="/Vivek_Chandra_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-mono-code transition-all duration-150"
                  style={{
                    backgroundColor: '#12110E',
                    color: '#F3EFEA',
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    padding: '16px 28px',
                    textDecoration: 'none',
                    border: '1px solid rgba(243, 239, 234, 0.15)',
                    borderLeft: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FF4D00'
                    e.currentTarget.style.color = '#FF4D00'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(243, 239, 234, 0.15)'
                    e.currentTarget.style.color = '#F3EFEA'
                  }}
                >
                  DOWNLOAD DOSSIER [PDF]
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT 5 COLUMNS: Interactive Live System Blueprint Switcher  */}
          {/* ============================================================ */}
          <div
            className="lg:col-span-5 flex flex-col justify-between"
            style={{
              backgroundColor: 'rgba(18, 17, 14, 0.35)',
            }}
          >
            {/* Top Subheader Cell */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '20px 28px',
                borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
              }}
            >
              <span
                className="font-mono-code tracking-wider text-[#8A847C]"
                style={{ fontSize: '10px' }}
              >
                ACTIVE PRODUCTION ARCHITECTURE // SELECT NODE TO INSPECT
              </span>
              <span
                className="font-mono-code text-[#FF4D00] text-[10px] tracking-widest hidden sm:inline"
              >
                LIVE MONITOR
              </span>
            </div>

            {/* Interactive 3-System Selector Tabs */}
            <div
              className="grid grid-cols-3"
              style={{
                borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
              }}
            >
              {(Object.keys(SYSTEMS) as SystemId[]).map((sysKey) => {
                const item = SYSTEMS[sysKey]
                const isActive = activeTab === sysKey
                return (
                  <button
                    key={sysKey}
                    type="button"
                    onClick={() => setActiveTab(sysKey)}
                    onMouseEnter={() => setActiveTab(sysKey)}
                    className="font-mono-code text-left transition-all duration-150 cursor-pointer"
                    style={{
                      padding: '14px 16px',
                      backgroundColor: isActive ? '#12110E' : 'transparent',
                      color: isActive ? '#FF4D00' : '#8A847C',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      borderRight: '1px solid rgba(243, 239, 234, 0.09)',
                      borderBottom: isActive ? '2px solid #FF4D00' : 'none',
                      outline: 'none',
                    }}
                  >
                    <span className="block opacity-60 text-[9px] mb-0.5">{item.tabIndex}</span>
                    <span className="font-semibold block truncate">{item.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Active Schematic Panel */}
            <div
              className="flex-1 flex flex-col justify-between"
              style={{ padding: '28px 28px' }}
            >
              {/* System Meta Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono-code font-medium text-[#FF4D00]"
                    style={{ fontSize: '11px', letterSpacing: '0.12em' }}
                  >
                    {system.code}
                  </span>
                  <span
                    className="font-mono-code text-[#8A847C]"
                    style={{ fontSize: '10px' }}
                  >
                    STATUS: OPTIMAL
                  </span>
                </div>
                <p
                  className="font-jakarta text-[#8A847C]"
                  style={{ fontSize: '13px', lineHeight: 1.5, margin: 0, marginBottom: '20px' }}
                >
                  {system.headline}
                </p>

                {/* Animated Pipeline Nodes Display */}
                <div className="space-y-2 relative">
                  {system.nodes.map((node, idx) => (
                    <React.Fragment key={node.label}>
                      <div
                        className="p-3 transition-colors duration-150 flex items-center justify-between"
                        style={{
                          backgroundColor: '#12110E',
                          border: '1px solid rgba(243, 239, 234, 0.09)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono-code text-[#FF4D00] text-[10px] tracking-wider"
                          >
                            0{idx + 1}
                          </span>
                          <div>
                            <div
                              className="font-mono-code text-[#F3EFEA] font-medium"
                              style={{ fontSize: '12px', letterSpacing: '0.04em' }}
                            >
                              {node.label}
                            </div>
                            <div
                              className="font-jakarta text-[#8A847C]"
                              style={{ fontSize: '11px', marginTop: '1px' }}
                            >
                              {node.desc}
                            </div>
                          </div>
                        </div>

                        {node.latency && (
                          <span
                            className="font-mono-code text-[#8A847C] text-[10px] tracking-widest"
                          >
                            {node.latency}
                          </span>
                        )}
                      </div>

                      {/* Animated Signal Packet Connector (between nodes) */}
                      {idx < system.nodes.length - 1 && (
                        <div className="flex items-center justify-center my-0.5">
                          <div
                            className="relative overflow-hidden"
                            style={{
                              width: '1px',
                              height: '14px',
                              backgroundColor: 'rgba(243, 239, 234, 0.12)',
                            }}
                          >
                            <div
                              className="absolute top-0 left-0 w-full"
                              style={{
                                height: '6px',
                                backgroundColor: '#FF4D00',
                                animation: 'pulsePacket 1.4s ease-in-out infinite',
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Real-Time System Specs Badges (0px radius) */}
              <div
                className="mt-6 pt-4 flex flex-wrap gap-2"
                style={{
                  borderTop: '1px solid rgba(243, 239, 234, 0.09)',
                }}
              >
                {system.specs.map((spec) => (
                  <span
                    key={spec}
                    className="font-mono-code tracking-wider inline-flex items-center"
                    style={{
                      fontSize: '10px',
                      color: '#F3EFEA',
                      backgroundColor: '#12110E',
                      border: '1px solid rgba(243, 239, 234, 0.12)',
                      padding: '6px 10px',
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
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom 4-Cell Metric Strip (2x2 Grid) */}
            <div
              className="grid grid-cols-2"
              style={{
                borderTop: '1px solid rgba(243, 239, 234, 0.09)',
              }}
            >
              {/* Cell 1 */}
              <div
                style={{
                  padding: '18px 24px',
                  borderRight: '1px solid rgba(243, 239, 234, 0.09)',
                  borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
                }}
              >
                <div
                  className="font-syne font-bold text-[#F3EFEA]"
                  style={{ fontSize: '24px', lineHeight: 1 }}
                >
                  100%
                </div>
                <div
                  className="font-mono-code text-[#8A847C] mt-2 uppercase"
                  style={{ fontSize: '9px', letterSpacing: '0.08em', lineHeight: 1.3 }}
                >
                  INTEGRATION TEST PASS (14 SUITES)
                </div>
              </div>

              {/* Cell 2 */}
              <div
                style={{
                  padding: '18px 24px',
                  borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
                }}
              >
                <div
                  className="font-syne font-bold text-[#FF4D00]"
                  style={{ fontSize: '24px', lineHeight: 1 }}
                >
                  ~60%
                </div>
                <div
                  className="font-mono-code text-[#8A847C] mt-2 uppercase"
                  style={{ fontSize: '9px', letterSpacing: '0.08em', lineHeight: 1.3 }}
                >
                  FASTER AI CONTRACT TURNAROUND
                </div>
              </div>

              {/* Cell 3 */}
              <div
                style={{
                  padding: '18px 24px',
                  borderRight: '1px solid rgba(243, 239, 234, 0.09)',
                }}
              >
                <div
                  className="font-syne font-bold text-[#F3EFEA]"
                  style={{ fontSize: '24px', lineHeight: 1 }}
                >
                  30%+
                </div>
                <div
                  className="font-mono-code text-[#8A847C] mt-2 uppercase"
                  style={{ fontSize: '9px', letterSpacing: '0.08em', lineHeight: 1.3 }}
                >
                  EMS QUERY LATENCY REDUCTION
                </div>
              </div>

              {/* Cell 4 */}
              <div
                style={{
                  padding: '18px 24px',
                }}
              >
                <div
                  className="font-syne font-bold text-[#FF4D00]"
                  style={{ fontSize: '24px', lineHeight: 1 }}
                >
                  SIH &apos;25
                </div>
                <div
                  className="font-mono-code text-[#8A847C] mt-2 uppercase"
                  style={{ fontSize: '9px', letterSpacing: '0.08em', lineHeight: 1.3 }}
                >
                  MINISTRY OF DEFENCE FINALIST
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulsePacket {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
