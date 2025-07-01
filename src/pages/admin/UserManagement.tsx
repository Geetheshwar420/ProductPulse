import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import LoadingSpinner from '../../components/LoadingSpinner'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../context/AuthContext'

interface User {
  id: string
  email: string
  full_name?: string
  user_type: 'tester' | 'developer'
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  company?: string
  experience?: string
  interests?: string
  created_at: string
  approved_at?: string
  approved_by?: string
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [userTypeFilter, setUserTypeFilter] = useState<'all' | 'tester' | 'developer'>('all')
  const { userProfile } = useAuth()

  useEffect(() => {
    fetchUsers()
  }, [filter, userTypeFilter])

  const fetchUsers = async () => {
    try {
      let query = supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      if (userTypeFilter !== 'all') {
        query = query.eq('user_type', userTypeFilter)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching users:', error)
        return
      }

      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserStatus = async (userId: string, status: 'approved' | 'rejected' | 'suspended') => {
    try {
      const updates: any = {
        status,
        updated_at: new Date().toISOString()
      }

      if (status === 'approved') {
        updates.approved_by = userProfile?.id
        updates.approved_at = new Date().toISOString()
      }

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)

      if (error) {
        console.error('Error updating user status:', error)
        return
      }

      // Refresh the users list
      fetchUsers()
    } catch (error) {
      console.error('Error updating user status:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      suspended: 'bg-gray-100 text-gray-800'
    }
    return badges[status as keyof typeof badges] || badges.pending
  }

  const getUserTypeBadge = (userType: string) => {
    const badges = {
      tester: 'bg-blue-100 text-blue-800',
      developer: 'bg-purple-100 text-purple-800'
    }
    return badges[userType as keyof typeof badges] || badges.tester
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Approve and manage testers and developers</p>
          </div>
          <Link
            to="/admin/dashboard"
            className="btn-secondary"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Type Filter</label>
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value as any)}
                className="input-field"
              >
                <option value="all">All Types</option>
                <option value="tester">Testers</option>
                <option value="developer">Developers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.full_name || 'No name'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUserTypeBadge(user.user_type)}`}>
                        {user.user_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {user.user_type === 'developer' && user.company && (
                          <div>Company: {user.company}</div>
                        )}
                        {user.user_type === 'tester' && user.experience && (
                          <div>Experience: {user.experience}</div>
                        )}
                        {user.user_type === 'tester' && user.interests && (
                          <div className="text-xs text-gray-500 mt-1">
                            Interests: {user.interests}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {user.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateUserStatus(user.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateUserStatus(user.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {user.status === 'approved' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'suspended')}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Suspend
                        </button>
                      )}
                      {(user.status === 'rejected' || user.status === 'suspended') && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {users.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No users found with the current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default UserManagement
