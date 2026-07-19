export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  technologies: string[]
  category: string
  date: string
  featured: boolean
  link: string
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  color: string
  gradientFrom: string
  gradientTo: string
  glowClass: string
  icon: React.ReactNode
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  service: string
  budget: string
  message: string
}
