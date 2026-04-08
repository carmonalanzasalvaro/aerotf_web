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
  const targetRef = React.useRef(null)
  const [screenWidth, setScreenWidth] = React.useState(1440)

  React.useEffect(() => {
    const update = () => setScreenWidth(window.innerWidth || 1440)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const isMobile = screenWidth < 768

  // Recupera la lógica visual cercana a v5: el avión ya está parcialmente visible
  // cuando entra el hero, y cruza pronto para no quedarse “demasiado tarde”.
  const startX = isMobile ? -0.82 * screenWidth : -0.58 * screenWidth
  const endX = isMobile ? 1.02 * screenWidth : 1.08 * screenWidth

  const x = useTransform(scrollYProgress, [0, 0.46], [startX, endX])
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.34, 0.5], [1, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.46], [isMobile ? 8 : -2, isMobile ? -4 : -12])

  return (
    <div
      ref={(node) => {
        targetRef.current = node
        setRefs(ref, node)
      }}
      className={cx('relative h-[114svh] sm:h-[116svh] md:h-[120svh] lg:h-[124svh]', className)}
      {...props}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
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
