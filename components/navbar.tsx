"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick?: () => void
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="relative text-sm font-bold text-[#333333] transition-colors duration-200 group tracking-wide"
  >
    {label}
    <span className="absolute bottom-0 left-0 h-0.5 bg-[#333333] transition-all duration-300 w-0 group-hover:w-full" />
  </Link>
)

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src="/images/logo.jpeg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:inline font-bold text-base text-[#333333] tracking-wider">
              SULTAN & SONS
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About" />
            <NavLink href="/products" label="Products" />
            <NavLink href="/media" label="Media" />
            <NavLink href="/dealers" label="Where to Buy" />

            <Link
              href="/https://wa.me/923459012298"
              className="px-6 py-2 rounded-full bg-[#333333] text-white font-bold text-sm hover:bg-[#555555] transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 min-h-screen fixed top-20 left-0 right-0 z-40">
          <div className="px-6 py-8 space-y-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-bold">
              Home
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-bold">
              About
            </Link>
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-bold">
              Products
            </Link>
            <Link href="/media" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-bold">
              Media
            </Link>
            <Link href="/dealers" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-bold">
              Where to Buy
            </Link>

            <Link
              href="/https://wa.me/923459012298"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full px-6 py-3 rounded-full bg-white text-black font-bold text-center mt-6"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
