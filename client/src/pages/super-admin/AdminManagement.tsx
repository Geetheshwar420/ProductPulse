import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import LoadingSpinner from '../../components/LoadingSpinner'
import { api } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

interface AdminUser {
  id: string
  email: string
  full_name?: string
  username: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  created_at: string
}

const AdminManagement: React.FC = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  useAuth()

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      // We reuse the /users endpoint with role=admin
      const data = await api.get('/users', {
        params: {
          role: 'admin'
        }
      })
      setAdmins(data || [])
    } catch (error) {
      console.error('Error fetching admins:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateAdminStatus = async (adminId: string, status: 'approved' | 'rejected' | 'suspended') => {
    try {
      await api.put(`/users/${adminId}/status`, { status })
      fetchAdmins()
    } catch (error) {
      console.error('Error updating admin status:', error)
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">Admin Management</h1>
            <p className="text-gray-600 mt-2">Manage platform administrator accounts</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/super-admin/admins/create" className="btn-primary">
              Create New Admin
            </Link>
            <Link to="/super-admin/dashboard" className="btn-secondary">
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{admin.full_name || 'No Name'}</div>
                      <div className="text-xs text-gray-500 ml-1">@{admin.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        admin.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        admin.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(admin.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                       {admin.status === 'pending' && (
                         <button onClick={() => updateAdminStatus(admin.id, 'approved')} className="text-green-600 hover:text-green-900">Approve</button>
                       )}
                       {admin.status === 'approved' && (
                         <button onClick={() => updateAdminStatus(admin.id, 'suspended')} className="text-yellow-600 hover:text-yellow-900">Suspend</button>
                       )}
                       {admin.status === 'suspended' && (
                         <button onClick={() => updateAdminStatus(admin.id, 'approved')} className="text-green-600 hover:text-green-900">Unsuspend</button>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {admins.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No administrators found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminManagement
