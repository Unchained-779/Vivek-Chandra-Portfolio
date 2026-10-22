import { DefenseDrill } from '@/types/portfolio'

export const defenseDrillsData: DefenseDrill[] = [
  {
    id: 'drill-uuid-storage',
    category: 'Systems Security & Path Traversal',
    question: 'Why store files as UUIDs on disk instead of preserving the original client filenames in Skybox Drive?',
    quickTake: 'Neutralizes path-traversal attacks (../../etc/passwd) and executable injection while decoupling physical storage from database metadata.',
    rationale: [
      'Allowing user-supplied filenames directly on physical disks enables dangerous path traversal attacks (e.g. upload filename: ../../../etc/shadow) or shell script executions.',
      'By decoupling physical storage to ./storage_data/<uuid>, physical files contain zero executable extensions and zero path characters.',
      'Human-readable names, hierarchical folders, and MIME types exist strictly as indexed records inside MongoDB, allowing rename and relocation operations without disk I/O.',
    ],
    tradeOffs: 'Requires an extra database lookup to map UUID keys to human filenames upon download, but grants total immunity against file system injection.',
    codeSnippet: `// Storage Key Generation (Zero client control on disk path)
const storageKey = crypto.randomUUID();
await storageProvider.saveFile(storageKey, uploadStream);

// Metadata Isolation in MongoDB
const fileDoc = await File.create({
  storageKey, // Physical disk identifier
  name: sanitizeFileName(req.file.originalname), // Display metadata only
  mimeType: req.file.mimetype,
  ownerId: req.user.id
});`,
    codeLanguage: 'typescript',
  },
  {
    id: 'drill-quota-concurrency',
    category: 'Concurrency Control & Race Conditions',
    question: 'How did you prevent concurrent uploads from bypassing a user\'s storage quota in Skybox Drive?',
    quickTake: 'Solved concurrent upload race conditions by pre-allocating quota in MongoDB atomically via $expr before disk write, coupled with mid-stream Multer rollback.',
    rationale: [
      'In high-concurrency systems, if User A has 10MB quota remaining and sends two parallel 8MB upload requests, a naive read-then-write approach allows both uploads to pass, exceeding quota by 6MB.',
      'Skybox executes an atomic findOneAndUpdate with an $expr condition: { $lte: [{ $add: ["$usedStorage", incomingSize] }, "$storageQuota"] } before bytes hit disk.',
      'If the user exceeds quota, the query returns null and rejects the request with HTTP 413 Payload Too Large before allocating disk buffers.',
      'If a client spoofs Content-Length headers, the Multer stream limiter monitors byte count in real time, aborts the stream mid-flight, unlinks physical bytes, and decrements the reserved quota.',
    ],
    tradeOffs: 'Pre-reservation requires knowing Content-Length up front; streaming rollback adds cleanup logic, but completely eliminates quota leakage.',
    codeSnippet: `const updatedUser = await User.findOneAndUpdate(
  {
    _id: userId,
    $expr: {
      $lte: [{ $add: ['$usedStorage', incomingBytes] }, '$storageQuota']
    }
  },
  { $inc: { usedStorage: incomingBytes } },
  { new: true }
);

if (!updatedUser) {
  throw new AppError('Storage quota exceeded. Concurrent upload blocked.', 413);
}`,
    codeLanguage: 'typescript',
  },
  {
    id: 'drill-partial-unique-trash',
    category: 'Database Indexing & Schema Design',
    question: 'Why use a Partial Filter Unique Index for soft-deleted files in MongoDB?',
    quickTake: 'Enforces name uniqueness among active files in a directory while permitting multiple soft-deleted files with identical names without triggering unique constraint crashes.',
    rationale: [
      'A standard compound index { ownerId: 1, parentId: 1, name: 1 } with unique: true prevents a user from having two files named report.pdf in the same folder.',
      'However, when a user deletes report.pdf (marking isTrash: true) and later creates another report.pdf, standard unique indexes throw duplicate key error E11000.',
      'Applying a partialFilterExpression: { isTrash: false } restricts the unique index check strictly to active non-trashed files.',
      'Users can soft-delete dozens of files named notes.txt over months without database constraint conflicts.',
    ],
    tradeOffs: 'Partial indexes only index matching documents (isTrash: false), reducing index memory footprint, but require queries that search trash to use a separate non-unique index.',
    codeSnippet: `// Compound unique index with Partial Filter Expression
fileSchema.index(
  { ownerId: 1, parentId: 1, name: 1 },
  { 
    unique: true, 
    partialFilterExpression: { isTrash: false } 
  }
);`,
    codeLanguage: 'typescript',
  },
  {
    id: 'drill-transactional-outbox',
    category: 'Distributed Systems Resilience',
    question: 'Why combine the Transactional Outbox Pattern with BullMQ in VakeelEasy v2?',
    quickTake: 'Eliminates dual-write inconsistency between PostgreSQL database mutations and Redis/BullMQ job queues.',
    rationale: [
      'In distributed backends, updating PostgreSQL and publishing a job to Redis in separate calls creates a dual-write problem. If the server crashes or network drops after writing to PostgreSQL, Redis never gets the job, creating a zombie document.',
      'Conversely, if Redis is called first and PostgreSQL fails, the worker attempts to process non-existent data.',
      'The Transactional Outbox pattern writes the document and an OutboxEvent record into PostgreSQL inside the same ACID database transaction.',
      'An asynchronous Outbox Relay polls pending events and reliably pushes them to BullMQ. If BullMQ goes down, events remain safely persisted in PostgreSQL until service recovers.',
    ],
    tradeOffs: 'Adds a polling relay or CDC pipeline, but guarantees at-least-once job delivery without data inconsistencies.',
    codeSnippet: `// Single PostgreSQL ACID Transaction
await prisma.$transaction(async (tx) => {
  const contract = await tx.contract.create({
    data: { userId, fileKey, status: 'INGESTED' }
  });
  
  await tx.outboxEvent.create({
    data: {
      aggregateType: 'CONTRACT',
      aggregateId: contract.id,
      eventType: 'CONTRACT_UPLOADED_FOR_AI_ANALYSIS',
      payload: JSON.stringify({ contractId: contract.id, fileKey })
    }
  });
});`,
    codeLanguage: 'typescript',
  },
  {
    id: 'drill-prisma-connection-pooling',
    category: 'Full-Stack Performance & Connection Pooling',
    question: 'How did you solve Prisma database connection pool exhaustion in Next.js 16 App Router?',
    quickTake: 'Cached the PrismaClient singleton on Node.js globalThis to prevent Hot Module Replacement (HMR) from instantiating new connection pools on every code edit.',
    rationale: [
      'Next.js development server runs Hot Module Replacement (HMR), clearing the Node.js require cache and re-evaluating imported modules on every file change.',
      'If const prisma = new PrismaClient() is executed at module top-level without caching, every code save opens 10 new database connections.',
      'PostgreSQL has a strict max_connections limit. After 5-10 saves, the application crashes with P1001 / P5010: Too Many Connections.',
      'Caching the instance on globalThis reuses the active connection pool across hot reloads in development.',
    ],
    tradeOffs: 'In production, globalThis caching is unnecessary because modules are evaluated once, so the pattern conditionally binds only when NODE_ENV !== "production".',
    codeSnippet: `import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient | undefined 
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}`,
    codeLanguage: 'typescript',
  },
]
