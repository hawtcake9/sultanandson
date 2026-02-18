-- Admin Dashboard Database Schema for Solar Inverter Ecommerce

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL UNIQUE,
  power_rating VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  specs_json JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on active products for faster queries
CREATE INDEX idx_products_active ON products(is_active);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  total_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT,
  customer_email VARCHAR(255),
  customer_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Dealers/Branches table
CREATE TABLE IF NOT EXISTS dealers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dealers_city ON dealers(city);
CREATE INDEX idx_dealers_active ON dealers(is_active);

-- Users table (extend Supabase auth)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('admin', 'customer', 'moderator')),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  product_id UUID REFERENCES products(id),
  views INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  revenue DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, product_id)
);

CREATE INDEX idx_analytics_date ON analytics(date);
CREATE INDEX idx_analytics_product_id ON analytics(product_id);

-- Row Level Security (RLS) Policies for admin access

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Products: Public read, admin write
CREATE POLICY "Public can read active products" ON products
  FOR SELECT USING (is_active = true OR auth.uid() IN (
    SELECT id FROM user_profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admin can CRUD all products" ON products
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin')
  );

-- Orders: Admin can see all, customers see their own
CREATE POLICY "Admin can see all orders" ON orders
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin')
  );

CREATE POLICY "Admin can update orders" ON orders
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin')
  );

-- Dealers: Public read, admin write
CREATE POLICY "Public can read active dealers" ON dealers
  FOR SELECT USING (is_active = true OR auth.uid() IN (
    SELECT id FROM user_profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admin can manage dealers" ON dealers
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin')
  );

-- User profiles: Users can read their own, admins see all
CREATE POLICY "Users can read their own profile" ON user_profiles
  FOR SELECT USING (
    auth.uid() = id OR auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can manage user profiles" ON user_profiles
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin')
  );

-- Analytics: Admin read/write only
CREATE POLICY "Admin can manage analytics" ON analytics
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin')
  );
