-- Complete Test Users for ProductPulse
-- Run this script after setting up the main schema
-- Create these users through Supabase Auth interface first, then run this script

-- ==============================================
-- SUPER USER (Highest Level Access)
-- ==============================================
-- Email: superuser@productpulse.com
-- Password: SuperUser123!
-- Username: superuser
-- Role: super_user
-- User Type: super_user

UPDATE public.users 
SET 
    role = 'super_user',
    user_type = 'super_user',
    username = 'superuser',
    status = 'approved',
    full_name = 'Super User Administrator',
    updated_at = NOW()
WHERE email = 'superuser@productpulse.com';

-- ==============================================
-- ADMIN TEST USERS
-- ==============================================

-- Admin 1 (Created by Super User)
-- Email: admin1@productpulse.com
-- Password: Admin123!
-- Username: admin1
UPDATE public.users 
SET 
    role = 'admin',
    user_type = 'admin',
    username = 'admin1',
    status = 'approved',
    full_name = 'Primary Administrator',
    approved_by = (SELECT id FROM public.users WHERE email = 'superuser@productpulse.com'),
    approved_at = NOW(),
    updated_at = NOW()
WHERE email = 'admin1@productpulse.com';

-- Admin 2 (Created by Super User)
-- Email: admin2@productpulse.com
-- Password: Admin123!
-- Username: admin2
UPDATE public.users 
SET 
    role = 'admin',
    user_type = 'admin',
    username = 'admin2',
    status = 'approved',
    full_name = 'Secondary Administrator',
    approved_by = (SELECT id FROM public.users WHERE email = 'superuser@productpulse.com'),
    approved_at = NOW(),
    updated_at = NOW()
WHERE email = 'admin2@productpulse.com';

-- ==============================================
-- TESTER TEST USERS
-- ==============================================

-- Tester 1 (Approved by Admin)
-- Email: tester1@productpulse.com
-- Password: Tester123!
-- Username: tester1
UPDATE public.users 
SET 
    role = 'user',
    user_type = 'tester',
    username = 'tester1',
    status = 'approved',
    full_name = 'Alice Johnson',
    experience = 'Expert',
    interests = 'Mobile apps, Web tools, Gaming',
    points = 150,
    approved_by = (SELECT id FROM public.users WHERE email = 'admin1@productpulse.com'),
    approved_at = NOW(),
    updated_at = NOW()
WHERE email = 'tester1@productpulse.com';

-- Tester 2 (Pending Approval)
-- Email: tester2@productpulse.com
-- Password: Tester123!
-- Username: tester2
UPDATE public.users 
SET 
    role = 'user',
    user_type = 'tester',
    username = 'tester2',
    status = 'pending',
    full_name = 'Bob Smith',
    experience = 'Intermediate',
    interests = 'Productivity tools, E-commerce',
    points = 0,
    updated_at = NOW()
WHERE email = 'tester2@productpulse.com';

-- Tester 3 (Approved by Admin)
-- Email: tester3@productpulse.com
-- Password: Tester123!
-- Username: tester3
UPDATE public.users 
SET 
    role = 'user',
    user_type = 'tester',
    username = 'tester3',
    status = 'approved',
    full_name = 'Carol Davis',
    experience = 'Beginner',
    interests = 'Social media, Entertainment',
    points = 75,
    approved_by = (SELECT id FROM public.users WHERE email = 'admin2@productpulse.com'),
    approved_at = NOW(),
    updated_at = NOW()
WHERE email = 'tester3@productpulse.com';

-- ==============================================
-- DEVELOPER TEST USERS
-- ==============================================

-- Developer 1 (Approved by Admin)
-- Email: dev1@productpulse.com
-- Password: Developer123!
-- Username: dev1
UPDATE public.users 
SET 
    role = 'user',
    user_type = 'developer',
    username = 'dev1',
    status = 'approved',
    full_name = 'David Wilson',
    company = 'TechCorp Inc.',
    points = 0,
    approved_by = (SELECT id FROM public.users WHERE email = 'admin1@productpulse.com'),
    approved_at = NOW(),
    updated_at = NOW()
WHERE email = 'dev1@productpulse.com';

-- Developer 2 (Pending Approval)
-- Email: dev2@productpulse.com
-- Password: Developer123!
-- Username: dev2
UPDATE public.users 
SET 
    role = 'user',
    user_type = 'developer',
    username = 'dev2',
    status = 'pending',
    full_name = 'Emma Brown',
    company = 'StartupXYZ',
    points = 0,
    updated_at = NOW()
WHERE email = 'dev2@productpulse.com';

-- Developer 3 (Approved by Admin)
-- Email: dev3@productpulse.com
-- Password: Developer123!
-- Username: dev3
UPDATE public.users 
SET 
    role = 'user',
    user_type = 'developer',
    username = 'dev3',
    status = 'approved',
    full_name = 'Frank Miller',
    company = 'InnovateLabs',
    points = 0,
    approved_by = (SELECT id FROM public.users WHERE email = 'admin2@productpulse.com'),
    approved_at = NOW(),
    updated_at = NOW()
WHERE email = 'dev3@productpulse.com';

-- ==============================================
-- INSERT SAMPLE ADMIN ACTIONS FOR MONITORING
-- ==============================================

-- Log admin actions for super user monitoring
INSERT INTO public.admin_actions (admin_id, action_type, target_user_id, target_email, action_details)
SELECT 
    admin.id,
    'user_approval',
    target.id,
    target.email,
    jsonb_build_object(
        'previous_status', 'pending',
        'new_status', 'approved',
        'user_type', target.user_type,
        'timestamp', NOW()
    )
FROM public.users admin, public.users target
WHERE admin.email IN ('admin1@productpulse.com', 'admin2@productpulse.com')
AND target.email IN ('tester1@productpulse.com', 'tester3@productpulse.com', 'dev1@productpulse.com', 'dev3@productpulse.com')
AND target.approved_by = admin.id;

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
    approved_by,
    created_at
FROM public.users 
WHERE email LIKE '%@productpulse.com'
ORDER BY 
    CASE role 
        WHEN 'super_user' THEN 1 
        WHEN 'admin' THEN 2 
        ELSE 3 
    END,
    user_type, 
    email;
