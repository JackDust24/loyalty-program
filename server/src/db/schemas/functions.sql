-- This file contains the SQL functions for user and role management.
--- The following function creates a new user with a specified role.
CREATE OR REPLACE FUNCTION public.create_user_with_role(
        p_email VARCHAR(255),
        p_password_hash TEXT,
        p_is_active BOOLEAN DEFAULT true,
        p_role_name VARCHAR(50) DEFAULT 'user'
    ) RETURNS UUID AS $$
DECLARE v_user_id UUID;
v_role_id INTEGER;
BEGIN -- Check if user exists
IF EXISTS (
    SELECT 1
    FROM users
    WHERE email = p_email
) THEN RAISE EXCEPTION 'User with email % already exists',
p_email;
END IF;
-- Get the role ID
SELECT role_id INTO v_role_id
FROM roles
WHERE name = p_role_name;
IF NOT FOUND THEN RAISE EXCEPTION 'Role % does not exist',
p_role_name;
END IF;
-- Insert the new user
INSERT INTO users (email, password_hash, is_active)
VALUES (p_email, p_password_hash, p_is_active)
RETURNING user_id INTO v_user_id;
-- Assign role
INSERT INTO user_roles (user_id, role_id)
VALUES (v_user_id, v_role_id);
RETURN v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
--- The following function creates a trigger to create a profile of the new user
CREATE OR REPLACE FUNCTION public.create_profile_trigger() RETURNS TRIGGER AS $$ BEGIN -- Insert a new profile for the user
INSERT INTO profiles (user_id)
VALUES (NEW.user_id);
-- NOTIFY the backend that a new profile has been created
PERFORM pg_notify(
    'profile_created',
    'Profile for user ' || NEW.user_id || ' created.'
);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Create the trigger for the profiles table
CREATE TRIGGER create_profile_after_user_insert
AFTER
INSERT ON users FOR EACH ROW EXECUTE FUNCTION public.create_profile_trigger();