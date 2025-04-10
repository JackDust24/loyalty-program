CREATE TABLE programs (
    program_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    stamp_image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE rewards (
    reward_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES programs(program_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    required_stamps INTEGER NOT NULL CHECK (required_stamps > 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE user_programs (
    user_program_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    program_id UUID REFERENCES programs(program_id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, program_id)
);
CREATE TABLE stamps (
    stamp_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_program_id UUID REFERENCES user_programs(user_program_id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    awarded_by UUID REFERENCES users(user_id) ON DELETE
    SET NULL
);
CREATE INDEX idx_stamps_user_program ON stamps(user_program_id);
CREATE TABLE redemptions (
    redemption_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_program_id UUID REFERENCES user_programs(user_program_id) ON DELETE CASCADE,
    reward_id UUID REFERENCES rewards(reward_id) ON DELETE CASCADE,
    redeemed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'rejected')),
    fulfilled_by UUID REFERENCES users(user_id) ON DELETE
    SET NULL,
        fulfilled_at TIMESTAMPTZ
);
CREATE INDEX idx_redemptions_user_program ON redemptions(user_program_id);