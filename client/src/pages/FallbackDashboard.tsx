import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'

const FallbackDashboard: React.FC = () => {
  const { user, userProfile } = useAuth()

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Welcome to ProductPulse!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're setting up your personalized dashboard...
            </p>
          </div>

          {/* User Info */}
          <div className="card max-w-md mx-auto mb-8">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              {userProfile && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{userProfile.full_name || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className="font-medium capitalize">{userProfile.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User Type:</span>
                    <span className="font-medium capitalize">{userProfile.user_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium capitalize ${
                      userProfile.status === 'approved' ? 'text-green-600' : 
                      userProfile.status === 'pending' ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {userProfile.status}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link to="/tester/dashboard" className="card hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Tester Dashboard</h3>
                <p className="text-sm text-gray-600">Test products and earn rewards</p>
              </div>
            </Link>

            <Link to="/developer/dashboard" className="card hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Developer Dashboard</h3>
                <p className="text-sm text-gray-600">Submit products for testing</p>
              </div>
            </Link>

            <Link to="/admin/dashboard" className="card hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Admin Dashboard</h3>
                <p className="text-sm text-gray-600">Manage users and platform</p>
              </div>
            </Link>

            <Link to="/super-admin/dashboard" className="card hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Super User Dashboard</h3>
                <p className="text-sm text-gray-600">Platform administration</p>
              </div>
            </Link>
          </div>

          {/* Status Messages */}
          {userProfile?.status === 'pending' && (
            <div className="card bg-yellow-50 border-yellow-200 max-w-md mx-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Account Pending Approval</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your account is waiting for admin approval. You'll receive an email once approved.
                  </p>
                </div>
              </div>
            </div>
          )}

          {userProfile?.status === 'approved' && (
            <div className="card bg-green-50 border-green-200 max-w-md mx-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Account Approved</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your account is approved! Click on your dashboard above to get started.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default FallbackDashboard
