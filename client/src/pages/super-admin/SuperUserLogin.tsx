import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import MainLayout from '../../layouts/MainLayout'
import LoadingSpinner from '../../components/LoadingSpinner'

const SuperUserLogin: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signIn, userProfile } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in as super user
  React.useEffect(() => {
    if (userProfile?.role === 'super_user' && userProfile?.user_type === 'super_user') {
      navigate('/super-admin/dashboard')
    }
  }, [userProfile, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await signIn(emailOrUsername, password)
      
      if (error) {
        setError(error.response?.data?.error || error.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              Super User Access
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to access the super user dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-2">
                Super User Email or Username
              </label>
              <input
                type="text"
                id="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="input-field"
                placeholder="Enter your super user email or username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Signing In...
                </>
              ) : (
                'Sign In to Super User Panel'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Not a super user?{' '}
              <Link to="/admin/login" className="text-purple-500 hover:text-purple-600 font-medium">
                Admin sign in
              </Link>
              {' | '}
              <Link to="/login" className="text-purple-500 hover:text-purple-600 font-medium">
                Regular sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SuperUserLogin
