import { useState, useEffect, useRef } from 'react'

export function useTypingEffect(phrases: string[], typingSpeed = 60, pauseDuration = 2000, deletingSpeed = 35) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const charIndex = useRef(0)

  useEffect(() => {
    const current = phrases[phraseIndex]

    if (phase === 'typing') {
      if (charIndex.current < current.length) {
        const t = setTimeout(() => {
          setText(current.slice(0, charIndex.current + 1))
          charIndex.current++
        }, typingSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), pauseDuration)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (charIndex.current > 0) {
        const t = setTimeout(() => {
          charIndex.current--
          setText(current.slice(0, charIndex.current))
        }, deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setPhraseIndex((i) => (i + 1) % phrases.length)
        setPhase('typing')
      }
    }
  }, [phase, text, phraseIndex, phrases, typingSpeed, pauseDuration, deletingSpeed])

  return text
}
