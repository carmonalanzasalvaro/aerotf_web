import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ArrowUp, Phone, Mail, MapPin } from 'lucide-react'
import TextScramble from './TextScramble'

const STYLES = `
.cinematic-footer-wrapper {
  position: relative;
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.45; }
  100% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.8; }
}

@keyframes footer-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.cinematic-footer-grid {
  background-size: 64px 64px;
  background-image:
    linear-gradient(to right, var(--border-faint) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border-faint) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
}

.cinematic-footer-aurora {
  background:
    radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, var(--accent-2-glow) 36%, transparent 72%);
  animation: footer-breathe 10s ease-in-out infinite alternate;
}

.cinematic-footer-pill {
  background: linear-gradient(145deg, var(--card-bg) 0%, var(--card-bg-2) 100%);
  border: 1px solid var(--card-stroke);
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  transition: transform 0.35s ease, border-color 0.35s ease, background 0.35s ease;
}

.cinematic-footer-pill:hover {
  border-color: var(--border-soft);
  background: linear-gradient(145deg, var(--surface-hover) 0%, var(--card-bg-2) 100%);
}

.cinematic-footer-giant-text {
  font-size: clamp(7rem, 18vw, 16rem);
  line-height: 0.78;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px var(--border-faint);
  background: linear-gradient(180deg, var(--text-ghost) 0%, transparent 72%);
  -webkit-background-clip: text;
  background-clip: text;
}

.cinematic-footer-marquee-track {
  animation: footer-marquee 34s linear infinite;
}
`

function MagneticButton({ as: Component = 'button', className = '', children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const handleMove = (event) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`
    }

    const reset = () => {
      element.style.transform = 'translate(0px, 0px)'
    }

    element.addEventListener('mousemove', handleMove)
    element.addEventListener('mouseleave', reset)

    return () => {
      element.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <Component
      ref={ref}
      className={`inline-flex items-center justify-center transition-transform duration-300 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

function MarqueeRow() {
  const items = [
    'TRAZABILIDAD FAA · EASA',
    'FASTENERS · BEARINGS · TOOLING',
    'ENTREGA URGENTE',
    'DEFENSA · MRO · OEM',
    'CADENA AUTORIZADA',
  ]

  return (
    <div className="flex w-max cinematic-footer-marquee-track">
      {[0, 1].map((group) => (
        <div key={group} className="flex items-center gap-8 px-4">
          {items.map((item) => (
            <div key={`${group}-${item}`} className="flex items-center gap-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
              <span>{item}</span>
              <span style={{ color: 'var(--accent)' }}>✦</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function InfoPill({ icon: Icon, label, value, href }) {
  const content = (
    <div className="cinematic-footer-pill h-full rounded-[1.35rem] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl shrink-0" style={{ background: 'var(--accent-bg)', border: '1px solid var(--border-soft)' }}>
          <Icon size={16} style={{ color: 'var(--accent)' }} strokeWidth={1.7} />
        </div>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--text-ghost)', fontFamily: 'var(--font-mono)' }}>
            {label}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  )

  if (!href) return content
  return <a href={href} className="block h-full">{content}</a>
}

export default function MotionFooter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      ref={ref}
      className="cinematic-footer-wrapper relative overflow-hidden border-t"
      style={{
        background: 'linear-gradient(180deg, var(--bg-alt) 0%, var(--bg-mid) 38%, var(--bg) 100%)',
        borderColor: 'var(--border-faint)',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="pointer-events-none absolute inset-0 cinematic-footer-grid opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[56vh] w-[78vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] cinematic-footer-aurora" />
      <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none cinematic-footer-giant-text opacity-70">
        AEROTF
      </div>

      <div className="absolute top-8 left-0 w-full overflow-hidden border-y py-4" style={{ borderColor: 'var(--border-faint)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
        <MarqueeRow />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-10 lg:pt-36 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Cierre con intención
            </p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.92] md:text-6xl" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}>
              Preparados para resolver
              <br />
              <span style={{ color: 'var(--text-ghost)' }}>suministro aeronáutico crítico.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: 'var(--text-muted)' }}>
              Centralizamos consultas técnicas, disponibilidad y documentación certificada para programas civiles, MRO y defensa, con respuesta clara y trazabilidad desde el primer contacto.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton as="a" href="#contacto" className="cinematic-footer-pill rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--text)' }}>
                <TextScramble text="Solicitar contacto" className="text-sm" />
                <ArrowUpRight size={16} className="ml-2" />
              </MagneticButton>

              <MagneticButton as="a" href="#actividad" className="cinematic-footer-pill rounded-full px-7 py-4 text-sm font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--text-soft)' }}>
                <TextScramble text="Ver actividad" className="text-sm" />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <InfoPill icon={Phone} label="Teléfono" value="+34 916 388 377" href="tel:+34916388377" />
            <InfoPill icon={Mail} label="Email" value="info@aerotf.com" href="mailto:info@aerotf.com" />
            <div className="sm:col-span-2">
              <InfoPill icon={MapPin} label="Ubicación" value="P.I. Europolis, Bristol 14B · Las Rozas, Madrid" href="#contacto" />
            </div>
          </motion.div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t pt-6 md:mt-16 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'var(--border-faint)' }}>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', fontFamily: 'var(--font-display)' }}>
              AT
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-display)' }}>
                Aero<span style={{ color: 'var(--accent)' }}>TF</span>
              </p>
              <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-ghost)', fontFamily: 'var(--font-mono)' }}>
                ENAC · FAA · EASA
              </p>
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: 'var(--text-ghost)', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} Aerospace Tools & Fasteners S.L. · Las Rozas, Madrid
          </p>

          <MagneticButton as="button" onClick={scrollToTop} className="cinematic-footer-pill h-12 w-12 rounded-full" aria-label="Volver arriba" style={{ color: 'var(--text-soft)' }}>
            <ArrowUp size={18} />
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
