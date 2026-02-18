"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

export function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-form-element]").forEach((el, idx) => {
            setTimeout(() => {
              el.classList.remove("opacity-0", "translate-y-8")
              el.classList.add("animate-fade-in-up")
            }, idx * 100)
          })
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      <div className="section-container max-w-2xl">
        <div className="space-y-8">
          <div data-form-element className="opacity-0 translate-y-8 p-8 rounded-2xl bg-card border border-border">
            {submitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="inline-flex h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Thank you!</h3>
                <p className="text-muted-foreground">We&apos;ll be in touch shortly with your personalized quote.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Request Quote"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
