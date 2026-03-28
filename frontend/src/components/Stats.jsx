import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Fix: usa IntersectionObserver propio en vez de useInView de framer
function useCounter(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let v = 0
    const step  = target / (duration / 16)
    const timer = setInterval(() => {
      v = Math.min(v + step, target)
      setCount(Math.floor(v))
      if (v >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

const data = [
  { value: 20,   suffix: '+', label: 'Años de actividad',       desc: 'En el mercado aeronáutico global'       },
  { value: 5000, suffix: '+', label: 'Referencias gestionadas', desc: 'Fijaciones, rodamientos, herramientas'   },
  { value: 48,   suffix: 'h', label: 'Respuesta urgente',       desc: 'Para operaciones de alta prioridad'     },
  { value: 100,  suffix: '%', label: 'Trazabilidad completa',   desc: 'Documentación FAA / EASA en cada pieza' },
]

function Card({ value, suffix, label, desc, index }) {
  const ref     = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const count = useCounter(value, 2000, active)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-xl p-8 relative overflow-hidden group
                 transition-all duration-300 cursor-default"
    >
      <div className="absolute top-0 left-0 w-1 h-full opacity-0
                      group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: 'var(--accent)' }} />
      <p className="text-5xl md:text-6xl font-black tracking-tight mb-2"
         style={{ color: 'var(--text)' }}>
        {String(count)}<span style={{ color: 'var(--accent)' }}>{suffix}</span>
      </p>
      <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{label}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-faint)' }}>{desc}</p>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase font-semibold mb-3"
             style={{ color: 'var(--accent)' }}>
            En cifras
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gradient leading-tight max-w-xl">
            Trayectoria que respalda cada operación
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((s, i) => <Card key={s.label} {...s} index={i} />)}
        </div>
      </div>
    </section>
  )
}