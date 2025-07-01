# Supabase Setup Guide for ProductPulse

## Prerequisites
- Supabase account created
- Project created in Supabase dashboard
- Environment variables updated in `.env` file

## Current Configuration
Your `.env` file is already configured with:
```
VITE_SUPABASE_URL=https://utrtzyohggypmkcpreis.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Setup Steps

### 1. Set up the Database Schema

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to your project: `utrtzyohggypmkcpreis`
3. Go to the **SQL Editor** tab
4. Create a new query and paste the contents of `database/schema.sql`
5. Click **Run** to execute the schema

### 2. Enable Row Level Security (RLS)

The schema includes RLS policies, but make sure they're enabled:

1. Go to **Authentication** > **Policies**
2. Verify that policies are created for:
   - `users` table
   - `products` table
   - `feedback` table
   - `testing_opportunities` table

### 3. Set up Storage (Optional)

If you plan to use file uploads:

1. Go to **Storage**
2. Create buckets:
   - `product-images`
   - `feedback-screenshots`
   - `user-avatars`
3. Set up storage policies (commented out in schema.sql)

### 4. Test the Connection

1. Start the development server: `npm run dev`
2. Open http://localhost:5174/
3. Look for the database status indicator in the bottom-right corner
4. It should show:
   - ✅ Supabase Connection: Connected
   - ✅ Database Schema: Ready

### 5. If You See Schema Issues

If the database status shows "Needs Setup":

1. Run the main schema: `database/schema.sql`
2. If updating an existing database, also run: `database/migrations/add_user_types.sql`

## Testing the Registration Flow

### Test Tester Registration:
1. Go to http://localhost:5174/register
2. Click "Register as Tester"
3. Fill out the form with test data
4. Submit and verify account creation

### Test Developer Registration:
1. Go to http://localhost:5174/register
2. Click "Register as Developer"
3. Fill out the form including company name
4. Submit and verify account creation

## Verifying Data in Supabase

1. Go to **Table Editor** in Supabase dashboard
2. Check the `users` table
3. Verify new users have:
   - `user_type` set to 'tester' or 'developer'
   - Additional fields populated based on registration type

## Common Issues and Solutions

### Issue: "Missing Supabase environment variables"
- **Solution**: Verify `.env` file has correct values and restart dev server

### Issue: "Database access error"
- **Solution**: Run the schema.sql file in Supabase SQL editor

### Issue: "Column does not exist" errors
- **Solution**: Run the migration script `database/migrations/add_user_types.sql`

### Issue: RLS policy errors
- **Solution**: Verify RLS policies are enabled and correctly configured

## Next Steps

1. **Test Authentication**: Try logging in with created accounts
2. **Test User Profiles**: Verify user data is correctly stored and retrieved
3. **Set up Email Confirmation**: Configure email templates in Supabase Auth settings
4. **Configure OAuth** (optional): Set up social login providers

## Database Status Component

The app includes a database status component that will:
- Show connection status in development
- Alert you to schema issues
- Provide setup instructions
- Allow refreshing the connection status

Look for the database icon in the bottom-right corner of the app.

## Production Considerations

Before deploying to production:
1. Set up proper email templates
2. Configure custom SMTP (optional)
3. Set up proper domain for auth redirects
4. Review and test all RLS policies
5. Set up database backups
6. Configure monitoring and alerts
