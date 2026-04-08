import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const certs = [
  'Certificación ENAC Aerospace Scheme',
  'Trazabilidad completa FAA / EASA',
  'Documentación de fabricante original (CoC)',
  'Control de counterfeit conforme AS6081',
  'Gestión de calidad ISO 9001',
  'Registros de inspección y ensayo',
]

export default function Quality() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const metrics = [
    ['100%', 'Piezas con Certificate of Conformance'],
    ['0', 'Tolerancia a componentes sin trazabilidad documentada'],
    ['24h', 'Plazo máximo de respuesta técnica'],
  ]

  return (
    <section id="calidad" className="py-24 section-alt" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="overflow-hidden rounded-[2rem] grid lg:grid-cols-2" style={{ border: '1px solid var(--card-stroke)', boxShadow: 'var(--card-shadow)' }}>
          <div className="p-10 lg:p-14" style={{ background: 'linear-gradient(180deg, var(--card-bg) 0%, color-mix(in srgb, var(--bg) 72%, transparent) 100%)' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={vis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                Calidad & Certificaciones
              </p>
              <h2 className="accent-line mb-6 text-3xl md:text-4xl font-black leading-tight" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
                Trazabilidad total en cada operación
              </h2>
              <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                AeroTF opera bajo un sistema de gestión de calidad riguroso que garantiza la autenticidad,
                trazabilidad y conformidad de cada componente gestionado. Todos los suministros se realizan
                a través de cadenas de distribución autorizadas, con documentación técnica completa hasta el
                fabricante original.
              </p>
              <ul className="space-y-3.5">
                {certs.map((cert, i) => (
                  <motion.li
                    key={cert}
                    initial={{ opacity: 0, x: -20 }}
                    animate={vis ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.06 }}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: 'var(--text-soft)' }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    {cert}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={vis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative overflow-hidden p-10 lg:p-14"
            style={{
              background: 'linear-gradient(135deg, var(--panel-dark) 0%, var(--panel-dark-2) 100%)',
              color: 'white',
            }}
          >
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top right, var(--accent-glow), transparent 34%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at bottom left, var(--accent-2-glow), transparent 32%)' }} />

            <div className="relative z-10 grid gap-8">
              {metrics.map(([value, label]) => (
                <div key={label}>
                  <p className="mb-1.5 text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-none tracking-[-0.04em]" style={{ fontFamily: 'var(--font-display)' }}>
                    {value}
                  </p>
                  <p className="max-w-xs text-sm" style={{ color: 'rgba(255,255,255,0.68)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
