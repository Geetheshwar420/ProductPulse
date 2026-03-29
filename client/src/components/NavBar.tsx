import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NavBar: React.FC = () => {
  const { user, userProfile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/src/assets/logo.png"
                alt="ProductPulse Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  // Fallback if logo doesn't load
                  e.currentTarget.style.display = 'none'
                }}
              />
              <h1 className="text-2xl font-heading font-bold text-primary-500">
                ProductPulse
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                
                {/* Dynamic Links based on role */}
                {userProfile?.role === 'super_user' && (
                  <>
                    <Link
                      to="/super-admin/admins"
                      className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Admins
                    </Link>
                    <Link
                      to="/super-admin/actions"
                      className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Audit Log
                    </Link>
                  </>
                )}

                {userProfile?.role === 'admin' && (
                  <>
                    <Link
                      to="/admin/users"
                      className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Users
                    </Link>
                    <Link
                      to="/admin/opportunities"
                      className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Assignments
                    </Link>
                  </>
                )}

                {userProfile?.role === 'developer' && (
                  <>
                    <Link
                      to="/developer/reviews"
                      className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Feedback
                    </Link>
                    <Link
                      to="/submit-product"
                      className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Submit Product
                    </Link>
                  </>
                )}

                {userProfile?.role === 'tester' && (
                  <Link
                    to="/tester/dashboard"
                    className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Assignments
                  </Link>
                )}
                
                <div className="flex items-center space-x-3">
                  {userProfile?.role === 'tester' && (
                    <div className="text-sm">
                      <span className="text-gray-700">Points: </span>
                      <span className="font-semibold text-accent-500">
                        {userProfile?.points || 0}
                      </span>
                    </div>
                  )}
                  <div className="text-sm text-gray-700">
                    {userProfile?.full_name || user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
