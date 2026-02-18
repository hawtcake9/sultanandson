'use client'

import { ProductCard } from './product-card'

const products = [
  {
    id: 1,
    name: 'SolarPower 3K',
    power: '3 kW',
    price: '$1,899',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop',
    specs: ['150-900V DC Input', 'Single Phase', 'Compact Design', 'WiFi Enabled'],
    inStock: true,
    slug: 'solarpower-3k',
  },
  {
    id: 2,
    name: 'SolarPower 5K',
    power: '5 kW',
    price: '$2,499',
    image: 'https://images.unsplash.com/photo-1516132006029-d16dcd646c1d?w=400&h=400&fit=crop',
    specs: ['150-900V DC Input', 'Single/Three Phase', 'Dual Tracking', 'Smart App'],
    inStock: true,
    slug: 'solarpower-5k',
    featured: true,
  },
  {
    id: 3,
    name: 'SolarPower 7K',
    power: '7 kW',
    price: '$3,199',
    image: 'https://images.unsplash.com/photo-1497440871597-a4ba32202645?w=400&h=400&fit=crop',
    specs: ['150-900V DC Input', 'Three Phase', 'Advanced MPPT', 'Grid Support'],
    inStock: true,
    slug: 'solarpower-7k',
  },
  {
    id: 4,
    name: 'SolarPower 8K',
    power: '8 kW',
    price: '$3,699',
    image: 'https://images.unsplash.com/photo-1509391110292-237c88d95a89?w=400&h=400&fit=crop',
    specs: ['150-900V DC Input', 'Three Phase', 'Dual MPPT', 'Battery Ready'],
    inStock: true,
    slug: 'solarpower-8k',
  },
  {
    id: 5,
    name: 'SolarPower 10K',
    power: '10 kW',
    price: '$4,499',
    image: 'https://images.unsplash.com/photo-1509391110292-237c88d95a89?w=400&h=400&fit=crop',
    specs: ['150-900V DC Input', 'Three Phase', 'Advanced Features', 'Commercial Grade'],
    inStock: true,
    slug: 'solarpower-10k',
  },
  {
    id: 6,
    name: 'Mark Series 4.2KW',
    power: '4.2 kW',
    price: 'Contact for pricing',
    image: 'https://images.unsplash.com/photo-1578926314433-b375a172e0f2?w=400&h=400&fit=crop',
    specs: ['SP-Hybrid Technology', 'WiFi Enabled', 'Solar + Battery Ready', 'Touch Display'],
    inStock: true,
    slug: 'mark-series-4-2kw',
  },
  {
    id: 7,
    name: 'Nord Series 10.2KW',
    power: '10.2 kW',
    price: 'Contact for pricing',
    image: 'https://images.unsplash.com/photo-1497440871597-a4ba32202645?w=400&h=400&fit=crop',
    specs: ['SP-Hybrid Technology', 'WiFi Enabled', 'Solar + Battery Ready', 'Touch Display'],
    inStock: true,
    slug: 'nord-series-10-2kw',
  },
  {
    id: 8,
    name: 'Elite Series 6K',
    power: '6 kW',
    price: '$2,999',
    image: 'https://images.unsplash.com/photo-1516132006029-d16dcd646c1d?w=400&h=400&fit=crop',
    specs: ['Advanced MPPT', 'Smart Monitoring', 'Grid-Tied System', 'High Reliability'],
    inStock: true,
    slug: 'elite-series-6k',
  },
]

export function ProductsShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Solar Inverter <span className="text-blue-600">Collection</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our premium range of solar inverters designed for residential and commercial applications
          </p>
        </div>

        {/* Filter/Sort (Optional) */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
            All Products
          </button>
          <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Residential
          </button>
          <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Commercial
          </button>
          <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Hybrid
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              whatsappNumber="+923001234567"
              phoneNumber="+92-300-1234567"
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6">Don't see what you're looking for?</p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Request Custom Solution
          </button>
        </div>
      </div>
    </section>
  )
}
