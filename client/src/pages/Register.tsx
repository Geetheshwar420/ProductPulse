import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'
import LoadingSpinner from '../components/LoadingSpinner'

type UserType = 'tester' | 'developer' | 'admin'

const Register: React.FC = () => {
  const { userType } = useParams<{ userType: UserType }>()
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '', // For developers
    experience: '', // For testers
    interests: '' // For testers
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { signUp } = useAuth()
  const navigate = useNavigate()

  const isDeveloper = userType === 'developer'
  const isTester = userType === 'tester'
  const isAdmin = userType === 'admin'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    // Additional validation for developers
    if (isDeveloper && !formData.company.trim()) {
      setError('Company name is required for developers')
      setIsLoading(false)
      return
    }

    // Username validation
    if (formData.username && formData.username.length < 3) {
      setError('Username must be at least 3 characters long')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        userType || 'tester',
        {
          username: formData.username,
          company: formData.company,
          experience: formData.experience,
          interests: formData.interests
        }
      )

      if (error) {
        setError(error.message)
      } else {
        setSuccess('Account created successfully! Please check your email to verify your account.')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Redirect to user type selection if no user type specified
  if (!userType) {
    navigate('/register-select')
    return null
  }

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              {isDeveloper ? 'Developer Registration' :
               isAdmin ? 'Admin Registration' :
               'Tester Registration'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isDeveloper
                ? 'Join ProductPulse to get valuable feedback on your products'
                : isAdmin
                ? 'Register as an administrator to manage the ProductPulse platform'
                : 'Join ProductPulse and start testing amazing products'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username (Optional)
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
                placeholder="Choose a username (min. 3 characters)"
                minLength={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use your username or email to sign in
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Create a password (min. 6 characters)"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Additional fields for developers */}
            {isDeveloper && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your company name"
                  required
                />
              </div>
            )}

            {/* Additional fields for admins */}
            {isAdmin && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-sm font-medium text-red-800">Admin Registration</h3>
                </div>
                <p className="text-sm text-red-700">
                  Admin accounts require manual approval and verification. You will receive an email once your admin access has been granted.
                </p>
              </div>
            )}

            {/* Additional fields for testers */}
            {isTester && (
              <>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Testing Experience (Optional)
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., 2 years, Beginner, Expert"
                  />
                </div>

                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Interests (Optional)
                  </label>
                  <textarea
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Mobile apps, Web tools, Gaming, Productivity"
                    rows={3}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Register
