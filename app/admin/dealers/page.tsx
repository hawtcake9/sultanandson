"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Phone, MapPin } from "lucide-react"

type Dealer = {
  id: string
  name: string
  city: string
  location: string
  phone: string | null
}

export default function DealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")

  const [isAdding, setIsAdding] = useState(false)
  const [editingDealer, setEditingDealer] = useState<Dealer | null>(null)

  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("")
  const [phone, setPhone] = useState("")

  const fetchDealers = async () => {
    const { data, error } = await supabase.from("dealers").select("*")
    if (!error && data) setDealers(data)
  }

  useEffect(() => {
    fetchDealers()
  }, [])

  const resetForm = () => {
    setName("")
    setCity("")
    setLocation("")
    setPhone("")
    setEditingDealer(null)
    setIsAdding(false)
  }

  const addDealer = async () => {
    if (!name || !city || !location) return

    const { error } = await supabase
      .from("dealers")
      .insert([
        {
          name,
          city,
          location,
          phone: phone.trim() ? phone : null,
        },
      ])

    if (error) {
      console.error(error)
      alert("Error adding dealer")
      return
    }

    resetForm()
    fetchDealers()
  }

  const updateDealer = async () => {
    if (!editingDealer) return

    const { error } = await supabase
      .from("dealers")
      .update({
        name,
        city,
        location,
        phone: phone.trim() ? phone : null,
      })
      .eq("id", editingDealer.id)

    if (error) {
      console.error(error)
      alert("Error updating dealer")
      return
    }

    resetForm()
    fetchDealers()
  }

  const deleteDealer = async (id: string) => {
    const { error } = await supabase
      .from("dealers")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      alert("Error deleting dealer")
      return
    }

    fetchDealers()
  }

  const cities = [
    "all",
    ...Array.from(new Set(dealers.map((d) => d.city.toLowerCase()))),
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
    <div className="relative p-10 space-y-10">

      {/* Glow Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/20 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-600/20 blur-[160px] rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">
            Dealers & Branches
          </h1>
          <p className="text-gray-400 mt-1">
            Manage authorized dealers and branches
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Dealer
        </Button>
      </div>

      {/* Add / Edit Form */}
      {isAdding && (
        <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-xl space-y-4">
          <Input
            placeholder="Dealer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            placeholder="Phone (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="flex gap-3">
            <Button onClick={editingDealer ? updateDealer : addDealer}>
              {editingDealer ? "Update Dealer" : "Save Dealer"}
            </Button>
            <Button variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative z-10">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search dealers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 text-white"
        />
      </div>

      {/* City Filters */}
      <div className="relative z-10 flex gap-3 flex-wrap">
        {cities.map((city) => (
          <motion.button
            key={city}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCity === city
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            {city === "all"
              ? "All Cities"
              : city.charAt(0).toUpperCase() + city.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Dealers Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDealers.map((dealer) => (
          <motion.div
            key={dealer.id}
            whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ perspective: 1000 }}
            className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            <h3 className="text-lg font-bold text-white mb-4">
              {dealer.name}
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <span className="text-sm">{dealer.location}</span>
              </div>

              {dealer.phone && (
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span className="text-sm">{dealer.phone}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setEditingDealer(dealer)
                  setName(dealer.name)
                  setCity(dealer.city)
                  setLocation(dealer.location)
                  setPhone(dealer.phone || "")
                  setIsAdding(true)
                }}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={() => deleteDealer(dealer.id)}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDealers.length === 0 && (
        <div className="text-center py-16 relative z-10">
          <p className="text-gray-500">No dealers found</p>
        </div>
      )}
    </div>
  )
}
