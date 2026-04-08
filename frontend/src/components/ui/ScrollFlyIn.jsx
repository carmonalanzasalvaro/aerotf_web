import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import InfiniteGridBackground from './InfiniteGridBackground'

const cx = (...classes) => classes.filter(Boolean).join(' ')

const setRefs = (ref, value) => {
  if (!ref) return
  if (typeof ref === 'function') {
    ref(value)
    return
  }
  ref.current = value
}

const ScrollFlyIn = React.forwardRef(function ScrollFlyIn(
  { children, imageUrl, imageAlt = 'Animated image', className, imageClassName = '', ...props },
  ref,
) {
  const [viewport, setViewport] = React.useState({ width: 1440, height: 900 })

  React.useEffect(() => {
    const update = () => {
      setViewport({
        width: window.innerWidth || 1440,
        height: window.innerHeight || 900,
      })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollY } = useScroll()
  const isMobile = viewport.width < 768
  const travelDistance = Math.max(viewport.height * (isMobile ? 0.42 : 0.48), 260)

  const startX = isMobile ? -0.82 * viewport.width : -0.56 * viewport.width
  const endX = isMobile ? 1.02 * viewport.width : 1.06 * viewport.width

  const x = useTransform(scrollY, [0, travelDistance], [startX, endX])
  const opacity = useTransform(
    scrollY,
    [0, viewport.height * 0.04, viewport.height * 0.34, viewport.height * 0.46],
    [1, 1, 1, 0],
  )
  const y = useTransform(scrollY, [0, travelDistance], [isMobile ? 12 : -4, isMobile ? 0 : -14])

  return (
    <div
      ref={(node) => {
        setRefs(ref, node)
      }}
      className={cx('relative min-h-[42rem] h-[74svh] overflow-hidden md:min-h-[46rem] md:h-[82svh] lg:min-h-[50rem] lg:h-[86svh]', className)}
      {...props}
    >
      <div className="absolute inset-0 canvas-hero-bg" />
      <InfiniteGridBackground />

      <div
        className="absolute inset-x-0 top-0 h-24 md:h-28"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--bg) 96%, white) 0%, color-mix(in srgb, var(--bg) 82%, transparent) 64%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 md:h-28"
        style={{
          background:
            'linear-gradient(0deg, color-mix(in srgb, var(--bg) 96%, white) 0%, color-mix(in srgb, var(--bg) 82%, transparent) 64%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex h-full items-start justify-center pb-0 pt-24 md:pt-28 lg:pt-32">
        <div className="relative z-10 text-center">{children}</div>

        <motion.div
          style={{ x, opacity, y }}
          className="pointer-events-none absolute left-0 top-0 z-20 flex h-full w-full items-center"
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className={cx('canvas-fly-image w-[138vw] max-w-none md:w-[118vw] lg:w-[108vw]', imageClassName)}
            onError={(event) => {
              event.currentTarget.src = 'https://placehold.co/1600x900/f2eae0/223043?text=Image+Error'
            }}
          />
        </motion.div>
      </div>
    </div>
  )
})

export default ScrollFlyIn
