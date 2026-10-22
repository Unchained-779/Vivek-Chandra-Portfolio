import React, { useState } from 'react'

export const SwissDispatchFooter: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const email = 'gdsc.vivekchandra@gmail.com'

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = email
        textarea.style.position = 'fixed'
        textarea.style.left = '-999999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const links = [
    {
      index: '01 / GITHUB',
      label: 'github.com/Unchained-779 ↗',
      href: 'https://github.com/Unchained-779',
    },
    {
      index: '02 / LINKEDIN',
      label: 'in/vivek-chandra ↗',
      href: 'https://linkedin.com/in/vivek-chandra-03aa96293/',
    },
    {
      index: '03 / ENGINEERING RESUME',
      label: 'Vivek_Chandra_Resume.pdf ↗',
      href: '/Vivek_Chandra_Resume.pdf',
    },
    {
      index: '04 / DIRECT LINE',
      label: '+91 9234184799 · PATNA, IN',
      href: 'tel:+919234184799',
    },
  ]

  return (
    <footer
      id="contact"
      className="relative w-full"
      style={{
        backgroundColor: '#0C0B09',
        borderTop: '1px solid rgba(243, 239, 234, 0.09)',
      }}
    >
      {/* Anchor alias for dispatch */}
      <span id="dispatch" className="absolute -top-14" />

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

        {/* 12-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* ============================================================ */}
          {/* LEFT 7 COLUMNS: Transmission Eyebrow, Monumental Headline,   */}
          {/*                 One-Click Copy Command Bar                   */}
          {/* ============================================================ */}
          <div
            className="lg:col-span-7 flex flex-col justify-between"
            style={{
              padding: 'clamp(48px, 6vw, 72px) clamp(24px, 4vw, 48px)',
              borderRight: '1px solid rgba(243, 239, 234, 0.09)',
            }}
          >
            <div>
              {/* Eyebrow */}
              <div className="mb-4">
                <span
                  className="font-mono-code font-semibold tracking-widest text-[#FF4D00]"
                  style={{ fontSize: '11px', letterSpacing: '0.2em' }}
                >
                  INDEX // 04 — INITIATE TRANSMISSION
                </span>
              </div>

              {/* Monumental Headline */}
              <h2 className="flex flex-col tracking-tight" style={{ margin: 0 }}>
                <span
                  className="font-syne font-bold uppercase text-[#F3EFEA]"
                  style={{
                    fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)',
                    lineHeight: 0.95,
                    display: 'block',
                  }}
                >
                  READY TO ARCHITECT
                </span>
                <span
                  className="font-instrument italic text-[#FF4D00]"
                  style={{
                    fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
                    lineHeight: 1.0,
                    display: 'block',
                    marginTop: '6px',
                    fontWeight: 400,
                  }}
                >
                  production-grade systems.
                </span>
              </h2>

              <p
                className="font-jakarta text-[#8A847C] mt-6"
                style={{
                  fontSize: '15px',
                  lineHeight: 1.75,
                  maxWidth: '560px',
                  margin: 0,
                  marginTop: '24px',
                }}
              >
                Open for 2027 Full-Time Software Development Engineer (SDE) roles, distributed
                systems internships, and high-craft product engineering. Let’s engineer
                fault-tolerant backends, zero-waterfall web architectures, and enduring software.
              </p>
            </div>

            {/* Interactive One-Click Copy Command Bar */}
            <div className="mt-10">
              <button
                type="button"
                onClick={handleCopy}
                data-interactive="true"
                className="w-full transition-all duration-150 cursor-pointer block text-left"
                style={{
                  border: '1px solid rgba(243, 239, 234, 0.18)',
                  backgroundColor: '#12110E',
                  padding: '20px 28px',
                  borderRadius: '0px',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF4D00'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(243, 239, 234, 0.18)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#FF4D00',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      className="font-mono-code font-semibold tracking-wider text-[#F3EFEA]"
                      style={{ fontSize: '15px' }}
                    >
                      {email}
                    </span>
                  </div>

                  <span
                    className="font-mono-code font-medium transition-colors duration-150 shrink-0"
                    style={{
                      fontSize: '11px',
                      color: copied ? '#FF4D00' : '#8A847C',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {copied ? '[ COPIED TO CLIPBOARD ✓ ]' : '[ COPY ADDRESS ]'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT 5 COLUMNS: 4 Stacked Architectural Action Rows         */}
          {/* ============================================================ */}
          <div
            className="lg:col-span-5 flex flex-col justify-between"
            style={{
              backgroundColor: '#12110E',
            }}
          >
            <div className="flex flex-col h-full justify-between">
              {links.map((link) => (
                <a
                  key={link.index}
                  href={link.href}
                  target={link.href.startsWith('tel:') ? '_self' : '_blank'}
                  rel={link.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  data-interactive="true"
                  className="group flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all duration-150 cursor-pointer"
                  style={{
                    padding: '28px clamp(20px, 3vw, 36px)',
                    borderBottom: '1px solid rgba(243, 239, 234, 0.09)',
                    textDecoration: 'none',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF4D00'
                    const indexEl = e.currentTarget.querySelector('.link-index') as HTMLElement
                    const labelEl = e.currentTarget.querySelector('.link-label') as HTMLElement
                    if (indexEl) indexEl.style.color = '#0C0B09'
                    if (labelEl) labelEl.style.color = '#0C0B09'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    const indexEl = e.currentTarget.querySelector('.link-index') as HTMLElement
                    const labelEl = e.currentTarget.querySelector('.link-label') as HTMLElement
                    if (indexEl) indexEl.style.color = '#8A847C'
                    if (labelEl) labelEl.style.color = '#F3EFEA'
                  }}
                >
                  <span
                    className="link-index font-mono-code transition-colors duration-150 font-semibold"
                    style={{
                      fontSize: '11px',
                      color: '#8A847C',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {link.index}
                  </span>

                  <span
                    className="link-label font-mono-code transition-colors duration-150"
                    style={{
                      fontSize: '13px',
                      color: '#F3EFEA',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{
            padding: '24px clamp(20px, 4vw, 48px)',
            borderTop: '1px solid rgba(243, 239, 234, 0.09)',
            backgroundColor: '#0C0B09',
          }}
        >
          <div
            className="font-mono-code text-[#8A847C]"
            style={{ fontSize: '11px', letterSpacing: '0.08em' }}
          >
            © 2026 VIVEK CHANDRA · VIVEKCHANDRA.IN
          </div>

          <div
            className="font-mono-code text-[#8A847C]"
            style={{ fontSize: '11px', letterSpacing: '0.08em' }}
          >
            BUILT WITH STRICT TYPESCRIPT · SWISS BLUEPRINT EDITION
          </div>
        </div>
      </div>
    </footer>
  )
}
