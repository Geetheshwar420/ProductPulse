import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import MainLayout from '../../layouts/MainLayout'
import LoadingSpinner from '../../components/LoadingSpinner'
import { api } from '../../services/api'

interface Product {
  id: string
  name: string
  description: string
  company_name: string
  image_url?: string
  status: string
  created_at: string
  feedback_count?: number
  average_rating?: number
}

interface Feedback {
  id: string
  rating: number
  comment: string
  created_at: string
  user_name: string
}

const DeveloperDashboard: React.FC = () => {
  const { user, userProfile } = useAuth()
  const [myProducts, setMyProducts] = useState<Product[]>([])
  const [recentFeedback, setRecentFeedback] = useState<Feedback[]>([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalFeedback: 0,
    averageRating: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch user's products
      const products = await api.get('/products/me')
      setMyProducts(products || [])

      // Fetch dashboard stats (This endpoint returns aggregate stats for the developer)
      const dashboardStats = await api.get('/products/stats')
      setStats({
        totalProducts: dashboardStats.totalProducts || 0,
        activeProducts: dashboardStats.activeProducts || 0,
        totalFeedback: dashboardStats.totalFeedback || 0,
        averageRating: dashboardStats.averageRating || 0
      })

      // Fetch recent feedback for developer's products
      const feedback = await api.get('/feedback/developer')
      setRecentFeedback(feedback || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
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
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Welcome back, {userProfile?.full_name || user?.email}!
          </h1>
          <p className="text-purple-100 mb-4">
            Manage your products and get valuable feedback from real users
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div>
              <span className="font-semibold">Company: </span>
              <span>{userProfile?.company || 'Not specified'}</span>
            </div>
            <div>
              <span className="font-semibold">Status: </span>
              <span className="capitalize">{userProfile?.status}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card bg-blue-50 border-blue-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Total Products</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalProducts}</p>
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
                <p className="text-sm font-medium text-green-600">Active Products</p>
                <p className="text-2xl font-bold text-green-900">{stats.activeProducts}</p>
              </div>
            </div>
          </div>

          <div className="card bg-purple-50 border-purple-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600">Total Feedback</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalFeedback}</p>
              </div>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-600">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Products */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900">
                  My Products
                </h2>
                <Link to="/submit-product" className="btn-primary">
                  Submit New Product
                </Link>
              </div>
              
              {myProducts.length === 0 ? (
                <div className="card text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products submitted yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Submit your first product to start getting valuable feedback from testers.
                  </p>
                  <Link to="/submit-product" className="btn-primary">
                    Submit Your First Product
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myProducts.map((product) => (
                    <div key={product.id} className="card">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {product.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{product.feedback_count || 0} feedback</span>
                              {(product.average_rating || 0) > 0 && (
                                <span className="flex items-center">
                                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  {(product.average_rating || 0).toFixed(1)}
                                </span>
                              )}
                              <span>Created {new Date(product.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(product.status)}`}>
                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                          </span>
                          {product.status === 'active' && (
                            <div className="mt-2">
                              <Link
                                to={`/developer/products/${product.id}/insights`}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                View AI Insights →
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recent Feedback */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Recent Feedback
              </h2>
              
              {recentFeedback.length === 0 ? (
                <div className="card text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    No feedback yet. Once testers start reviewing your products, their feedback will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {feedback.user_name || 'Anonymous'}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(feedback.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-heading font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/submit-product" className="btn-primary w-full text-center block">
                  Submit New Product
                </Link>
                <Link to="/developer/reviews" className="btn-secondary w-full text-center block">
                  View All Reviews
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="card bg-purple-50 border-purple-200">
              <h3 className="text-lg font-heading font-semibold text-purple-900 mb-4">
                💡 Developer Tips
              </h3>
              <ul className="text-sm text-purple-800 space-y-2">
                <li>• Provide clear testing guidelines</li>
                <li>• Respond to feedback promptly</li>
                <li>• Use high-quality product images</li>
                <li>• Monitor AI insights for trends</li>
                <li>• Iterate based on user feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default DeveloperDashboard
