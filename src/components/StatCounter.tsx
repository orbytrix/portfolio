import { useCountUp } from '@/hooks/useCountUp'

interface StatCounterProps {
  value: string
  label: string
  color: string
  delay?: number
}

export default function StatCounter({ value, label, color, delay = 0 }: StatCounterProps) {
  const { display, ref } = useCountUp(value)

  return (
    <div
      className="reveal-on-scroll text-center"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`text-5xl font-bold ${color} mb-2 tabular-nums`}
      >
        {display}
      </div>
      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  )
}
