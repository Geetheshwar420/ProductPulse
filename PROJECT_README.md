# ProductPulse 🚀

**Where products meet real opinions**

ProductPulse is a comprehensive product testing and feedback platform that connects companies seeking authentic user reviews with real-world consumers. Built with modern web technologies, it provides a seamless experience for both product testers and companies looking to improve their offerings.

## ✨ Features

### For Users (Testers)
- 🔐 **Secure Authentication** - Email/Google login with Supabase
- 🎯 **Personalized Dashboard** - View available testing opportunities
- ⭐ **Feedback System** - Submit detailed reviews with ratings and screenshots
- 🏆 **Rewards Program** - Earn points for testing and providing feedback
- 📱 **Mobile Responsive** - Test and review on any device

### For Companies
- 📝 **Product Submission** - Easy form to submit products for testing
- 📊 **AI-Powered Insights** - GPT-4o analysis of user feedback
- 📈 **Analytics Dashboard** - Track feedback trends and user engagement
- 🎯 **Targeted Testing** - Reach specific user demographics

### For Administrators
- 👥 **User Management** - Moderate users and manage permissions
- ✅ **Product Approval** - Review and approve submitted products
- 📊 **Platform Analytics** - Monitor overall platform performance
- 🔧 **Content Moderation** - Ensure quality feedback and submissions

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS with custom design system |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **AI Integration** | OpenAI GPT-4o for feedback analysis |
| **Routing** | React Router v6 |
| **State Management** | React Context API |
| **Deployment** | Vercel (Frontend) + Supabase (Backend) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProductPulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   VITE_SENDGRID_API_KEY=your_sendgrid_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/                 # Static assets (images, icons)
├── components/            # Reusable UI components
│   ├── NavBar.tsx
│   ├── TestCard.tsx
│   ├── FeedbackForm.tsx
│   ├── RewardTracker.tsx
│   └── LoadingSpinner.tsx
├── layouts/               # Layout components
│   └── MainLayout.tsx
├── pages/                 # Route-based pages
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── SubmitProduct.tsx
│   ├── ProductReviews.tsx
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   │   └── SubmitFeedback.tsx
│   └── admin/
│       └── AdminDashboard.tsx
├── services/              # API and external service integrations
│   ├── supabase.ts
│   └── openai.ts
├── context/               # React Context providers
│   └── AuthContext.tsx
├── utils/                 # Utility functions
├── hooks/                 # Custom React hooks
└── App.tsx               # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary**: #4A90E2 (Blue) - Main brand color
- **Secondary**: #50E3C2 (Turquoise) - Accent and highlights
- **Accent**: #F5A623 (Orange) - Call-to-action and rewards

### Typography
- **Headings**: Montserrat (Google Fonts)
- **Body Text**: Roboto (Google Fonts)

### Components
- Custom Tailwind CSS classes for consistent styling
- Responsive design with mobile-first approach
- Accessible color contrast ratios (WCAG 2.1 compliant)

## 🗄️ Database Schema

### Core Tables
- **users** - User profiles and authentication data
- **products** - Product information and submission details
- **feedback** - User reviews and ratings
- **testing_opportunities** - Product testing assignments
- **rewards** - Points and reward tracking

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Supabase)
1. Create a new Supabase project
2. Set up database tables using the provided schema
3. Configure authentication providers
4. Set up storage buckets for file uploads

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_OPENAI_API_KEY` | OpenAI API key for AI features | No |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe public key for payments | No |
| `VITE_SENDGRID_API_KEY` | SendGrid API key for emails | No |

## 📝 API Documentation

### Authentication
- User registration and login via Supabase Auth
- JWT token-based authentication
- Google OAuth integration support

### Core Endpoints
- `/api/products` - Product CRUD operations
- `/api/feedback` - Feedback submission and retrieval
- `/api/users` - User profile management
- `/api/analytics` - Platform analytics data

## 🧪 Testing

### Unit Tests
```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### E2E Tests
```bash
npm run test:e2e     # Run end-to-end tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@productpulse.com
- Documentation: [docs.productpulse.com](https://docs.productpulse.com)

## 🙏 Acknowledgments

- React team for the amazing framework
- Supabase for the backend infrastructure
- OpenAI for AI capabilities
- Tailwind CSS for the styling system
- All contributors and testers

---

**Built with ❤️ by the ProductPulse Team**
