import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabase'
import MainLayout from '../layouts/MainLayout'
import LoadingSpinner from '../components/LoadingSpinner'

const Login: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setResetMessage('')

    try {
      // Check if input is email or username
      const isEmail = emailOrUsername.includes('@')
      let loginEmail = emailOrUsername

      // If it's a username, we need to find the email
      if (!isEmail) {
        // For now, we'll try to sign in with username as email
        // In a real implementation, you'd query the database to find the email by username
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('email')
          .eq('username', emailOrUsername)
          .single()

        if (userError || !userData) {
          setError('Username not found')
          setIsLoading(false)
          return
        }
        loginEmail = userData.email
      }

      const { error } = await signIn(loginEmail, password)

      if (error) {
        setError(error.message)
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!emailOrUsername) {
      setError('Please enter your email address')
      return
    }

    if (!emailOrUsername.includes('@')) {
      setError('Please enter your email address for password reset')
      return
    }

    setIsResettingPassword(true)
    setError('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailOrUsername, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setResetMessage('Password reset email sent! Check your inbox.')
      }
    } catch (err) {
      setError('Failed to send reset email')
    } finally {
      setIsResettingPassword(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to your ProductPulse account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {resetMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {resetMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-2">
                Email or Username
              </label>
              <input
                type="text"
                id="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="input-field"
                placeholder="Enter your email or username"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isResettingPassword}
                  className="text-sm text-primary-500 hover:text-primary-600 font-medium disabled:opacity-50"
                >
                  {isResettingPassword ? 'Sending...' : 'Forgot password?'}
                </button>
              </div>
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
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Login
