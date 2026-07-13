CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(500),
    platform_data JSONB,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    product_url VARCHAR(500),
    price DECIMAL(10, 2),
    sales_volume INT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competitor_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competitor_id UUID REFERENCES competitors(id),
    price DECIMAL(10, 2),
    sales_volume INT,
    review_count INT,
    rating DECIMAL(3, 2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ad_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    budget DECIMAL(12, 2) NOT NULL,
    spent DECIMAL(12, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    targeting JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ad_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_plan_id UUID REFERENCES ad_plans(id),
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    conversions INT DEFAULT 0,
    revenue DECIMAL(12, 2) DEFAULT 0,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    user_id UUID REFERENCES users(id),
    quantity INT DEFAULT 0,
    revenue DECIMAL(10, 2) DEFAULT 0,
    platform VARCHAR(50),
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE platform_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    platform_name VARCHAR(50) NOT NULL,
    api_key VARCHAR(255),
    api_secret VARCHAR(255),
    auth_data JSONB,
    status VARCHAR(50) DEFAULT 'disabled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_competitors_user_id ON competitors(user_id);
CREATE INDEX idx_competitor_data_competitor_id ON competitor_data(competitor_id);
CREATE INDEX idx_ad_plans_user_id ON ad_plans(user_id);
CREATE INDEX idx_ad_performance_ad_plan_id ON ad_performance(ad_plan_id);
CREATE INDEX idx_sales_data_product_id ON sales_data(product_id);
CREATE INDEX idx_sales_data_user_id ON sales_data(user_id);
CREATE INDEX idx_platform_configs_user_id ON platform_configs(user_id);

GRANT SELECT ON users TO anon;
GRANT SELECT ON products TO anon;
GRANT SELECT ON competitors TO anon;
GRANT SELECT ON competitor_data TO anon;
GRANT SELECT ON ad_plans TO anon;
GRANT SELECT ON ad_performance TO anon;
GRANT SELECT ON sales_data TO anon;
GRANT SELECT ON platform_configs TO anon;

GRANT ALL PRIVILEGES ON users TO authenticated;
GRANT ALL PRIVILEGES ON products TO authenticated;
GRANT ALL PRIVILEGES ON competitors TO authenticated;
GRANT ALL PRIVILEGES ON competitor_data TO authenticated;
GRANT ALL PRIVILEGES ON ad_plans TO authenticated;
GRANT ALL PRIVILEGES ON ad_performance TO authenticated;
GRANT ALL PRIVILEGES ON sales_data TO authenticated;
GRANT ALL PRIVILEGES ON platform_configs TO authenticated;