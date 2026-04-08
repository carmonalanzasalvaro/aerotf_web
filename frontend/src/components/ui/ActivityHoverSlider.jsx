import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ActivityHoverSlider({ slides = [] }) {
  const [activeSlide, setActiveSlide] = React.useState(0)
  const current = slides[activeSlide] ?? slides[0]

  if (!slides.length) return null

  return (
    <div className="activity-box-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={`head-${current.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="activity-box-heading"
        >
          <p className="activity-box-eyebrow">{current.eyebrow}</p>
          <h3 className="activity-box-title">{current.title}</h3>
        </motion.div>
      </AnimatePresence>

      <div className="activity-box-shell">
        <div className="activity-box-track" role="tablist" aria-label="Líneas de actividad">
          {slides.map((slide, index) => {
            const isActive = activeSlide === index
            return (
              <motion.button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={slide.title}
                className={`activity-box-panel ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveSlide(index)}
                onFocus={() => setActiveSlide(index)}
                onClick={() => setActiveSlide(index)}
                initial={false}
                animate={{
                  flexGrow: isActive ? 2.7 : 1,
                }}
                transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.84 }}
              >
                <span className="activity-box-panel-image-wrap" aria-hidden="true">
                  <img
                    src={slide.imageUrl}
                    alt=""
                    className="activity-box-image"
                    style={{ objectPosition: slide.imagePosition || '50% 50%' }}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="activity-box-image-wash" />
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="activity-box-footer">
        <AnimatePresence mode="wait">
          <motion.div
            key={`meta-${current.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="activity-box-description">{current.desc}</p>

            <div className="activity-box-tags" aria-label="Etiquetas de categoría">
              {current.tags?.map((tag) => (
                <span key={tag} className="activity-box-tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
