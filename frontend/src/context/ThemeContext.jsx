import { createContext, useContext, useState, useEffect } from 'react'

export const themes = {
  dark: {
    name: 'Dark', emoji: '🌑',
    preview: ['#04060f', '#c8102e', '#f0f4f8'],
    vars: {
      '--bg':            '#04060f',
      '--bg-mid':        '#08101a',
      '--glass-bg':      'rgba(255,255,255,0.03)',
      '--glass-border':  'rgba(255,255,255,0.07)',
      '--border-faint':  'rgba(255,255,255,0.05)',
      '--border-soft':   'rgba(255,255,255,0.10)',
      '--text':          '#f0f4f8',
      '--text-muted':    'rgba(240,244,248,0.50)',
      '--text-soft':     'rgba(240,244,248,0.65)',
      '--text-faint':    'rgba(240,244,248,0.40)',
      '--text-ghost':    'rgba(240,244,248,0.20)',
      '--surface-hover': 'rgba(255,255,255,0.05)',
      '--accent':        '#c8102e',
      '--accent-hover':  '#b91c1c',
      '--accent-bg':     'rgba(200,16,46,0.07)',
      '--grad-from':     '#ffffff',
      '--grad-to':       '#94a3b8',
      '--map-tiles':     'dark',
    }
  },
  pearl: {
    name: 'Pearl', emoji: '☀️',
    preview: ['#ffffff', '#c8102e', '#0d1117'],
    vars: {
      '--bg':            '#ffffff',
      '--bg-mid':        '#f8fafc',
      '--glass-bg':      'rgba(255,255,255,0.85)',
      '--glass-border':  'rgba(0,0,0,0.08)',
      '--border-faint':  'rgba(0,0,0,0.05)',
      '--border-soft':   'rgba(0,0,0,0.10)',
      '--text':          '#0d1117',
      '--text-muted':    'rgba(13,17,23,0.55)',
      '--text-soft':     'rgba(13,17,23,0.70)',
      '--text-faint':    'rgba(13,17,23,0.40)',
      '--text-ghost':    'rgba(13,17,23,0.20)',
      '--surface-hover': 'rgba(0,0,0,0.03)',
      '--accent':        '#c8102e',
      '--accent-hover':  '#b91c1c',
      '--accent-bg':     'rgba(200,16,46,0.06)',
      '--grad-from':     '#0d1117',
      '--grad-to':       '#475569',
      '--map-tiles':     'light',
    }
  },
  slate: {
    name: 'Slate', emoji: '🌤',
    preview: ['#f1f5f9', '#c8102e', '#0f172a'],
    vars: {
      '--bg':            '#f1f5f9',
      '--bg-mid':        '#e2e8f0',
      '--glass-bg':      'rgba(255,255,255,0.75)',
      '--glass-border':  'rgba(0,0,0,0.08)',
      '--border-faint':  'rgba(0,0,0,0.04)',
      '--border-soft':   'rgba(0,0,0,0.10)',
      '--text':          '#0f172a',
      '--text-muted':    'rgba(15,23,42,0.55)',
      '--text-soft':     'rgba(15,23,42,0.70)',
      '--text-faint':    'rgba(15,23,42,0.40)',
      '--text-ghost':    'rgba(15,23,42,0.20)',
      '--surface-hover': 'rgba(255,255,255,0.90)',
      '--accent':        '#c8102e',
      '--accent-hover':  '#b91c1c',
      '--accent-bg':     'rgba(200,16,46,0.06)',
      '--grad-from':     '#0f172a',
      '--grad-to':       '#334155',
      '--map-tiles':     'light',
    }
  },
  navy: {
    name: 'Navy', emoji: '🌊',
    preview: ['#030d1a', '#2563eb', '#e2e8f0'],
    vars: {
      '--bg':            '#030d1a',
      '--bg-mid':        '#051428',
      '--glass-bg':      'rgba(255,255,255,0.04)',
      '--glass-border':  'rgba(255,255,255,0.08)',
      '--border-faint':  'rgba(255,255,255,0.05)',
      '--border-soft':   'rgba(255,255,255,0.10)',
      '--text':          '#e2e8f0',
      '--text-muted':    'rgba(226,232,240,0.55)',
      '--text-soft':     'rgba(226,232,240,0.65)',
      '--text-faint':    'rgba(226,232,240,0.40)',
      '--text-ghost':    'rgba(226,232,240,0.20)',
      '--surface-hover': 'rgba(255,255,255,0.06)',
      '--accent':        '#2563eb',
      '--accent-hover':  '#1d4ed8',
      '--accent-bg':     'rgba(37,99,235,0.10)',
      '--grad-from':     '#ffffff',
      '--grad-to':       '#93c5fd',
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