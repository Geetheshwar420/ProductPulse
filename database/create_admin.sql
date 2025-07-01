-- Script to create admin users for ProductPulse
-- Run this after creating the user accounts through Supabase Auth interface

-- ==============================================
-- ADMIN USER CREATION
-- ==============================================
-- First create the user through Supabase Auth interface with:
-- Email: admin@productpulse.com
-- Password: Admin123!
-- Then run this script to update their role and user_type to admin

UPDATE public.users 
SET 
    role = 'admin', 
    user_type = 'admin',
    username = 'admin',
    status = 'approved',
    full_name = 'System Administrator',
    updated_at = NOW()
WHERE email = 'admin@productpulse.com';

-- ==============================================
-- VERIFICATION QUERY
-- ==============================================
-- Run this to verify the admin user was created correctly
SELECT 
    id, 
    email, 
    username,
    full_name, 
    role, 
    user_type,
    status, 
    created_at 
FROM public.users 
WHERE role = 'admin' AND user_type = 'admin';
