import { motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck, Clock, Globe } from 'lucide-react'
import planeTop from '../../assets/jet-top.png'

const badges = [
  { icon: ShieldCheck, label: 'ENAC certificado' },
  { icon: Clock, label: '+20 años de actividad' },
  { icon: Globe, label: 'Alcance internacional' },
]

const metrics = [
  ['20+', 'Años de experiencia'],
  ['5000+', 'Referencias trazables'],
  ['24h', 'Respuesta técnica'],
]

export default function FlyoverHero() {
  return (
    <section id="nosotros" className="relative overflow-hidden">
      <div className="absolute inset-0 flight-hero-bg" />
      <div className="pointer-events-none absolute inset-0 flight-hero-grid" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 lg:pb-24 lg:pt-32">
        <div className="flight-hero-shell relative overflow-hidden rounded-[2.25rem] px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div className="flight-hero-orb flight-hero-orb-a" />
          <div className="flight-hero-orb flight-hero-orb-b" />

          <svg className="pointer-events-none absolute inset-x-0 top-0 hidden h-[360px] w-full md:block" viewBox="0 0 1200 360" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M18 210C110 164 218 120 332 112C482 102 554 182 700 172C842 162 920 118 1182 90" stroke="var(--hero-path)" strokeWidth="1.25" strokeDasharray="6 10" />
            <path d="M872 42L1180 88" stroke="var(--hero-path)" strokeWidth="1.25" strokeDasharray="4 9" opacity="0.4" />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{
              background: 'var(--accent-bg)',
              borderColor: 'var(--border-soft)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            Aerospace Tools & Fasteners · Madrid
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="relative z-10 max-w-4xl pt-8 md:pt-28 lg:pt-36"
          >
            <h1 className="max-w-3xl text-[clamp(3.35rem,8vw,7.4rem)] font-black leading-[0.92] tracking-[-0.05em]" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
              Especialistas
              <br />
              en componentes
              <br />
              <span style={{ color: 'var(--text-ghost)' }}>aeronáuticos.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="relative z-10 mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
          >
            <div className="max-w-xl">
              <p className="text-base leading-relaxed lg:text-lg" style={{ color: 'var(--text-muted)' }}>
                Distribución técnica de fijaciones, rodamientos y herramientas con enfoque aeroespacial, defensa y MRO. Un hero más editorial, claro y memorable, donde el avión actúa como gancho visual y el contenido sigue siendo lo primero.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition-transform duration-200"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                    color: '#ffffff',
                    boxShadow: '0 16px 32px -24px var(--accent-glow)',
                  }}
                  onMouseEnter={(event) => { event.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(event) => { event.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Solicitar contacto
                  <ArrowUpRight size={16} className="ml-2" />
                </a>
                <a
                  href="#actividad"
                  className="inline-flex items-center rounded-full border px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] transition-colors duration-200"
                  style={{
                    background: 'var(--glass-bg)',
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-soft)',
                  }}
                  onMouseEnter={(event) => { event.currentTarget.style.background = 'var(--surface-hover)' }}
                  onMouseLeave={(event) => { event.currentTarget.style.background = 'var(--glass-bg)' }}
                >
                  Nuestra actividad
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-5">
                {badges.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                    <Icon size={12} style={{ color: 'var(--accent)' }} strokeWidth={1.8} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {metrics.map(([value, label]) => (
                <div key={label} className="flight-kpi-card rounded-[1.35rem] px-4 py-4">
                  <p className="text-[clamp(2rem,4vw,2.8rem)] font-black leading-none tracking-[-0.04em]" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                    {value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.16, ease: 'easeOut' }}
            className="pointer-events-none absolute -right-[18%] top-[2.5rem] hidden md:block lg:-right-[9%] lg:top-1 w-[1020px] max-w-[82vw]"
            aria-hidden="true"
          >
            <div className="flight-plane-shadow absolute inset-x-[18%] bottom-[16%] h-[34%] rounded-full blur-[40px]" />
            <img src={planeTop} alt="" className="flight-hero-plane relative z-10 w-full select-none" draggable={false} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: 'easeOut' }}
            className="relative mt-10 md:hidden"
            aria-hidden="true"
          >
            <div className="flight-plane-shadow absolute inset-x-[14%] bottom-[18%] h-[30%] rounded-full blur-[34px]" />
            <img src={planeTop} alt="" className="flight-hero-plane relative z-10 w-full" draggable={false} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
