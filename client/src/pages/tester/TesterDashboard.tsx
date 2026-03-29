import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import MainLayout from '../../layouts/MainLayout'
import TestCard from '../../components/TestCard'
import RewardTracker from '../../components/RewardTracker'
import LoadingSpinner from '../../components/LoadingSpinner'
import { api, getMyOpportunities, applyForOpportunity } from '../../services/api'

interface Product {
  id: string
  name: string
  description: string
  // ... existing fields but with mapped names from SQLite if needed
  company_name: string
  image_url?: string
  guidelines?: string
  status: string
  created_at: string
  updated_at: string
}

interface TestingOpportunity {
  id: string
  product_id: string
  status: string
  applied_at: string
  selected_at?: string
  completed_at?: string
  product: Product
}

const TesterDashboard: React.FC = () => {
  const { user, userProfile } = useAuth()
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])
  const [myApplications, setMyApplications] = useState<TestingOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [appliedProducts, setAppliedProducts] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (user) {
      console.log('TesterDashboard - Fetching data for user:', user.id)
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch available products for testing (status = active)
      const products = await api.get('/products?status=active')
      setAvailableProducts(products || [])

      // Fetch user's testing applications
      const applications = await getMyOpportunities()
      setMyApplications(applications || [])

      // Set applied products for UI state
      const appliedIds = new Set<string>(applications?.map((app: any) => app.product_id) || [])
      setAppliedProducts(appliedIds)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyForTesting = async (productId: string) => {
    try {
      await applyForOpportunity(productId)
      
      setAppliedProducts(prev => new Set([...prev, productId]))
      alert('Application submitted successfully!')
      
      // Refresh applications
      fetchDashboardData()
    } catch (error: any) {
      console.error('Error applying for testing:', error)
      alert(`Error applying for testing: ${error.message || 'Error occurred'}`)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      applied: 'bg-blue-100 text-blue-800',
      selected: 'bg-green-100 text-green-800',
      testing: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800'
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
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
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Welcome back, {userProfile?.full_name || user?.email}!
          </h1>
          <p className="text-blue-100 mb-4">
            Ready to test some amazing products and earn rewards?
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div>
              <span className="font-semibold">Your Points: </span>
              <span className="text-yellow-300 font-bold">{userProfile?.points || 0}</span>
            </div>
            <div>
              <span className="font-semibold">Status: </span>
              <span className="capitalize">{userProfile?.status}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Applications */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                My Testing Applications
              </h2>
              
              {myApplications.length === 0 ? (
                <div className="card text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    No applications yet. Apply for testing opportunities below!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myApplications.slice(0, 3).map((application) => (
                    <div key={application.id} className="card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {application.product?.image_url && (
                            <img
                              src={application.product.image_url}
                              alt={application.product?.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {application.product?.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {application.product?.company_name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Applied {new Date(application.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {application.status === 'selected' && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Link
                            to={`/submit-feedback/${application.product_id}`}
                            className="btn-primary flex items-center justify-center text-sm w-full"
                          >
                            Start Testing & Submit Feedback
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Available Testing Opportunities */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Available Testing Opportunities
              </h2>
              
              {availableProducts.length === 0 ? (
                <div className="card text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products available
                  </h3>
                  <p className="text-gray-600">
                    Check back later for new testing opportunities!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableProducts.map((product) => (
                    <TestCard
                      key={product.id}
                      product={product}
                      onApply={handleApplyForTesting}
                      applied={appliedProducts.has(product.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rewards Tracker */}
            <RewardTracker />

            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-lg font-heading font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications:</span>
                  <span className="font-semibold">{myApplications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Tests:</span>
                  <span className="font-semibold">
                    {myApplications.filter(app => app.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Tests:</span>
                  <span className="font-semibold">
                    {myApplications.filter(app => app.status === 'testing').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-semibold">
                    {userProfile?.created_at ? 
                      new Date(userProfile.created_at).toLocaleDateString() : 
                      'Today'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-lg font-heading font-semibold text-blue-900 mb-4">
                💡 Tester Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Apply early for popular products</li>
                <li>• Submit detailed feedback to earn bonus points</li>
                <li>• Upload screenshots for better reviews</li>
                <li>• Check back daily for new opportunities</li>
                <li>• Complete your profile for better matching</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TesterDashboard
