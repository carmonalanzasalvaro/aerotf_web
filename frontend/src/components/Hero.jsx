import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ShieldCheck, Clock, Globe } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

function ParticleCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const dots = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.7,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#c8102e'
      const toRgb = (hex) => {
        const r = parseInt(hex.slice(1,3),16)
        const g = parseInt(hex.slice(3,5),16)
        const b = parseInt(hex.slice(5,7),16)
        return `${r},${g},${b}`
      }
      const rgb = accent.startsWith('#') ? toRgb(accent) : '200,16,46'

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d < 140) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(${rgb},${(1 - d/140) * 0.28})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }
      dots.forEach(d => {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${rgb},0.55)`
        ctx.fill()
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }} />
  )
}

const badges = [
  { icon: ShieldCheck, label: 'ENAC Certificado'      },
  { icon: Clock,       label: '+20 años de actividad' },
  { icon: Globe,       label: 'Alcance internacional' },
]

const DARK_THEMES = ['dark', 'navy']

export default function Hero() {
  const { theme } = useTheme()
  const isDark = DARK_THEMES.includes(theme)

  const textMain    = isDark ? '#ffffff'                          : 'var(--text)'
  const textMuted   = isDark ? 'rgba(255,255,255,0.55)'           : 'var(--text-muted)'
  const textGhost   = isDark ? 'rgba(255,255,255,0.30)'           : 'var(--text-faint)'
  const btnSecBg    = isDark ? 'rgba(255,255,255,0.07)'           : 'var(--glass-bg)'
  const btnSecBrd   = isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border-soft)'
  const btnSecTxt   = isDark ? 'rgba(255,255,255,0.75)'           : 'var(--text-soft)'
  const btnSecHover = isDark ? 'rgba(255,255,255,0.13)'           : 'var(--surface-hover)'
  const scrollTxt   = isDark ? 'rgba(255,255,255,0.22)'           : 'var(--text-ghost)'

  return (
    <section className="relative min-h-screen flex overflow-hidden">

      {/* FOTO — capa base full-bleed */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
        className="absolute inset-0 hidden lg:block"
      >
        <img
          src="/hero-bg.jpg"
          alt="Falcon 9 en hangar SpaceX"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-48"
             style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
        {/* Orb grande mejorado */}
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
             style={{
               background: 'var(--accent-glow)',
               filter: 'blur(120px)',
               opacity: 0.7,
               transform: 'translate(20%, 20%)',
             }} />
        {/* Segundo orb azul para tensión cromática */}
        <div className="absolute top-0 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
             style={{
               background: isDark ? 'rgba(37,99,235,0.12)' : 'rgba(37,99,235,0.06)',
               filter: 'blur(100px)',
               transform: 'translateY(-30%)',
             }} />
      </motion.div>

      {/* PANEL IZQUIERDO */}
      <div
        className="relative z-10 flex flex-col justify-center
                   w-full min-h-screen px-8 lg:px-16 pt-28 pb-24"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #04060f 0%, #07101c 100%)'
            : 'linear-gradient(135deg, var(--bg) 0%, var(--bg-mid) 100%)',
          maskImage:         'linear-gradient(108deg, black 0%, black 38%, transparent 56%)',
          WebkitMaskImage:   'linear-gradient(108deg, black 0%, black 38%, transparent 56%)',
        }}
      >
        <motion.div
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="absolute left-0 top-0 h-full w-px origin-top"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)'
          }}
        />

        <ParticleCanvas />

        <div className="relative z-10 max-w-lg">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8
                       text-xs tracking-widest uppercase font-semibold"
            style={{
              background: 'var(--accent-bg)',
              border: '1px solid rgba(200,16,46,0.25)',
              color: 'var(--accent)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--accent)' }} />
            Aerospace Tools & Fasteners · Madrid
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.92] tracking-tight mb-6"
            style={{
              color: textMain,
              fontFamily: "'Syne', system-ui, sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            Especialistas<br />
            en componentes<br />
            <span style={{ color: 'var(--text-ghost)' }}>aeronáuticos.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base lg:text-lg leading-relaxed mb-10"
            style={{ color: textMuted }}
          >
            Más de dos décadas de actividad como distribuidores especializados
            de fijaciones, rodamientos y herramientas para la industria
            aeronáutica y de defensa. Trazabilidad total y documentación
            certificada en cada operación.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#contacto"
               className="px-7 py-3.5 text-white font-semibold
                          transition-all duration-200 tracking-wide uppercase text-sm"
               style={{
                 background: 'var(--accent)',
                 borderRadius: '8px',
               }}
               onMouseEnter={e => {
                 e.currentTarget.style.background = 'var(--accent-hover)'
                 e.currentTarget.style.transform = 'translateY(-1px)'
                 e.currentTarget.style.boxShadow = '0 6px 20px var(--accent-glow)'
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.background = 'var(--accent)'
                 e.currentTarget.style.transform = 'translateY(0)'
                 e.currentTarget.style.boxShadow = 'none'
               }}
            >
              Contacto
            </a>
            <a href="#actividad"
               className="px-7 py-3.5 font-medium transition-all text-sm uppercase tracking-wide"
               style={{
                 background: btnSecBg,
                 border: btnSecBrd,
                 color: btnSecTxt,
                 borderRadius: '8px',
               }}
               onMouseEnter={e => {
                 e.currentTarget.style.background = btnSecHover
                 e.currentTarget.style.transform = 'translateY(-1px)'
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.background = btnSecBg
                 e.currentTarget.style.transform = 'translateY(0)'
               }}
            >
              Nuestra actividad
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {badges.map(({ icon: Icon, label }) => (
              <div key={label}
                   className="flex items-center gap-2 text-xs tracking-wider uppercase"
                   style={{
                     color: textGhost,
                     fontFamily: "'JetBrains Mono', monospace",
                   }}>
                <Icon size={13} style={{ color: 'var(--accent)' }} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Badge flotante */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="absolute bottom-14 right-8 z-20 rounded-xl px-5 py-4 text-right hidden lg:block"
        style={{
          background: isDark ? 'rgba(4,6,15,0.80)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(16px)',
          border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <p className="text-xs tracking-widest uppercase font-semibold mb-0.5"
           style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace" }}>
          Sector aeroespacial
        </p>
        <p className="text-xs"
           style={{ color: isDark ? 'rgba(255,255,255,0.40)' : 'var(--text-faint)' }}>
          Defensa · MRO · Aviación comercial
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs tracking-widest uppercase"
              style={{ color: scrollTxt, fontFamily: "'JetBrains Mono', monospace" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}