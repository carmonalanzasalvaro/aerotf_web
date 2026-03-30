import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Wrench, Crosshair, Shield, Cog } from 'lucide-react'

const areas = [
  {
    icon: Crosshair, num: '01',
    title: 'Fijaciones aeronáuticas',
    tags:  ['NAS', 'MS', 'ABS', 'BAC', 'AN', 'LN', 'CR'],
    desc:  'Gestión y distribución de tornillos, tuercas, remaches y pines certificados bajo estándares internacionales para estructura primaria y secundaria.',
  },
  {
    icon: Cog, num: '02',
    title: 'Rodamientos & cojinetes',
    tags:  ['Ball bearings', 'Rod ends', 'Spherical', 'Roller'],
    desc:  'Componentes de rodadura conformes con especificaciones MS, M y ABS para aplicaciones de alta exigencia en motores y trenes de aterrizaje.',
  },
  {
    icon: Wrench, num: '03',
    title: 'Herramientas aeronáuticas',
    tags:  ['Hand tools', 'Power tools', 'Special tools', 'Calibración'],
    desc:  'Utillaje especializado para líneas de producción y MRO, con documentación de calibración y trazabilidad completa hasta el fabricante original.',
  },
  {
    icon: Shield, num: '04',
    title: 'Defensa & aplicaciones militares',
    tags:  ['MIL-SPEC', 'OTAN', 'AS/NZS', 'Misión crítica'],
    desc:  'Componentes bajo especificaciones MIL-SPEC y estándares OTAN, con cadena de custodia documentada para programas de defensa nacionales e internacionales.',
  },
]

function AreaCard({ icon: Icon, num, title, tags, desc, index }) {
  const ref = useRef(null)
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
      className="glass rounded-xl p-8 group cursor-default relative overflow-hidden"
    >
      {/* Número como marca de agua de fondo */}
      <div className="absolute -bottom-4 -right-2 select-none pointer-events-none"
           style={{
             fontFamily: "var(--font-display)",
             fontSize: '7rem',
             fontWeight: 900,
             color: 'var(--accent)',
             opacity: 0.05,
             lineHeight: 1,
           }}>
        {num}
      </div>

      <div className="flex items-start justify-between mb-6">
        {/* Icono Lucide en contenedor con acento */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                        group-hover:scale-110"
             style={{
               background: 'var(--accent-bg)',
               border: '1px solid rgba(200,16,46,0.20)',
             }}>
          <Icon size={18} style={{ color: 'var(--accent)' }} strokeWidth={1.5} />
        </div>
        <span className="text-xs tracking-widest uppercase"
              style={{
                color: 'var(--text-ghost)',
                fontFamily: "var(--font-mono)",
              }}>
          {num}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-3"
          style={{
            color: 'var(--text)',
            fontFamily: "var(--font-display)",
          }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{desc}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag}
                className="px-2.5 py-1 text-xs rounded tracking-wider"
                style={{
                  background: 'var(--surface-hover)',
                  color: 'var(--text-faint)',
                  border: '1px solid var(--border-faint)',
                  fontFamily: "var(--font-mono)",
                }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Products() {
  const headerRef = useRef(null)
  const [headerVis, setHeaderVis] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderVis(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="actividad" className="py-24 relative">

      {/* Orbs mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[800px] rounded-full"
             style={{
               background: 'var(--accent-glow)',
               filter: 'blur(120px)',
               opacity: 0.5,
             }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
             style={{
               background: 'rgba(37,99,235,0.08)',
               filter: 'blur(100px)',
             }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header split */}
        <div ref={headerRef}
             className="grid lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerVis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-widest uppercase font-semibold mb-3"
               style={{
                 color: 'var(--accent)',
                 fontFamily: "var(--font-mono)",
               }}>
              Líneas de actividad
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gradient leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: '-0.03em',
                }}>
              Especialización técnica en cada área de suministro
            </h2>
            <p className="mt-5 text-base leading-relaxed max-w-md"
               style={{ color: 'var(--text-muted)' }}>
              Operamos exclusivamente en el sector aeronáutico y de defensa,
              con un catálogo técnico gestionado bajo los más exigentes
              estándares de calidad y trazabilidad internacionales.
            </p>
          </motion.div>

          {/* Imagen del producto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={headerVis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full glass rounded-2xl overflow-hidden p-6
                            flex items-center justify-center"
                 style={{ minHeight: '280px' }}>

              <div className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                   style={{
                     background: `radial-gradient(ellipse at center,
                       transparent 55%,
                       var(--bg-mid) 100%)`
                   }} />

              <img
                src="/sec1.jpg"
                alt="Componentes aeronáuticos"
                className="relative z-0 w-full max-w-[460px] object-contain
                           select-none mix-blend-multiply"
                style={{ filter: 'contrast(1.05) saturate(0.95)' }}
                draggable={false}
              />
            </div>

            {/* Badge esquina */}
            <div className="absolute bottom-3 right-3 glass rounded-lg px-3 py-2 z-20">
              <p className="text-xs font-semibold tracking-wider uppercase"
                 style={{
                   color: 'var(--accent)',
                   fontFamily: "var(--font-mono)",
                 }}>
                CoC · FAA · EASA
              </p>
            </div>
          </motion.div>
        </div>

        {/* Cards de áreas */}
        <div className="grid md:grid-cols-2 gap-4">
          {areas.map((a, i) => <AreaCard key={a.title} {...a} index={i} />)}
        </div>
      </div>
    </section>
  )
}