import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const AdminActions: React.FC = () => {
  const actions = [
    { id: 1, admin: 'Admin1', action: 'Approved product "EcoTrack Pro"', time: '2 hours ago', type: 'product' },
    { id: 2, admin: 'Admin2', action: 'Approved tester "Alice Johnson"', time: '4 hours ago', type: 'user' },
    { id: 3, admin: 'Admin1', action: 'Rejected developer "Emma Brown"', time: '1 day ago', type: 'user' },
    { id: 4, admin: 'Admin1', action: 'Assigned "Tester1" to "MindfulNow AI"', time: '1 day ago', type: 'assignment' },
    { id: 5, admin: 'Admin2', action: 'Suspended user "Bob Smith"', time: '2 days ago', type: 'user' },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">Admin Actions</h1>
            <p className="text-gray-600 mt-2">Activity log of all platform administrative actions</p>
          </div>
          <Link to="/super-admin/dashboard" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        <div className="card">
          <div className="space-y-4">
            {actions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    action.type === 'user' ? 'bg-blue-500' : 
                    action.type === 'product' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-bold">{action.admin}</span>: {action.action}
                    </p>
                    <p className="text-xs text-gray-500">{action.time}</p>
                  </div>
                </div>
                <div className="text-xs font-semibold px-2 py-1 rounded bg-white border border-gray-200 uppercase tracking-tighter">
                  {action.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminActions
