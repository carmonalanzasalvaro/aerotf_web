import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ShieldCheck, Clock, Globe } from 'lucide-react'

function GridCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const dots = Array.from({ length: 110 }, () => ({
      x: Math.random() * canvas.width,  y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const accent = getComputedStyle(document.documentElement)
                       .getPropertyValue('--accent').trim() || '#c8102e'

      // hexToRgb helper para convertir color CSS a rgba
      const toRgb = (hex) => {
        const r = parseInt(hex.slice(1,3),16)
        const g = parseInt(hex.slice(3,5),16)
        const b = parseInt(hex.slice(5,7),16)
        return `${r},${g},${b}`
      }
      const rgb = accent.startsWith('#') ? toRgb(accent) : '200,16,46'

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d < 140) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(${rgb},${(1 - d/140) * 0.22})`
            ctx.lineWidth = 0.7; ctx.stroke()
          }
        }
      }

      dots.forEach(d => {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${rgb},0.55)`
        ctx.fill()
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1
        if (d.y < 0 || d.y > canvas.height)  d.vy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none"
                 style={{ opacity: 0.72 }} />
}

const badges = [
  { icon: ShieldCheck, label: 'ENAC Certificado'      },
  { icon: Clock,       label: '+20 años de actividad' },
  { icon: Globe,       label: 'Alcance internacional' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 transition-colors duration-500"
           style={{ background: 'linear-gradient(to bottom right, var(--bg), var(--bg-mid), var(--bg))' }} />
      <GridCanvas />

      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute left-0 top-0 h-full w-px origin-top hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass
                       text-xs tracking-widest uppercase font-semibold mb-8"
            style={{ color: 'var(--accent)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--accent)' }} />
            Aerospace Tools & Fasteners · Madrid
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6"
          >
            <span className="text-gradient">Especialistas</span><br />
            <span className="text-gradient">en componentes</span><br />
            <span style={{ color: 'var(--text-ghost)' }}>aeronáuticos.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-lg mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            Más de dos décadas de actividad como distribuidores especializados
            de fijaciones, rodamientos y herramientas para la industria
            aeronáutica y de defensa. Trazabilidad total y documentación
            certificada en cada operación.
          </motion.p>

          {/* Un único CTA institucional: contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#contacto"
               className="flex items-center gap-2 px-7 py-3.5 text-white font-semibold
                          rounded transition-all duration-300 tracking-wide uppercase text-sm"
               style={{ background: 'var(--accent)' }}
               onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
               onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
            >
              Contacto
            </a>
            <a href="#actividad"
               className="flex items-center gap-2 px-7 py-3.5 glass font-medium
                          rounded transition-all text-sm uppercase tracking-wide"
               style={{ color: 'var(--text-soft)' }}>
              Nuestra actividad
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs tracking-wider uppercase"
                   style={{ color: 'var(--text-faint)' }}>
                <Icon size={14} style={{ color: 'var(--accent)' }} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Card institucional derecha */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="glass rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
                 style={{ background: 'var(--accent-bg)' }} />
            <p className="text-xs tracking-widest uppercase font-semibold mb-6"
               style={{ color: 'var(--accent)' }}>
              Sectores de actividad
            </p>
            {[
              ['✈', 'Aviación comercial', 'Airbus, Boeing, ATR, Embraer'],
              ['🛡', 'Defensa & militar',  'Programas nacionales y OTAN'],
              ['🚀', 'Aeroespacial',       'Satélites y lanzaderas'],
              ['🔧', 'MRO',               'Mantenimiento certificado'],
            ].map(([emoji, title, sub]) => (
              <div key={title}
                   className="flex items-center gap-4 py-4 cursor-default"
                   style={{ borderBottom: '1px solid var(--border-faint)' }}>
                <span className="text-xl">{emoji}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-ghost)' }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </motion.div>
    </section>
  )
}