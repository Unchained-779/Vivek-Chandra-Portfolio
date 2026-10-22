export interface TerminalOutputLine {
  text: string
  type?: 'standard' | 'success' | 'warning' | 'info' | 'accent' | 'header'
}

export const executeTerminalCommand = (input: string): TerminalOutputLine[] => {
  const clean = input.trim().toLowerCase()

  if (!clean) return []

  switch (clean) {
    case 'help':
      return [
        { text: '═══════════════════════════════════════════════════════════════', type: 'info' },
        { text: '  VIVEK CHANDRA // SYSTEMS NODE CLI v2.4.0 (Patna, IN)', type: 'header' },
        { text: '═══════════════════════════════════════════════════════════════', type: 'info' },
        { text: 'Available commands:', type: 'standard' },
        { text: '  whoami              » Output candidate executive profile & core archetype', type: 'accent' },
        { text: '  projects --flagship » Render ASCII architectural table of 4 flagship systems', type: 'accent' },
        { text: '  skills --strict     » Inspect stack under TypeScript Strict Mode (zero any)', type: 'accent' },
        { text: '  test --run          » Simulate 14 Skybox Drive integration test suites', type: 'accent' },
        { text: '  contact             » Display authenticated contact coordinates & profiles', type: 'accent' },
        { text: '  clear               » Flush terminal output buffer', type: 'standard' },
      ]

    case 'whoami':
      return [
        { text: '┌─────────────────────────────────────────────────────────────┐', type: 'info' },
        { text: '│ CANDIDATE: Vivek Chandra                                    │', type: 'header' },
        { text: '│ ARCHETYPE: Full-Stack Systems & Product Engineer            │', type: 'header' },
        { text: '│ EDUCATION: B.Tech in CSE — BCE Patna (Expected May 2027)    │', type: 'standard' },
        { text: '│ STANDING : CGPA: 7.98 / 10 | SIH 2025 National Finalist      │', type: 'success' },
        { text: '│ FOCUS    : Strict TypeScript, Distributed Backends, Next.js │', type: 'standard' },
        { text: '└─────────────────────────────────────────────────────────────┘', type: 'info' },
      ]

    case 'projects --flagship':
    case 'projects':
      return [
        { text: '┌────────────────────┬──────────────────────────────────────┬────────────────────────┐', type: 'info' },
        { text: '│ PROJECT            │ CORE ARCHITECTURE                    │ VERIFIED METRIC / DOCS │', type: 'header' },
        { text: '├────────────────────┼──────────────────────────────────────┼────────────────────────┤', type: 'info' },
        { text: '│ Skybox Drive       │ Adapter Pattern, UUID, $expr Quota   │ 100% Pass (14 Suites)  │', type: 'accent' },
        { text: '│ DeeT-X Fashion     │ Next.js 16 RSC, Server Actions, Post │ Zero-Waterfall SSR     │', type: 'accent' },
        { text: '│ VakeelEasy v2      │ 5-Stage Gemini Pro, BullMQ, Redlock  │ ~60% Review Speedup    │', type: 'accent' },
        { text: '│ LEO-PNT Navigation │ Doppler Shift, Satellite Positioning │ SIH 2025 Finalist (MoD)│', type: 'success' },
        { text: '└────────────────────┴──────────────────────────────────────┴────────────────────────┘', type: 'info' },
        { text: 'Tip: Scroll down to "Flagship Systems" for interactive SVG flow workbenches.', type: 'info' },
      ]

    case 'skills --strict':
    case 'skills':
      return [
        { text: 'Checking strict compiler flags... [tsconfig.json: "strict": true]', type: 'info' },
        { text: '  ✔ zeroAnyPolicy: ENFORCED (0 "any" types in production codebases)', type: 'success' },
        { text: '  ✔ Languages: TypeScript, JavaScript (ES6+), C++, C, Python, SQL', type: 'standard' },
        { text: '  ✔ Backend: Node.js, Express 5, Zod, Adapter Pattern, Outbox Pattern', type: 'accent' },
        { text: '  ✔ Full-Stack: Next.js 16 App Router, React 19/18, Tailwind, Zustand', type: 'accent' },
        { text: '  ✔ Databases: PostgreSQL, Prisma, MongoDB ($expr, compound indexes)', type: 'accent' },
        { text: '  ✔ Reliability: BullMQ, Redis Redlock, Opossum Circuit Breakers, Jest', type: 'standard' },
        { text: '  ✔ Security: Google OAuth 2.0, NextAuth v5, RBAC, IDOR Defense, HMAC', type: 'success' },
      ]

    case 'test --run':
    case 'test':
      return [
        { text: '$ jest --config jest.config.js --runInBand (MongoMemoryServer)', type: 'info' },
        { text: '  PASS tests/auth.integration.test.ts (Auth guards, duplicate email 409) [142ms]', type: 'success' },
        { text: '  PASS tests/quota.concurrency.test.ts ($expr atomic upload reservation) [210ms]', type: 'success' },
        { text: '  PASS tests/idor.security.test.ts (Cross-tenant forbidden 403 checks)   [115ms]', type: 'success' },
        { text: '  PASS tests/versioning.engine.test.ts (Cumulative version quota accounting) [188ms]', type: 'success' },
        { text: '  PASS tests/folders.cycle.test.ts (Adjacency cycle prevention & rewrite) [164ms]', type: 'success' },
        { text: '  PASS tests/trash.unique.test.ts (Partial filter expression duplicate OK) [98ms]', type: 'success' },
        { text: '───────────────────────────────────────────────────────────────', type: 'standard' },
        { text: 'Test Suites: 14 passed, 14 total | Tests: 14 passed | 100% PASS RATE', type: 'success' },
        { text: 'Target: Skybox Drive Backend Container (Render + Docker Compose)', type: 'info' },
      ]

    case 'contact':
      return [
        { text: 'Authenticated communication coordinates for Vivek Chandra:', type: 'header' },
        { text: '  Email   : gdsc.vivekchandra@gmail.com', type: 'accent' },
        { text: '  Phone   : +91 9234184799', type: 'accent' },
        { text: '  GitHub  : https://github.com/Unchained-779', type: 'accent' },
        { text: '  LinkedIn: https://linkedin.com/in/vivek-chandra-03aa96293/', type: 'accent' },
        { text: '  Location: Patna, Bihar, India (IST UTC+5:30)', type: 'standard' },
        { text: '  Domain  : https://vivekchandra.in', type: 'success' },
      ]

    default:
      return [
        { text: `command not found: "${input}". Type "help" to see valid commands.`, type: 'warning' },
      ]
  }
}
