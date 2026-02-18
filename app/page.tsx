"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"


type Product = {
  id: string
  name: string
  description: string
  price: string
  images: string[] | null
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(4)

      if (!error && data) {
        setProducts(data as Product[])
      }
    }

    fetchFeatured()
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      

      {/* Hero */}
      <HeroSection />

      {/* Featured Section */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-semibold text-foreground">
              "Featured Products"
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Discover our most popular solar inverter solutions
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6 place-items-center">

            {products.map((product: Product) => (
              <div
                key={product.id}
                className="w-full max-w-sm rounded-2xl border border-border bg-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col h-full">

                  {/* Image */}
                  <div className="aspect-[3/4] bg-white flex items-center justify-center p-6">
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="object-contain h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center flex flex-col grow">

                    <h3 className="text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-2">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <Link
                        href="/products"
                        className="block w-full py-3 rounded-full bg-[#0B2C48] text-white text-sm font-medium hover:bg-[#082136] transition text-center"
                      >
                        View Product
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
              
            ))}
            


          </div>

          {/* Explore All */}
          <div className="text-center mt-14">
            <Link
              href="/products"
              className="inline-block px-8 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition"
            >
              Explore All Products
            </Link>
          </div>

        </div>
      </section>

<Footer />
    </main>
    
  )
}
