"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { DesktopCard } from "@/components/desktop-card"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-animate]").forEach((el, idx) => {
            setTimeout(() => {
              el.classList.remove("opacity-0", "translate-y-8")
              el.classList.add("animate-fade-in-up")
            }, idx * 100)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container text-center space-y-8">
        <div data-animate className="opacity-0 translate-y-8">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent border border-border mb-6">
            <span className="text-sm font-bold text-white">Advanced Solar Technology</span>
          </div>
        </div>

        <div data-animate className="opacity-0 translate-y-8 space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance tracking-tight">
            Meet Your
            <br />
            <span className="gradient-text">Perfect Inverter</span>
          </h1>
          <p className="section-subheading max-w-3xl mx-auto text-base sm:text-lg">
            Data-driven solar energy management for residential and commercial installations. Maximize efficiency,
            monitor performance, and optimize your energy independence.
          </p>
        </div>

        <div
          data-animate
          className="opacity-0 translate-y-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="https://wa.me/923459012298" className="button-primary">
            Get in Touch →
          </Link>
          <Link href="/products" className="button-secondary">
            Explore Systems
          </Link>
        </div>

        <div data-animate className="opacity-0 translate-y-8 pt-12">
          <div className="flex justify-center">
            <DesktopCard
              title=""
              subtitle=""
              badge=""
              videoSrc="/images/whatsapp.mp4"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
