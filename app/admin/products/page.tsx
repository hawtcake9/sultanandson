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

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*")
    if (data) setProducts(data as Product[])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    setImageFiles(files)
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)))
  }

  const uploadImages = async (): Promise<string[]> => {
    if (!imageFiles.length) return []
    const uploadedUrls: string[] = []

    for (const file of imageFiles) {
      const fileName = `${Date.now()}-${file.name}`
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file)

      if (error) continue

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)

      uploadedUrls.push(data.publicUrl)
    }

    return uploadedUrls
  }

  const addProduct = async () => {
    if (!newName || !newPrice) return

    const imageUrls = await uploadImages()

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
        images: imageUrls,
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

  const resetForm = () => {
    setNewName("")
    setNewDescription("")
    setNewPrice("")
    setNewStock(0)
    setNewSpecifications("")
    setNewFeatures("")
    setNewFeatured(false)
    setImageFiles([])
    setPreviewUrls([])
    setEditingProduct(null)
    setFormOpen(false)
  }

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id)
    fetchProducts()
  }

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative p-10 space-y-8">

      {/* Neon Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/20 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-600/20 blur-[160px] rounded-full" />

      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-bold text-blue-400">Products</h1>
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
      <div className="relative z-10">
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <Input placeholder="Product Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <Input placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          <Input placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
          <Input type="number" placeholder="Stock" value={newStock} onChange={(e) => setNewStock(Number(e.target.value))} />

          <textarea
            placeholder="Specifications"
            value={newSpecifications}
            onChange={(e) => setNewSpecifications(e.target.value)}
            className="w-full border rounded-lg p-3 bg-white/5 text-white"
          />

          <textarea
            placeholder="Key Features (one per line)"
            value={newFeatures}
            onChange={(e) => setNewFeatures(e.target.value)}
            className="w-full border rounded-lg p-3 bg-white/5 text-white"
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={newFeatured} onChange={(e) => setNewFeatured(e.target.checked)} />
            Mark as Featured
          </label>

          <Input type="file" accept="image/*" multiple onChange={handleImageChange} />

          <div className="flex gap-4">
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
        className="relative z-10 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl"
      >
        <CardContent>
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-4 text-left">Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Featured</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b border-white/10">
                  <td className="py-4 px-4">{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>{p.featured ? "Yes" : "No"}</td>
                  <td className="flex gap-3 py-4 px-4">
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
        </CardContent>
      </motion.div>
    </div>
  )
}
