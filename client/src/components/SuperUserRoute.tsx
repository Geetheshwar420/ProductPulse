import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

interface SuperUserRouteProps {
  children: React.ReactNode
}

const SuperUserRoute: React.FC<SuperUserRouteProps> = ({ children }) => {
  const { user, userProfile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Check if user is logged in
  if (!user) {
    return <Navigate to="/super-admin/login" />
  }

  // Check if user profile is loaded and user is super user
  if (!userProfile || userProfile.role !== 'super_user') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this area. Only super users can access this section.</p>
          <Navigate to="/dashboard" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default SuperUserRoute
