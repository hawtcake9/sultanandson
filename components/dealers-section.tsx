"use client"

import { useEffect, useRef } from "react"

export function DealersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-benefit]").forEach((el, idx) => {
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

  const dealerBenefits = [
    { icon: "🤝", title: "Partner Support", desc: "Dedicated account manager and technical support" },
    { icon: "📚", title: "Training Program", desc: "Comprehensive installation and sales training" },
    { icon: "💰", title: "Competitive Margins", desc: "Attractive pricing and commission structure" },
    { icon: "📦", title: "Inventory Support", desc: "Flexible stock management and quick delivery" },
    { icon: "🎯", title: "Marketing Resources", desc: "Co-branded materials and digital marketing support" },
    { icon: "🏆", title: "Performance Bonuses", desc: "Incentive programs for top-performing dealers" },
  ]

  return (
    <section id="dealers" ref={sectionRef} className="relative py-20 sm:py-32">
      <div className="section-container space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="section-heading">Installer & Dealer Program</h2>
          <p className="section-subheading">Join our network of certified professionals and grow your business</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealerBenefits.map((benefit, idx) => (
            <div
              key={idx}
              data-benefit
              className="opacity-0 translate-y-8 p-6 rounded-xl bg-card border border-border card-hover text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button className="button-primary">Become a Dealer</button>
        </div>
      </div>
    </section>
  )
}
