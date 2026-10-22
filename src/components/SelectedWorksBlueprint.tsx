import React, { useState } from 'react'

interface InnovationItem {
  id: string
  title: string
  subtitle: string
  details: string
}

interface ProjectData {
  id: string
  sysNumber: string
  category: string
  title: string
  subtitle: string
  narrative: string
  impact: { label: string; desc: string }[]
  techStack: string
  liveUrl?: string
  swaggerUrl?: string
  githubUrl: string
  diagramNodes: { step: string; name: string; desc: string }[]
  pillars: { title: string; desc: string }[]
  innovations: InnovationItem[]
}

const PROJECTS: ProjectData[] = [
  {
    id: 'skybox',
    sysNumber: 'SYSTEM 01',
    category: 'DEPLOYED PRODUCTION ARTIFACT',
    title: 'Skybox Drive',
    subtitle: 'Fault-Tolerant Distributed Cloud Storage Engine',
    narrative:
      'Building production cloud storage requires eliminating silent failure modes: concurrent upload quota race conditions, path traversal vulnerabilities (../../etc/passwd), memory buffer saturation on large video streams, and hierarchical folder cycle corruption. Skybox Drive was built with a decoupled IStorageProvider architecture, atomic MongoDB $expr pre-allocation locks, RFC 7233 byte-range streaming, and an automated 14-suite integration test harness on an in-memory replica.',
    impact: [
      {
        label: '100% TEST PASS RATE',
        desc: '14 isolated integration test suites running on MongoMemoryServer with zero mocks.',
      },
      {
        label: 'ZERO BUFFER OVERFLOW',
        desc: 'RFC 7233 HTTP 206 chunked byte-range streaming for seamless video seeking without RAM exhaustion.',
      },
      {
        label: 'ATOMIC QUOTA LOCK',
        desc: '$expr atomic pre-allocation guarantees zero quota overruns under concurrent upload race conditions.',
      },
    ],
    techStack:
      'TypeScript (Strict) · Node.js · Express.js · MongoDB · Mongoose · React 18 · Vite · Docker Compose · Zod · Multer · Jest · Supertest · MongoMemoryServer · OpenAPI 3.0',
    liveUrl: 'https://skybox-drive.onrender.com',
    swaggerUrl: 'https://skybox-drive.onrender.com/api-docs',
    githubUrl: 'https://github.com/Unchained-779/Skybox-Drive',
    diagramNodes: [
      { step: '01', name: 'Client Multipart Stream', desc: 'Chunked binary stream with MIME verification' },
      { step: '02', name: 'MongoDB $expr Atomic Quota Lock', desc: 'Pre-allocates quota before bytes hit disk' },
      { step: '03', name: 'Multer Guard & Rollback Bus', desc: 'Mid-flight byte interceptor & disk unlinking' },
      { step: '04', name: 'IStorageProvider (UUID Disk / S3)', desc: 'Randomized UUID persistence & range streaming' },
    ],
    pillars: [
      {
        title: 'Polymorphic Storage Engine (Adapter Pattern)',
        desc: 'Core domain logic talks exclusively to an IStorageProvider interface. Hot-swapping between Local UUID Disk, AWS S3, Cloudflare R2, or MinIO requires toggling a single env variable with zero code modifications.',
      },
      {
        title: 'Path Traversal & Injection Shield',
        desc: 'User filenames and extensions never touch the physical disk. Storage writes files strictly using random internal UUIDs (./storage_data/<uuid>), neutralizing path traversal (../../) and executable execution.',
      },
      {
        title: 'Atomic Quota Arbitration & Stream Limiting',
        desc: 'Pre-allocates quota atomically in MongoDB using $expr before disk I/O. If a client aborts or exceeds size, automated rollback unlinks physical disk artifacts and reverts quota counters.',
      },
      {
        title: 'RFC 7233 HTTP 206 Partial Content Streaming',
        desc: 'Implements RFC 7233 range requests (Range: bytes=start-end) enabling smooth in-browser video and audio seeking without loading multi-gigabyte media into server heap RAM.',
      },
    ],
    innovations: [
      {
        id: 'sky-1',
        title: '01 / IStorageProvider Decoupled Adapter Pattern',
        subtitle: 'Storage Infrastructure Abstraction',
        details:
          'Decouples file persistence from business logic. The application interacts with saveFile, getFileStream, deleteFile, and getFileMetadata methods. Switching from Local Disk to AWS S3, Cloudflare R2, or MinIO is achieved by setting STORAGE_DRIVER=s3 without altering any service layer code.',
      },
      {
        id: 'sky-2',
        title: '02 / UUID Disk Isolation Against Path Traversal Attacks',
        subtitle: 'Filesystem Sandboxing',
        details:
          'User-supplied filenames and extensions are never written to physical disk. Storage writes files strictly using randomized internal UUIDs (./storage_data/<uuid>). Human filenames, MIME types, and folder structures exist strictly as metadata fields in MongoDB, neutralizing directory traversal (../../etc/passwd) and arbitrary file execution.',
      },
      {
        id: 'sky-3',
        title: '03 / Atomic Quota Reservation ($expr) + Multer Stream Rollback',
        subtitle: 'Concurrency Race Condition Prevention',
        details:
          'Solves concurrent upload race conditions by pre-allocating storage quota atomically in MongoDB using $expr before any byte hits the physical disk. If an upload would exceed quota, it is rejected with HTTP 413 before disk I/O. A Multer stream limiter intercepts malicious clients mid-flight, triggering automated rollbacks that unlink physical artifacts and revert quota.',
      },
      {
        id: 'sky-4',
        title: '04 / Cumulative Version Quota Accounting Engine',
        subtitle: 'Historical Revision State Machine',
        details:
          'Full historical versioning engine: uploading a new version pushes the old version into a versions subdocument array while swapping the active head. Quota accurately tracks all versions: usedStorage increments by vN.size. Permanently purging a file decrements quota by head.size + sum(versions.sizes). Older versions can be restored instantly.',
      },
      {
        id: 'sky-5',
        title: '05 / Cycle-Safe Folder Movement (Adjacency List + Ancestor Path)',
        subtitle: 'Hierarchical Tree Traversal',
        details:
          'Folders track both direct parentId and an indexed array of ancestors. Moving a folder performs cycle-detection validation (rejecting attempts to move a parent into any of its own descendants) and executes a bulk update to rewrite ancestor paths across all nested subtrees.',
      },
      {
        id: 'sky-6',
        title: '06 / Partial Filter Unique Trash Indexes ({ isTrash: false })',
        subtitle: 'Conflict-Free Soft Deletion',
        details:
          'Compound indexes { ownerId: 1, parentId: 1, name: 1 } apply { unique: true, partialFilterExpression: { isTrash: false } }. This allows users to soft-delete multiple files/folders with the exact same name over time without MongoDB unique key collision errors.',
      },
      {
        id: 'sky-7',
        title: '07 / RFC 7233 HTTP 206 Byte-Range Media Streaming',
        subtitle: 'High-Performance Video/Audio Delivery',
        details:
          'Implemented RFC 7233 range requests (Range: bytes=start-end) enabling smooth, non-buffering in-browser video and audio seeking without loading entire large files into server RAM buffers.',
      },
      {
        id: 'sky-8',
        title: '08 / Hierarchical RBAC & IDOR Immunity',
        subtitle: 'Granular Access Governance',
        details:
          'Access control resolves in strict hierarchy: Owner -> Editor -> Viewer -> Inherited Folder Permissions -> Expirable Public Token Links. Every read, update, download, or delete operation checks ownership and shared grants, eliminating Insecure Direct Object References (IDOR).',
      },
      {
        id: 'sky-9',
        title: '09 / 14 Isolated Integration Suites on MongoMemoryServer',
        subtitle: 'Zero-Mock Automated Verification',
        details:
          '14 integration test suites running on Jest, Supertest, and an isolated in-memory MongoMemoryServer (100% pass rate). Multi-container Docker Compose file coordinates frontend, backend, and MongoDB services, with multi-stage Dockerfiles for optimized production builds.',
      },
    ],
  },
  {
    id: 'deetx',
    sysNumber: 'SYSTEM 02',
    category: 'FULL-STACK LUXURY COMMERCE',
    title: 'DeeT-X Fashion',
    subtitle: 'Multi-Tenant Luxury Editorial E-Commerce Architecture',
    narrative:
      'Luxury haute couture storefronts demand zero-waterfall initial page rendering, fluid 60fps editorial aesthetics, and strict inventory reconciliation. Generic Shopify templates fail on brand prestige and latency. DeeT-X was engineered using Next.js 16 App Router Server Components, type-safe "use server" mutations, global database connection pooling, and localized domestic logistics modules.',
    impact: [
      {
        label: 'ZERO-WATERFALL FCP',
        desc: 'Direct Server Component database hydration delivers fully populated HTML on initial page load.',
      },
      {
        label: '0.00% STOCK COLLISION',
        desc: 'Atomic stock decrements and inventory reservation within ACID database transactions.',
      },
      {
        label: 'HMR POOL CONSERVATION',
        desc: 'Cached Prisma singleton on globalThis preserves database sockets across development hot reloads.',
      },
    ],
    techStack:
      'Next.js 16 (App Router) · React 19 · TypeScript (Strict) · PostgreSQL · Prisma ORM · Tailwind CSS v4 · Zustand · Framer Motion · NextAuth.js v5 · Razorpay · Cloudinary · Resend · Lenis Scroll',
    githubUrl: 'https://github.com/Unchained-779/Deet-X-Fashion',
    diagramNodes: [
      { step: '01', name: 'Next.js 16 RSC Page', desc: 'Server-side direct DB hydration with zero client waterfalls' },
      { step: '02', name: 'Prisma Client Pool (globalThis)', desc: 'Cached singleton socket preservation' },
      { step: '03', name: 'Server Actions ("use server")', desc: 'Type-safe RPC mutation for orders & inventory' },
      { step: '04', name: 'Razorpay HMAC Webhook & Resend', desc: 'Cryptographic signature verification & PDF receipts' },
    ],
    pillars: [
      {
        title: 'Zero-Waterfall Server Components (RSC)',
        desc: 'Replaces client-side fetching waterfalls with React Server Components querying PostgreSQL directly via Prisma on the server. Delivers fully rendered HTML for instant First Contentful Paint and flawless SEO.',
      },
      {
        title: 'Type-Safe Server Actions ("use server")',
        desc: 'Replaces fragile REST API glue with type-safe server RPC functions for mutations. Eliminates boilerplate client fetch wrappers and CORS overhead while preserving strict TypeScript validation.',
      },
      {
        title: 'HMR Connection Pool Preservation',
        desc: 'Caches the PrismaClient instance on Node.js globalThis to eliminate Next.js Hot Module Replacement connection exhaustion (P1001: Too Many Connections) across hot reloads.',
      },
      {
        title: 'Domestic Logistics & HMAC Security',
        desc: 'Interactive 6-digit Indian PIN code delivery checker, Razorpay payment processing with server-side HMAC SHA-256 webhook validation, and Resend automated PDF receipt pipeline.',
      },
    ],
    innovations: [
      {
        id: 'deet-1',
        title: '01 / Zero-Waterfall Server-Side Rendering (Next.js 16 App Router)',
        subtitle: 'Instant First Contentful Paint',
        details:
          'Replaced client-side fetching with React Server Components (RSC) querying PostgreSQL directly via Prisma ORM on the server. Delivers fully populated HTML to the browser on initial page load for instantaneous First Contentful Paint (FCP) and optimal search engine indexing.',
      },
      {
        id: 'deet-2',
        title: '02 / Next.js Server Actions ("use server") for Direct RPC',
        subtitle: 'Type-Safe Server Mutations',
        details:
          'Replaced fragile REST API endpoints with type-safe server RPC functions for form mutations (e.g. createProduct, inventory updates). Eliminates redundant API route glue code, client fetch wrappers, and CORS configuration while preserving strict TypeScript schema validation.',
      },
      {
        id: 'deet-3',
        title: '03 / Database Connection Pooling Optimization on globalThis',
        subtitle: 'Socket Pool Conservation',
        details:
          'Solved Next.js Hot Module Replacement (HMR) connection exhaustion (P1001 / P5010: Too Many Connections) in development by caching the PrismaClient instance on Node.js globalThis, preserving database socket pools across hot reloads.',
      },
      {
        id: 'deet-4',
        title: '04 / Zustand Reactive Bag State with LocalStorage Hydration',
        subtitle: 'Hydration-Safe Cart Store',
        details:
          'Built a high-performance slide-over cart drawer with smooth animations. Computes dynamic free-shipping progress indicators, persists across sessions, and syncs seamlessly between client and server without hydration mismatch errors.',
      },
      {
        id: 'deet-5',
        title: '05 / Indian Logistics & 6-Digit PIN Code Checker',
        subtitle: 'Localized Domestic Delivery Engine',
        details:
          'Built an interactive 6-digit Indian PIN Code serviceability checker integrated with backend logistics rules and delivery day estimators for accurate postal routing.',
      },
      {
        id: 'deet-6',
        title: '06 / Razorpay Payment Gateway & HMAC SHA-256 Webhook Verification',
        subtitle: 'Cryptographic Order Reconciliation',
        details:
          'Razorpay payment gateway integration with server-side HMAC SHA-256 webhook signature verification to prevent order tampering, paired with automated Resend PDF invoice dispatch.',
      },
      {
        id: 'deet-7',
        title: '07 / Admin Atelier & Inventory Portal (NextAuth v5 RBAC)',
        subtitle: 'Role-Based Production Atelier',
        details:
          'Restricted administration dashboard protected by NextAuth.js v5 RBAC for real-time inventory adjustments, product variant SKU management, and order fulfillment status tracking.',
      },
    ],
  },
  {
    id: 'vakeel',
    sysNumber: 'SYSTEM 03',
    category: 'ENTERPRISE AI CONTRACT AUDITING',
    title: 'VakeelEasy v2',
    subtitle: 'Autonomous AI Contract Auditing & Risk Governance Engine',
    narrative:
      'Reviewing complex legal contracts manually costs thousands of dollars and takes days, often missing uncapped liabilities and hostile indemnification traps. VakeelEasy v2 coordinates a 5-stage asynchronous document ingestion pipeline using AWS S3 presigned URLs, BullMQ background queues, and Google Gemini Pro LLM with strict Zod JSON schemas, protected by 5 enterprise resilience patterns.',
    impact: [
      {
        label: '~60% FASTER REVIEW',
        desc: 'Reduces contract audit turnaround from several days to minutes with structured risk scoring.',
      },
      {
        label: 'ZERO SERVER OOM',
        desc: 'AWS S3 presigned direct uploads bypass Node.js server RAM buffers entirely.',
      },
      {
        label: 'CIRCUIT BREAKER SHIELD',
        desc: 'Opossum circuit breaker isolates LLM failures across Closed, Open, and Half-Open states.',
      },
    ],
    techStack:
      'Node.js · Express.js · TypeScript · PostgreSQL (Prisma) · MongoDB (Mongoose) · Google Gemini Pro LLM · pdf-parse · AWS S3 Presigned URLs · BullMQ · Redis · Zod · JWT · Razorpay',
    githubUrl: 'https://github.com/Unchained-779/VakeelEasy',
    diagramNodes: [
      { step: '01', name: 'AWS S3 Direct Ingest', desc: 'Presigned upload bypasses server memory' },
      { step: '02', name: 'Transactional Outbox & BullMQ', desc: 'PostgreSQL ACID event logging & Redis queue' },
      { step: '03', name: 'pdf-parse Semantic Chunking', desc: 'Splits clauses into indemnity, IP, and liability' },
      { step: '04', name: 'Gemini Pro + Zod Guardrails', desc: 'Structured JSON schema extraction & risk scoring' },
    ],
    pillars: [
      {
        title: 'Zero-RAM Direct Ingestion (AWS S3 Presigned URLs)',
        desc: 'Client uploads multi-hundred-page contract PDFs directly to AWS S3 via presigned URLs. Bypasses API server heap memory buffers entirely, eliminating out-of-memory crashes.',
      },
      {
        title: 'Transactional Outbox Pattern',
        desc: 'Writes document records and queue events into PostgreSQL within the same ACID transaction, eliminating dual-write inconsistencies between the database and background message broker.',
      },
      {
        title: 'Semantic Clause Extraction Engine',
        desc: 'Ingests raw text via pdf-parse and partitions documents into discrete semantic clause clusters (Indemnity, Limitation of Liability, IP, Termination, Jurisdiction) for parallel AI analysis.',
      },
      {
        title: 'Deterministic Zod Guardrail Enforcement',
        desc: 'Constrains Google Gemini Pro LLM responses to strict Zod JSON schemas, guaranteeing structured risk classification without hallucinations or formatting drift.',
      },
    ],
    innovations: [
      {
        id: 'vak-1',
        title: '01 / Stage 1: AWS S3 Presigned Direct Upload',
        subtitle: 'Zero-RAM Server Ingestion',
        details:
          'Client uploads large contract PDFs directly to AWS S3 via presigned URLs, bypassing API server memory buffers and preventing server OOM crashes during heavy multi-user upload bursts.',
      },
      {
        id: 'vak-2',
        title: '02 / Stage 2: Transactional Outbox -> BullMQ Async Queue',
        subtitle: 'Decoupled Worker Processing',
        details:
          'Decoupled document processing from the HTTP request-response cycle using background worker queues with automatic exponential backoff retry policies.',
      },
      {
        id: 'vak-3',
        title: '03 / Stage 3: Semantic Legal Text Chunking',
        subtitle: 'Domain-Specific Clause Partitioning',
        details:
          'Ingests raw text via pdf-parse and partitions documents into discrete semantic clause clusters (Indemnity, Limitation of Liability, Intellectual Property, Termination, Jurisdiction).',
      },
      {
        id: 'vak-4',
        title: '04 / Stage 4: Google Gemini Pro LLM Risk Analysis Engine',
        subtitle: 'Deterministic Structured Auditing',
        details:
          'Streams structured prompts with Zod-enforced JSON schema outputs, identifying hidden risks, assigning risk severity badges (Critical, Moderate, Low), and translating legalese into plain English.',
      },
      {
        id: 'vak-5',
        title: '05 / Stage 5: Confidence Scoring & Side-by-Side Review',
        subtitle: 'Human-in-the-Loop Override Interface',
        details:
          'Assigns confidence scores to AI extractions and renders an interactive side-by-side legal viewer where lawyers or clients can verify, annotate, or override clauses.',
      },
      {
        id: 'vak-6',
        title: '06 / Pattern 1: Controller-Service-Repository Pattern',
        subtitle: 'Clean Architectural Layering',
        details:
          'Controllers handle HTTP transport and validation; Services handle business logic and AI orchestration; Repositories handle database queries. Enables isolated testing without mocking HTTP request objects.',
      },
      {
        id: 'vak-7',
        title: '07 / Pattern 2: Transactional Outbox Pattern',
        subtitle: 'Dual-Write Inconsistency Prevention',
        details:
          'Inscribes events into PostgreSQL within the same ACID transaction as the domain entity, preventing dual-write inconsistencies between the relational database and background worker queues.',
      },
      {
        id: 'vak-8',
        title: '08 / Pattern 3: Redis Redlock Distributed Locking',
        subtitle: 'Cluster Slot Serialization',
        details:
          'Eliminates race conditions during simultaneous booking attempts for lawyer consultation slots across clustered backend containers with automatic TTL expiration.',
      },
      {
        id: 'vak-9',
        title: '09 / Pattern 4: Circuit Breaker Pattern (Opossum)',
        subtitle: 'Fault-Isolated Degradation',
        details:
          'Wraps external network calls to Gemini LLM and cloud APIs; fast-fails requests when downstream services degrade across Closed, Open, and Half-Open states to prevent socket pool exhaustion.',
      },
      {
        id: 'vak-10',
        title: '10 / Pattern 5: Idempotency Key Middleware & SIGTERM Graceful Shutdown',
        subtitle: 'Production Process Resilience',
        details:
          'Uses Redis key-value caching with expiration to guarantee repeated payment or booking requests return cached responses without duplicate billing. Traps SIGTERM to drain worker jobs cleanly.',
      },
    ],
  },
]

export const SelectedWorksBlueprint: React.FC = () => {
  // Mode toggle state per project: 'diagram' (Mode A) | 'innovations' (Mode B)
  const [projectModes, setProjectModes] = useState<Record<string, 'diagram' | 'innovations'>>({
    skybox: 'diagram',
    deetx: 'diagram',
    vakeel: 'diagram',
  })

  // Accordion active innovation per project
  const [activeInnovation, setActiveInnovation] = useState<Record<string, string>>({
    skybox: 'sky-1',
    deetx: 'deet-1',
    vakeel: 'vak-1',
  })

  const toggleMode = (projectId: string, mode: 'diagram' | 'innovations') => {
    setProjectModes((prev) => ({ ...prev, [projectId]: mode }))
  }

  const toggleInnovation = (projectId: string, innovationId: string) => {
    setActiveInnovation((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === innovationId ? '' : innovationId,
    }))
  }

  return (
    <section
      id="works"
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
              INDEX // 02
            </span>
            <h2
              className="font-syne font-bold text-[#F3EFEA] tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Selected Systems Architecture &amp; Case Studies
            </h2>
          </div>

          <span
            className="font-mono-code text-[#8A847C] tracking-wider shrink-0"
            style={{ fontSize: '10px' }}
          >
            3 FLAGSHIP PRODUCTION REPOSITORIES // DUAL-MODE INSPECTION
          </span>
        </div>

        {/* 3 Full-Width Flagship Dossiers */}
        {PROJECTS.map((proj, idx) => {
          const currentMode = projectModes[proj.id] || 'diagram'
          const currentActiveInn = activeInnovation[proj.id]

          return (
            <article
              key={proj.id}
              className="relative w-full"
              style={{
                borderBottom:
                  idx < PROJECTS.length - 1
                    ? '1px solid rgba(243, 239, 234, 0.09)'
                    : 'none',
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
                className="pointer-events-none absolute z-20 hidden lg:block font-mono-code font-bold text-[#FF4D00]"
                style={{ top: 0, left: '41.666667%', transform: 'translate(-50%, -50%)', fontSize: '13px' }}
              >
                +
              </span>
              <span
                className="pointer-events-none absolute z-20 font-mono-code font-bold text-[#FF4D00]"
                style={{ top: 0, right: 0, transform: 'translate(50%, -50%)', fontSize: '13px' }}
              >
                +
              </span>

              {/* TOP DOSSIER BAR (12 Columns) */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{
                  padding: '16px clamp(20px, 4vw, 48px)',
                  borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
                  backgroundColor: 'rgba(18, 17, 14, 0.65)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono-code font-semibold text-[#FF4D00]"
                    style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                  >
                    {proj.sysNumber} // {proj.category}
                  </span>
                </div>

                {/* Direct Sharp Action Links */}
                <div className="flex flex-wrap items-center gap-2">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-interactive="true"
                      className="font-mono-code font-semibold transition-all duration-150 inline-flex items-center gap-1"
                      style={{
                        fontSize: '11px',
                        padding: '8px 16px',
                        backgroundColor: '#FF4D00',
                        color: '#0C0B09',
                        textDecoration: 'none',
                        letterSpacing: '0.12em',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E04400'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FF4D00'
                      }}
                    >
                      LIVE APPLICATION ↗
                    </a>
                  )}

                  {proj.swaggerUrl && (
                    <a
                      href={proj.swaggerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-interactive="true"
                      className="font-mono-code transition-all duration-150 inline-flex items-center gap-1"
                      style={{
                        fontSize: '11px',
                        padding: '8px 16px',
                        backgroundColor: '#12110E',
                        color: '#F3EFEA',
                        border: '1px solid rgba(243, 239, 234, 0.15)',
                        textDecoration: 'none',
                        letterSpacing: '0.12em',
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
                      SWAGGER API DOCS ↗
                    </a>
                  )}

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-interactive="true"
                    className="font-mono-code transition-all duration-150 inline-flex items-center gap-1"
                    style={{
                      fontSize: '11px',
                      padding: '8px 16px',
                      backgroundColor: '#12110E',
                      color: '#F3EFEA',
                      border: '1px solid rgba(243, 239, 234, 0.15)',
                      textDecoration: 'none',
                      letterSpacing: '0.12em',
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
                    GITHUB REPOSITORY ↗
                  </a>
                </div>
              </div>

              {/* MAIN 12-COLUMN SPLIT */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* ============================================================ */}
                {/* LEFT 5 COLUMNS: Systems Problem vs Architecture Narrative    */}
                {/* ============================================================ */}
                <div
                  className="lg:col-span-5 flex flex-col justify-between"
                  style={{
                    padding: 'clamp(28px, 4vw, 48px)',
                    borderRight: '1px solid rgba(243, 239, 234, 0.09)',
                  }}
                >
                  <div>
                    {/* Project Title & Subtitle */}
                    <h3
                      className="font-syne font-bold text-[#F3EFEA] tracking-tight"
                      style={{ fontSize: '38px', margin: 0, lineHeight: 1.05 }}
                    >
                      {proj.title}
                    </h3>
                    <div
                      className="font-instrument italic text-[#8A847C] mt-2 mb-6"
                      style={{ fontSize: '26px', lineHeight: 1.15 }}
                    >
                      {proj.subtitle}
                    </div>

                    {/* Narrative */}
                    <p
                      className="font-jakarta text-[#8A847C]"
                      style={{
                        fontSize: '14.5px',
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {proj.narrative}
                    </p>

                    {/* Quantified Impact Strip */}
                    <div
                      className="mt-8 space-y-3"
                      style={{
                        border: '1px solid rgba(243, 239, 234, 0.09)',
                        padding: '18px 20px',
                        backgroundColor: '#12110E',
                      }}
                    >
                      <div
                        className="font-mono-code text-[#FF4D00] text-[10px] tracking-widest uppercase mb-2"
                      >
                        QUANTIFIED IMPACT &amp; VERIFICATION
                      </div>
                      {proj.impact.map((imp) => (
                        <div key={imp.label} className="border-b border-white/[0.04] pb-2 last:border-b-0 last:pb-0">
                          <div
                            className="font-mono-code text-[#F3EFEA] font-semibold text-[11px]"
                          >
                            {imp.label}
                          </div>
                          <div
                            className="font-jakarta text-[#8A847C] text-[12px] mt-0.5 leading-snug"
                          >
                            {imp.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complete Tech Stack String */}
                  <div
                    className="mt-8 pt-6"
                    style={{
                      borderTop: '1px solid rgba(243, 239, 234, 0.09)',
                    }}
                  >
                    <div
                      className="font-mono-code text-[#8A847C] text-[10px] tracking-widest uppercase mb-1.5"
                    >
                      PRODUCTION ARCHITECTURE STACK
                    </div>
                    <div
                      className="font-mono-code text-[#FF4D00] text-[11px] leading-relaxed"
                    >
                      {proj.techStack}
                    </div>
                  </div>
                </div>

                {/* ============================================================ */}
                {/* RIGHT 7 COLUMNS: Interactive 2-Mode Engineering Inspector    */}
                {/* ============================================================ */}
                <div
                  className="lg:col-span-7 flex flex-col justify-between"
                  style={{
                    padding: 'clamp(28px, 4vw, 48px)',
                    backgroundColor: 'rgba(18, 17, 14, 0.35)',
                  }}
                >
                  <div>
                    {/* Sharp 2-Mode Toggle Bar */}
                    <div
                      className="flex flex-wrap items-center mb-8"
                      style={{
                        border: '1px solid rgba(243, 239, 234, 0.12)',
                        backgroundColor: '#0C0B09',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleMode(proj.id, 'diagram')}
                        data-interactive="true"
                        className="flex-1 py-3 px-4 font-mono-code transition-all duration-150 cursor-pointer text-center truncate"
                        style={{
                          fontSize: '10.5px',
                          letterSpacing: '0.08em',
                          backgroundColor:
                            currentMode === 'diagram' ? '#FF4D00' : 'transparent',
                          color: currentMode === 'diagram' ? '#0C0B09' : '#8A847C',
                          fontWeight: currentMode === 'diagram' ? 600 : 400,
                          borderRadius: '0px',
                          outline: 'none',
                        }}
                      >
                        [ MODE A: SYSTEM ARCHITECTURE &amp; DATA FLOW ]
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleMode(proj.id, 'innovations')}
                        data-interactive="true"
                        className="flex-1 py-3 px-4 font-mono-code transition-all duration-150 cursor-pointer text-center truncate"
                        style={{
                          fontSize: '10.5px',
                          letterSpacing: '0.08em',
                          backgroundColor:
                            currentMode === 'innovations' ? '#FF4D00' : 'transparent',
                          color: currentMode === 'innovations' ? '#0C0B09' : '#8A847C',
                          fontWeight: currentMode === 'innovations' ? 600 : 400,
                          borderRadius: '0px',
                          outline: 'none',
                          borderLeft: '1px solid rgba(243, 239, 234, 0.12)',
                        }}
                      >
                        [ MODE B: CORE ENGINEERING INNOVATIONS ({proj.innovations.length}) ]
                      </button>
                    </div>

                    {/* ======================================================= */}
                    {/* MODE A: SYSTEM ARCHITECTURE & SVG FLOW                 */}
                    {/* ======================================================= */}
                    {currentMode === 'diagram' && (
                      <div className="space-y-6">
                        {/* Custom SVG Architecture Block Diagram */}
                        <div
                          className="p-5"
                          style={{
                            backgroundColor: '#0C0B09',
                            border: '1px solid rgba(243, 239, 234, 0.09)',
                          }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span
                              className="font-mono-code text-[#FF4D00] text-[10px] tracking-widest uppercase"
                            >
                              REQUEST LIFECYCLE &amp; BUS TOPOLOGY
                            </span>
                            <span
                              className="font-mono-code text-[#8A847C] text-[10px]"
                            >
                              PULSE: ACTIVE
                            </span>
                          </div>

                          {/* Pipeline Steps with animated signal lines */}
                          <div className="space-y-2 relative">
                            {proj.diagramNodes.map((node, nodeIdx) => (
                              <React.Fragment key={node.step}>
                                <div
                                  className="flex items-center justify-between p-3.5 transition-colors duration-150"
                                  style={{
                                    backgroundColor: '#12110E',
                                    border: '1px solid rgba(243, 239, 234, 0.08)',
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    <span
                                      className="font-mono-code text-[#FF4D00] text-[11px] font-bold"
                                    >
                                      {node.step}
                                    </span>
                                    <div>
                                      <div
                                        className="font-mono-code text-[#F3EFEA] font-medium text-[12px]"
                                      >
                                        {node.name}
                                      </div>
                                      <div
                                        className="font-jakarta text-[#8A847C] text-[11px] mt-0.5"
                                      >
                                        {node.desc}
                                      </div>
                                    </div>
                                  </div>
                                  <span
                                    className="font-mono-code text-[#8A847C] text-[10px] hidden sm:inline"
                                  >
                                    STAGE // 0{nodeIdx + 1}
                                  </span>
                                </div>

                                {nodeIdx < proj.diagramNodes.length - 1 && (
                                  <div className="flex items-center justify-center my-0.5">
                                    <div
                                      className="relative overflow-hidden"
                                      style={{
                                        width: '1px',
                                        height: '16px',
                                        backgroundColor: 'rgba(243, 239, 234, 0.15)',
                                      }}
                                    >
                                      <div
                                        className="absolute top-0 left-0 w-full"
                                        style={{
                                          height: '6px',
                                          backgroundColor: '#FF4D00',
                                          animation: 'pulsePacket 1.5s ease-in-out infinite',
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        {/* 4 Core Architectural Pillars in a 2x2 Grid */}
                        <div>
                          <div
                            className="font-mono-code text-[#8A847C] text-[10px] tracking-widest uppercase mb-3"
                          >
                            CORE ARCHITECTURAL PILLARS (2x2 PROOF GRID)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {proj.pillars.map((pillar) => (
                              <div
                                key={pillar.title}
                                className="p-4"
                                style={{
                                  backgroundColor: '#12110E',
                                  border: '1px solid rgba(243, 239, 234, 0.09)',
                                }}
                              >
                                <div
                                  className="font-syne font-bold text-[#F3EFEA] text-[14px] mb-1.5"
                                >
                                  {pillar.title}
                                </div>
                                <p
                                  className="font-jakarta text-[#8A847C] text-[12px] leading-relaxed m-0"
                                >
                                  {pillar.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ======================================================= */}
                    {/* MODE B: CORE ENGINEERING INNOVATIONS (ACCORDION)       */}
                    {/* ======================================================= */}
                    {currentMode === 'innovations' && (
                      <div className="space-y-2.5">
                        <div
                          className="font-mono-code text-[#8A847C] text-[10px] tracking-widest uppercase mb-3 flex items-center justify-between"
                        >
                          <span>LINE-BY-LINE PRODUCTION IMPLEMENTATION DETAILS</span>
                          <span className="text-[#FF4D00]">{proj.innovations.length} INNOVATIONS</span>
                        </div>

                        {proj.innovations.map((inn) => {
                          const isOpen = currentActiveInn === inn.id

                          return (
                            <div
                              key={inn.id}
                              style={{
                                backgroundColor: isOpen ? '#171411' : '#12110E',
                                border: isOpen
                                  ? '1px solid #FF4D00'
                                  : '1px solid rgba(243, 239, 234, 0.09)',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => toggleInnovation(proj.id, inn.id)}
                                data-interactive="true"
                                className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  outline: 'none',
                                  borderRadius: '0px',
                                }}
                              >
                                <div>
                                  <div
                                    className="font-syne font-bold text-[14px] transition-colors"
                                    style={{
                                      color: isOpen ? '#F3EFEA' : 'rgba(243, 239, 234, 0.85)',
                                    }}
                                  >
                                    {inn.title}
                                  </div>
                                  <div
                                    className="font-mono-code text-[#8A847C] text-[10px] mt-0.5 tracking-wider uppercase"
                                  >
                                    {inn.subtitle}
                                  </div>
                                </div>

                                <span
                                  className="font-mono-code text-[14px] ml-4 transition-transform duration-150"
                                  style={{
                                    color: isOpen ? '#FF4D00' : '#8A847C',
                                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                    display: 'inline-block',
                                  }}
                                >
                                  +
                                </span>
                              </button>

                              {isOpen && (
                                <div
                                  className="px-4 pb-4 pt-1"
                                  style={{
                                    borderTop: '1px solid rgba(243, 239, 234, 0.06)',
                                  }}
                                >
                                  <p
                                    className="font-jakarta text-[#F3EFEA] text-[13px] leading-relaxed m-0"
                                  >
                                    {inn.details}
                                  </p>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
