-- Migration to add user types and additional fields to existing users table
-- Run this after updating the schema.sql

-- Add new columns to existing users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'tester' CHECK (user_type IN ('tester', 'developer', 'admin'));

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended'));

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS company TEXT;

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS experience TEXT;

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS interests TEXT;

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;

-- Update existing users to have the default user_type if null
UPDATE public.users
SET user_type = 'tester'
WHERE user_type IS NULL;

-- Update existing users to have the default status if null
UPDATE public.users
SET status = 'approved'
WHERE status IS NULL;

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (id, email, username, full_name, user_type, company, experience, interests)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'username',
        NEW.raw_user_meta_data->>'full_name',
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'tester'),
        NEW.raw_user_meta_data->>'company',
        NEW.raw_user_meta_data->>'experience',
        NEW.raw_user_meta_data->>'interests'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
