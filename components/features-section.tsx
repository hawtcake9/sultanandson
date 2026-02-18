"use client"

import { useEffect, useRef } from "react"

const features = [
  {
    icon: "⚡",
    title: "Maximum Efficiency",
    description: "Industry-leading conversion rates up to 98.5% for optimal solar power generation.",
  },
  {
    icon: "📊",
    title: "Real-Time Monitoring",
    description: "Track performance metrics, energy output, and system health from your dashboard.",
  },
  {
    icon: "🔗",
    title: "Smart Integration",
    description: "Seamlessly connects with battery storage, smart grids, and energy management systems.",
  },
  {
    icon: "🛡️",
    title: "Enterprise Security",
    description: "Military-grade encryption and multi-layer protection for your system data.",
  },
  {
    icon: "🌍",
    title: "Global Support",
    description: "24/7 technical support and regional service centers for rapid assistance.",
  },
  {
    icon: "♻️",
    title: "Eco-Friendly Design",
    description: "Sustainable manufacturing and recyclable components for environmental responsibility.",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-card]").forEach((el, idx) => {
            setTimeout(() => {
              el.classList.remove("opacity-0", "translate-y-8")
              el.classList.add("animate-fade-in-up")
            }, idx * 80)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background to-card/30"
    >
      <div className="section-container space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="section-heading">Intelligent Solutions</h2>
          <p className="section-subheading">Advanced features designed for performance and reliability</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              data-card
              className="opacity-0 translate-y-8 p-6 rounded-xl bg-card border border-border card-hover"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
