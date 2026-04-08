import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import TextScramble from './ui/TextScramble'

const links = [
  { label: 'Actividad', href: '#actividad' },
  { label: 'Calidad', href: '#calidad' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
      style={{
        background: scrolled
          ? 'color-mix(in srgb, var(--bg) 76%, transparent)'
          : 'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 60%, transparent), transparent)',
        backdropFilter: scrolled ? 'blur(18px)' : 'blur(8px)',
        borderBottom: scrolled ? '1px solid var(--border-faint)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-3 shrink-0">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              fontFamily: 'var(--font-display)',
              boxShadow: '0 10px 22px -14px var(--accent-glow)',
            }}
          >
            AT
          </span>
          <span
            className="font-semibold tracking-[0.28em] text-[11px] uppercase"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
          >
            Aero<span style={{ color: 'var(--accent)' }}>TF</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[11px] tracking-[0.26em] uppercase font-medium relative group transition-colors duration-200"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = 'var(--text)'
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                <TextScramble text={link.label} className="text-[11px]" />
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5 min-w-0">
          <a
            href="tel:+34916388377"
            className="flex items-center gap-1.5 text-[11px] transition-colors duration-200"
            style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = 'var(--text-faint)'
            }}
          >
            <Phone size={12} />
            +34 916 388 377
          </a>
          <a
            href="mailto:info@aerotf.com"
            className="text-[11px] transition-colors duration-200"
            style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = 'var(--text-faint)'
            }}
          >
            info@aerotf.com
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: 'var(--text)' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-3 rounded-2xl px-6 pb-5 pt-4 overflow-hidden"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(18px)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 tracking-[0.22em] uppercase text-[11px] transition-colors"
                style={{
                  color: 'var(--text-soft)',
                  borderBottom: '1px solid var(--border-faint)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 space-y-2">
              <a href="tel:+34916388377" className="block text-[11px] py-1" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                +34 916 388 377
              </a>
              <a href="mailto:info@aerotf.com" className="block text-[11px] py-1" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                info@aerotf.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
