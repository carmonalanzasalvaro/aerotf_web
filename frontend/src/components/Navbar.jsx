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
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${scrolled ? 'glass border-b py-3' : 'py-6 bg-transparent'}`}
      style={{ borderColor: 'var(--border-faint)' }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <a href="#" className="flex items-center gap-3">
          <span className="w-8 h-8 rounded flex items-center justify-center
                           text-white font-black text-sm"
                style={{ background: 'var(--accent)' }}>AT</span>
          <span className="font-semibold tracking-widest text-sm uppercase"
                style={{ color: 'var(--text)' }}>
            Aero<span style={{ color: 'var(--accent)' }}>TF</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href}
                 className="text-sm tracking-wider uppercase font-medium relative group transition-colors"
                 style={{ color: 'var(--text-soft)' }}
                 onMouseEnter={e => e.target.style.color = 'var(--text)'}
                 onMouseLeave={e => e.target.style.color = 'var(--text-soft)'}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px transition-all
                                 duration-300 group-hover:w-full"
                      style={{ background: 'var(--accent)' }} />
              </a>
            </li>
          ))}
        </ul>

        {/* Solo datos de contacto, sin CTA comercial */}
        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+34916388377"
             className="flex items-center gap-1.5 text-sm transition-colors"
             style={{ color: 'var(--text-faint)' }}
             onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
             onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}>
            <Phone size={13} />
            +34 916 388 377
          </a>
          <a href="mailto:info@aerotf.com"
             className="text-sm transition-colors"
             style={{ color: 'var(--text-faint)' }}
             onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
             onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}>
            info@aerotf.com
          </a>
        </div>

        <button className="md:hidden" style={{ color: 'var(--text)' }}
                onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass px-6 pb-6 pt-4"
            style={{ borderTop: '1px solid var(--border-faint)' }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                 className="block py-3 tracking-wider uppercase text-sm transition-colors"
                 style={{ color: 'var(--text-soft)', borderBottom: '1px solid var(--border-faint)' }}>
                {l.label}
              </a>
            ))}
            <div className="mt-4 space-y-2">
              <a href="tel:+34916388377"
                 className="block text-sm text-center py-2"
                 style={{ color: 'var(--text-faint)' }}>
                +34 916 388 377
              </a>
              <a href="mailto:info@aerotf.com"
                 className="block text-sm text-center py-2"
                 style={{ color: 'var(--text-faint)' }}>
                info@aerotf.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}