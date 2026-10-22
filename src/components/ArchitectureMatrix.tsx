import React, { useState } from 'react'

interface TechNode {
  id: string
  index: string
  name: string
  domain: string
  tag: string
  pattern: string
  proof: string
  verifiedIn: string[]
  snippet: {
    lang: string
    code: string
  }
}

const TECH_NODES: TechNode[] = [
  {
    id: 'ts',
    index: '01',
    name: 'TypeScript (Strict)',
    domain: 'LANG & RUNTIME',
    tag: 'SYSTEM CORE // TYPE_SAFETY',
    pattern: 'Discriminated Union Protocol & Runtime Guards',
    proof:
      'Enforced zero-any policy, discriminated unions, and Zod runtime schema validation across Skybox Drive, DeeT-X Fashion, and VakeelEasy v2.',
    verifiedIn: ['Skybox Drive', 'DeeT-X', 'VakeelEasy'],
    snippet: {
      lang: 'typescript',
      code: `// Strict Zod + Discriminated Result Union
export type StorageResult<T> =
  | { success: true; data: T; quotaUsed: number }
  | { success: false; error: 'QUOTA_EXCEEDED' | 'INTEGRITY_FAIL' };

export const ResultSchema = z.discriminatedUnion('success', [
  z.object({ success: z.literal(true), data: z.unknown(), quotaUsed: z.number() }),
  z.object({ success: z.literal(false), error: z.enum(['QUOTA_EXCEEDED', 'INTEGRITY_FAIL']) })
]);`,
    },
  },
  {
    id: 'node',
    index: '02',
    name: 'Node.js & Express',
    domain: 'BACKEND ARCHITECTURE',
    tag: 'BACKEND RUNTIME // REST & STREAMING',
    pattern: 'Controller-Service-Repository & RFC 7233 Byte Streaming',
    proof:
      'Built Controller-Service-Repository REST APIs, RFC 7233 HTTP 206 byte-range media streaming, and SIGTERM graceful worker shutdown handlers.',
    verifiedIn: ['Skybox Drive', 'VakeelEasy', 'Intelliod EMS'],
    snippet: {
      lang: 'typescript',
      code: `// RFC 7233 HTTP 206 Partial Content Stream
const [start, end] = parseRange(req.headers.range, file.size);
res.writeHead(206, {
  'Content-Range': \`bytes \${start}-\${end}/\${file.size}\`,
  'Accept-Ranges': 'bytes',
  'Content-Length': end - start + 1,
});
createReadStream(filePath, { start, end }).pipe(res);`,
    },
  },
  {
    id: 'next',
    index: '03',
    name: 'Next.js 16 (App Router)',
    domain: 'FULLSTACK ARCHITECTURE',
    tag: 'FRONTEND ARCHITECTURE // SSR & RSC',
    pattern: 'Zero-Waterfall React Server Components (RSC)',
    proof:
      "Architected zero-waterfall React Server Components (RSC) and type-safe 'use server' RPC mutations for instant First Contentful Paint.",
    verifiedIn: ['DeeT-X Fashion'],
    snippet: {
      lang: 'tsx',
      code: `// Zero-Waterfall RSC Parallel Hydration
export default async function ProductGrid() {
  const [products, stock] = await Promise.all([
    fetchCatalog(),
    fetchLiveInventory()
  ]);
  return <CatalogView items={products} inventory={stock} />;
}`,
    },
  },
  {
    id: 'mongo',
    index: '04',
    name: 'MongoDB & Mongoose',
    domain: 'PERSISTENCE ENGINE',
    tag: 'DATA PERSISTENCE // ATOMIC CONCURRENCY',
    pattern: '$expr Atomic Quota Reservation & Partial Filter Indexes',
    proof:
      'Engineered $expr atomic quota reservation to prevent concurrent upload race conditions, partial filter unique trash indexes, and 30%+ faster aggregation pipelines.',
    verifiedIn: ['Skybox Drive', 'Intelliod EMS'],
    snippet: {
      lang: 'typescript',
      code: `// Atomic Quota Arbitration via $expr Conditional Update
const res = await User.updateOne(
  {
    _id: userId,
    $expr: { $lte: [{ $add: ['$usedStorage', incomingSize] }, '$storageLimit'] }
  },
  { $inc: { usedStorage: incomingSize } }
);
if (res.matchedCount === 0) throw new QuotaExceededError();`,
    },
  },
  {
    id: 'pg',
    index: '05',
    name: 'PostgreSQL & Prisma',
    domain: 'RELATIONAL STORAGE',
    tag: 'RELATIONAL STORAGE // ACID TRANSACTIONS',
    pattern: 'Transactional Outbox & Singleton Client Cache',
    proof:
      'Implemented ACID Transactional Outbox tables and cached the PrismaClient singleton on Node.js globalThis to eliminate HMR connection exhaustion.',
    verifiedIn: ['DeeT-X Fashion', 'VakeelEasy v2'],
    snippet: {
      lang: 'typescript',
      code: `// Singleton Client & ACID Outbox Transaction
const globalPrisma = (globalThis as any).prisma ?? new PrismaClient();
await globalPrisma.$transaction([
  globalPrisma.order.create({ data: orderPayload }),
  globalPrisma.inventory.update({
    where: { sku: itemSku },
    data: { stock: { decrement: quantity } }
  })
]);`,
    },
  },
  {
    id: 'redis',
    index: '06',
    name: 'Redis & BullMQ',
    domain: 'DISTRIBUTED SYSTEMS',
    tag: 'DISTRIBUTED QUEUES // ASYNC WORKERS',
    pattern: 'Distributed Slot Locking & Exponential Backoff',
    proof:
      'Built asynchronous background PDF processing queues with exponential backoff retries, Redis Redlock distributed slot locking, and atomic idempotency keys.',
    verifiedIn: ['VakeelEasy v2'],
    snippet: {
      lang: 'typescript',
      code: `// BullMQ Ingestion Queue with Exponential Backoff
export const pdfQueue = new Queue('pdf-analysis', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
  }
});`,
    },
  },
  {
    id: 'gemini',
    index: '07',
    name: 'Google Gemini Pro AI',
    domain: 'INTELLIGENCE PIPELINE',
    tag: 'INTELLIGENCE PIPELINE // SEMANTIC AUDITING',
    pattern: 'Structured Zod JSON Schema Enforcement',
    proof:
      'Orchestrated a 5-stage semantic contract analysis pipeline using @google/genai with strict Zod JSON schema enforcement, cutting review time by ~60%.',
    verifiedIn: ['VakeelEasy v2'],
    snippet: {
      lang: 'typescript',
      code: `// 5-Stage Semantic Legal Pipeline with Structured Output
const response = await ai.models.generateContent({
  model: 'gemini-1.5-pro',
  contents: [{ role: 'user', parts: [{ text: clauseText }] }],
  config: {
    responseSchema: RiskDossierZodSchema,
    temperature: 0.1, // Deterministic scoring
  }
});`,
    },
  },
  {
    id: 'docker',
    index: '08',
    name: 'Docker & Compose',
    domain: 'INFRASTRUCTURE',
    tag: 'CONTAINER RUNTIME // MULTI-STAGE BUILDS',
    pattern: 'Multi-Stage Production Layering & Compose Network',
    proof:
      'Authored multi-stage production Dockerfiles and multi-container docker-compose.yml orchestrating API, client, and database services.',
    verifiedIn: ['Skybox Drive'],
    snippet: {
      lang: 'dockerfile',
      code: `# Multi-Stage Production Alpine Container
FROM node:22-alpine AS builder
WORKDIR /app && COPY package*.json ./ && RUN npm ci
COPY . . && RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
USER node && CMD ["node", "dist/server.js"]`,
    },
  },
  {
    id: 'jest',
    index: '09',
    name: 'Jest & Supertest',
    domain: 'AUTOMATION & QA',
    tag: 'AUTOMATED VERIFICATION // INTEGRATION TEST',
    pattern: 'In-Memory MongoMemoryServer 14 Test Suites',
    proof:
      'Built 14 isolated integration test suites running against an in-memory MongoMemoryServer with a 100% automated pass rate.',
    verifiedIn: ['Skybox Drive'],
    snippet: {
      lang: 'typescript',
      code: `// Zero-Mock Integration Suite on In-Memory Replica
beforeAll(async () => { mongod = await MongoMemoryServer.create(); });
it('prevents concurrent quota overrun under simulated load', async () => {
  const tasks = Array(10).fill(null).map(() => request(app).post('/api/upload'));
  const results = await Promise.all(tasks);
  const successes = results.filter(r => r.status === 201);
  expect(successes.length).toBe(1); // Strict concurrency lock
});`,
    },
  },
  {
    id: 's3',
    index: '10',
    name: 'AWS S3 & Storage Adapters',
    domain: 'CLOUD STORAGE',
    tag: 'CLOUD INFRASTRUCTURE // POLYMORPHIC STORAGE',
    pattern: 'Polymorphic IStorageProvider & Presigned Direct Ingest',
    proof:
      'Designed polymorphic IStorageProvider adapters for zero-code S3/R2/local switching and Presigned URLs for zero-RAM PDF ingestion.',
    verifiedIn: ['Skybox Drive', 'VakeelEasy v2'],
    snippet: {
      lang: 'typescript',
      code: `// Polymorphic Storage Interface with Zero-RAM Ingest
export interface IStorageProvider {
  putStream(key: string, stream: Readable): Promise<UploadResult>;
  getSignedReadUrl(key: string, ttl: number): Promise<string>;
  delete(key: string): Promise<void>;
}`,
    },
  },
  {
    id: 'react',
    index: '11',
    name: 'React 19 & Zustand',
    domain: 'CLIENT STATE',
    tag: 'CLIENT STATE // HYDRATION PERSISTENCE',
    pattern: 'Hydration-Safe Cart Store & Framer Transitions',
    proof:
      'Engineered hydration-safe persistent slide-over cart state, dynamic shipping threshold calculators, and 60fps Framer Motion transitions.',
    verifiedIn: ['DeeT-X Fashion', 'Skybox Drive'],
    snippet: {
      lang: 'typescript',
      code: `// Hydration-Safe Persistent Slice with Action Dispatchers
export const useCartStore = create<CartState>()(
  persist((set, get) => ({
    items: [],
    addItem: (item) => set({ items: [...get().items, item] }),
    cartTotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0)
  }), { name: 'deetx_cart_v2' })
);`,
    },
  },
  {
    id: 'security',
    index: '12',
    name: 'Security, RBAC & OAuth',
    domain: 'SYSTEM GOVERNANCE',
    tag: 'SECURITY & GOVERNANCE // ACCESS CONTROL',
    pattern: 'Hierarchical RBAC & Path Traversal UUID Sandboxing',
    proof:
      'Enforced hierarchical RBAC (Owner/Editor/Viewer), UUID disk isolation against path traversal, NextAuth v5, and HMAC SHA-256 webhook verification.',
    verifiedIn: ['Skybox Drive', 'DeeT-X', 'VakeelEasy'],
    snippet: {
      lang: 'typescript',
      code: `// UUID Disk Path Sanitization Against Traversal Attacks
const safeKey = path.basename(uuidv4());
const storagePath = path.resolve(STORAGE_DIR, safeKey);
if (!storagePath.startsWith(path.resolve(STORAGE_DIR))) {
  throw new SecurityViolationError('PATH_TRAVERSAL_DETECTED');
}`,
    },
  },
  {
    id: 'cpp',
    index: '13',
    name: 'C++ & Low-Latency Algos',
    domain: 'EMBEDDED SYSTEMS',
    tag: 'EMBEDDED SYSTEMS // DEFENCE NAVIGATION',
    pattern: 'Doppler Shift Compensation & Pseudorange Solving',
    proof:
      'Formulated low-latency Doppler shift compensation and pseudorange navigation logic under strict embedded memory constraints for the Ministry of Defence.',
    verifiedIn: ['LEO-PNT (SIH 2025 Finalist)'],
    snippet: {
      lang: 'cpp',
      code: `// LEO Satellite Doppler Shift Carrier Frequency Correction
double calculateDopplerOffset(double carrierFreq, double relativeVelocity) {
  constexpr double C_LIGHT = 299792458.0; // m/s
  return (relativeVelocity / C_LIGHT) * carrierFreq;
}`,
    },
  },
  {
    id: 'circuit',
    index: '14',
    name: 'Opossum Circuit Breakers',
    domain: 'FAULT TOLERANCE',
    tag: 'FAULT TOLERANCE // DISTRIBUTED RESILIENCY',
    pattern: 'Tri-State Circuit Breaker (Closed, Open, Half-Open)',
    proof:
      'Wrapped external LLM and cloud network calls across Closed, Open, and Half-Open states to fast-fail during downstream degradation.',
    verifiedIn: ['VakeelEasy v2'],
    snippet: {
      lang: 'typescript',
      code: `// Circuit Breaker Fast-Fail Guard on AI Endpoints
const breaker = new Opossum(invokeGeminiAgent, {
  timeout: 8000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
});
breaker.fallback(() => ({ status: 'DEGRADED_FALLBACK_CACHE' }));`,
    },
  },
  {
    id: 'openapi',
    index: '15',
    name: 'OpenAPI 3.0 & Zod',
    domain: 'CONTRACT GOVERNANCE',
    tag: 'CONTRACT GOVERNANCE // RUNTIME TYPING',
    pattern: 'Interactive Swagger UI & Bidirectional Schema Typing',
    proof:
      'Published interactive Swagger UI documentation and strict request body/query/env runtime validation schemas.',
    verifiedIn: ['Skybox Drive'],
    snippet: {
      lang: 'typescript',
      code: `// Zod Schema to OpenAPI Spec Derivation
export const CreateFileSchema = z.object({
  name: z.string().min(1).max(255),
  mimeType: z.enum(['application/pdf', 'image/png', 'image/jpeg']),
  sizeBytes: z.number().positive().max(100 * 1024 * 1024)
});
export type CreateFileInput = z.infer<typeof CreateFileSchema>;`,
    },
  },
  {
    id: 'devops',
    index: '16',
    name: 'Linux, Nginx & CI/CD',
    domain: 'INFRASTRUCTURE & OPS',
    tag: 'DEVOPS & DEPLOYMENT // EDGE PROXIES',
    pattern: 'Declarative Render Blueprints & Edge Reverse Proxy',
    proof:
      'Configured Render blueprint deployments (render.yaml), Vercel edge routing, and reverse proxy rules.',
    verifiedIn: ['Production Deployments'],
    snippet: {
      lang: 'yaml',
      code: `# Declarative Production Infrastructure Blueprint
services:
  - type: web
    name: skybox-api
    env: node
    plan: starter
    buildCommand: npm ci && npm run build
    startCommand: npm run start:prod`,
    },
  },
]

export const ArchitectureMatrix: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('ts')
  const activeNode = TECH_NODES.find((n) => n.id === activeNodeId) ?? TECH_NODES[0]

  return (
    <section
      id="architecture"
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

        {/* 1. Section Header Bar */}
        <div
          className="flex flex-col md:flex-row md:items-baseline justify-between gap-4"
          style={{
            padding: '28px clamp(20px, 4vw, 48px)',
            borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <span
              className="font-mono-code font-semibold tracking-widest text-[#FF4D00] whitespace-nowrap shrink-0"
              style={{ fontSize: '11px', letterSpacing: '0.2em' }}
            >
              INDEX // 01
            </span>
            <h2
              className="font-syne font-bold text-[#F3EFEA] tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Production Stack &amp; Verification Matrix
            </h2>
          </div>

          <span
            className="font-mono-code text-[#8A847C] tracking-wider shrink-0"
            style={{ fontSize: '10px' }}
          >
            HOVER ANY NODE TO TRACE PRODUCTION IMPLEMENTATION
          </span>
        </div>

        {/* 12-Column Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* ============================================================ */}
          {/* LEFT 7 COLUMNS: The 16 Interactive Technology Cells (4x4)     */}
          {/* ============================================================ */}
          <div
            className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4"
            style={{
              borderRight: '1px solid rgba(243, 239, 234, 0.09)',
            }}
          >
            {TECH_NODES.map((node, index) => {
              const isActive = activeNode.id === node.id
              // Calculate borders for a clean internal grid
              const isRightmost = (index + 1) % 4 === 0
              const isBottomRow = index >= 12

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  data-interactive="true"
                  className="group relative flex flex-col justify-between text-left transition-all duration-150 cursor-pointer"
                  style={{
                    padding: '20px 18px',
                    minHeight: '130px',
                    backgroundColor: isActive ? '#171411' : '#0C0B09',
                    borderRight: isRightmost ? 'none' : '1px solid rgba(243, 239, 234, 0.08)',
                    borderBottom: isBottomRow ? 'none' : '1px solid rgba(243, 239, 234, 0.08)',
                    boxShadow: isActive ? 'inset 0 0 0 1px #FF4D00' : 'none',
                    outline: 'none',
                    borderRadius: '0px',
                  }}
                >
                  {/* Top Row: Index & Active Indicator */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className="font-mono-code transition-colors duration-150"
                      style={{
                        fontSize: '11px',
                        color: isActive ? '#FF4D00' : '#8A847C',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {node.index}
                    </span>
                    {isActive && (
                      <span
                        style={{
                          width: '5px',
                          height: '5px',
                          backgroundColor: '#FF4D00',
                          display: 'inline-block',
                        }}
                      />
                    )}
                  </div>

                  {/* Middle: Technology Name */}
                  <div className="my-2">
                    <div
                      className="font-syne font-bold transition-colors duration-150"
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.25,
                        color: isActive ? '#F3EFEA' : 'rgba(243, 239, 234, 0.85)',
                      }}
                    >
                      {node.name}
                    </div>
                  </div>

                  {/* Bottom: Domain Tag */}
                  <div
                    className="font-mono-code uppercase transition-colors duration-150 truncate"
                    style={{
                      fontSize: '9px',
                      color: isActive ? '#FF4D00' : '#8A847C',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {node.domain}
                  </div>
                </button>
              )
            })}
          </div>

          {/* ============================================================ */}
          {/* RIGHT 5 COLUMNS: Live Production Proof Inspector             */}
          {/* ============================================================ */}
          <div
            className="lg:col-span-5 flex flex-col justify-between"
            style={{
              padding: 'clamp(28px, 4vw, 40px) clamp(20px, 4vw, 36px)',
              backgroundColor: '#12110E',
            }}
          >
            <div>
              {/* Header: Node Spec & Classification */}
              <div
                className="flex items-center justify-between pb-3"
                style={{
                  borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
                }}
              >
                <span
                  className="font-mono-code font-semibold tracking-wider text-[#FF4D00]"
                  style={{ fontSize: '11px' }}
                >
                  NODE_SPEC // {activeNode.index} — {activeNode.name}
                </span>
                <span
                  className="font-mono-code text-[#8A847C]"
                  style={{ fontSize: '10px' }}
                >
                  VERIFIED
                </span>
              </div>

              {/* Tag & Architectural Pattern */}
              <div className="mt-5">
                <span
                  className="font-mono-code text-[#8A847C] block"
                  style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                >
                  {activeNode.tag}
                </span>
                <h3
                  className="font-syne font-bold text-[#F3EFEA] mt-1"
                  style={{ fontSize: '18px', lineHeight: 1.3 }}
                >
                  {activeNode.pattern}
                </h3>
              </div>

              {/* Production Proof Description */}
              <div
                className="mt-4 p-4"
                style={{
                  backgroundColor: '#0C0B09',
                  border: '1px solid rgba(243, 239, 234, 0.09)',
                }}
              >
                <div
                  className="font-mono-code text-[#FF4D00] text-[10px] tracking-widest mb-1 uppercase"
                >
                  PRODUCTION VERIFICATION &amp; DEFENCE
                </div>
                <p
                  className="font-jakarta text-[#F3EFEA]"
                  style={{ fontSize: '13px', lineHeight: 1.6, margin: 0 }}
                >
                  {activeNode.proof}
                </p>
              </div>

              {/* Live Code / Architecture Snippet Preview */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="font-mono-code text-[#8A847C]"
                    style={{ fontSize: '10px', letterSpacing: '0.08em' }}
                  >
                    PRODUCTION CODE SNIPPET [{activeNode.snippet.lang.toUpperCase()}]
                  </span>
                  <span
                    className="font-mono-code text-[#FF4D00]"
                    style={{ fontSize: '10px' }}
                  >
                    SYSTEM RUNTIME
                  </span>
                </div>

                <div
                  className="relative p-4 overflow-x-auto"
                  style={{
                    backgroundColor: '#0C0B09',
                    border: '1px solid rgba(243, 239, 234, 0.12)',
                  }}
                >
                  <pre
                    className="font-mono-code text-[#F3EFEA]"
                    style={{
                      fontSize: '11px',
                      lineHeight: 1.55,
                      margin: 0,
                      tabSize: 2,
                    }}
                  >
                    <code>{activeNode.snippet.code}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Clickable Verified Project Badges (Bottom of Inspector) */}
            <div
              className="mt-6 pt-4"
              style={{
                borderTop: '1px solid rgba(243, 239, 234, 0.09)',
              }}
            >
              <div
                className="font-mono-code text-[#8A847C] mb-2"
                style={{ fontSize: '10px', letterSpacing: '0.08em' }}
              >
                VERIFIED IN PRODUCTION SYSTEMS:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNode.verifiedIn.map((project) => (
                  <a
                    key={project}
                    href="#works"
                    data-interactive="true"
                    className="inline-flex items-center gap-1.5 font-mono-code transition-all duration-150"
                    style={{
                      fontSize: '10px',
                      color: '#F3EFEA',
                      backgroundColor: '#0C0B09',
                      border: '1px solid rgba(243, 239, 234, 0.15)',
                      padding: '8px 12px',
                      textDecoration: 'none',
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
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#FF4D00',
                      }}
                    />
                    <span>{project}</span>
                    <span className="text-[#FF4D00]">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
