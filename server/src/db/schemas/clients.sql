CREATE TABLE clients (
    client_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    business_address TEXT,
    business_phone VARCHAR(50),
    business_logo_url TEXT,
    tax_id VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);