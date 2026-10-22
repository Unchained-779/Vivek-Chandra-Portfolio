import React, { useState, useEffect, useMemo } from 'react'
import {
  Search,
  ExternalLink,
  Code2,
  Terminal,
  Copy,
  FileDown,
  Layers,
  ShieldAlert,
  Calendar,
  X,
  Check,
} from 'lucide-react'
import { useClipboard } from '@/hooks/useClipboard'

interface CommandPaletteModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenArchitectureDrill: () => void
}

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'Navigation' | 'Live Demos & Docs' | 'Repositories' | 'Contact'
  icon: React.ReactNode
  action: () => void
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onOpenArchitectureDrill,
}) => {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { copy, copiedKey } = useClipboard(2000)

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: 'nav-flagship',
        title: 'Flagship Systems Workbench',
        subtitle: 'Skybox Drive, DeeT-X Fashion, VakeelEasy v2',
        category: 'Navigation',
        icon: <Layers className="h-4 w-4 text-sky-400" />,
        action: () => {
          onClose()
          document.getElementById('flagship-systems')?.scrollIntoView({ behavior: 'smooth' })
        },
      },
      {
        id: 'nav-drill',
        title: 'Architectural Defense & System Design Drill',
        subtitle: 'Inspect real interview defense rationale & code snippets',
        category: 'Navigation',
        icon: <ShieldAlert className="h-4 w-4 text-indigo-400" />,
        action: () => {
          onClose()
          onOpenArchitectureDrill()
          document.getElementById('architecture-drill')?.scrollIntoView({ behavior: 'smooth' })
        },
      },
      {
        id: 'nav-skills',
        title: '6-Pillar Skills Bento Grid',
        subtitle: 'Strict TypeScript, Distributed Backends, Databases & Cloud',
        category: 'Navigation',
        icon: <Code2 className="h-4 w-4 text-emerald-400" />,
        action: () => {
          onClose()
          document.getElementById('skills-matrix')?.scrollIntoView({ behavior: 'smooth' })
        },
      },
      {
        id: 'nav-experience',
        title: 'Experience & Leadership Timeline',
        subtitle: 'Intelliod Pvt. Ltd., GDG on Campus, Viksit Bharat, BCE Patna',
        category: 'Navigation',
        icon: <Calendar className="h-4 w-4 text-amber-400" />,
        action: () => {
          onClose()
          document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
        },
      },
      {
        id: 'live-skybox',
        title: 'Launch Skybox Drive Live Web App',
        subtitle: 'https://skybox-drive.onrender.com (Live MERN Drive)',
        category: 'Live Demos & Docs',
        icon: <ExternalLink className="h-4 w-4 text-sky-400" />,
        action: () => {
          window.open('https://skybox-drive.onrender.com', '_blank')
          onClose()
        },
      },
      {
        id: 'docs-skybox',
        title: 'Open Interactive Swagger API Docs',
        subtitle: 'https://skybox-drive.onrender.com/api-docs (OpenAPI 3.0)',
        category: 'Live Demos & Docs',
        icon: <Terminal className="h-4 w-4 text-blue-400" />,
        action: () => {
          window.open('https://skybox-drive.onrender.com/api-docs', '_blank')
          onClose()
        },
      },
      {
        id: 'repo-skybox',
        title: 'GitHub: Skybox-Drive Repository',
        subtitle: 'TypeScript, Adapter Pattern, $expr Quota, Docker',
        category: 'Repositories',
        icon: <ExternalLink className="h-4 w-4 text-slate-300" />,
        action: () => {
          window.open('https://github.com/Unchained-779/Skybox-Drive', '_blank')
          onClose()
        },
      },
      {
        id: 'repo-deetx',
        title: 'GitHub: DeeT-X Fashion Repository',
        subtitle: 'Next.js 16 App Router, React 19, Prisma, PostgreSQL',
        category: 'Repositories',
        icon: <ExternalLink className="h-4 w-4 text-slate-300" />,
        action: () => {
          window.open('https://github.com/Unchained-779/Deet-X-Fashion', '_blank')
          onClose()
        },
      },
      {
        id: 'repo-vakeeleasy',
        title: 'GitHub: VakeelEasy Repository',
        subtitle: '5-Stage Gemini Pro AI Pipeline, BullMQ, Redlock',
        category: 'Repositories',
        icon: <ExternalLink className="h-4 w-4 text-slate-300" />,
        action: () => {
          window.open('https://github.com/Unchained-779/VakeelEasy', '_blank')
          onClose()
        },
      },
      {
        id: 'download-resume',
        title: 'Download Official Resume PDF',
        subtitle: '/Vivek_Chandra_Resume.pdf',
        category: 'Contact',
        icon: <FileDown className="h-4 w-4 text-emerald-400" />,
        action: () => {
          const a = document.createElement('a')
          a.href = '/Vivek_Chandra_Resume.pdf'
          a.download = 'Vivek_Chandra_Resume.pdf'
          a.click()
          onClose()
        },
      },
      {
        id: 'copy-email',
        title: 'Copy Email to Clipboard',
        subtitle: 'gdsc.vivekchandra@gmail.com',
        category: 'Contact',
        icon: <Copy className="h-4 w-4 text-sky-400" />,
        action: () => {
          copy('gdsc.vivekchandra@gmail.com', 'email')
        },
      },
      {
        id: 'copy-phone',
        title: 'Copy Phone to Clipboard',
        subtitle: '+91 9234184799',
        category: 'Contact',
        icon: <Copy className="h-4 w-4 text-sky-400" />,
        action: () => {
          copy('+91 9234184799', 'phone')
        },
      },
    ],
    [onClose, onOpenArchitectureDrill, copy]
  )

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    const query = search.toLowerCase()
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    )
  }, [items, search])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/[0.12] bg-[#0E131F] shadow-2xl shadow-black overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command, search project, or copy coordinates..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/[0.08] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching commands found for "{search}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex
              const isCopied = copiedKey === (item.id === 'copy-email' ? 'email' : item.id === 'copy-phone' ? 'phone' : '')
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                    isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-100 truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate font-mono">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isCopied && (
                      <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                        <Check className="h-3 w-3" /> Copied!
                      </span>
                    )}
                    <span className="rounded border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="flex items-center justify-between border-t border-white/[0.08] bg-black/30 px-4 py-2 text-[10px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>vivekchandra.in</span>
        </div>
      </div>
    </div>
  )
}
