# 🧪 Test Credentials for ProductPulse

This document contains all test user credentials for exploring the ProductPulse platform. These accounts demonstrate different user types, statuses, and permission levels.

## 🔐 Login Options

All users can log in using either:
- **Email address** (e.g., `admin@productpulse.com`)
- **Username** (e.g., `admin`)

## 👨‍💼 Admin Accounts

### Primary Admin
- **Email:** `admin@productpulse.com`
- **Username:** `admin`
- **Password:** `Admin123!`
- **Role:** Admin
- **Status:** Approved
- **Access:** 
  - Full admin dashboard
  - User management and approval
  - System analytics
  - All platform features

**Admin URLs:**
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- User Management: `/admin/users`

## 🧪 Tester Accounts

### Approved Testers (Can Access Full Platform)

#### Expert Tester
- **Email:** `tester1@productpulse.com`
- **Username:** `tester1`
- **Password:** `Tester123!`
- **Status:** Approved
- **Experience:** Expert
- **Interests:** Mobile apps, Web tools, Gaming
- **Points:** 150
- **Profile:** Experienced tester with high rating

#### Beginner Tester
- **Email:** `tester3@productpulse.com`
- **Username:** `tester3`
- **Password:** `Tester123!`
- **Status:** Approved
- **Experience:** Beginner
- **Interests:** Social media, Entertainment
- **Points:** 75
- **Profile:** New tester building reputation

### Pending Approval Tester

#### Intermediate Tester (Awaiting Approval)
- **Email:** `tester2@productpulse.com`
- **Username:** `tester2`
- **Password:** `Tester123!`
- **Status:** Pending
- **Experience:** Intermediate
- **Interests:** Productivity tools, E-commerce
- **Points:** 0
- **Profile:** Recently registered, awaiting admin approval

## 👨‍💻 Developer Accounts

### Approved Developers (Can Submit Products)

#### Enterprise Developer
- **Email:** `dev1@productpulse.com`
- **Username:** `dev1`
- **Password:** `Developer123!`
- **Status:** Approved
- **Company:** TechCorp Inc.
- **Profile:** Large company developer with multiple products

#### Startup Developer
- **Email:** `dev3@productpulse.com`
- **Username:** `dev3`
- **Password:** `Developer123!`
- **Status:** Approved
- **Company:** InnovateLabs
- **Profile:** Innovative startup looking for user feedback

### Pending Approval Developer

#### Startup Developer (Awaiting Approval)
- **Email:** `dev2@productpulse.com`
- **Username:** `dev2`
- **Password:** `Developer123!`
- **Status:** Pending
- **Company:** StartupXYZ
- **Profile:** New startup awaiting admin approval

## 🔄 Testing Workflows

### Admin Workflow Testing
1. Login as admin (`admin@productpulse.com` / `Admin123!`)
2. Navigate to User Management
3. Approve/reject pending users (`tester2`, `dev2`)
4. View analytics and user statistics
5. Test user status changes

### Tester Workflow Testing
1. Login as approved tester (`tester1@productpulse.com` / `Tester123!`)
2. Browse available products for testing
3. Submit feedback and ratings
4. View points and rewards
5. Test profile management

### Developer Workflow Testing
1. Login as approved developer (`dev1@productpulse.com` / `Developer123!`)
2. Submit new product for testing
3. View feedback from testers
4. Access AI-powered insights
5. Manage product listings

### Registration Testing
1. Test tester registration flow at `/register/tester`
2. Test developer registration flow at `/register/developer`
3. Verify username/email validation
4. Test password requirements
5. Confirm admin approval workflow

## 🔒 Password Reset Testing

### Test Forgot Password Flow
1. Go to login page
2. Enter any test user email (e.g., `tester1@productpulse.com`)
3. Click "Forgot password?"
4. Check email for reset link
5. Follow reset process

**Note:** Password reset emails will be sent to the configured email addresses.

## 🛠️ Setup Instructions

### Creating Test Users

1. **Register through the UI:**
   - Use the registration flows to create accounts
   - Choose appropriate user types (tester/developer)
   - Fill in required information

2. **Run the SQL script:**
   ```sql
   -- After creating accounts through registration
   -- Run database/create_test_users.sql in Supabase
   ```

3. **Verify setup:**
   ```sql
   -- Check all test users
   SELECT email, username, role, user_type, status 
   FROM public.users 
   WHERE email LIKE '%@productpulse.com';
   ```

## 🎯 Testing Scenarios

### User Approval Process
- Admin approves `tester2` and `dev2`
- Test status changes and access permissions
- Verify email notifications (if configured)

### Authentication Testing
- Test login with email vs username
- Test password reset functionality
- Test session management and logout

### Role-Based Access
- Verify testers can't access admin features
- Verify developers can't approve users
- Test proper redirects for unauthorized access

### Data Validation
- Test form validation on registration
- Test username uniqueness
- Test email format validation

## 📧 Contact Information

For issues with test credentials or additional testing needs:
- **Email:** support@productpulse.com
- **Documentation:** [docs/](../docs/)
- **Issues:** GitHub Issues

---

**Security Note:** These are test credentials for development and demonstration purposes only. Never use these credentials in production environments.
