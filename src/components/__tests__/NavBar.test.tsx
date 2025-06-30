import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../NavBar'
import { AuthProvider } from '../../context/AuthContext'

// Mock the auth context
const mockAuthContext = {
  user: null,
  userProfile: null,
  loading: false,
  signUp: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  refreshProfile: vi.fn(),
}

vi.mock('../../context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => mockAuthContext,
}))

const renderNavBar = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('NavBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders ProductPulse logo and title', () => {
    renderNavBar()
    expect(screen.getByText('ProductPulse')).toBeInTheDocument()
  })

  it('shows login and signup buttons when user is not authenticated', () => {
    renderNavBar()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('shows user menu when user is authenticated', () => {
    mockAuthContext.user = { id: '1', email: 'test@example.com' } as any
    mockAuthContext.userProfile = { 
      id: '1', 
      email: 'test@example.com', 
      full_name: 'Test User',
      points: 100,
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    }

    renderNavBar()
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Reviews')).toBeInTheDocument()
    expect(screen.getByText('Submit Product')).toBeInTheDocument()
    expect(screen.getByText('Points: 100')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Sign Out')).toBeInTheDocument()
  })

  it('displays user email when full name is not available', () => {
    mockAuthContext.user = { id: '1', email: 'test@example.com' } as any
    mockAuthContext.userProfile = { 
      id: '1', 
      email: 'test@example.com', 
      full_name: undefined,
      points: 0,
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    }

    renderNavBar()
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })
})
