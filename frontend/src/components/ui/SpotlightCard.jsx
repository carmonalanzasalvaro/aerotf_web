import { useRef, useState } from 'react'

const glowLookup = {
  accent: 'var(--accent)',
  secondary: 'var(--accent-2)',
}

function toRgb(value) {
  if (!value) return '155,142,199'
  const color = value.trim()
  if (color.startsWith('#')) {
    return [
      parseInt(color.slice(1, 3), 16),
      parseInt(color.slice(3, 5), 16),
      parseInt(color.slice(5, 7), 16),
    ].join(',')
  }
  return color
}

export default function SpotlightCard({
  children,
  className = '',
  glowColor = 'accent',
  width,
  height,
  customSize = false,
}) {
  const cardRef = useRef(null)
  const [{ x, y, active }, setPointer] = useState({ x: 50, y: 50, active: false })

  const styles = getComputedStyle(document.documentElement)
  const resolved = glowLookup[glowColor] || glowColor || 'var(--accent)'
  const raw = resolved.startsWith('var(')
    ? styles.getPropertyValue(resolved.slice(4, -1)).trim()
    : resolved
  const rgb = toRgb(raw)

  const inlineSize = {}
  if (width !== undefined) inlineSize.width = typeof width === 'number' ? `${width}px` : width
  if (height !== undefined) inlineSize.height = typeof height === 'number' ? `${height}px` : height

  const handlePointerMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const nextX = ((event.clientX - rect.left) / rect.width) * 100
    const nextY = ((event.clientY - rect.top) / rect.height) * 100

    setPointer({ x: nextX, y: nextY, active: true })
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer((prev) => ({ ...prev, active: false }))}
      className={`relative overflow-hidden rounded-[1.65rem] transition-all duration-300 ${customSize ? '' : 'w-64 h-80'} ${className}`}
      style={{
        ...inlineSize,
        background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)',
        border: `1px solid ${active ? `rgba(${rgb}, 0.26)` : 'var(--card-stroke)'}`,
        boxShadow: active
          ? `0 24px 48px -30px rgba(${rgb}, 0.28), inset 0 1px 0 rgba(255,255,255,0.08)`
          : 'var(--card-shadow)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transform: active ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[calc(1.65rem-1px)]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 22%, transparent 100%)',
          opacity: 0.8,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0.45,
          background: `radial-gradient(circle at ${x}% ${y}%, rgba(${rgb}, 0.20), transparent 30%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          padding: '1px',
          background: `radial-gradient(circle at ${x}% ${y}%, rgba(${rgb}, 0.75), rgba(${rgb}, 0.12) 30%, transparent 58%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)' }} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
