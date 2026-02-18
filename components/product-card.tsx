'use client'

import { Heart, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
  id: number
  name: string
  power: string
  price: string
  image: string
  specs: string[]
  inStock: boolean
  slug?: string
  phoneNumber?: string
  whatsappNumber?: string
}

export function ProductCard({
  id,
  name,
  power,
  price,
  image,
  specs,
  inStock,
  slug,
  phoneNumber = '+92-300-1234567',
  whatsappNumber = '+923001234567',
}: ProductCardProps) {

  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

      {/* IMAGE SECTION */}
      <div className="relative h-[240px] overflow-hidden bg-white">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Stock Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-semibold text-white ${
              inStock ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Favorite */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-105 transition"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-4 space-y-3">

        {/* Title */}
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-tight">
            {name}
          </h3>
          <p className="text-sm text-blue-600 font-semibold">
            {power}
          </p>
        </div>

        {/* Specs */}
        <div className="space-y-1">
          {specs.slice(0, 2).map((spec, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-600">{spec}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xl font-bold text-gray-900">{price}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">

          <Link
            href={`/products/${slug || id}`}
            className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg text-center hover:bg-blue-700 transition"
          >
            View Details
          </Link>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            className="flex items-center justify-center px-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-500" />
    </div>
  )
}
