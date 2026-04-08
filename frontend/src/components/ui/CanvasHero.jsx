import { motion } from 'framer-motion'
import { ArrowRight, Clock3, Globe2, ShieldCheck } from 'lucide-react'
import ScrollFlyIn from './ScrollFlyIn'
import jetTop from '../../assets/jet-top.png'

const markers = [
  { icon: ShieldCheck, label: 'ENAC certificado' },
  { icon: Clock3, label: '+20 años de actividad' },
  { icon: Globe2, label: 'Alcance internacional' },
]

export default function CanvasHero() {
  return (
    <section id="nosotros" className="relative overflow-hidden">
      <ScrollFlyIn imageUrl={jetTop} imageAlt="Avión en vista superior" imageClassName="canvas-fly-jet">
        <div className="mx-auto max-w-6xl px-6 pt-24 md:px-8 md:pt-28 lg:px-10 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="canvas-kicker mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            Aerospace Tools & Fasteners · Madrid
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.08 }}
            className="mx-auto mt-7 max-w-5xl text-balance text-[clamp(3rem,7.2vw,6.5rem)] font-black leading-[0.9] tracking-[-0.05em]"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
          >
            Especialistas
            <span className="block">en componentes</span>
            <span className="block" style={{ color: 'var(--text-ghost)' }}>aeronáuticos.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-[1rem] leading-7 md:text-[1.08rem] md:leading-8"
            style={{ color: 'var(--text-muted)' }}
          >
            Más de dos décadas de actividad como distribuidores especializados de fijaciones,
            rodamientos y herramientas para la industria aeronáutica y de defensa. Trazabilidad
            total y documentación certificada en cada operación.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#contacto" className="canvas-primary-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em]">
              Contacto
              <ArrowRight size={14} />
            </a>
            <a href="#actividad" className="canvas-secondary-btn inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em]">
              Nuestra actividad
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {markers.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="canvas-chip inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.18em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}
              >
                <Icon size={12} style={{ color: 'var(--accent)' }} strokeWidth={1.8} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </ScrollFlyIn>
    </section>
  )
}
