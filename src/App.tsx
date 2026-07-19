import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import CursorGlow from '@/components/CursorGlow'
import BackToTop from '@/components/BackToTop'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Projects = lazy(() => import('@/pages/Projects'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  // basename keeps React Router in sync with the Vite base path on GitHub Pages
  const basename = import.meta.env.BASE_URL ?? '/'

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <div className="bg-slate-900 text-gray-100 min-h-screen overflow-x-hidden">
        <CursorGlow />
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  )
}
