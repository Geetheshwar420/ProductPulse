import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import LoadingSpinner from '../../components/LoadingSpinner'
import { api } from '../../services/api'

interface SuperUserStats {
  totalUsers: number
  totalAdmins: number
  totalTesters: number
  totalDevelopers: number
  pendingUsers: number
  recentAdminActions: number
}

const SuperUserDashboard: React.FC = () => {
  const [stats, setStats] = useState<SuperUserStats>({
    totalUsers: 0,
    totalAdmins: 0,
    totalTesters: 0,
    totalDevelopers: 0,
    pendingUsers: 0,
    recentAdminActions: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSuperUserStats()
  }, [])

  const fetchSuperUserStats = async () => {
    try {
      const data = await api.get('/products/stats')
      setStats({
        totalUsers: data.totalUsers || 0,
        totalAdmins: data.admins || 0,
        totalTesters: data.testers || 0,
        totalDevelopers: data.developers || 0,
        pendingUsers: data.pendingUsers || 0,
        recentAdminActions: data.recentAdminActions || 0
      })
    } catch (error) {
      console.error('Error fetching super user stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <LoadingSpinner size="lg" className="py-20" />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">Super User Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor and manage the entire ProductPulse platform</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/super-admin/actions" className="btn-secondary">
              View Admin Actions
            </Link>
            <Link to="/super-admin/admins/create" className="btn-primary">
              Create Admin
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-blue-50 border-blue-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="card bg-red-50 border-red-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-red-600">Total Admins</p>
                <p className="text-2xl font-bold text-red-900">{stats.totalAdmins}</p>
              </div>
            </div>
          </div>

          <div className="card bg-green-50 border-green-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Total Testers</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalTesters}</p>
              </div>
            </div>
          </div>

          <div className="card bg-purple-50 border-purple-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600">Total Developers</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalDevelopers}</p>
              </div>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-600">Pending Users</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.pendingUsers}</p>
              </div>
            </div>
          </div>

          <div className="card bg-indigo-50 border-indigo-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-indigo-600">Admin Actions (7 days)</p>
                <p className="text-2xl font-bold text-indigo-900">{stats.recentAdminActions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-heading font-semibold mb-4">User Management</h3>
            <p className="text-gray-600 mb-4">Monitor and manage all users on the platform</p>
            <Link to="/admin/users" className="btn-primary w-full text-center block">
              Manage All Users
            </Link>
          </div>

          <div className="card">
            <h3 className="text-lg font-heading font-semibold mb-4">Admin Management</h3>
            <p className="text-gray-600 mb-4">Create and monitor admin accounts</p>
            <Link to="/super-admin/admins" className="btn-secondary w-full text-center block">
              Manage Admins
            </Link>
          </div>

          <div className="card">
            <h3 className="text-lg font-heading font-semibold mb-4">Activity Monitoring</h3>
            <p className="text-gray-600 mb-4">View all admin actions and platform activity</p>
            <Link to="/super-admin/actions" className="btn-outline w-full text-center block">
              View Activity Log
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SuperUserDashboard
