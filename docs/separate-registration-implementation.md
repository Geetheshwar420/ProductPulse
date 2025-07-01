# Separate Registration Implementation for Testers and Developers

## Overview
This document outlines the implementation of separate registration flows for testers and product developers in the ProductPulse application.

## Changes Made

### 1. Database Schema Updates
- **File**: `database/schema.sql`
- **Changes**:
  - Added `user_type` field with values 'tester' or 'developer'
  - Added `company` field for developers
  - Added `experience` field for testers
  - Added `interests` field for testers
  - Updated `handle_new_user()` function to handle new fields

### 2. Migration Script
- **File**: `database/migrations/add_user_types.sql`
- **Purpose**: Safely add new columns to existing database and update existing users

### 3. New Registration Selection Page
- **File**: `src/pages/RegisterSelect.tsx`
- **Features**:
  - User type selection interface
  - Clear benefits for each user type
  - Visual distinction between tester and developer paths
  - Responsive design with cards for each option

### 4. Updated Registration Page
- **File**: `src/pages/Register.tsx`
- **Changes**:
  - Added support for URL parameter `userType` (tester/developer)
  - Dynamic form fields based on user type
  - Additional validation for developer-specific fields
  - Updated form submission to include user type and metadata

### 5. Authentication Context Updates
- **File**: `src/context/AuthContext.tsx`
- **Changes**:
  - Updated User interface to include new fields
  - Modified `signUp` function to accept user type and metadata
  - Updated user profile creation logic

### 6. Supabase Service Updates
- **File**: `src/services/supabase.ts`
- **Changes**:
  - Updated User interface to match database schema
  - Modified `signUp` function to handle new parameters

### 7. Routing Updates
- **File**: `src/App.tsx`
- **Changes**:
  - Added route for `/register-select`
  - Added parameterized route `/register/:userType`
  - Updated existing `/register` route to redirect to selection page

## User Flow

### For Testers:
1. User visits `/register` or clicks "Get Started" from home page
2. Redirected to `/register-select` (user type selection page)
3. Clicks "Register as Tester"
4. Navigated to `/register/tester`
5. Fills out form with:
   - Full Name (required)
   - Email (required)
   - Password (required)
   - Confirm Password (required)
   - Testing Experience (optional)
   - Product Interests (optional)
6. Account created with `user_type: 'tester'`

### For Developers:
1. User visits `/register` or clicks "Get Started" from home page
2. Redirected to `/register-select` (user type selection page)
3. Clicks "Register as Developer"
4. Navigated to `/register/developer`
5. Fills out form with:
   - Full Name (required)
   - Email (required)
   - Password (required)
   - Confirm Password (required)
   - Company Name (required)
6. Account created with `user_type: 'developer'`

## Database Schema

### Users Table Structure:
```sql
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    points INTEGER DEFAULT 0,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'company')),
    user_type TEXT DEFAULT 'tester' CHECK (user_type IN ('tester', 'developer')),
    company TEXT, -- For developers
    experience TEXT, -- For testers
    interests TEXT, -- For testers
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Benefits

### For Testers:
- Streamlined registration focused on testing capabilities
- Optional fields for experience and interests to improve matching
- Clear value proposition about earning rewards

### For Developers:
- Registration focused on product submission needs
- Required company field for business context
- Clear value proposition about getting feedback

## Future Enhancements

1. **Role-based Dashboard**: Different dashboard experiences based on user type
2. **Advanced Matching**: Use tester interests and experience for better product-tester matching
3. **Company Verification**: Email domain verification for developers
4. **Onboarding Flows**: Separate onboarding experiences for each user type
5. **Analytics**: Track registration conversion rates by user type

## Testing

To test the implementation:
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5174/`
3. Click "Get Started Free" or navigate to `/register`
4. Test both registration flows:
   - Register as Tester
   - Register as Developer
5. Verify form validation and user creation

## Notes

- All existing links to `/register` will automatically redirect to the new selection page
- Backward compatibility is maintained for existing users
- The migration script safely adds new columns without affecting existing data
- Default user type is 'tester' for any edge cases
