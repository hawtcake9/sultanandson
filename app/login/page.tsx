"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useMotionValue } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const centerX = rect.left + width / 2
    const centerY = rect.top + height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    rotateX.set((-mouseY / height) * 10)
    rotateY.set((mouseX / width) * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Invalid credentials")
        setIsLoading(false)
        return
      }

      router.push("/admin/products")
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#05060a] overflow-hidden">

      {/* Neon Glow Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/20 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-600/20 blur-[160px] rounded-full" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1000 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 w-full max-w-md shadow-2xl shadow-blue-500/20"
      >
        <h1 className="text-3xl font-bold text-blue-400 mb-2">
          Admin Access
        </h1>

        <p className="text-gray-400 mb-8">
          Please enter admin email and password
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
          autoComplete="off"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <Input
              type="email"
              name="secure_admin_email"
              placeholder="Please enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Password</label>
            <Input
              type="password"
              name="secure_admin_password"
              placeholder="Please enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg shadow-blue-500/30 transition-all"
          >
            {isLoading ? "Authenticating..." : "Access Dashboard"}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
