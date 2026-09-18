import Hero from '@/components/hero/Hero'
import ProjectsSection from '@/components/projects/ProjectsSection'
import ExperienceSection from '@/components/experience/ExperienceSection'
import ClientsSection from '@/components/clients/ClientsSection'
import CapabilitiesSection from '@/components/capabilities/CapabilitiesSection'
import AboutSection from '@/components/about/AboutSection'
import ContactSection from '@/components/contact/ContactSection'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <ClientsSection />
      <CapabilitiesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
