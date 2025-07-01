import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

interface AdminRouteProps {
  children: React.ReactNode
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
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
    return <Navigate to="/admin/login" />
  }

  // Check if user profile is loaded and user is admin (both role and user_type must be admin)
  if (!userProfile || userProfile.role !== 'admin' || userProfile.user_type !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this area. Only administrators can access this section.</p>
          <Navigate to="/dashboard" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminRoute
