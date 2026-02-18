"use client"

import { useEffect, useRef } from "react"

const resources = [
  { type: "PDF", title: "Installation Guide", desc: "Complete step-by-step installation manual" },
  { type: "PDF", title: "Technical Datasheet", desc: "Detailed specifications and performance data" },
  { type: "Video", title: "Product Demo", desc: "Visual walkthrough of features and setup" },
  { type: "PDF", title: "Troubleshooting Guide", desc: "Common issues and solutions" },
  { type: "PDF", title: "Warranty Information", desc: "Coverage details and claim process" },
  { type: "Video", title: "Training Series", desc: "Multi-part expert training videos" },
]

export function ResourcesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-resource]").forEach((el, idx) => {
            setTimeout(() => {
              el.classList.remove("opacity-0", "translate-y-8")
              el.classList.add("animate-fade-in-up")
            }, idx * 70)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 sm:py-32 bg-muted/30">
      <div className="section-container space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="section-heading">Resources & Downloads</h2>
          <p className="section-subheading">Everything you need to get started and maximize your system</p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource, idx) => (
            <div
              key={idx}
              data-resource
              className="opacity-0 translate-y-8 group p-4 rounded-lg border border-border bg-card hover:border-primary/50 card-hover cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold uppercase text-accent px-2 py-1 bg-accent/10 rounded">
                  {resource.type}
                </span>
                <svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">{resource.title}</h3>
              <p className="text-xs text-muted-foreground">{resource.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
