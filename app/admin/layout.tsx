"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Package, MapPin } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-white overflow-x-hidden">

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0
          w-64 h-full
          bg-[#0f172a]
          border-r border-white/10
          z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        <div className="p-6 text-xl font-bold border-b border-white/10">
          SULTAN CONTROL
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            <Package size={18} />
            Products
          </Link>

          <Link
            href="/admin/dealers"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            <MapPin size={18} />
            Dealers
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile Topbar */}
        <header className="flex items-center justify-between p-4 border-b border-white/10 lg:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="font-semibold">Admin Panel</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
