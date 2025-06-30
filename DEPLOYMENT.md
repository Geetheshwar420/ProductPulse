# ProductPulse Deployment Guide 🚀

This guide will walk you through deploying ProductPulse to production using Vercel for the frontend and Supabase for the backend.

## Prerequisites

- GitHub account
- Vercel account
- Supabase account
- OpenAI API key (optional, for AI features)
- Stripe account (optional, for payments)
- SendGrid account (optional, for emails)

## 1. Supabase Setup

### Create a New Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `productpulse`
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
5. Click "Create new project"

### Set Up Database Schema

1. Wait for your project to be ready
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `database/schema.sql`
4. Click "Run" to execute the schema

### Configure Authentication

1. Go to Authentication > Settings
2. Configure Site URL: `https://your-domain.vercel.app`
3. Add Redirect URLs:
   - `https://your-domain.vercel.app/auth/callback`
   - `http://localhost:5173/auth/callback` (for development)

### Set Up Storage

1. Go to Storage
2. Create the following buckets:
   - `product-images` (public)
   - `feedback-screenshots` (public)
   - `user-avatars` (public)

### Get API Keys

1. Go to Settings > API
2. Copy your:
   - Project URL
   - Anon/Public key
   - Service role key (keep this secret)

## 2. Environment Variables

Create a `.env.production` file with your production values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_OPENAI_API_KEY=your-openai-key
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key
VITE_SENDGRID_API_KEY=your-sendgrid-key
```

## 3. Vercel Deployment

### Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Set Environment Variables

1. In your Vercel project settings
2. Go to Environment Variables
3. Add all variables from your `.env.production` file
4. Make sure to set them for Production, Preview, and Development

### Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be available at `https://your-project.vercel.app`

## 4. Domain Configuration

### Custom Domain (Optional)

1. In Vercel project settings
2. Go to Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### Update Supabase Settings

1. Go back to Supabase Authentication settings
2. Update Site URL to your custom domain
3. Update Redirect URLs accordingly

## 5. OpenAI Setup (Optional)

### Get API Key

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account or sign in
3. Go to API Keys
4. Create a new secret key
5. Add it to your environment variables

### Configure Usage Limits

1. Set up billing and usage limits
2. Monitor usage in OpenAI dashboard
3. Consider implementing rate limiting in production

## 6. Stripe Setup (Optional)

### Create Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create account and verify business details
3. Get your publishable key from Developers > API keys
4. Add to environment variables

### Configure Webhooks

1. Go to Developers > Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select events you want to listen for
4. Get webhook signing secret

## 7. SendGrid Setup (Optional)

### Create Account

1. Go to [SendGrid](https://sendgrid.com)
2. Create account and verify email
3. Go to Settings > API Keys
4. Create new API key with Mail Send permissions
5. Add to environment variables

### Configure Templates

1. Create email templates for:
   - Welcome emails
   - Password reset
   - Product notifications
   - Feedback confirmations

## 8. Monitoring and Analytics

### Error Tracking

Consider adding error tracking:

```bash
npm install @sentry/react @sentry/tracing
```

### Analytics

Add Google Analytics or similar:

```bash
npm install react-ga4
```

### Performance Monitoring

Monitor Core Web Vitals and performance metrics.

## 9. Security Checklist

- [ ] Environment variables are properly set
- [ ] Supabase RLS policies are enabled
- [ ] API keys are not exposed in client code
- [ ] HTTPS is enforced
- [ ] Content Security Policy is configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place

## 10. Post-Deployment

### Test Everything

1. User registration and login
2. Product submission
3. Feedback submission
4. File uploads
5. Email notifications
6. Payment processing (if enabled)

### Set Up Monitoring

1. Configure uptime monitoring
2. Set up error alerts
3. Monitor database performance
4. Track user analytics

### Backup Strategy

1. Supabase automatically backs up your database
2. Consider additional backup strategies for critical data
3. Test restore procedures

## 11. Maintenance

### Regular Updates

- Keep dependencies updated
- Monitor security advisories
- Update Node.js version as needed
- Review and update Supabase policies

### Performance Optimization

- Monitor bundle size
- Optimize images and assets
- Use CDN for static assets
- Implement caching strategies

### Scaling Considerations

- Monitor Supabase usage limits
- Consider database optimization
- Implement caching for frequently accessed data
- Use Vercel's edge functions for better performance

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify Node.js version compatibility
   - Review build logs for specific errors

2. **Authentication Issues**
   - Verify Supabase URL and keys
   - Check redirect URLs configuration
   - Ensure RLS policies are correct

3. **Database Connection**
   - Verify Supabase project is active
   - Check network connectivity
   - Review database logs

4. **File Upload Issues**
   - Verify storage bucket configuration
   - Check file size limits
   - Review storage policies

### Getting Help

- Check Vercel documentation
- Review Supabase docs
- Join community forums
- Contact support if needed

## Success! 🎉

Your ProductPulse application should now be live and ready for users. Monitor the deployment and gather user feedback to continue improving the platform.
