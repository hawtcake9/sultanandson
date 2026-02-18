"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type Product = {
  id: string
  name: string
  description: string
  price: string
  stock: number
  images: string[] | null
  specifications: string
  features: string[] | null
}


export default function ProductDetails() {
  const params = useParams()
  const id = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [activeImage, setActiveImage] = useState(0)

  // Fetch product
  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (!error && data) {
        setProduct(data as Product)
      }
    }

    fetchProduct()
  }, [id])

  // Auto slide
  useEffect(() => {
    if (!product?.images?.length) return

    const interval = setInterval(() => {
      setActiveImage((prev) =>
        prev === product.images!.length - 1 ? 0 : prev + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [product])

  if (!product) return <div className="p-10">Loading...</div>

  const nextSlide = () => {
    if (!product.images) return
    setActiveImage((prev) =>
      prev === product.images!.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    if (!product.images) return
    setActiveImage((prev) =>
      prev === 0 ? product.images!.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* IMAGE SLIDER */}
<div className="space-y-6">

  {/* Main Image */}
  <div className="relative w-full aspect-3/4 bg-white rounded-3xl shadow-xl overflow-hidden">

    <img
      src={product.images?.[activeImage] || "/placeholder.jpg"}
      alt={product.name}
      className="w-full h-full object-contain transition duration-500 p-6"
    />

    {product.images && product.images.length > 1 && (
      <>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronRight size={22} />
        </button>
      </>
    )}
  </div>

  {/* Thumbnails */}
  {product.images && (
    <div className="flex gap-3 justify-center flex-wrap">
      {product.images.map((img, index) => (
        <img
          key={index}
          src={img}
          onClick={() => setActiveImage(index)}
          className={`h-20 w-20 object-contain bg-white rounded-lg cursor-pointer border-2 transition p-2 ${
            activeImage === index
              ? "border-blue-600"
              : "border-gray-200"
          }`}
        />
      ))}
    </div>
  )}

</div>


          {/* PRODUCT INFO */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>

            <div className="text-3xl font-bold text-blue-600">
              {product.price}
            </div>
            {product.features && product.features.length > 0 && (
  <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-200">

    <h3 className="text-lg font-semibold text-gray-900 mb-6">
      KEY FEATURES
    </h3>

   <ul className="space-y-4">
  {product.features.map((feature: string, index: number) => (
    <li key={index} className="flex items-start gap-3 text-gray-700 text-sm">
      <span className="mt-2 w-2.5 h-2.5 bg-[#0B2C48] rounded-full shrink-0" />
      <span>{feature}</span>
    </li>
  ))}
</ul>



  </div>
)}

            <div className="flex gap-4 pt-6">
              <a
                href={`https://wa.me/923000000000?text=${encodeURIComponent(
                  `I am interested in ${product.name}`
                )}`}
                target="_blank"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Contact Us
              </a>

              <span
                className={`px-4 py-3 rounded-lg ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

        </div>

        {/* SPECIFICATIONS SECTION */}
        {product.specifications && (
          <div className="space-y-8">

            {product.specifications
              .split("\n\n")
              .map((section, index) => {

                const lines = section.split("\n")
                const title = lines[0]
                const rows = lines.slice(1)

                return (
                  <div key={index} className="border rounded-md overflow-hidden">

                    {/* Green Header */}
                    <div className="bg-green-600 text-white px-6 py-3 font-semibold uppercase tracking-wide">
                      {title}
                    </div>

                    {/* Rows */}
                    <div className="bg-white">
                      {rows.map((row, i) => {
                        const parts = row.split("|")

                        return (
                          <div
                            key={i}
                            className={`grid grid-cols-2 px-6 py-3 text-sm border-t ${
                              i % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <div className="text-gray-600">
                              {parts[0]}
                            </div>

                            <div className="font-medium text-gray-800">
                              {parts[1]}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                  </div>
                )
              })}
              <Navbar />

          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}

