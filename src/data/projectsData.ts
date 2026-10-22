import { Project } from '@/types/portfolio'

export const projectsData: Project[] = [
  {
    id: 'skybox-drive',
    title: 'Skybox Drive',
    category: 'Systems Engineering / Distributed Cloud Storage',
    period: 'Oct 2026',
    tagline: 'Fault-tolerant, production-grade cloud file storage platform engineered with polymorphic storage adapters, atomic concurrency reservation, and cycle-safe hierarchical trees.',
    statusBadges: ['Production Deployed', '100% Test Coverage (14 Suites)', 'Docker Orchestrated'],
    techStack: [
      'TypeScript (Strict)',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'React 18',
      'Vite',
      'Docker Compose',
      'Zod',
      'Multer',
      'Jest',
      'Supertest',
      'MongoMemoryServer',
      'OpenAPI 3.0',
    ],
    links: {
      liveApp: 'https://skybox-drive.onrender.com',
      swaggerDocs: 'https://skybox-drive.onrender.com/api-docs',
      github: 'https://github.com/Unchained-779/Skybox-Drive',
    },
    problemStatement:
      'Standard cloud file storage systems suffer from severe concurrency race conditions where concurrent parallel uploads exceed user quotas before bytes touch disk. Additionally, using raw client filenames on physical disks exposes servers to path-traversal exploits (../../etc/passwd) and executable injection. Naive file streaming buffers entire videos into RAM, crashing Node.js servers, while moving nested folders easily corrupts directory trees into cyclic infinite loops.',
    architectureFlow: [
      {
        title: 'Client Request',
        subtitle: 'Multipart upload with auth token',
        tag: 'Transport',
        color: '#38BDF8',
      },
      {
        title: 'Zod & RBAC Guard',
        subtitle: 'Schema validation & IDOR check',
        tag: 'Security',
        color: '#818CF8',
      },
      {
        title: 'Atomic $expr Quota',
        subtitle: 'Pre-allocates in MongoDB atomically',
        tag: 'Concurrency',
        color: '#10B981',
      },
      {
        title: 'Multer Stream Limiter',
        subtitle: 'Auto-rollback unlinking on spoofing',
        tag: 'Resilience',
        color: '#F59E0B',
      },
      {
        title: 'IStorageProvider Adapter',
        subtitle: 'UUID disk blob / S3 / Cloudflare R2',
        tag: 'Storage',
        color: '#38BDF8',
      },
    ],
    innovations: [
      {
        number: 1,
        title: 'Decoupled Storage Architecture (Adapter Pattern)',
        summary:
          'Core business logic interacts strictly through an IStorageProvider contract rather than direct filesystem APIs.',
        technicalDetails: [
          'Encapsulates saveFile, getFileStream, deleteFile, and getFileMetadata methods in an abstract interface.',
          'Enables zero-code migration from local persistent disk storage to AWS S3, Cloudflare R2, or MinIO by toggling STORAGE_DRIVER=s3.',
          'Decouples physical storage location from metadata querying in MongoDB.',
        ],
        codeSnippet: `export interface IStorageProvider {
  saveFile(key: string, stream: NodeJS.ReadableStream): Promise<{ size: number; checksum: string }>
  getFileStream(key: string, range?: { start: number; end: number }): Promise<NodeJS.ReadableStream>
  deleteFile(key: string): Promise<void>
}`,
      },
      {
        number: 2,
        title: 'Path Traversal & Executable Injection Shield',
        summary:
          'User-supplied filenames never touch the physical disk; files are identified strictly by internal UUIDs.',
        technicalDetails: [
          'Physical files are written to ./storage_data/<uuid> with zero extension or client-controlled naming.',
          'Neutralizes path traversal attacks (../../etc/passwd) and executable code injection attacks.',
          'Human-readable filenames, MIME types, and folder hierarchies exist solely as indexed metadata records in MongoDB.',
        ],
      },
      {
        number: 3,
        title: 'Atomic Quota Reservation & Mid-Stream Limiting',
        summary:
          'Pre-allocates storage quota in MongoDB atomically via $expr before bytes touch disk, stopping race conditions.',
        technicalDetails: [
          'Executes an atomic findOneAndUpdate with $expr: { $lte: [ { $add: ["$usedStorage", incomingSize] }, "$storageQuota" ] }.',
          'Over-quota concurrent uploads are rejected instantly with HTTP 413 Payload Too Large before allocating disk buffers.',
          'Multer stream limiter monitors byte count in real time; if client headers spoofed file size, the stream aborts mid-flight, physical chunks are unlinked, and reserved quota is rolled back.',
        ],
        codeSnippet: `const user = await User.findOneAndUpdate(
  {
    _id: userId,
    $expr: {
      $lte: [{ $add: ['$usedStorage', incomingBytes] }, '$storageQuota']
    }
  },
  { $inc: { usedStorage: incomingBytes } },
  { new: true }
);
if (!user) throw new AppError('Storage quota exceeded', 413);`,
      },
      {
        number: 4,
        title: 'Cumulative Version Quota Accounting & Head Swapping',
        summary:
          'Preserves historical versions in a subdocument array while maintaining strict byte-for-byte quota accounting.',
        technicalDetails: [
          'Uploading version 2 increments usedStorage by v2.size while archiving v1 metadata into a versions array.',
          'Restoring an older version swaps the active head pointer without re-uploading bytes.',
          'Permanently purging a file decrements usedStorage by the cumulative sum: head.size + sum(versions.sizes).',
        ],
      },
      {
        number: 5,
        title: 'Cycle-Safe Hierarchical Folder Trees',
        summary:
          'Employs Adjacency List with Materialized Ancestor Paths to guarantee acyclic directory hierarchies.',
        technicalDetails: [
          'Each folder stores parentId and an ancestors array [rootId, ...parentId].',
          'Before moving Folder A into Folder X, the service validates that Folder A is not in Folder X ancestors array, preventing circular directory loops.',
          'Executes a bulk update to rewrite ancestor path prefixes across all nested subtrees in a single atomic database operation.',
        ],
      },
      {
        number: 6,
        title: 'Partial Filter Unique Indexes for Trash',
        summary:
          'Prevents unique key collisions when users soft-delete multiple identically named files over time.',
        technicalDetails: [
          'Creates compound indexes { ownerId: 1, parentId: 1, name: 1 } with { unique: true, partialFilterExpression: { isTrash: false } }.',
          'Users can send files with duplicate names to trash without triggering MongoDB E11000 duplicate key constraint errors.',
          'Restoring from trash checks whether an active file of the same name currently occupies the destination.',
        ],
        codeSnippet: `folderSchema.index(
  { ownerId: 1, parentId: 1, name: 1 },
  { unique: true, partialFilterExpression: { isTrash: false } }
);`,
      },
      {
        number: 7,
        title: 'HTTP 206 Partial Content Media Streaming',
        summary:
          'Implements RFC 7233 byte-range streaming for seamless video and audio scrubbing without memory bloat.',
        technicalDetails: [
          'Parses Range: bytes=start-end headers to stream precise byte slices directly from storage adapters to the client.',
          'Returns HTTP 206 Partial Content with Content-Range and Accept-Ranges: bytes headers.',
          'Prevents server RAM exhaustion when multiple clients seek through multi-gigabyte media files.',
        ],
      },
      {
        number: 8,
        title: 'Hierarchical RBAC & IDOR Immunity',
        summary:
          'Access is evaluated in strict hierarchy to guarantee zero unauthorized cross-tenant data leaks.',
        technicalDetails: [
          'Evaluates permissions in order: Owner -> Explicit Share Recipient -> Inherited Folder Grant -> Expirable Token Link.',
          'All file/folder query endpoints inspect whether the requesting user has valid access, eliminating Insecure Direct Object References (IDOR).',
          'Audit logging collection records all security-sensitive actions (sharing, downloads, revokes, deletion).',
        ],
      },
      {
        number: 9,
        title: 'Automated Integration Testing & Multi-Container Docker',
        summary:
          '14 automated test suites running on Jest, Supertest, and MongoMemoryServer with 100% pass rate.',
        technicalDetails: [
          'Isolated in-memory MongoDB server runs full lifecycle tests: Auth, Quota race conditions, IDOR attacks, and Versioning.',
          'Docker Compose coordinates frontend, API server, and database with isolated container health checks.',
          'Interactive OpenAPI 3.0 Swagger UI documentation rendered at /api-docs.',
        ],
      },
    ],
  },
  {
    id: 'deet-x-fashion',
    title: 'DeeT-X Fashion',
    category: 'Full-Stack Enterprise E-Commerce / Luxury Editorial Storefront',
    period: '2026',
    tagline: 'Ultra-luxury editorial couture e-commerce platform built with Next.js 16 App Router, React 19, zero-waterfall server components, and Indian logistics pipelines.',
    statusBadges: ['Next.js 16 App Router', 'Zero-Waterfall RSC', 'Haute Couture Design System'],
    techStack: [
      'Next.js 16 (App Router)',
      'React 19',
      'TypeScript (Strict)',
      'PostgreSQL (Supabase / Neon)',
      'Prisma ORM',
      'Tailwind CSS v4',
      'Zustand',
      'Framer Motion',
      'NextAuth.js v5',
      'Razorpay',
      'Cloudinary',
      'Resend',
      'Lenis Scroll',
    ],
    links: {
      github: 'https://github.com/Unchained-779/Deet-X-Fashion',
    },
    problemStatement:
      'High-end couture and luxury editorial fashion brands require an extraordinary standard of visual fidelity and zero-latency performance. Traditional React SPAs suffer from client-side network waterfalls (empty HTML shells while useEffect fetches data), hurting SEO and brand prestige. Furthermore, Indian e-commerce demands specialized domestic workflows: 6-digit PIN code delivery serviceability verification, Cash on Delivery (COD) OTP verification, and atomic Razorpay payment reconciliation.',
    architectureFlow: [
      {
        title: 'Client Browser',
        subtitle: 'Lenis weighted smooth scrolling',
        tag: 'Frontend',
        color: '#9E7B4F',
      },
      {
        title: 'Next.js 16 RSC',
        subtitle: 'Direct DB query on server (Zero-Waterfall)',
        tag: 'SSR Core',
        color: '#38BDF8',
      },
      {
        title: 'Prisma on globalThis',
        subtitle: 'PostgreSQL connection pooling',
        tag: 'Database',
        color: '#818CF8',
      },
      {
        title: 'Server Actions ("use server")',
        subtitle: 'Type-safe RPC mutations & Zustand Cart',
        tag: 'Mutations',
        color: '#10B981',
      },
      {
        title: 'Razorpay HMAC Webhook',
        subtitle: 'Cryptographic signature & Resend receipts',
        tag: 'Payments',
        color: '#F59E0B',
      },
    ],
    innovations: [
      {
        number: 1,
        title: 'Zero-Waterfall Server-Side Rendering',
        summary:
          'React Server Components query PostgreSQL directly via Prisma ORM on the server, delivering complete HTML on initial load.',
        technicalDetails: [
          'Eliminates client-side data waterfalls and loading spinners on page navigation.',
          'Significantly improves First Contentful Paint (FCP) and search engine discoverability.',
          'Database credentials and Prisma queries remain strictly within server boundaries.',
        ],
      },
      {
        number: 2,
        title: 'Type-Safe Next.js Server Actions ("use server")',
        summary:
          'Replaced boilerplate REST API routes with direct server RPC functions for form mutations and checkout.',
        technicalDetails: [
          'Directly invokes server functions from forms with automatic TypeScript schema inference.',
          'Removes redundant client fetch wrappers, manual axios error handling, and CORS configuration.',
          'Enforces automatic path revalidation (revalidatePath) upon inventory updates.',
        ],
      },
      {
        number: 3,
        title: 'Prisma Connection Pool Optimization on globalThis',
        summary:
          'Caches the PrismaClient instance globally to eliminate Next.js Hot Module Replacement (HMR) connection exhaustion.',
        technicalDetails: [
          'Prevents Next.js development server from instantiating new database connection pools on every file save.',
          'Eliminates PostgreSQL connection socket exhaustion errors (P1001 / P5010: Too Many Connections).',
          'Preserves socket pools across hot reloads during intensive local development.',
        ],
        codeSnippet: `const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`,
      },
      {
        number: 4,
        title: 'Zustand Reactive Bag with Hydration Safety',
        summary:
          'High-performance slide-over cart drawer with localStorage persistence and dynamic shipping calculations.',
        technicalDetails: [
          'Calculates real-time free-shipping progress indicators and tax estimates dynamically.',
          'Employs client hydration hooks to prevent SSR vs client mismatch warnings.',
          'Framer Motion AnimatePresence orchestrates smooth cubic-bezier [0.22, 1, 0.36, 1] slide-over transitions.',
        ],
      },
      {
        number: 5,
        title: 'Indian Logistics & Cryptographic Payment Verification',
        summary:
          'Engineered domestic logistics verification and server-side HMAC SHA-256 Razorpay payment reconciliation.',
        technicalDetails: [
          'Interactive 6-digit Indian PIN code checker validates delivery days and cash-on-delivery availability.',
          'Razorpay webhook listener verifies crypto signatures using crypto.createHmac("sha256", secret).',
          'Resend email integration dispatches transactional order confirmations and luxury PDF receipts.',
          'Cloudinary media pipeline uses blur-hash placeholders to eliminate layout shifts on high-resolution photography.',
        ],
      },
      {
        number: 6,
        title: 'Haute Couture Design System & Physics',
        summary:
          'Bespoke luxury editorial aesthetic fusing Cormorant Garamond, Plus Jakarta Sans, and JetBrains Mono.',
        technicalDetails: [
          'Palette: Warm Alabaster (#FAF8F5), Obsidian (#111111), Burnished Bronze (#9E7B4F), and 1px crisp dividers.',
          '100dvh full-bleed runway video hero with magnetic CTA and 12-column asymmetric lookbook bento grid.',
          'Split-screen Product Detail Page (PDP) with high-res lightbox and sizing modal.',
          'Lenis weighted inertial scrolling delivers a heavy, tactile luxury browsing feel.',
        ],
      },
      {
        number: 7,
        title: 'Admin Atelier & Real-Time Inventory Portal',
        summary:
          'Protected administration portal for real-time inventory adjustments and order fulfillment.',
        technicalDetails: [
          'NextAuth.js v5 RBAC guards administrative routes against unauthorized access.',
          'Manages product variants, size matrices, SKU tracking, and fulfillment lifecycles.',
          'Visual inventory alerts flag low-stock items before order placement.',
        ],
      },
    ],
  },
  {
    id: 'vakeeleasy-v2',
    title: 'VakeelEasy v2',
    category: 'Enterprise AI / LegalTech & Distributed Document Pipeline',
    period: '2026',
    tagline: 'Enterprise LegalTech platform featuring a 5-stage AI contract analysis pipeline with Google Gemini Pro, coupled with 5 senior distributed resilience patterns.',
    statusBadges: ['5-Stage AI Pipeline', '~60% Faster Contract Review', '5 Enterprise Resilience Patterns'],
    techStack: [
      'Node.js',
      'Express.js (v4/v5)',
      'TypeScript',
      'PostgreSQL (Prisma ORM)',
      'MongoDB (Mongoose)',
      'Google Gemini Pro LLM (@google/genai)',
      'pdf-parse',
      'AWS S3 Presigned URLs',
      'BullMQ',
      'Redis',
      'Opossum Circuit Breaker',
      'Zod',
      'JWT',
      'Razorpay',
    ],
    links: {
      github: 'https://github.com/Unchained-779/VakeelEasy',
    },
    problemStatement:
      'Manual legal contract review for startups and individuals is slow (taking days), prohibitively expensive, and prone to overlooking buried indemnity traps, uncapped liabilities, and hostile termination clauses. Meanwhile, naive AI wrappers crash server RAM on multi-megabyte PDFs and fail silently when LLM rate limits or network hiccups occur, causing corrupted data and hung HTTP sockets.',
    architectureFlow: [
      {
        title: 'S3 Presigned Upload',
        subtitle: 'Zero-RAM direct PDF ingestion',
        tag: 'Stage 1',
        color: '#38BDF8',
      },
      {
        title: 'Transactional Outbox & Queue',
        subtitle: 'BullMQ / Redis background worker',
        tag: 'Stage 2',
        color: '#818CF8',
      },
      {
        title: 'Semantic Clause Chunking',
        subtitle: 'pdf-parse splits Indemnity, IP, Liability',
        tag: 'Stage 3',
        color: '#10B981',
      },
      {
        title: 'Gemini Pro + Zod Guard',
        subtitle: 'Structured JSON risk extraction',
        tag: 'Stage 4',
        color: '#F59E0B',
      },
      {
        title: 'Side-by-Side Reviewer',
        subtitle: 'Confidence score & lawyer verification',
        tag: 'Stage 5',
        color: '#38BDF8',
      },
    ],
    innovations: [
      {
        number: 1,
        title: 'Controller-Service-Repository Pattern',
        summary:
          'Strict architectural decoupling separating HTTP transport, domain AI logic, and database access.',
        technicalDetails: [
          'Controllers parse req.body and format HTTP JSON responses.',
          'Services encapsulate pure business logic and AI orchestration without Express dependencies.',
          'Repositories isolate database queries (Prisma/PostgreSQL), allowing seamless unit testing with zero HTTP mocking.',
        ],
      },
      {
        number: 2,
        title: 'Transactional Outbox Pattern',
        summary:
          'Eliminates dual-write inconsistency between PostgreSQL database records and Redis/BullMQ job queues.',
        technicalDetails: [
          'Writes domain state changes and the corresponding OutboxEvent into PostgreSQL within the same ACID transaction.',
          'An asynchronous Outbox Relay polls and dispatches events to BullMQ workers reliably.',
          'Guarantees that if the application crashes mid-process, un-queued events are never lost.',
        ],
        codeSnippet: `await prisma.$transaction(async (tx) => {
  const document = await tx.document.create({ data: { ...docData, status: 'PENDING' } })
  await tx.outboxEvent.create({
    data: {
      eventType: 'DOCUMENT_UPLOADED',
      payload: JSON.stringify({ documentId: document.id }),
    }
  })
})`,
      },
      {
        number: 3,
        title: 'Redis Redlock Distributed Locking',
        summary:
          'Guarantees high-concurrency slot booking serialization across clustered backend API containers.',
        technicalDetails: [
          'Acquires a distributed lock on Redis availability keys with an automatic TTL expiration.',
          'Prevents multiple clients from double-booking the same lawyer consultation slot simultaneously.',
          'Releases locks cleanly via atomic Lua scripts.',
        ],
      },
      {
        number: 4,
        title: 'Circuit Breaker Pattern (Opossum)',
        summary:
          'Wraps external Gemini AI and cloud storage API calls across Closed, Open, and Half-Open states.',
        technicalDetails: [
          'Monitors failure rates on external Google Gemini Pro API requests.',
          'Trips to Open state when threshold errors occur, immediately fast-rejecting requests without blocking Node.js event loop.',
          'Transitions to Half-Open to test downstream health and auto-recovers gracefully.',
        ],
      },
      {
        number: 5,
        title: 'Idempotency Key Middleware & Graceful Shutdown',
        summary:
          'Protects against double billing and ensures zero-drop container lifecycle transitions.',
        technicalDetails: [
          'Idempotency-Key header intercepts duplicate requests, caching response payloads in Redis to prevent multiple charges on network retry.',
          'Listens for SIGTERM and SIGINT signals during container redeployments.',
          'Stops accepting new connections, allows in-flight BullMQ worker jobs to drain, and closes PostgreSQL connection pools cleanly.',
        ],
      },
    ],
  },
]
