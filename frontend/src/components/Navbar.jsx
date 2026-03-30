import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Actividad', href: '#actividad' },
  { label: 'Calidad',   href: '#calidad'   },
  { label: 'Nosotros',  href: '#nosotros'  },
  { label: 'Contacto',  href: '#contacto'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

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
          ? 'rgba(4,6,15,0.90)'
          : 'linear-gradient(to bottom, rgba(4,6,15,0.65), transparent)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <a href="#" className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center
                           text-white font-black text-sm"
                style={{
                  background: '#c8102e',
                  fontFamily: "var(--font-display)",
                }}>
            AT
          </span>
          <span className="font-semibold tracking-widest text-sm uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}>
            Aero<span style={{ color: '#c8102e' }}>TF</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href}
                 className="text-xs tracking-widest uppercase font-medium relative group
                            transition-colors duration-200"
                 style={{
                   color: 'rgba(255,255,255,0.55)',
                   fontFamily: "var(--font-mono)",
                 }}
                 onMouseEnter={e => e.target.style.color = '#ffffff'}
                 onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px transition-all
                                 duration-300 group-hover:w-full bg-[#c8102e]" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+34916388377"
             className="flex items-center gap-1.5 text-xs transition-colors duration-200"
             style={{
               color: 'rgba(255,255,255,0.35)',
               fontFamily: "var(--font-mono)",
             }}
             onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
             onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
            <Phone size={12} />
            +34 916 388 377
          </a>
          <a href="mailto:info@aerotf.com"
             className="text-xs transition-colors duration-200"
             style={{
               color: 'rgba(255,255,255,0.35)',
               fontFamily: "var(--font-mono)",
             }}
             onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
             onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
            info@aerotf.com
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-6 pt-4"
            style={{
              background: 'rgba(4,6,15,0.96)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                 className="block py-3 tracking-widest uppercase text-xs transition-colors"
                 style={{
                   color: 'rgba(255,255,255,0.55)',
                   borderBottom: '1px solid rgba(255,255,255,0.07)',
                   fontFamily: "var(--font-mono)",
                 }}>
                {l.label}
              </a>
            ))}
            <div className="mt-4 space-y-2">
              <a href="tel:+34916388377"
                 className="block text-xs text-center py-2"
                 style={{
                   color: 'rgba(255,255,255,0.35)',
                   fontFamily: "var(--font-mono)",
                 }}>
                +34 916 388 377
              </a>
              <a href="mailto:info@aerotf.com"
                 className="block text-xs text-center py-2"
                 style={{
                   color: 'rgba(255,255,255,0.35)',
                   fontFamily: "var(--font-mono)",
                 }}>
                info@aerotf.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}