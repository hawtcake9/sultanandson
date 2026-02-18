"use client"

import { useEffect, useRef } from "react"

const specs = [
  { label: "Output Power", value: "3-10 kW", details: "Scalable models for residential & commercial" },
  { label: "Efficiency", value: "98.5%", details: "Industry-leading conversion rate" },
  { label: "Input Voltage", value: "150-900V DC", details: "Wide input range compatibility" },
  { label: "Grid Voltage", value: "120-240V AC", details: "Standard residential & commercial" },
  { label: "Operating Temp", value: "-20°C to 60°C", details: "Full range temperature operation" },
  { label: "Warranty", value: "12 Years", details: "Comprehensive equipment coverage" },
]

export function SpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-spec]").forEach((el, idx) => {
            setTimeout(() => {
              el.classList.remove("opacity-0")
              el.classList.add("animate-fade-in-up")
            }, idx * 60)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="specs" ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="section-container space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="section-heading">Technical Specifications</h2>
          <p className="section-subheading">Premium performance across all metrics</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specs.map((spec, idx) => (
            <div key={idx} data-spec className="opacity-0 space-y-2">
              <p className="text-sm font-medium text-accent uppercase tracking-wide">{spec.label}</p>
              <p className="text-3xl font-bold text-foreground">{spec.value}</p>
              <p className="text-sm text-muted-foreground">{spec.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
