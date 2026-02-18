"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const featuredProducts = [
  {
    id: 7,
    name: "Mark Series 4.2KW",
    power: "4.2 kW",
    price: "Contact for pricing",
    image: "/images/mark-4-2kw/mrkcover.jpeg",
    specs: ["SP-Hybrid Technology", "WiFi Enabled", "Solar + Battery Ready", "Touch Display"],
    features: ["Advanced hybrid capability", "MPPT solar charging", "AC backup charging"],
    inStock: true,
    slug: "mark-series-4-2kw",
  },
  {
    id: 10,
    name: "Nord Series 10.2KW",
    power: "10.2 kW",
    price: "Contact for pricing",
    image: "/images/nord-10-2kw/nordcover.jpeg",
    specs: ["SP-Hybrid Technology", "WiFi Enabled", "Solar + Battery Ready", "Touch Display"],
    features: ["Advanced hybrid capability", "MPPT solar charging", "AC backup charging"],
    inStock: true,
    slug: "nord-series-10-2kw",
  },
]

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-product]").forEach((el, idx) => {
            setTimeout(() => {
              el.classList.remove("opacity-0", "translate-y-8")
              el.classList.add("animate-fade-in-up")
            }, idx * 100)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 bg-background">
      <div className="section-container space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular solar inverter solutions designed for optimal performance and reliability
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6 place-items-center md:place-items-center">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              data-product
              className="opacity-0 translate-y-8 w-full max-w-sm rounded-2xl border border-border bg-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                {/* Product Image */}
                <div className="relative w-full h-64 bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.power}</p>
                    <p className="text-lg font-semibold text-primary mt-2">{product.price}</p>
                  </div>

                  {/* Specs */}
                  <div className="mb-4 flex-1">
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {product.specs.slice(0, 2).map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stock Status */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        product.inStock
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : "bg-red-500/10 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/products"
                    className="w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 text-center"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center pt-8">
          <Link
            href="/products"
            className="px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:scale-105"
          >
            Explore More Products
          </Link>
        </div>
      </div>
    </section>
  )
}
