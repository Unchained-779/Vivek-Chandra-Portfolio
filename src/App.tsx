import React from 'react'
import { MagneticVectorCanvas } from './components/MagneticVectorCanvas'
import { CustomCursor } from './components/CustomCursor'
import { SwissTopLedger } from './components/SwissTopLedger'
import { HeroBlueprint } from './components/HeroBlueprint'
import { ArchitectureMatrix } from './components/ArchitectureMatrix'
import { SelectedWorksBlueprint } from './components/SelectedWorksBlueprint'
import { EngineeringRecordLedger } from './components/EngineeringRecordLedger'
import { SwissDispatchFooter } from './components/SwissDispatchFooter'

export const App: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0C0B09',
        color: '#F3EFEA',
      }}
    >
      {/* Background Kinetic Magnetic Vector Matrix */}
      <MagneticVectorCanvas />

      {/* Architectural Precision Crosshair Cursor */}
      <CustomCursor />

      {/* Swiss Exposed Top Grid Ledger */}
      <SwissTopLedger />

      {/* Main Blueprint Sections */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Phase 1: Monumental Blueprint Hero & Live Schematic */}
        <HeroBlueprint />

        {/* Phase 2: Interactive Stack-to-System Architecture Matrix */}
        <ArchitectureMatrix />

        {/* Phase 3: Swiss Blueprint Case Studies (Flagship Production Systems) */}
        <SelectedWorksBlueprint />

        {/* Phase 4: Interactive Engineering Record & Honors Ledger */}
        <EngineeringRecordLedger />

        {/* Phase 5: Swiss Dispatch Contact Section & Colophon */}
        <SwissDispatchFooter />
      </main>
    </div>
  )
}

export default App
