// Pure CSS orbit — each badge rides an invisible arm that rotates around the center.
// A counter-rotation on the badge itself keeps the text upright at all times.

interface Tech {
  name: string
  icon: string
  color: string
  borderColor: string
  glowColor: string
  // which ring (0=inner, 1=middle, 2=outer) and offset angle in deg
  orbit: 0 | 1 | 2
  offset: number
}

const techs: Tech[] = [
  // ── Inner ring (4 items, 90° apart) ─────────────────────────────────
  { name: 'React',      icon: '⚛️',  color: '#22d3ee', borderColor: 'rgba(6,182,212,0.5)',   glowColor: 'rgba(6,182,212,0.7)',   orbit: 0, offset: 0   },
  { name: 'Python',     icon: '🐍',  color: '#4ade80', borderColor: 'rgba(74,222,128,0.5)',  glowColor: 'rgba(74,222,128,0.7)',  orbit: 0, offset: 90  },
  { name: 'Swift',      icon: '🍎',  color: '#fb923c', borderColor: 'rgba(251,146,60,0.5)',  glowColor: 'rgba(251,146,60,0.7)',  orbit: 0, offset: 180 },
  { name: 'Flutter',    icon: '📱',  color: '#60a5fa', borderColor: 'rgba(96,165,250,0.5)',  glowColor: 'rgba(96,165,250,0.7)',  orbit: 0, offset: 270 },

  // ── Middle ring (5 items, 72° apart) ────────────────────────────────
  { name: 'Node.js',    icon: '🟢',  color: '#4ade80', borderColor: 'rgba(74,222,128,0.5)',  glowColor: 'rgba(74,222,128,0.7)',  orbit: 1, offset: 0   },
  { name: 'Kotlin',     icon: '🤖',  color: '#c084fc', borderColor: 'rgba(192,132,252,0.5)', glowColor: 'rgba(192,132,252,0.7)', orbit: 1, offset: 72  },
  { name: 'Firebase',   icon: '🔥',  color: '#fbbf24', borderColor: 'rgba(251,191,36,0.5)',  glowColor: 'rgba(251,191,36,0.7)',  orbit: 1, offset: 144 },
  { name: 'Next.js',    icon: '⚡',  color: '#f1f5f9', borderColor: 'rgba(241,245,249,0.3)', glowColor: 'rgba(241,245,249,0.4)', orbit: 1, offset: 216 },
  { name: 'TensorFlow', icon: '🧠',  color: '#fb923c', borderColor: 'rgba(251,146,60,0.5)',  glowColor: 'rgba(251,146,60,0.7)',  orbit: 1, offset: 288 },

  // ── Outer ring (6 items, 60° apart) ─────────────────────────────────
  { name: 'AWS',        icon: '☁️',  color: '#facc15', borderColor: 'rgba(250,204,21,0.5)',  glowColor: 'rgba(250,204,21,0.7)',  orbit: 2, offset: 0   },
  { name: 'MongoDB',    icon: '🗄️',  color: '#4ade80', borderColor: 'rgba(74,222,128,0.5)',  glowColor: 'rgba(74,222,128,0.7)',  orbit: 2, offset: 60  },
  { name: 'TypeScript', icon: '📘',  color: '#60a5fa', borderColor: 'rgba(96,165,250,0.5)',  glowColor: 'rgba(96,165,250,0.7)',  orbit: 2, offset: 120 },
  { name: 'Figma',      icon: '🎨',  color: '#f472b6', borderColor: 'rgba(244,114,182,0.5)', glowColor: 'rgba(244,114,182,0.7)', orbit: 2, offset: 180 },
  { name: 'Docker',     icon: '🐳',  color: '#22d3ee', borderColor: 'rgba(6,182,212,0.5)',   glowColor: 'rgba(6,182,212,0.7)',   orbit: 2, offset: 240 },
  { name: 'GraphQL',    icon: '🔗',  color: '#f472b6', borderColor: 'rgba(244,114,182,0.5)', glowColor: 'rgba(244,114,182,0.7)', orbit: 2, offset: 300 },
]

// Ring definitions: radius in px, full-rotation duration
const RINGS = [
  { radius: 120, duration: '14s', trackColor: 'rgba(6,182,212,0.15)' },
  { radius: 195, duration: '22s', trackColor: 'rgba(168,85,247,0.12)' },
  { radius: 275, duration: '34s', trackColor: 'rgba(255,255,255,0.06)' },
]

export default function TechOrbit() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#06b6d4 1px,transparent 1px),linear-gradient(90deg,#06b6d4 1px,transparent 1px)',
        backgroundSize: '50px 50px',
      }} />
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mt-4 mb-4">Technologies We Master</h2>
          <p className="text-xl text-gray-400">Cutting-edge tools orbiting our core expertise</p>
        </div>

        {/* ── Orbit system ── */}
        <div className="flex justify-center reveal-on-scroll">
          {/*
            Container sized to the outer ring diameter + badge overhang.
            Everything is centered via margin: auto on the relative wrapper.
          */}
          <div
            className="relative orbit-arena"
            style={{ width: 640, height: 640 }}
          >
            {/* Orbit tracks */}
            {RINGS.map((ring, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-dashed pointer-events-none"
                style={{
                  width: ring.radius * 2,
                  height: ring.radius * 2,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: ring.trackColor,
                }}
              />
            ))}

            {/* Center core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping" style={{ animationDuration: '3.5s' }} />
              <div
                className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
                style={{ boxShadow: '0 0 40px rgba(6,182,212,0.6), 0 0 80px rgba(168,85,247,0.3)' }}
              >
                <img src="/logo.jpg" alt="OrbyTrix" className="w-12 h-12 rounded-full object-cover" />
              </div>
            </div>

            {/* Badges — CSS orbit technique:
                1. .orbit-arm   → positioned at center, rotates 360°
                2. .orbit-badge → pushed out by 'radius' via translateX,
                                  then counter-rotated so text stays upright
            */}
            {techs.map((tech) => {
              const ring = RINGS[tech.orbit]
              return (
                <div
                  key={tech.name}
                  className="orbit-arm absolute top-1/2 left-1/2 w-0 h-0"
                  style={{
                    '--orbit-duration': ring.duration,
                    '--orbit-offset': `${tech.offset}deg`,
                  } as React.CSSProperties}
                >
                  <div
                    className="orbit-badge group absolute flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-sm cursor-pointer"
                    style={{
                      '--orbit-radius': `${ring.radius}px`,
                      '--badge-glow': tech.glowColor,
                      '--badge-border': tech.borderColor,
                      background: 'rgba(15,23,42,0.85)',
                      borderColor: tech.borderColor,
                      boxShadow: `0 0 10px ${tech.glowColor.replace('0.7', '0.2')}`,
                      transform: `translateX(${ring.radius}px) translateX(-50%) translateY(-50%)`,
                    } as React.CSSProperties}
                  >
                    <span className="text-base leading-none">{tech.icon}</span>
                    <span className="text-xs font-semibold whitespace-nowrap" style={{ color: tech.color }}>
                      {tech.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 reveal-on-scroll">
          {[
            { label: 'Core frameworks',     color: 'rgba(6,182,212,0.8)' },
            { label: 'Backend & mobile',    color: 'rgba(168,85,247,0.8)' },
            { label: 'Cloud & tools',       color: 'rgba(148,163,184,0.6)' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
