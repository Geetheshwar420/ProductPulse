# Admin Setup Guide for ProductPulse

## Overview
This guide explains how to set up admin access for approving testers and developers in the ProductPulse application.

## Admin System Features

### 🔐 **Admin Access Control**
- Role-based authentication
- Separate admin login page
- Protected admin routes
- Admin dashboard with statistics

### 👥 **User Management**
- View all registered users (testers and developers)
- Filter by user type and status
- Approve/reject/suspend users
- Track approval history

### 📊 **Admin Dashboard**
- Total users, products, and feedback statistics
- Pending users and products counts
- Quick action buttons
- Recent activity overview

## Setup Steps

### 1. Update Database Schema

Run the updated schema in your Supabase SQL editor:

```sql
-- The main schema file includes new fields:
-- - status: 'pending', 'approved', 'rejected', 'suspended'
-- - approved_by: UUID reference to admin who approved
-- - approved_at: Timestamp of approval
```

### 2. Run Migration (if updating existing database)

Execute `database/migrations/add_user_types.sql` to add the new fields to existing users.

### 3. Create Admin User

**Option A: Create through registration then promote**
1. Register a new account through the normal registration flow
2. Run the admin creation script in Supabase SQL editor:

```sql
-- Update the email to match your admin account
UPDATE public.users 
SET role = 'admin', 
    status = 'approved',
    updated_at = NOW()
WHERE email = 'your-admin-email@example.com';
```

**Option B: Use the provided script**
1. Edit `database/create_admin.sql` with your admin email
2. Run the script in Supabase SQL editor

### 4. Access Admin Panel

1. Navigate to `/admin/login`
2. Sign in with your admin credentials
3. You'll be redirected to `/admin/dashboard`

## Admin URLs

- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin/dashboard`
- **User Management**: `/admin/users`

## User Approval Workflow

### For New Registrations:
1. Users register as testers or developers
2. Their status is set to 'pending' by default
3. Admin receives notification (via dashboard stats)
4. Admin reviews user details in User Management
5. Admin approves, rejects, or suspends the user

### User Status Types:
- **Pending**: Newly registered, awaiting approval
- **Approved**: Can access full platform features
- **Rejected**: Cannot access platform features
- **Suspended**: Temporarily restricted access

## Admin Dashboard Features

### Statistics Cards:
- **Total Users**: All registered users
- **Total Products**: All submitted products
- **Total Feedback**: All feedback submissions
- **Pending Products**: Products awaiting approval
- **Pending Users**: Users awaiting approval
- **Approved Users**: Currently approved users

### Quick Actions:
- **User Management**: Direct link to approve users
- **Product Approval**: Review pending products
- **Analytics**: View detailed platform analytics

## User Management Interface

### Filters:
- **Status Filter**: All, Pending, Approved, Rejected
- **User Type Filter**: All, Testers, Developers

### User Information Displayed:
- Full name and email
- User type (tester/developer)
- Current status
- Registration date
- Additional details (company for developers, experience/interests for testers)

### Available Actions:
- **Approve**: Change status to approved
- **Reject**: Change status to rejected
- **Suspend**: Change status to suspended (for approved users)

## Security Features

### Role-Based Access:
- Only users with `role = 'admin'` can access admin routes
- Admin routes are protected by `AdminRoute` component
- Automatic redirection for unauthorized access

### Admin Authentication:
- Separate admin login page with distinct styling
- Validates admin role after login
- Secure session management

## Database Policies

The system includes Row Level Security (RLS) policies:
- Users can only see their own data
- Admins can see all user data
- Proper access control for user management operations

## Troubleshooting

### Issue: Cannot access admin panel
**Solution**: Verify user role is set to 'admin' in database

### Issue: Admin login redirects to regular dashboard
**Solution**: Check that user profile has `role = 'admin'`

### Issue: User management page shows no users
**Solution**: Verify RLS policies allow admin access to users table

### Issue: Cannot approve/reject users
**Solution**: Check admin permissions and database policies

## Best Practices

1. **Regular Monitoring**: Check pending users regularly
2. **Clear Criteria**: Establish clear approval criteria
3. **Documentation**: Keep records of approval decisions
4. **Security**: Regularly audit admin access
5. **Backup**: Maintain admin account backups

## Future Enhancements

Potential improvements for the admin system:
- Email notifications for pending approvals
- Bulk approval actions
- Advanced user analytics
- Audit logs for admin actions
- Custom approval workflows
- Integration with external verification systems

## Support

For technical issues with the admin system:
1. Check browser console for errors
2. Verify database schema is up to date
3. Confirm admin user role in database
4. Review Supabase RLS policies
5. Check network connectivity to Supabase
