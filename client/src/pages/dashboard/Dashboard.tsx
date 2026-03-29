import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import MainLayout from '../../layouts/MainLayout'
import TestCard from '../../components/TestCard'
import RewardTracker from '../../components/RewardTracker'
import LoadingSpinner from '../../components/LoadingSpinner'
import { api } from '../../services/api'

// Local Product type definition
interface Product {
  id: string
  name: string
  description: string
  company_name: string
  image_url?: string
  guidelines?: string
  status: string
  created_at: string
  updated_at: string
}

const Dashboard: React.FC = () => {
  const { user, userProfile } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [appliedProducts, setAppliedProducts] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchProducts()
    fetchMyApplications()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await api.get('/products')
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMyApplications = async () => {
    try {
      const data = await api.get('/opportunities/my-applications')
      if (data) {
        const ids = new Set<string>(data.map((app: any) => app.product_id as string))
        setAppliedProducts(ids)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  const handleApplyForTesting = async (productId: string) => {
    try {
      await api.post('/opportunities/apply', { product_id: productId })
      setAppliedProducts(prev => new Set([...prev, productId]))
      alert('Application submitted successfully!')
    } catch (error: any) {
      console.error('Error applying for testing:', error)
      const message = error.response?.data?.error || error.message || 'Failed to apply'
      alert(`Error applying for testing: ${message}`)
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
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Welcome back, {userProfile?.full_name || user?.email}!
          </h1>
          <p className="text-primary-100">
            Ready to test some amazing products and earn rewards?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Available Testing Opportunities */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Available Testing Opportunities
              </h2>
              
              {products.length === 0 ? (
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
                  {products.map((product) => (
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

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Recent Activity
              </h2>
              
              <div className="card">
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    No recent activity. Start testing products to see your history here!
                  </p>
                </div>
              </div>
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
                  <span className="text-gray-600">Products Tested:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews Submitted:</span>
                  <span className="font-semibold">0</span>
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
                💡 Pro Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Complete your profile to get more testing opportunities</li>
                <li>• Submit detailed feedback to earn bonus points</li>
                <li>• Upload screenshots for better reviews</li>
                <li>• Check back daily for new products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
