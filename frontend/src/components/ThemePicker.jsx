import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, X } from 'lucide-react'
import { useTheme, themes } from '../context/ThemeContext'

export default function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen]     = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">

      {/* Panel expandido */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 16, scale: 0.95  }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background:  'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              minWidth: '200px',
            }}
          >
            <div className="px-4 pt-4 pb-2">
              <p style={{ color: 'var(--text-ghost)' }}
                 className="text-[10px] tracking-widest uppercase font-semibold mb-3">
                Tema
              </p>

              <div className="space-y-1">
                {Object.entries(themes).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => { setTheme(key); setOpen(false) }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                               transition-all duration-150 text-left group"
                    style={{
                      background: theme === key ? 'var(--accent-bg)' : 'transparent',
                    }}
                  >
                    {/* Swatch */}
                    <div className="flex gap-0.5 shrink-0">
                      {t.preview.map((c, i) => (
                        <div key={i}
                             style={{ backgroundColor: c }}
                             className="w-3 h-5 first:rounded-l last:rounded-r" />
                      ))}
                    </div>

                    <span className="text-sm font-medium"
                          style={{ color: theme === key ? 'var(--accent)' : 'var(--text-soft)' }}>
                      {t.emoji} {t.name}
                    </span>

                    {theme === key && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full"
                           style={{ background: 'var(--accent)' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pb-3 pt-1">
              <p style={{ color: 'var(--text-ghost)' }}
                 className="text-[9px] tracking-widest uppercase text-center">
                AeroTF Dev Tools
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{   scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full
                   shadow-lg text-sm font-bold tracking-widest uppercase
                   transition-colors duration-200"
        style={{
          background:   open ? 'var(--accent)' : 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          border:       '1px solid var(--glass-border)',
          color:        open ? '#ffffff' : 'var(--text-faint)',
        }}
      >
        {open
          ? <X size={14} />
          : <Palette size={14} style={{ color: 'var(--accent)' }} />
        }
        <span style={{ color: open ? '#ffffff' : 'var(--accent)' }}>DEV</span>
      </motion.button>
    </div>
  )
}