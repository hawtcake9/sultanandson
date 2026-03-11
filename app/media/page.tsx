'use client';

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MEDIA_PROJECTS } from "@/data/mediaProjects"

export default function MediaPage() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/5">

      <Navbar />

      <section className="pt-24 bg-gradient-to-r from-primary to-primary/80 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Media Gallery
          </h1>
          <p className="text-lg text-white/90">
            Explore our latest events, partnerships, and milestones
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {MEDIA_PROJECTS.map((project) => (

            <Link
              key={project.slug}
              href={`/media/${project.slug}`}
              className="group relative h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            >

              <div className="relative w-full h-full bg-gray-200">

                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

              </div>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-lg font-semibold">{project.title}</p>
                  <p className="text-sm text-white/80 mt-2">Click to view</p>
                </div>
              </div>

            </Link>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  )
}
