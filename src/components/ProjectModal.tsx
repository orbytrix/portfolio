import { useEffect } from 'react'
import type { Project } from '@/types'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
        style={{ animation: 'modalIn 0.3s ease forwards' }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 border border-cyan-500/30 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400 transition-all"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {project.featured && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Featured
            </span>
          )}

          <div className="absolute bottom-4 left-4">
            <span className="bg-slate-900/80 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/30">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-white leading-tight flex-1 pr-4">{project.title}</h2>
            <span className="text-gray-500 text-sm whitespace-nowrap">{project.date}</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{project.fullDescription}</p>

          {/* Tech stack */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-slate-800 text-cyan-400 text-sm px-3 py-1 rounded-lg border border-cyan-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={project.link}
              className="flex-1 py-3 text-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg neon-glow hover:scale-[1.02] transition-transform duration-300"
            >
              View Project →
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 glass-card text-gray-400 hover:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
