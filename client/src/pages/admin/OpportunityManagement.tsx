import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import LoadingSpinner from '../../components/LoadingSpinner'
import { api } from '../../services/api'

interface Application {
  id: string
  product_id: string
  tester_id: string
  status: 'applied' | 'selected' | 'completed' | 'rejected'
  created_at: string
  product_name: string
  tester_name: string
  tester_email: string
}

const OpportunityManagement: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const data = await api.get('/opportunities/all')
      setApplications(data || [])
    } catch (err) {
      setError('Failed to fetch applications')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/opportunities/${id}/status`, { status })
      fetchApplications()
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Failed to update status')
    }
  }

  if (loading) return <MainLayout><LoadingSpinner size="lg" className="py-20" /></MainLayout>

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">Opportunity Management</h1>
            <p className="text-gray-600">Assign testers to products and manage status</p>
          </div>
          <Link to="/admin/dashboard" className="btn-secondary">Back to Dashboard</Link>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tester</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No testing applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{app.product_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.tester_name}</div>
                        <div className="text-xs text-gray-500">{app.tester_email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${app.status === 'selected' ? 'bg-green-100 text-green-800' : 
                            app.status === 'applied' ? 'bg-blue-100 text-blue-800' : 
                            app.status === 'completed' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        {app.status === 'applied' && (
                          <button onClick={() => handleUpdateStatus(app.id, 'selected')} className="text-green-600 hover:text-green-900">Select</button>
                        )}
                        {app.status === 'selected' && (
                          <button onClick={() => handleUpdateStatus(app.id, 'completed')} className="text-indigo-600 hover:text-indigo-900">Complete</button>
                        )}
                        {app.status !== 'completed' && app.status !== 'rejected' && (
                          <button onClick={() => handleUpdateStatus(app.id, 'rejected')} className="text-red-600 hover:text-red-900">Reject</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default OpportunityManagement
