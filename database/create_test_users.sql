-- Test Users for ProductPulse
-- Run this script after setting up the main schema
-- These users can be used for testing the application

-- Note: You'll need to create these users through the Supabase Auth interface first,
-- then run this script to update their profiles and roles

-- ==============================================
-- ADMIN TEST USER
-- ==============================================
-- Email: admin@productpulse.com
-- Password: Admin123!
-- Username: admin
-- Role: admin

UPDATE public.users 
SET 
    role = 'admin',
    username = 'admin',
    status = 'approved',
    user_type = 'tester',
    full_name = 'Admin User',
    updated_at = NOW()
WHERE email = 'admin@productpulse.com';

-- ==============================================
-- TESTER TEST USERS
-- ==============================================

-- Tester 1 (Approved)
-- Email: tester1@productpulse.com
-- Password: Tester123!
-- Username: tester1
UPDATE public.users 
SET 
    role = 'user',
    username = 'tester1',
    status = 'approved',
    user_type = 'tester',
    full_name = 'Alice Johnson',
    experience = 'Expert',
    interests = 'Mobile apps, Web tools, Gaming',
    points = 150,
    updated_at = NOW()
WHERE email = 'tester1@productpulse.com';

-- Tester 2 (Pending Approval)
-- Email: tester2@productpulse.com
-- Password: Tester123!
-- Username: tester2
UPDATE public.users 
SET 
    role = 'user',
    username = 'tester2',
    status = 'pending',
    user_type = 'tester',
    full_name = 'Bob Smith',
    experience = 'Intermediate',
    interests = 'Productivity tools, E-commerce',
    points = 0,
    updated_at = NOW()
WHERE email = 'tester2@productpulse.com';

-- Tester 3 (Approved)
-- Email: tester3@productpulse.com
-- Password: Tester123!
-- Username: tester3
UPDATE public.users 
SET 
    role = 'user',
    username = 'tester3',
    status = 'approved',
    user_type = 'tester',
    full_name = 'Carol Davis',
    experience = 'Beginner',
    interests = 'Social media, Entertainment',
    points = 75,
    updated_at = NOW()
WHERE email = 'tester3@productpulse.com';

-- ==============================================
-- DEVELOPER TEST USERS
-- ==============================================

-- Developer 1 (Approved)
-- Email: dev1@productpulse.com
-- Password: Developer123!
-- Username: dev1
UPDATE public.users 
SET 
    role = 'user',
    username = 'dev1',
    status = 'approved',
    user_type = 'developer',
    full_name = 'David Wilson',
    company = 'TechCorp Inc.',
    points = 0,
    updated_at = NOW()
WHERE email = 'dev1@productpulse.com';

-- Developer 2 (Pending Approval)
-- Email: dev2@productpulse.com
-- Password: Developer123!
-- Username: dev2
UPDATE public.users 
SET 
    role = 'user',
    username = 'dev2',
    status = 'pending',
    user_type = 'developer',
    full_name = 'Emma Brown',
    company = 'StartupXYZ',
    points = 0,
    updated_at = NOW()
WHERE email = 'dev2@productpulse.com';

-- Developer 3 (Approved)
-- Email: dev3@productpulse.com
-- Password: Developer123!
-- Username: dev3
UPDATE public.users 
SET 
    role = 'user',
    username = 'dev3',
    status = 'approved',
    user_type = 'developer',
    full_name = 'Frank Miller',
    company = 'InnovateLabs',
    points = 0,
    updated_at = NOW()
WHERE email = 'dev3@productpulse.com';

-- ==============================================
-- VERIFICATION QUERY
-- ==============================================
-- Run this to verify all test users were created correctly

SELECT 
    email,
    username,
    full_name,
    role,
    user_type,
    status,
    company,
    experience,
    interests,
    points,
    created_at
FROM public.users 
WHERE email LIKE '%@productpulse.com'
ORDER BY role DESC, user_type, email;
