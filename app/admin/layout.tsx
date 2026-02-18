"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LogOut,
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  MapPin,
} from "lucide-react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#05060a] text-white">

      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[180px] rounded-full top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[160px] rounded-full bottom-[-150px] right-[-150px]" />
      </div>

      {/* Sidebar */}
      <aside className="relative w-72 backdrop-blur-2xl bg-white/5 border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col z-10">

        <div className="px-8 py-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SULTAN CONTROL
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Advanced Admin System
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          
          <NavLink href="/admin/products" icon={<Package className="w-5 h-5" />}>
            Products
          </NavLink>
          
          <NavLink href="/admin/dealers" icon={<MapPin className="w-5 h-5" />}>
            Dealers
          </NavLink>
          
        </nav>

        <div className="px-4 pb-6">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Area */}
      <div className="relative flex-1 flex flex-col overflow-hidden z-10">

        {/* Top Bar */}
        <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-10 py-5 flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-wide text-blue-400">
            Advanced Control Panel
          </h2>
          <span className="text-sm text-gray-400">
            Welcome, Admin
          </span>
        </header>

        {/* Content Container */}
        <main className="flex-1 overflow-auto p-10">

          <div className="relative group">

            {/* 3D Floating Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 blur-2xl rounded-3xl opacity-40 group-hover:opacity-60 transition" />

            <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.01]">
              {children}
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const active = pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
        ${
          active
            ? "text-blue-400"
            : "text-gray-400 hover:text-white"
        }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
      )}
      {icon}
      <span>{children}</span>
    </Link>
  )
}

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="POST">
      <button
        type="submit"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600/80 hover:bg-red-600 transition text-white shadow-lg hover:shadow-red-500/40"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </form>
  )
}
