import '@testing-library/jest-dom'
import React from 'react'

// Mock environment variables for tests
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-key',
    VITE_OPENAI_API_KEY: 'test-openai-key',
  },
  writable: true,
})

// Mock Supabase client
vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      order: vi.fn().mockReturnThis(),
    })),
  },
  signUp: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  getCurrentUser: vi.fn(),
  getUserProfile: vi.fn(),
  updateUserProfile: vi.fn(),
  getProducts: vi.fn(),
  getProductById: vi.fn(),
  submitFeedback: vi.fn(),
  getFeedbackByProduct: vi.fn(),
}))

// Mock OpenAI
vi.mock('../services/openai', () => ({
  analyzeFeedback: vi.fn(),
  generateProductInsights: vi.fn(),
}))

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ productId: 'test-product-id' }),
    Link: ({ children, to, ...props }: any) => {
      return React.createElement('a', { href: to, ...props }, children)
    },
  }
})
