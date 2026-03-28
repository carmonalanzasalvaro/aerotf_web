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
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="calidad" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden grid lg:grid-cols-2 shadow-lg"
             style={{ border: '1px solid var(--glass-border)' }}>

          {/* Izquierda — fondo de card blanco/glass */}
          <div className="p-12 lg:p-16"
               style={{ background: 'var(--glass-bg)' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={vis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs tracking-widest uppercase font-semibold mb-4"
                 style={{ color: 'var(--accent)' }}>
                Calidad & Certificaciones
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-gradient leading-tight mb-6 accent-line">
                Trazabilidad total en cada operación
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
                AeroTF opera bajo un sistema de gestión de calidad riguroso que garantiza
                la autenticidad, trazabilidad y conformidad de cada componente gestionado.
                Todos los suministros se realizan a través de cadenas de distribución
                autorizadas, con documentación técnica completa hasta el fabricante original.
              </p>
              <ul className="space-y-3">
                {certs.map((c, i) => (
                  <motion.li key={c}
                    initial={{ opacity: 0, x: -20 }}
                    animate={vis ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: 'var(--text-soft)' }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    {c}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Derecha — siempre oscuro, contraste fuerte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={vis ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-12 lg:p-16 flex flex-col justify-center gap-10 relative overflow-hidden"
            style={{ background: '#111827' }}
          >
            {/* Glow decorativo sutil */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none"
                 style={{ background: '#c8102e' }} />

            {[
              ['100%', 'Piezas con Certificate of Conformance'],
              ['0',    'Tolerancia a componentes sin trazabilidad documentada'],
              ['24h',  'Plazo máximo de respuesta técnica'],
            ].map(([val, label]) => (
              <div key={label} className="relative">
                <p className="text-5xl font-black mb-1.5 text-white">{val}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</p>
              </div>
            ))}

            {/* Línea decorativa vertical izquierda */}
            <div className="absolute left-0 top-8 bottom-8 w-px opacity-20"
                 style={{ background: '#c8102e' }} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}