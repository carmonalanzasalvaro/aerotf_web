import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const areas = [
  {
    icon: '⬡', num: '01',
    title: 'Fijaciones aeronáuticas',
    tags:  ['NAS', 'MS', 'ABS', 'BAC', 'AN', 'LN', 'CR'],
    desc:  'Gestión y distribución de tornillos, tuercas, remaches y pines certificados bajo estándares internacionales para estructura primaria y secundaria.',
  },
  {
    icon: '◎', num: '02',
    title: 'Rodamientos & cojinetes',
    tags:  ['Ball bearings', 'Rod ends', 'Spherical', 'Roller'],
    desc:  'Componentes de rodadura conformes con especificaciones MS, M y ABS para aplicaciones de alta exigencia en motores y trenes de aterrizaje.',
  },
  {
    icon: '⌀', num: '03',
    title: 'Herramientas aeronáuticas',
    tags:  ['Hand tools', 'Power tools', 'Special tools', 'Calibración'],
    desc:  'Utillaje especializado para líneas de producción y MRO, con documentación de calibración y trazabilidad completa hasta el fabricante original.',
  },
  {
    icon: '▲', num: '04',
    title: 'Defensa & aplicaciones militares',
    tags:  ['MIL-SPEC', 'OTAN', 'AS/NZS', 'Misión crítica'],
    desc:  'Componentes bajo especificaciones MIL-SPEC y estándares OTAN, con cadena de custodia documentada para programas de defensa nacionales e internacionales.',
  },
]

function AreaCard({ icon, num, title, tags, desc, index }) {
  const ref   = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass rounded-xl p-8 group transition-all duration-300 cursor-default"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-4xl font-black leading-none opacity-60
                         group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--accent)' }}>
          {icon}
        </span>
        <span className="text-xs tracking-widest uppercase font-mono"
              style={{ color: 'var(--text-ghost)' }}>
          {num}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>{title}</h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded tracking-wider"
                style={{
                  background: 'var(--surface-hover)',
                  color: 'var(--text-faint)',
                  border: '1px solid var(--border-faint)',
                }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Products() {
  return (
    <section id="actividad" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[600px] rounded-full blur-[100px]"
             style={{ background: 'var(--accent-bg)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase font-semibold mb-3"
             style={{ color: 'var(--accent)' }}>
            Líneas de actividad
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gradient leading-tight max-w-2xl">
            Especialización técnica en cada área de suministro
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {areas.map((a, i) => <AreaCard key={a.title} {...a} index={i} />)}
        </div>
      </div>
    </section>
  )
}