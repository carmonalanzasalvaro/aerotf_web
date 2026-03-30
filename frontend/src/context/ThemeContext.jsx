import { createContext, useContext, useState, useEffect } from 'react'

export const themes = {
  dark: {
    name: 'Dark', emoji: '🌑',
    preview: ['#04060f', '#c8102e', '#f0f4f8'],
    vars: {
      '--bg':            '#04060f',
      '--bg-mid':        '#070e18',
      '--bg-alt':        '#050b14',
      '--glass-bg':      'rgba(255,255,255,0.035)',
      '--glass-border':  'rgba(255,255,255,0.08)',
      '--border-faint':  'rgba(255,255,255,0.06)',
      '--border-soft':   'rgba(255,255,255,0.12)',
      '--text':          '#f0f4f8',
      '--text-muted':    'rgba(240,244,248,0.52)',
      '--text-soft':     'rgba(240,244,248,0.68)',
      '--text-faint':    'rgba(240,244,248,0.40)',
      '--text-ghost':    'rgba(240,244,248,0.22)',
      '--surface-hover': 'rgba(255,255,255,0.07)',
      '--accent':        '#c8102e',
      '--accent-hover':  '#b91c1c',
      '--accent-bg':     'rgba(200,16,46,0.10)',
      '--accent-glow':   'rgba(200,16,46,0.18)',
      '--grad-from':     '#ffffff',
      '--grad-to':       '#94a3b8',
      '--noise-opacity': '0.028',
      '--map-tiles':     'dark',
    }
  },
  pearl: {
    name: 'Pearl', emoji: '☀️',
    preview: ['#f5f4ef', '#c8102e', '#0d1117'],
    vars: {
      '--bg':            '#f5f4ef',
      '--bg-mid':        '#eceae3',
      '--bg-alt':        '#f0efe9',
      '--glass-bg':      'rgba(255,255,255,0.92)',
      '--glass-border':  'rgba(0,0,0,0.09)',
      '--border-faint':  'rgba(0,0,0,0.06)',
      '--border-soft':   'rgba(0,0,0,0.13)',
      '--text':          '#0d1117',
      '--text-muted':    'rgba(13,17,23,0.58)',
      '--text-soft':     'rgba(13,17,23,0.72)',
      '--text-faint':    'rgba(13,17,23,0.42)',
      '--text-ghost':    'rgba(13,17,23,0.22)',
      '--surface-hover': 'rgba(255,255,255,1)',
      '--accent':        '#c8102e',
      '--accent-hover':  '#b91c1c',
      '--accent-bg':     'rgba(200,16,46,0.07)',
      '--accent-glow':   'rgba(200,16,46,0.12)',
      '--grad-from':     '#0d1117',
      '--grad-to':       '#475569',
      '--noise-opacity': '0.018',
      '--map-tiles':     'light',
    }
  },
  slate: {
    name: 'Slate', emoji: '🌤',
    preview: ['#dde3ea', '#c8102e', '#0f172a'],
    vars: {
      '--bg':            '#e2e6ec',
      '--bg-mid':        '#d6dce4',
      '--bg-alt':        '#dce0e7',
      '--glass-bg':      'rgba(255,255,255,0.88)',
      '--glass-border':  'rgba(0,0,0,0.10)',
      '--border-faint':  'rgba(0,0,0,0.07)',
      '--border-soft':   'rgba(0,0,0,0.14)',
      '--text':          '#0f172a',
      '--text-muted':    'rgba(15,23,42,0.60)',
      '--text-soft':     'rgba(15,23,42,0.75)',
      '--text-faint':    'rgba(15,23,42,0.45)',
      '--text-ghost':    'rgba(15,23,42,0.25)',
      '--surface-hover': 'rgba(255,255,255,1)',
      '--accent':        '#c8102e',
      '--accent-hover':  '#b91c1c',
      '--accent-bg':     'rgba(200,16,46,0.07)',
      '--accent-glow':   'rgba(200,16,46,0.12)',
      '--grad-from':     '#0f172a',
      '--grad-to':       '#334155',
      '--noise-opacity': '0.015',
      '--map-tiles':     'light',
    }
  },
  navy: {
    name: 'Navy', emoji: '🌊',
    preview: ['#030d1a', '#2563eb', '#e2e8f0'],
    vars: {
      '--bg':            '#030d1a',
      '--bg-mid':        '#061528',
      '--bg-alt':        '#04101f',
      '--glass-bg':      'rgba(255,255,255,0.04)',
      '--glass-border':  'rgba(255,255,255,0.09)',
      '--border-faint':  'rgba(255,255,255,0.06)',
      '--border-soft':   'rgba(255,255,255,0.12)',
      '--text':          '#e2e8f0',
      '--text-muted':    'rgba(226,232,240,0.55)',
      '--text-soft':     'rgba(226,232,240,0.68)',
      '--text-faint':    'rgba(226,232,240,0.40)',
      '--text-ghost':    'rgba(226,232,240,0.22)',
      '--surface-hover': 'rgba(255,255,255,0.07)',
      '--accent':        '#2563eb',
      '--accent-hover':  '#1d4ed8',
      '--accent-bg':     'rgba(37,99,235,0.12)',
      '--accent-glow':   'rgba(37,99,235,0.20)',
      '--grad-from':     '#ffffff',
      '--grad-to':       '#93c5fd',
      '--noise-opacity': '0.028',
      '--map-tiles':     'dark',
    }
  }
}

const ThemeCtx = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('aerotf-theme') || 'dark'
  )

  useEffect(() => {
    const root = document.documentElement
    const vars = themes[theme]?.vars ?? themes.dark.vars
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v))
    localStorage.setItem('aerotf-theme', theme)
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)