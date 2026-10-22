import React, { useState } from 'react'
import { z } from 'zod'
import confetti from 'canvas-confetti'
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  FileDown,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons'
import { useClipboard } from '@/hooks/useClipboard'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  opportunityType: z.string().min(1, 'Please select an opportunity type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export const ContactWorkbench: React.FC = () => {
  const { copy, copiedKey } = useClipboard(2500)

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    opportunityType: 'Full-Time SDE Role',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleCopyEmail = () => {
    copy('gdsc.vivekchandra@gmail.com', 'email')
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38BDF8', '#818CF8', '#10B981'],
    })
  }

  const handleCopyPhone = () => {
    copy('+91 9234184799', 'phone')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = contactSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    // Success: trigger confetti and fallback to mailto
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#10B981', '#F59E0B'],
    })
    setIsSubmitted(true)

    // Open user's default email client pre-filled
    const mailtoSubject = encodeURIComponent(
      `[${formData.opportunityType}] Message from ${formData.name} via vivekchandra.in`
    )
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOpportunity: ${formData.opportunityType}\n\nMessage:\n${formData.message}`
    )
    window.open(`mailto:gdsc.vivekchandra@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`)
  }

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-sky-400 mb-2">
          <Mail className="h-4 w-4" />
          <span>INITIALIZE CHANNEL // SDE OPPORTUNITIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Let's Build Resilient Systems Together
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
          Open for Software Development Engineer (SDE) roles, distributed backend engineering challenges, and high-craft full-stack product positions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: One-Click Credentials & Coordinates (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-white/[0.1] bg-[#0E131F]/80 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Verified Direct Coordinates
            </div>

            {/* Email Pill */}
            <div
              onClick={handleCopyEmail}
              className="group cursor-pointer rounded-xl border border-sky-500/20 bg-sky-500/5 p-3.5 transition-all hover:border-sky-500/40 hover:bg-sky-500/10"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Primary Email (Click to copy)</span>
                </span>
                {copiedKey === 'email' ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Check className="h-3 w-3" /> Copied!
                  </span>
                ) : (
                  <Copy className="h-3 w-3 text-slate-500 group-hover:text-sky-300" />
                )}
              </div>
              <div className="text-sm font-bold text-white font-mono break-all">
                gdsc.vivekchandra@gmail.com
              </div>
            </div>

            {/* Phone Pill */}
            <div
              onClick={handleCopyPhone}
              className="group cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-all hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Direct Phone / WhatsApp</span>
                </span>
                {copiedKey === 'phone' ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Check className="h-3 w-3" /> Copied!
                  </span>
                ) : (
                  <Copy className="h-3 w-3 text-slate-500 group-hover:text-emerald-300" />
                )}
              </div>
              <div className="text-sm font-bold text-white font-mono">
                +91 9234184799
              </div>
            </div>

            {/* Location */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
              <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1.5 text-amber-400">
                <MapPin className="h-3.5 w-3.5" />
                <span>Base Location</span>
              </div>
              <div className="text-sm font-bold text-white">
                Patna, Bihar, India (IST UTC+5:30)
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Open to on-site, hybrid, and remote engineering opportunities.
              </div>
            </div>

            {/* Direct Profile Links */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href="https://github.com/Unchained-779"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] py-2.5 px-3 text-xs font-semibold text-slate-200 transition-all hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub Profile</span>
              </a>

              <a
                href="https://linkedin.com/in/vivek-chandra-03aa96293/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] py-2.5 px-3 text-xs font-semibold text-slate-200 transition-all hover:border-white/30 hover:bg-white/[0.06] hover:text-sky-400"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            {/* Resume Download CTA */}
            <a
              href="/Vivek_Chandra_Resume.pdf"
              download="Vivek_Chandra_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3 px-4 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-500/20"
            >
              <FileDown className="h-4 w-4" />
              <span>Download Official Resume PDF</span>
            </a>
          </div>

          {/* Domain Readiness Box */}
          <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 p-4 font-mono text-xs text-sky-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Domain Anchor:</span>
              <span className="font-bold text-white">https://vivekchandra.in</span>
            </div>
            <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] text-sky-300">
              Production Ready
            </span>
          </div>
        </div>

        {/* Right Column: Zod-Validated Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/[0.1] bg-[#0E131F]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1">
              Dispatch a Message
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Schema-validated via Zod with direct mailto/API dispatch.
            </p>

            {isSubmitted ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3 animate-in fade-in zoom-in-95">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Message Dispatched Successfully!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your mail client has been opened with pre-filled details to{' '}
                  <span className="text-emerald-300 font-mono">gdsc.vivekchandra@gmail.com</span>. Vivek will respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Your Name / Recruiter Identity *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins (Senior Technical Recruiter)"
                    className={`w-full rounded-xl border bg-black/40 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-white/[0.1] focus:border-sky-400'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[10px] text-rose-400 mt-1 block font-mono">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Your Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="s.jenkins@company.com"
                    className={`w-full rounded-xl border bg-black/40 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-white/[0.1] focus:border-sky-400'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-rose-400 mt-1 block font-mono">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Opportunity Type */}
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Opportunity Classification *
                  </label>
                  <select
                    name="opportunityType"
                    value={formData.opportunityType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/[0.1] bg-black/60 px-4 py-2.5 text-xs text-white focus:border-sky-400 focus:outline-none"
                  >
                    <option value="Full-Time SDE Role">Full-Time Software Development Engineer (2027)</option>
                    <option value="Backend Systems Engineering">Distributed Backend Systems Role</option>
                    <option value="Full-Stack Product Engineering">Full-Stack Product Engineering (Next.js / TypeScript)</option>
                    <option value="Engineering Internship">Summer / Pre-Placement Internship</option>
                    <option value="Contract / Architectural Consulting">Contract Systems Architecture</option>
                    <option value="General Technical Inquiry">General Technical Discussion</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Engineering Message / Role Details *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe the engineering team, tech stack, or problem statement..."
                    className={`w-full rounded-xl border bg-black/40 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors ${
                      errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-white/[0.1] focus:border-sky-400'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[10px] text-rose-400 mt-1 block font-mono">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 px-5 text-xs font-bold text-slate-950 transition-all hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-500/25 active:scale-[0.99]"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Transmission (Zod Validated)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
