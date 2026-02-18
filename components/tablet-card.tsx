"use client"

import { useEffect, useRef } from "react"

interface TabletCardProps {
  title: string
  subtitle: string
  badge?: string
  videoSrc?: string
  imageSrc?: string
  index?: number
}

export function TabletCard({ title, subtitle, badge, videoSrc, imageSrc, index = 0 }: TabletCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8")
          entry.target.classList.add("animate-fade-in-up")
        }
      },
      { threshold: 0.2 },
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const getVisibilityClass = () => {
    if (index === 3) return "hidden md:block"
    if (index === 4) return "hidden xl:block"
    return "block"
  }

  return (
    <div
      ref={cardRef}
      className={`opacity-0 translate-y-8 rounded-3xl p-3 glass-border w-full max-w-sm ${getVisibilityClass()}`}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.12)",
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px) saturate(180%)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 relative group">
        {/* Status bar */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20 h-1.5 w-16 rounded-full bg-white/20"></div>

        {/* Background content */}
        <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          {videoSrc ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={videoSrc}
            />
          ) : imageSrc ? (
            <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" crossOrigin="anonymous" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            filter: "drop-shadow(0 0 2px rgba(255, 0, 0, 0.1)) drop-shadow(1px 0 2px rgba(0, 255, 0, 0.08)) drop-shadow(-1px 0 2px rgba(0, 0, 255, 0.06))",
          }}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
          {/* Badge */}
          {badge && (
            <div className="mb-3 inline-flex w-fit rounded-full bg-black/40 px-2 py-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-lime-300">{badge}</span>
            </div>
          )}

          {/* Text content */}
          <div className="space-y-1">
            <h3 className="text-3xl font-bold leading-snug text-white/90">{title}</h3>
            <p className="text-xs text-white/70">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
