# 陇渭本草全渠道电商自动化运营平台 - 技术架构文档

## 1. Architecture Design

```mermaid
flowchart TB
    subgraph Frontend["前端应用"]
        F1[React SPA]
        F2[Dashboard组件]
        F3[竞品分析组件]
        F4[商品管理组件]
        F5[投流管理组件]
        F6[数据分析组件]
        F7[用户管理组件]
    end
    
    subgraph Backend["后端服务"]
        B1[Express API]
        B2[认证服务]
        B3[平台集成服务]
        B4[数据同步服务]
        B5[智能分析服务]
        B6[定时任务服务]
    end
    
    subgraph Database["数据库"]
        D1[Supabase PostgreSQL]
        D2[商品表]
        D3[竞品表]
        D4[投放计划表]
        D5[销售数据表]
        D6[用户表]
        D7[平台配置表]
    end
    
    subgraph External["外部服务"]
        E1[淘宝开放平台]
        E2[天猫开放平台]
        E3[小红书开放平台]
        E4[抖音开放平台]
        E5[京东开放平台]
        E6[云存储服务]
        E7[邮件服务]
    end
    
    F1 --> B1
    B1 --> D1
    B1 --> B2
    B1 --> B3
    B1 --> B4
    B1 --> B5
    B1 --> B6
    B3 --> E1
    B3 --> E2
    B3 --> E3
    B3 --> E4
    B3 --> E5
    B4 --> D5
    B6 --> D4
    B1 --> E6
    B1 --> E7
```

## 2. Technology Description

### 2.1 技术栈
- **前端**: React@18 + TypeScript + TailwindCSS@3 + Vite
- **状态管理**: Zustand
- **路由**: React Router DOM
- **图表库**: Recharts
- **图标**: Lucide React
- **后端**: Express@4 + TypeScript
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **定时任务**: Node-cron
- **API集成**: Axios
- **部署**: Vercel (前端) + Railway (后端)

### 2.2 项目结构
```
ZD/
├── src/                    # 前端代码
│   ├── components/         # 公共组件
│   ├── pages/              # 页面组件
│   ├── hooks/              # 自定义hooks
│   ├── stores/             # Zustand状态管理
│   ├── utils/              # 工具函数
│   ├── api/                # API调用
│   ├── types/              # 类型定义
│   └── assets/             # 静态资源
├── api/                    # 后端代码
│   ├── controllers/        # 控制器
│   ├── services/           # 服务层
│   ├── routes/             # 路由定义
│   ├── middleware/         # 中间件
│   ├── config/             # 配置文件
│   └── utils/              # 工具函数
├── supabase/               # Supabase配置
├── migrations/             # 数据库迁移
├── shared/                 # 共享类型定义
└── .trae/documents/        # 文档
```

## 3. Route Definitions

| Route | Purpose |
|-------|---------|
| / | Dashboard首页 |
| /competitor | 竞品分析页面 |
| /products | 商品管理页面 |
| /products/add | 添加商品页面 |
| /products/edit/:id | 编辑商品页面 |
| /ads | 投流管理页面 |
| /ads/create | 创建投放计划页面 |
| /analytics | 数据分析页面 |
| /platforms | 平台接入页面 |
| /users | 用户管理页面 |
| /users/add | 添加用户页面 |
| /settings | 系统设置页面 |
| /login | 登录页面 |
| /register | 注册页面 |

## 4. API Definitions

### 4.1 认证接口
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | 用户登录 |
| POST | /api/auth/register | 用户注册 |
| GET | /api/auth/me | 获取当前用户信息 |
| POST | /api/auth/logout | 用户退出 |

### 4.2 商品接口
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | 获取商品列表 |
| POST | /api/products | 添加商品 |
| GET | /api/products/:id | 获取商品详情 |
| PUT | /api/products/:id | 更新商品 |
| DELETE | /api/products/:id | 删除商品 |
| POST | /api/products/sync | 同步平台商品 |
| POST | /api/products/publish | 发布商品到平台 |

### 4.3 竞品接口
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/competitors | 获取竞品列表 |
| POST | /api/competitors | 添加竞品 |
| GET | /api/competitors/:id | 获取竞品详情 |
| PUT | /api/competitors/:id | 更新竞品 |
| DELETE | /api/competitors/:id | 删除竞品 |
| GET | /api/competitors/analysis | 获取竞品分析数据 |

### 4.4 投流接口
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/ads | 获取投放计划列表 |
| POST | /api/ads | 创建投放计划 |
| GET | /api/ads/:id | 获取投放计划详情 |
| PUT | /api/ads/:id | 更新投放计划 |
| DELETE | /api/ads/:id | 删除投放计划 |
| POST | /api/ads/start | 启动投放 |
| POST | /api/ads/stop | 停止投放 |
| GET | /api/ads/analytics | 获取投放效果数据 |

### 4.5 数据分析接口
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/analytics/sales | 获取销售数据 |
| GET | /api/analytics/traffic | 获取流量数据 |
| GET | /api/analytics/conversion | 获取转化数据 |
| GET | /api/analytics/report | 获取综合报表 |

### 4.6 用户接口
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | 获取用户列表 |
| POST | /api/users | 添加用户 |
| GET | /api/users/:id | 获取用户详情 |
| PUT | /api/users/:id | 更新用户 |
| DELETE | /api/users/:id | 删除用户 |

### 4.7 平台配置接口
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/platforms | 获取平台配置列表 |
| POST | /api/platforms | 添加平台配置 |
| PUT | /api/platforms/:id | 更新平台配置 |
| DELETE | /api/platforms/:id | 删除平台配置 |
| POST | /api/platforms/test | 测试平台连接 |

## 5. Server Architecture Diagram

```mermaid
flowchart TD
    subgraph Controller["控制器层"]
        C1[AuthController]
        C2[ProductController]
        C3[CompetitorController]
        C4[AdController]
        C5[AnalyticsController]
        C6[UserController]
        C7[PlatformController]
    end
    
    subgraph Service["服务层"]
        S1[AuthService]
        S2[ProductService]
        S3[CompetitorService]
        S4[AdService]
        S5[AnalyticsService]
        S6[UserService]
        S7[PlatformService]
        S8[DataSyncService]
    end
    
    subgraph Repository["数据访问层"]
        R1[UserRepository]
        R2[ProductRepository]
        R3[CompetitorRepository]
        R4[AdRepository]
        R5[AnalyticsRepository]
        R6[PlatformRepository]
    end
    
    subgraph Database["数据库"]
        D1[(Supabase PostgreSQL)]
    end
    
    C1 --> S1
    C2 --> S2
    C3 --> S3
    C4 --> S4
    C5 --> S5
    C6 --> S6
    C7 --> S7
    S2 --> S8
    S3 --> S8
    S4 --> S8
    
    S1 --> R1
    S2 --> R2
    S3 --> R3
    S4 --> R4
    S5 --> R5
    S6 --> R1
    S7 --> R6
    S8 --> R2
    S8 --> R3
    S8 --> R5
    
    R1 --> D1
    R2 --> D1
    R3 --> D1
    R4 --> D1
    R5 --> D1
    R6 --> D1
```

## 6. Data Model

### 6.1 Data Model Definition

```mermaid
erDiagram
    Users ||--o{ Products : manages
    Users ||--o{ Competitors : monitors
    Users ||--o{ AdPlans : creates
    Users ||--o{ PlatformConfigs : configures
    Products ||--o{ SalesData : has
    Competitors ||--o{ CompetitorData : has
    AdPlans ||--o{ AdPerformance : has
    PlatformConfigs ||--o{ Products : publishes_to
    
    Users {
        uuid id PK
        varchar email UK
        varchar password_hash
        varchar name
        varchar role
        timestamp created_at
        timestamp updated_at
    }
    
    Products {
        uuid id PK
        uuid user_id FK
        varchar name
        varchar category
        text description
        decimal price
        int stock
        text image_url
        json platform_data
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    
    Competitors {
        uuid id PK
        uuid user_id FK
        varchar name
        varchar platform
        varchar product_url
        decimal price
        int sales_volume
        json metadata
        timestamp created_at
        timestamp updated_at
    }
    
    CompetitorData {
        uuid id PK
        uuid competitor_id FK
        decimal price
        int sales_volume
        int review_count
        decimal rating
        timestamp recorded_at
    }
    
    AdPlans {
        uuid id PK
        uuid user_id FK
        varchar name
        varchar platform
        decimal budget
        decimal spent
        varchar status
        timestamp start_time
        timestamp end_time
        json targeting
        timestamp created_at
        timestamp updated_at
    }
    
    AdPerformance {
        uuid id PK
        uuid ad_plan_id FK
        int impressions
        int clicks
        int conversions
        decimal revenue
        timestamp recorded_at
    }
    
    SalesData {
        uuid id PK
        uuid product_id FK
        int quantity
        decimal revenue
        varchar platform
        timestamp sale_date
    }
    
    PlatformConfigs {
        uuid id PK
        uuid user_id FK
        varchar platform_name
        varchar api_key
        varchar api_secret
        json auth_data
        varchar status
        timestamp created_at
        timestamp updated_at
    }
```

### 6.2 Data Definition Language

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
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

-- Competitors Table
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

-- CompetitorData Table
CREATE TABLE competitor_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competitor_id UUID REFERENCES competitors(id),
    price DECIMAL(10, 2),
    sales_volume INT,
    review_count INT,
    rating DECIMAL(3, 2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AdPlans Table
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

-- AdPerformance Table
CREATE TABLE ad_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_plan_id UUID REFERENCES ad_plans(id),
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    conversions INT DEFAULT 0,
    revenue DECIMAL(12, 2) DEFAULT 0,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SalesData Table
CREATE TABLE sales_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    quantity INT DEFAULT 0,
    revenue DECIMAL(10, 2) DEFAULT 0,
    platform VARCHAR(50),
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PlatformConfigs Table
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

-- Indexes
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_competitors_user_id ON competitors(user_id);
CREATE INDEX idx_competitor_data_competitor_id ON competitor_data(competitor_id);
CREATE INDEX idx_ad_plans_user_id ON ad_plans(user_id);
CREATE INDEX idx_ad_performance_ad_plan_id ON ad_performance(ad_plan_id);
CREATE INDEX idx_sales_data_product_id ON sales_data(product_id);
CREATE INDEX idx_platform_configs_user_id ON platform_configs(user_id);

-- Grant Permissions
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
```

## 7. 安全考虑

### 7.1 认证与授权
- 使用JWT令牌进行身份验证
- 基于角色的访问控制(RBAC)
- 密码使用bcrypt加密存储

### 7.2 数据安全
- API密钥加密存储
- 敏感数据传输使用HTTPS
- 定期数据备份

### 7.3 接口安全
- 请求频率限制
- 参数校验
- SQL注入防护
- XSS防护

## 8. 部署方案

### 8.1 前端部署
- 部署平台: Vercel
- 构建命令: `pnpm build`
- 环境变量: Supabase URL, Supabase Anon Key

### 8.2 后端部署
- 部署平台: Railway
- 启动命令: `pnpm start`
- 环境变量: Supabase URL, Supabase Service Role Key, API Keys

### 8.3 数据库部署
- 使用Supabase托管PostgreSQL数据库
- 配置自动备份
- 设置数据加密