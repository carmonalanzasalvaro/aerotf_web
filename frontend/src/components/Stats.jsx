import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SpotlightCard from './ui/SpotlightCard'

function useCounter(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return undefined

    let value = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      value = Math.min(value + step, target)
      setCount(Math.floor(value))
      if (value >= target) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

const data = [
  { value: 20, suffix: '+', label: 'Años de experiencia', desc: 'En el mercado aeronáutico global' },
  { value: 5000, suffix: '+', label: 'Referencias en stock', desc: 'Fasteners, rodamientos, herramientas' },
  { value: 48, suffix: 'h', label: 'Entrega urgente', desc: 'Para pedidos certificados prioritarios' },
  { value: 100, suffix: '%', label: 'Trazabilidad garantizada', desc: 'Documentación FAA / EASA completa' },
]

function Card({ value, suffix, label, desc, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCounter(value, 2200, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full"
    >
      <SpotlightCard customSize className="h-full min-h-[210px] p-7 md:p-8" glowColor={index % 2 === 0 ? 'accent' : 'secondary'}>
        <div
          className="absolute right-5 top-4 select-none pointer-events-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '5rem',
            fontWeight: 900,
            color: 'var(--text-ghost)',
            opacity: 0.38,
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <p
          className="mb-3 text-5xl font-black tracking-[-0.04em] md:text-6xl"
          style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
        >
          {count}
          <span style={{ color: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)' }}>{suffix}</span>
        </p>
        <p className="mb-1.5 text-base font-semibold" style={{ color: 'var(--text)' }}>
          {label}
        </p>
        <p className="max-w-[18rem] text-sm leading-relaxed" style={{ color: 'var(--text-faint)' }}>
          {desc}
        </p>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="py-28 section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
            Stats & hechos
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
            Los datos que avalan nuestra precisión
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Indicadores clave de capacidad, disponibilidad y respuesta para programas civiles,
            MRO y defensa, presentados con una jerarquía visual más sobria y técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((item, index) => (
            <Card key={item.label} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
