-- Séverino El - Marketplace
-- Script 006: Products, Orders, Presets, Partitions

-- Table products (produits marketplace)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Infos
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- 'preset', 'partition', 'stems', 'service', 'hardware'
  
  -- Médias
  thumbnail_url TEXT,
  preview_url TEXT, -- Audio/vidéo preview
  files JSONB DEFAULT '[]', -- Fichiers à télécharger après achat
  
  -- Tarification
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  coins_price INTEGER, -- Prix alternatif en coins
  
  -- Commission
  commission_rate DECIMAL(3,2) DEFAULT 0.20, -- 20% par défaut
  
  -- Métadonnées spécifiques
  metadata JSONB DEFAULT '{}', -- Infos spécifiques au type (BPM, tonalité, instrument...)
  
  -- Stats
  sales_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0.00,
  ratings_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  
  -- Statut
  is_published BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_select_published" ON products 
  FOR SELECT USING (is_published = true OR seller_id = auth.uid());

CREATE POLICY "products_insert_own" ON products 
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "products_update_own" ON products 
  FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "products_delete_own" ON products 
  FOR DELETE USING (auth.uid() = seller_id);

-- Table orders (commandes)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Produit
  product_id UUID REFERENCES products(id),
  seller_id UUID REFERENCES profiles(id),
  
  -- Montant
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  coins_used INTEGER DEFAULT 0,
  
  -- Commission
  commission_amount DECIMAL(10,2),
  seller_amount DECIMAL(10,2),
  
  -- Statut
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, refunded, cancelled
  
  -- Paiement
  payment_method VARCHAR(50), -- 'stripe', 'coins', 'paypal'
  payment_id VARCHAR(100),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders(seller_id);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders_select_own" ON orders 
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "orders_insert_buyer" ON orders 
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Table product_reviews (avis produits)
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_all" ON product_reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_own" ON product_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update_own" ON product_reviews FOR UPDATE USING (auth.uid() = user_id);
