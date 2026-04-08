import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ShieldCheck, Clock, Globe } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import FlyoverHero from './ui/FlyoverHero'
import CanvasHero from './ui/CanvasHero'

function ParticleCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.7 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const styles = getComputedStyle(document.documentElement)
      const accent = styles.getPropertyValue('--accent').trim() || '#9b8ec7'
      const rgb = accent.startsWith('#')
        ? [
            parseInt(accent.slice(1, 3), 16),
            parseInt(accent.slice(3, 5), 16),
            parseInt(accent.slice(5, 7), 16),
          ].join(',')
        : '155,142,199'

      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / 120) * 0.18})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      dots.forEach((dot) => {
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, 0.42)`
        ctx.fill()
        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.9 }} />
}

const badges = [
  { icon: ShieldCheck, label: 'ENAC certificado' },
  { icon: Clock, label: '+20 años de actividad' },
  { icon: Globe, label: 'Alcance internacional' },
]

function DefaultHero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden" id="nosotros">
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src="/hero-bg.jpg"
          alt="Falcon 9 en hangar SpaceX"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, color-mix(in srgb, var(--bg) 94%, transparent) 0%, color-mix(in srgb, var(--bg) 88%, transparent) 34%, color-mix(in srgb, var(--bg) 28%, transparent) 58%, transparent 76%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 20%, transparent 76%, color-mix(in srgb, var(--bg) 78%, transparent) 100%)',
          }}
        />
        <div
          className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full"
          style={{ background: 'var(--accent-glow)', filter: 'blur(100px)', opacity: 0.7 }}
        />
        <div
          className="absolute right-[18%] top-[18%] h-[20rem] w-[20rem] rounded-full"
          style={{ background: 'var(--accent-2-glow)', filter: 'blur(100px)', opacity: 0.65 }}
        />
      </motion.div>

      <div className="relative z-10 flex min-h-screen w-full items-center px-6 pb-24 pt-28 lg:px-16">
        <div className="relative max-w-xl rounded-[2rem] p-8 md:p-10 lg:p-12" style={{ background: 'color-mix(in srgb, var(--bg) 72%, transparent)', backdropFilter: 'blur(8px)' }}>
          <ParticleCanvas />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 inline-flex items-center gap-2 rounded-full px-3 py-1 mb-8 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{
              background: 'var(--accent-bg)',
              border: '1px solid var(--border-soft)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            Aerospace Tools & Fasteners · Madrid
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-10 mb-6 text-5xl font-black leading-[0.92] tracking-[-0.04em] md:text-6xl xl:text-7xl"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
          >
            Especialistas
            <br />
            en componentes
            <br />
            <span style={{ color: 'var(--text-ghost)' }}>aeronáuticos.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 mb-10 max-w-lg text-base leading-relaxed lg:text-lg"
            style={{ color: 'var(--text-muted)' }}
          >
            Más de dos décadas de actividad como distribuidores especializados de fijaciones,
            rodamientos y herramientas para la industria aeronáutica y de defensa. Trazabilidad
            total y documentación certificada en cada operación.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#contacto"
              className="px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                borderRadius: '999px',
                boxShadow: '0 14px 32px -20px var(--accent-glow)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Contacto
            </a>
            <a
              href="#actividad"
              className="px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] transition-all duration-200"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-soft)',
                borderRadius: '999px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--glass-bg)' }}
            >
              Nuestra actividad
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="relative z-10 flex flex-wrap gap-6"
          >
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                <Icon size={12} style={{ color: 'var(--accent)' }} strokeWidth={1.8} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  const { theme } = useTheme()

  if (theme === 'canvas') {
    return <CanvasHero />
  }

  if (theme === 'flyover') {
    return <FlyoverHero />
  }

  return <DefaultHero />
}
