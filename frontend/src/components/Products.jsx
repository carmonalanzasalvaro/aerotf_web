import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Wrench, Crosshair, Shield, Cog } from 'lucide-react'
import SpotlightCard from './ui/SpotlightCard'

const areas = [
  {
    icon: Crosshair,
    num: '01',
    title: 'Fijaciones aeronáuticas',
    tags: ['NAS', 'MS', 'ABS', 'BAC', 'AN', 'LN', 'CR'],
    desc: 'Gestión y distribución de tornillos, tuercas, remaches y pines certificados bajo estándares internacionales para estructura primaria y secundaria.',
  },
  {
    icon: Cog,
    num: '02',
    title: 'Rodamientos & cojinetes',
    tags: ['Ball bearings', 'Rod ends', 'Spherical', 'Roller'],
    desc: 'Componentes de rodadura conformes con especificaciones MS, M y ABS para aplicaciones de alta exigencia en motores y trenes de aterrizaje.',
  },
  {
    icon: Wrench,
    num: '03',
    title: 'Herramientas aeronáuticas',
    tags: ['Hand tools', 'Power tools', 'Special tools', 'Calibración'],
    desc: 'Utillaje especializado para líneas de producción y MRO, con documentación de calibración y trazabilidad completa hasta el fabricante original.',
  },
  {
    icon: Shield,
    num: '04',
    title: 'Defensa & aplicaciones militares',
    tags: ['MIL-SPEC', 'OTAN', 'AS/NZS', 'Misión crítica'],
    desc: 'Componentes bajo especificaciones MIL-SPEC y estándares OTAN, con cadena de custodia documentada para programas de defensa nacionales e internacionales.',
  },
]

function AreaCard({ icon: Icon, num, title, tags, desc, index }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="h-full"
    >
      <SpotlightCard customSize className="group h-full min-h-[250px] p-8" glowColor={index % 2 === 0 ? 'accent' : 'secondary'}>
        <div
          className="absolute -bottom-3 right-2 select-none pointer-events-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '6rem',
            fontWeight: 900,
            color: 'var(--text-ghost)',
            opacity: 0.32,
            lineHeight: 1,
          }}
        >
          {num}
        </div>

        <div className="mb-6 flex items-start justify-between gap-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
            style={{ background: 'var(--accent-bg)', border: '1px solid var(--border-soft)' }}
          >
            <Icon size={18} style={{ color: 'var(--accent)' }} strokeWidth={1.6} />
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-ghost)', fontFamily: 'var(--font-mono)' }}>
            {num}
          </span>
        </div>

        <h3 className="mb-3 max-w-[18rem] text-xl font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-[11px] tracking-[0.12em] uppercase"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: 'var(--text-faint)',
                border: '1px solid var(--border-faint)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Products() {
  const headerRef = useRef(null)
  const [headerVis, setHeaderVis] = useState(false)

  useEffect(() => {
    const element = headerRef.current
    if (!element) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVis(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="actividad" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full" style={{ background: 'var(--accent-2-glow)', filter: 'blur(120px)', opacity: 0.4 }} />
        <div className="absolute right-[-8%] bottom-0 h-[30rem] w-[30rem] rounded-full" style={{ background: 'var(--accent-glow)', filter: 'blur(140px)', opacity: 0.35 }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="mb-20 grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerVis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Líneas de actividad
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
              Especialización técnica en cada área de suministro
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Operamos exclusivamente en el sector aeronáutico y de defensa, con un catálogo técnico
              gestionado bajo los más exigentes estándares de calidad y trazabilidad internacionales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={headerVis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full overflow-hidden rounded-[2rem] p-8" style={{ background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)', boxShadow: 'var(--card-shadow)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 30%, var(--accent-glow), transparent 38%)' }} />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 80%, var(--accent-2-glow), transparent 34%)' }} />
              <img
                src="/sec1.jpg"
                alt="Componentes aeronáuticos"
                className="relative z-10 mx-auto w-full max-w-[450px] object-contain select-none"
                style={{ filter: 'drop-shadow(0 18px 24px rgba(0,0,0,0.10))' }}
                draggable={false}
              />
              <div className="relative z-10 mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                <span>CoC · FAA · EASA</span>
                <span style={{ color: 'var(--accent)' }}>documentación certificada</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {areas.map((area, index) => (
            <AreaCard key={area.title} {...area} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
