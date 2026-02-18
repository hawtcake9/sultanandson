"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { MapPin, Phone, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type Dealer = {
  id: string
  name: string
  city: string
  location: string
  phone: string
}

export default function DealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")

  useEffect(() => {
    const fetchDealers = async () => {
      const { data } = await supabase.from("dealers").select("*")
      if (data) setDealers(data)
    }
    fetchDealers()
  }, [])

  const cities = [
    "all",
    ...Array.from(new Set(dealers.map((d) => d.city.toLowerCase())))
  ]

  const filteredDealers = dealers.filter((d) => {
    const matchesSearch = d.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCity =
      selectedCity === "all" || d.city.toLowerCase() === selectedCity
    return matchesSearch && matchesCity
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Navbar />

      <main className="flex-grow px-6 py-24">

        <div className="max-w-6xl mx-auto space-y-14">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Authorized Dealers
            </h1>
            <p className="text-gray-600 mt-3">
              Find our trusted solar partners across regions
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              placeholder="Search dealers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* City Filters */}
          <div className="flex gap-3 flex-wrap justify-center">
            {cities.map((city) => (
              <motion.button
                key={city}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCity === city
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {city === "all"
                  ? "All Cities"
                  : city.charAt(0).toUpperCase() + city.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Dealers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {filteredDealers.map((dealer, index) => (
              <motion.div
                key={dealer.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.04 }}
               className="
bg-gray-200
rounded-2xl
p-8
border border-black-700
shadow-[0_10px_40px_rgba(0,0,0,0.06)]
hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
transition-all duration-500
"


              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {dealer.name}
                </h3>

                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <span>{dealer.location}</span>
                  </div>

                 {dealer.phone && (
  <div className="flex items-center gap-3">
    <Phone className="w-5 h-5 text-green-600" />
    <a
      href={`tel:${dealer.phone}`}
      className="hover:text-blue-600 transition"
    >
      {dealer.phone}
    </a>
  </div>
)}

                </div>
              </motion.div>
            ))}

          </div>

          {filteredDealers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No dealers found
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
