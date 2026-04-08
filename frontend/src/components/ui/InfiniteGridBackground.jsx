import * as React from 'react'
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'

const cx = (...classes) => classes.filter(Boolean).join(' ')

function GridPattern({ offsetX, offsetY, idPrefix, cell = 48, className = '' }) {
  const patternId = React.useId().replace(/:/g, '')
  const id = `${idPrefix}-${patternId}`

  return (
    <svg className={cx('h-full w-full', className)} aria-hidden="true">
      <defs>
        <motion.pattern
          id={id}
          width={cell}
          height={cell}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${cell} 0 L 0 0 0 ${cell}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export default function InfiniteGridBackground({ className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)

  useAnimationFrame(() => {
    if (prefersReducedMotion) return
    offsetX.set((offsetX.get() + 0.16) % 48)
    offsetY.set((offsetY.get() + 0.16) % 48)
  })

  const centerMask = useMotionTemplate`
    radial-gradient(
      58% 52% at 50% 44%,
      rgba(0, 0, 0, 0.98) 0%,
      rgba(0, 0, 0, 0.94) 22%,
      rgba(0, 0, 0, 0.72) 46%,
      rgba(0, 0, 0, 0.34) 66%,
      transparent 88%
    )
  `

  return (
    <div className={cx('absolute inset-0 z-0 overflow-hidden pointer-events-none', className)} aria-hidden="true">
      <div className="absolute inset-0 canvas-grid-base opacity-[0.16]">
        <GridPattern offsetX={offsetX} offsetY={offsetY} idPrefix="canvas-grid-base" cell={48} />
      </div>

      <motion.div
        className="absolute inset-0 canvas-grid-active opacity-[0.42]"
        style={{ maskImage: centerMask, WebkitMaskImage: centerMask }}
      >
        <GridPattern offsetX={offsetX} offsetY={offsetY} idPrefix="canvas-grid-active" cell={48} />
      </motion.div>

      <div className="absolute inset-0 canvas-grid-vignette" />

      <div className="absolute inset-0">
        <div className="canvas-grid-glow canvas-grid-glow-a" />
        <div className="canvas-grid-glow canvas-grid-glow-b" />
        <div className="canvas-grid-glow canvas-grid-glow-c" />
      </div>
    </div>
  )
}
