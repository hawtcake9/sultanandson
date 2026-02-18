"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type Product = {
  id: string
  name: string
  description: string
  price: string
  stock: number
  power?: string
  images: string[] | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*")
      if (data) setProducts(data as Product[])
    }
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7fb]">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative py-24 px-6 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-200/30 to-purple-200/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Premium Solar Inverters
            </h1>
            <p className="text-gray-500 mt-4 text-lg">
              High-Efficiency Hybrid Energy Solutions
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-12">

            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition duration-700 blur-xl" />

                {/* Card */}
                <div className="relative bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden transition-all duration-500">

                  {/* Image Section */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] tracking-widest uppercase px-4 py-1 rounded-full font-medium">
                      Hybrid Series
                    </div>

                    <motion.img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-200" />

                  {/* Content */}
                  <div className="px-10 py-10 text-center">

                    <h2 className="text-[22px] font-semibold text-[#1a1a1a] font-montserrat">
                      {product.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                      {product.power || product.description}
                    </p>

                    <div className="w-12 h-[2px] bg-black mx-auto my-6" />

                    <div className="text-xl font-medium text-gray-900">
                      {product.price}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4 mt-8">

                      <Link
                        href={`/products/${product.id}`}
                        className="inline-block px-6 py-2 rounded-lg font-semibold text-sm transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        View Details
                      </Link>

                      <a
                        href={`https://wa.me/923459012298?text=I am interested in ${product.name}`}
                        target="_blank"
                        className="inline-block px-6 py-2 rounded-lg font-semibold text-sm transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      >
                        Contact Us
                      </a>

                    </div>

                  </div>
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}
