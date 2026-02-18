import { Navbar } from "@/components/navbar"
import { ResourcesSection } from "@/components/resources-section"
import { Footer } from "@/components/footer"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ResourcesSection />
      </div>
      <Footer />
    </main>
  )
}
