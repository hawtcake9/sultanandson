"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function MediaProjectClient({ project }: any) {

  const [index,setIndex] = useState(0)

  const next = () =>
    setIndex(index === project.images.length - 1 ? 0 : index + 1)

  const prev = () =>
    setIndex(index === 0 ? project.images.length - 1 : index - 1)

  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="pt-28 pb-16 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Image Slider */}
          <div className="space-y-4">

            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">

              <img
                src={project.images[index]}
                className="w-full h-[500px] object-contain bg-gray-100"
              />

              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
              >
                <ChevronLeft size={24}/>
              </button>

              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
              >
                <ChevronRight size={24}/>
              </button>

            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center flex-wrap">

              {project.images.map((img:any,i:number)=>(
                <img
                  key={i}
                  src={img}
                  onClick={()=>setIndex(i)}
                  className={`h-20 w-20 object-cover rounded cursor-pointer border-2 ${
                    i===index ? "border-blue-600":"border-transparent"
                  }`}
                />
              ))}

            </div>

          </div>

          {/* Description */}
          <div className="space-y-6">

            <h1 className="text-4xl font-bold">
              {project.title}
            </h1>

            <p className="text-gray-600 leading-relaxed">
              {project.description}
            </p>

          </div>

        </div>

      </div>

      <Footer />

    </main>
  )
}
