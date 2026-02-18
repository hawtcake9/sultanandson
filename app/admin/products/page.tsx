"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Search, Edit } from "lucide-react"

type Product = {
  id: string
  name: string
  description: string
  price: string
  stock: number
  images: string[] | null
  specifications: string
  features: string[] | null
  featured: boolean
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newStock, setNewStock] = useState<number>(0)
  const [newSpecifications, setNewSpecifications] = useState("")
  const [newFeatures, setNewFeatures] = useState("")
  const [newFeatured, setNewFeatured] = useState(false)

  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*")
    if (data) setProducts(data as Product[])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const resetForm = () => {
    setNewName("")
    setNewDescription("")
    setNewPrice("")
    setNewStock(0)
    setNewSpecifications("")
    setNewFeatures("")
    setNewFeatured(false)
    setEditingProduct(null)
    setFormOpen(false)
  }

  const addProduct = async () => {
    if (!newName || !newPrice) return

    const featuresArray = newFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f !== "")

    await supabase.from("products").insert([
      {
        name: newName,
        description: newDescription,
        price: newPrice,
        stock: newStock,
        specifications: newSpecifications,
        features: featuresArray,
        featured: newFeatured,
      },
    ])

    resetForm()
    fetchProducts()
  }

  const updateProduct = async () => {
    if (!editingProduct) return

    const featuresArray = newFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f !== "")

    await supabase
      .from("products")
      .update({
        name: newName,
        description: newDescription,
        price: newPrice,
        stock: newStock,
        specifications: newSpecifications,
        features: featuresArray,
        featured: newFeatured,
      })
      .eq("id", editingProduct.id)

    resetForm()
    fetchProducts()
  }

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id)
    fetchProducts()
  }

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative px-4 sm:px-6 lg:px-10 py-6 space-y-8 overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">
          Products
        </h1>

        <Button
          onClick={() => {
            resetForm()
            setFormOpen(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 text-white"
        />
      </div>

      {/* FORM */}
      {formOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <Input
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <Input
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={newStock}
            onChange={(e) => setNewStock(Number(e.target.value))}
          />

          <textarea
            placeholder="Specifications"
            value={newSpecifications}
            onChange={(e) => setNewSpecifications(e.target.value)}
            className="w-full rounded-lg p-3 bg-white/5 text-white border border-white/10"
          />

          <textarea
            placeholder="Key Features (one per line)"
            value={newFeatures}
            onChange={(e) => setNewFeatures(e.target.value)}
            className="w-full rounded-lg p-3 bg-white/5 text-white border border-white/10"
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={newFeatured}
              onChange={(e) => setNewFeatured(e.target.checked)}
            />
            Mark as Featured
          </label>

          <div className="flex flex-wrap gap-4">
            <Button onClick={editingProduct ? updateProduct : addProduct}>
              {editingProduct ? "Update Product" : "Save Product"}
            </Button>

            <Button variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
      >
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-4 px-4">Name</th>
                  <th className="px-4">Price</th>
                  <th className="px-4">Stock</th>
                  <th className="px-4">Featured</th>
                  <th className="px-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="border-b border-white/10">
                    <td className="py-4 px-4">{p.name}</td>
                    <td className="px-4">{p.price}</td>
                    <td className="px-4">{p.stock}</td>
                    <td className="px-4">
                      {p.featured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-4 flex gap-3">
                      <button
                        onClick={() => {
                          setEditingProduct(p)
                          setNewName(p.name)
                          setNewDescription(p.description)
                          setNewPrice(p.price)
                          setNewStock(p.stock)
                          setNewSpecifications(p.specifications)
                          setNewFeatures(p.features?.join("\n") || "")
                          setNewFeatured(p.featured)
                          setFormOpen(true)
                        }}
                        className="text-blue-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </motion.div>
    </div>
  )
          }
