import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article
      className="glass-card overflow-hidden project-card cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-slate-900/90 text-cyan-400 text-sm font-semibold px-4 py-2 rounded-full border border-cyan-500/40 backdrop-blur-sm">
            View Details →
          </span>
        </div>

        {project.featured && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Featured
          </span>
        )}
        <span className="absolute bottom-3 left-3 bg-slate-900/80 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/30">
          {project.category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-white leading-tight flex-1 pr-2 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-gray-500 text-sm whitespace-nowrap">{project.date}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="bg-slate-800 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/20">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="bg-slate-800 text-gray-400 text-xs px-2 py-1 rounded border border-slate-700">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <span className="inline-flex items-center text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors duration-300">
          View Details
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </article>
  )
}
