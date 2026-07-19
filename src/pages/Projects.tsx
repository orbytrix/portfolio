import { useState } from 'react'
import PageHero from '@/components/PageHero'
import ProjectCard from '@/components/ProjectCard'
import ProjectModal from '@/components/ProjectModal'
import { projects } from '@/data/projects'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { usePageTitle } from '@/hooks/usePageTitle'
import StatCounter from '@/components/StatCounter'
import type { Project } from '@/types'

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

const projectStats = [
  { val: '500+', label: 'Projects Completed', color: 'text-cyan-400' },
  { val: '11',   label: 'Featured Here',      color: 'text-purple-400' },
  { val: '8+',   label: 'Industries Served',  color: 'text-cyan-400' },
  { val: '98%',  label: 'Client Satisfaction',color: 'text-purple-400' },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const pageRef = useScrollReveal()
  usePageTitle('Projects')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <main id="main-content" ref={pageRef as React.RefObject<HTMLElement>}>
      <PageHero
        title="Our Projects"
        subtitle="Real-world solutions that deliver measurable results"
        description="From AI platforms to mobile apps and enterprise systems — explore what we've built."
        breadcrumb="Projects"
      />

      {/* Stats with animated counters */}
      <section className="py-12 bg-slate-900/50 border-y border-cyan-500/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
            {projectStats.map((s, i) => (
              <StatCounter key={i} value={s.val} label={s.label} color={s.color} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">

          {/* Category filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12 reveal-on-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white neon-glow'
                    : 'glass-card text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-center text-gray-500 text-sm mb-8">
            Showing <span className="text-cyan-400 font-semibold">{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> in <span className="text-purple-400">{activeCategory}</span></>}
          </p>

          {/* Projects grid — key resets animation on filter change */}
          <div key={activeCategory} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                style={{
                  animation: 'cardIn 0.4s ease forwards',
                  animationDelay: `${i * 0.06}s`,
                  opacity: 0,
                }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl">No projects found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  )
}
