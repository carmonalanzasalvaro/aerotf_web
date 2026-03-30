import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCounter(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let v = 0
    const step  = target / (duration / 16)
    const timer = setInterval(() => {
      v = Math.min(v + step, target); setCount(Math.floor(v))
      if (v >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

const data = [
  { value: 20,   suffix: '+', label: 'Años de experiencia',      desc: 'En el mercado aeronáutico global'       },
  { value: 5000, suffix: '+', label: 'Referencias en stock',     desc: 'Fasteners, rodamientos, herramientas'   },
  { value: 48,   suffix: 'h', label: 'Entrega urgente',          desc: 'Para pedidos certificados prioritarios' },
  { value: 100,  suffix: '%', label: 'Trazabilidad garantizada', desc: 'Documentación FAA / EASA completa'      },
]

function Card({ value, suffix, label, desc, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count  = useCounter(value, 2200, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-xl p-8 relative overflow-hidden cursor-default"
      style={{ '--card-index': index }}
    >
      {/* Línea acento izquierda — siempre visible, más dramática */}
      <div className="absolute top-0 left-0 w-[3px] h-full"
           style={{
             background: 'linear-gradient(to bottom, transparent, var(--accent) 30%, var(--accent) 70%, transparent)',
             opacity: 0.6,
           }} />

      {/* Número grande como marca de agua detrás */}
      <div className="absolute -right-3 -top-2 select-none pointer-events-none"
           style={{
             fontFamily: "var(--font-display)",
             fontSize: '8rem',
             fontWeight: 900,
             color: 'var(--accent)',
             opacity: 0.04,
             lineHeight: 1,
             userSelect: 'none',
           }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <p className="text-6xl md:text-7xl font-black tracking-tight mb-3"
         style={{
           color: 'var(--text)',
           fontFamily: "var(--font-display)",
           letterSpacing: '-0.03em',
         }}>
        {count}<span style={{ color: 'var(--accent)' }}>{suffix}</span>
      </p>
      <p className="font-semibold mb-1.5 text-base" style={{ color: 'var(--text)' }}>{label}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-faint)' }}>{desc}</p>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="py-28 section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-xs tracking-widest uppercase font-semibold mb-4"
             style={{
               color: 'var(--accent)',
               fontFamily: "var(--font-mono)",
             }}>
            Stats & hechos
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gradient leading-tight max-w-xl"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: '-0.03em',
              }}>
            Los datos que avalan nuestra precisión
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((s, i) => <Card key={s.label} {...s} index={i} />)}
        </div>
      </div>
    </section>
  )
}