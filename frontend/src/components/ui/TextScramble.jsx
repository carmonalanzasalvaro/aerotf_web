import { useState, useCallback, useRef, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'

export function TextScramble({
  text,
  className = '',
  underline = false,
  glow = false,
  revealSpeed = 3,
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef(null)
  const frameRef = useRef(0)

  const clearScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const scramble = useCallback(() => {
    setIsScrambling(true)
    frameRef.current = 0
    const duration = Math.max(text.length * revealSpeed, 10)

    clearScramble()

    intervalRef.current = setInterval(() => {
      frameRef.current += 1

      const progress = frameRef.current / duration
      const revealedLength = Math.floor(progress * text.length)

      const nextText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < revealedLength) return text[index]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayText(nextText)

      if (frameRef.current >= duration) {
        clearScramble()
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
  }, [clearScramble, revealSpeed, text])

  useEffect(() => {
    setDisplayText(text)
  }, [text])

  useEffect(() => () => clearScramble(), [clearScramble])

  return (
    <span
      className={`relative inline-flex flex-col items-start ${className}`}
      onMouseEnter={() => {
        setIsHovering(true)
        scramble()
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        clearScramble()
        setDisplayText(text)
        setIsScrambling(false)
      }}
    >
      <span className="relative inline-flex whitespace-pre">
        {displayText.split('').map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="inline-block transition-all duration-300"
            style={{
              opacity: isScrambling ? 0.92 : 1,
              transform: isHovering ? 'translateY(-1px)' : 'translateY(0)',
              transitionDelay: `${index * 12}ms`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {underline && (
        <span className="relative mt-1 h-px w-full overflow-hidden">
          <span className="absolute inset-0" style={{ background: 'var(--border-faint)' }} />
          <span
            className="absolute inset-0 origin-left transition-transform duration-500 ease-out"
            style={{
              background: 'var(--accent)',
              transform: isHovering ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />
        </span>
      )}

      {glow && (
        <span
          className="pointer-events-none absolute -inset-2 -z-10 rounded-lg transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at center, var(--accent-bg), transparent 70%)',
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}
    </span>
  )
}

export default TextScramble
