import React from 'react'

export const SwissTopLedger: React.FC = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        backgroundColor: 'rgba(12, 11, 9, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
        height: '56px',
      }}
    >
      <div className="flex h-full w-full items-stretch justify-between">
        {/* Cell 1 (Left): Identity & Monogram Specification */}
        <div
          className="flex items-center px-4 md:px-6 shrink-0"
          style={{
            borderRight: '1px solid rgba(243, 239, 234, 0.09)',
          }}
        >
          <a
            href="#top"
            className="flex items-center gap-2 group text-decoration-none"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="font-mono-code font-semibold tracking-wider transition-colors duration-150"
              style={{
                fontSize: '11px',
                color: '#F3EFEA',
                letterSpacing: '0.18em',
              }}
            >
              VIVEK CHANDRA
            </span>
            <span
              className="hidden sm:inline font-mono-code transition-colors duration-150"
              style={{
                fontSize: '11px',
                color: '#8A847C',
                letterSpacing: '0.08em',
              }}
            >
              // SYSTEMS ARCHITECT
            </span>
          </a>
        </div>

        {/* Cell 2 (Coordinates): Geo Precision Coordinates */}
        <div
          className="hidden lg:flex items-center px-6 shrink-0"
          style={{
            borderRight: '1px solid rgba(243, 239, 234, 0.09)',
          }}
        >
          <span
            className="font-mono-code"
            style={{
              fontSize: '11px',
              color: '#8A847C',
              letterSpacing: '0.06em',
            }}
          >
            25.5941° N, 85.1376° E · PATNA, IN
          </span>
        </div>

        {/* Cell 3 (Navigation): Architectural Index Links */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7 px-6 flex-1 justify-center"
          style={{
            borderRight: '1px solid rgba(243, 239, 234, 0.09)',
          }}
          aria-label="Blueprint Navigation"
        >
          {[
            { label: '[01] WORKS', href: '#works' },
            { label: '[02] ARCHITECTURE', href: '#architecture' },
            { label: '[03] RECORD', href: '#record' },
            { label: '[04] DISPATCH', href: '#dispatch' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono-code transition-colors duration-150 py-1"
              style={{
                fontSize: '11px',
                color: '#8A847C',
                letterSpacing: '0.08em',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF4D00'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8A847C'
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Cell 4 (Status, Right): Active Production Availability Indicator */}
        <div className="flex items-center px-4 md:px-6 shrink-0 gap-2.5">
          <div
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#FF4D00',
              borderRadius: '0px',
              animation: 'pulseStatus 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <span
            className="font-mono-code tracking-wider"
            style={{
              fontSize: '11px',
              color: '#F3EFEA',
              letterSpacing: '0.08em',
            }}
          >
            AVAILABLE FOR 2027 SDE ROLES
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulseStatus {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
      `}</style>
    </header>
  )
}
