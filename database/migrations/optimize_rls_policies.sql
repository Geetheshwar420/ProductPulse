-- Migration to optimize RLS policies for better performance
-- This addresses Supabase database linter warnings about auth function re-evaluation

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can submit products" ON public.products;
DROP POLICY IF EXISTS "Users can update their own products" ON public.products;
DROP POLICY IF EXISTS "Users can view their own testing opportunities" ON public.testing_opportunities;
DROP POLICY IF EXISTS "Users can apply for testing opportunities" ON public.testing_opportunities;
DROP POLICY IF EXISTS "Users can update their own applications" ON public.testing_opportunities;
DROP POLICY IF EXISTS "Users can submit feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can update their own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can view their own rewards" ON public.rewards;
DROP POLICY IF EXISTS "Super users can view all admin actions" ON public.admin_actions;
DROP POLICY IF EXISTS "Admins and super users can insert admin actions" ON public.admin_actions;

-- Recreate optimized policies

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING ((SELECT auth.uid()) = id);

CREATE POLICY "Enable insert for authenticated users only" ON public.users
    FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);

-- Products policies
CREATE POLICY "Anyone can view active products" ON public.products
    FOR SELECT USING (status = 'active' OR (SELECT auth.uid()) = submitted_by);

CREATE POLICY "Authenticated users can submit products" ON public.products
    FOR INSERT WITH CHECK ((SELECT auth.role()) = 'authenticated');

CREATE POLICY "Users can update their own products" ON public.products
    FOR UPDATE USING ((SELECT auth.uid()) = submitted_by);

-- Testing opportunities policies
CREATE POLICY "Users can view their own testing opportunities" ON public.testing_opportunities
    FOR SELECT USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can apply for testing opportunities" ON public.testing_opportunities
    FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own applications" ON public.testing_opportunities
    FOR UPDATE USING ((SELECT auth.uid()) = user_id);

-- Feedback policies
CREATE POLICY "Anyone can view feedback" ON public.feedback
    FOR SELECT USING (true);

CREATE POLICY "Users can submit feedback" ON public.feedback
    FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own feedback" ON public.feedback
    FOR UPDATE USING ((SELECT auth.uid()) = user_id);

-- Rewards policies
CREATE POLICY "Users can view their own rewards" ON public.rewards
    FOR SELECT USING ((SELECT auth.uid()) = user_id);

-- Admin Actions policies
CREATE POLICY "Super users can view all admin actions" ON public.admin_actions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = (SELECT auth.uid()) 
            AND role = 'super_user' 
            AND user_type = 'super_user'
        )
    );

CREATE POLICY "Admins and super users can insert admin actions" ON public.admin_actions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = (SELECT auth.uid()) 
            AND (role = 'admin' OR role = 'super_user')
        )
    );

-- Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;
