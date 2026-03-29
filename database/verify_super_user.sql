-- Verification script for Super User setup
-- Run this to check if super user is properly configured

-- Check if super user exists in users table
SELECT 
    'Super User Check' as check_type,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ Super User exists'
        ELSE '❌ Super User not found'
    END as status,
    COUNT(*) as count
FROM public.users 
WHERE email = 'superuser@productpulse.com'
AND role = 'super_user' 
AND user_type = 'super_user';

-- Check all user roles and types
SELECT 
    'All Users Overview' as check_type,
    role,
    user_type,
    COUNT(*) as count
FROM public.users
GROUP BY role, user_type
ORDER BY 
    CASE role 
        WHEN 'super_user' THEN 1 
        WHEN 'admin' THEN 2 
        ELSE 3 
    END,
    user_type;

-- Check specific super user details
SELECT 
    'Super User Details' as check_type,
    email,
    username,
    full_name,
    role,
    user_type,
    status,
    created_at,
    updated_at
FROM public.users 
WHERE email = 'superuser@productpulse.com';

-- Check if auth.users entry exists (this should be created manually in Supabase Auth)
-- Note: This query might fail if you don't have access to auth schema
-- SELECT 
--     'Auth User Check' as check_type,
--     email,
--     created_at
-- FROM auth.users 
-- WHERE email = 'superuser@productpulse.com';

-- Check RLS policies for admin_actions (super user should be able to access)
SELECT 
    'RLS Policies Check' as check_type,
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'admin_actions'
ORDER BY policyname;

-- Test data for verification
INSERT INTO public.admin_actions (admin_id, action_type, target_email, action_details)
SELECT 
    u.id,
    'test_action',
    'test@example.com',
    '{"test": true, "timestamp": "' || NOW() || '"}'::jsonb
FROM public.users u
WHERE u.email = 'superuser@productpulse.com'
AND u.role = 'super_user'
ON CONFLICT DO NOTHING;

-- Verify test data was inserted
SELECT 
    'Test Action Check' as check_type,
    COUNT(*) as test_actions_count
FROM public.admin_actions 
WHERE action_type = 'test_action';

-- Summary report
SELECT 
    '=== SUPER USER SETUP SUMMARY ===' as summary,
    CASE 
        WHEN (SELECT COUNT(*) FROM public.users WHERE email = 'superuser@productpulse.com' AND role = 'super_user') > 0 
        THEN '✅ Ready for login'
        ELSE '❌ Setup required'
    END as status;
