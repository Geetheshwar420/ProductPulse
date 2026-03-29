import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import LoadingSpinner from '../../components/LoadingSpinner'
import { api } from '../../services/api'

interface Feedback {
  id: string
  rating: number
  comment: string
  created_at: string
  user_name: string
  product_name: string
}

const DeveloperReviews: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const data = await api.get('/feedback/developer')
      setFeedback(data || [])
    } catch (error) {
      console.error('Error fetching developer feedback:', error)
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">Product Reviews</h1>
            <p className="text-gray-600 mt-2">All feedback received for your products</p>
          </div>
          <Link to="/developer/dashboard" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        <div className="card">
          {feedback.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No feedback received yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {feedback.map((item) => (
                <div key={item.id} className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < item.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-400">|</span>
                      <span className="font-semibold text-gray-900">{item.product_name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">"{item.comment}"</p>
                  <div className="mt-4 flex items-center justify-end">
                    <span className="text-sm font-medium text-gray-500">
                      — {item.user_name || 'Anonymous Tester'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default DeveloperReviews
