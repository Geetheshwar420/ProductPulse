import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import LoadingSpinner from '../../components/LoadingSpinner'
import { api } from '../../services/api'
import { generateProductInsights } from '../../services/openai'

interface Product {
  id: string
  name: string
  description: string
  company_name: string
  image_url?: string
  created_at: string
}

interface Feedback {
  id: string
  rating: number
  comment: string
  created_at: string
  user: {
    full_name: string
    email: string
  }
}

interface ProductInsights {
  overallSentiment: string
  commonThemes: string[]
  improvementAreas: string[]
  strengths: string[]
  averageScore: number
  summary: string
}

const ProductInsights: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const { userProfile } = useAuth()
  const [product, setProduct] = useState<Product | null>(null)
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [insights, setInsights] = useState<ProductInsights | null>(null)
  const [loading, setLoading] = useState(true)
  const [generatingInsights, setGeneratingInsights] = useState(false)

  const dashboardPath = userProfile?.role === 'admin' || userProfile?.role === 'super_user' 
    ? '/admin/dashboard' 
    : '/developer/dashboard'

  useEffect(() => {
    if (productId) {
      fetchProductAndFeedback()
    }
  }, [productId])

  const fetchProductAndFeedback = async () => {
    try {
      // Fetch product details
      const productData = await api.get(`/products/${productId}`)
      setProduct(productData)

      // Fetch feedback for this product
      const feedbackData = await api.get(`/feedback/product/${productId}`)
      // Format feedback to include user info if needed, though local API should return it
      setFeedback(feedbackData || [])

      // Generate AI insights if we have feedback
      if (feedbackData && feedbackData.length > 0) {
        await generateAIInsights(feedbackData, productData.name)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateAIInsights = async (feedbackData: any[], productName: string) => {
    setGeneratingInsights(true)
    try {
      const feedbackList = feedbackData.map(f => ({
        comment: f.comment,
        rating: f.rating
      }))

      const aiInsights = await generateProductInsights(feedbackList, productName)
      setInsights(aiInsights)
    } catch (error) {
      console.error('Error generating insights:', error)
    } finally {
      setGeneratingInsights(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50'
      case 'negative': return 'text-red-600 bg-red-50'
      default: return 'text-yellow-600 bg-yellow-50'
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <LoadingSpinner size="lg" className="py-20" />
      </MainLayout>
    )
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link to={dashboardPath} className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              Product Insights: {product.name}
            </h1>
            <p className="text-gray-600 mt-2">
              AI-powered analysis of user feedback and product performance
            </p>
          </div>
          <Link to={dashboardPath} className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        {/* Product Overview */}
        <div className="card">
          <div className="flex items-start space-x-6">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-sm text-gray-500">
                Company: {product.company_name} | 
                Created: {new Date(product.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Feedback</h3>
            <p className="text-3xl font-bold text-blue-600">{feedback.length}</p>
          </div>
          <div className="card bg-green-50 border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Average Rating</h3>
            <p className="text-3xl font-bold text-green-600">
              {feedback.length > 0 
                ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
                : 'N/A'
              }
            </p>
          </div>
          <div className="card bg-purple-50 border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">AI Score</h3>
            <p className="text-3xl font-bold text-purple-600">
              {insights ? `${insights.averageScore.toFixed(1)}/10` : 'Generating...'}
            </p>
          </div>
        </div>

        {/* AI Insights */}
        {generatingInsights ? (
          <div className="card text-center py-8">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 mt-4">Generating AI insights...</p>
          </div>
        ) : insights ? (
          <div className="space-y-6">
            {/* Overall Sentiment */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Sentiment</h3>
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(insights.overallSentiment)}`}>
                {insights.overallSentiment.charAt(0).toUpperCase() + insights.overallSentiment.slice(1)}
              </div>
              <p className="text-gray-600 mt-4">{insights.summary}</p>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Common Themes</h4>
                <ul className="space-y-2">
                  {insights.commonThemes.map((theme, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {theme}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Strengths</h4>
                <ul className="space-y-2">
                  {insights.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Improvement Areas</h4>
                <ul className="space-y-2">
                  {insights.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : feedback.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-600">No feedback available for AI analysis yet.</p>
          </div>
        ) : null}

        {/* Recent Feedback */}
        {feedback.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
            <div className="space-y-4">
              {feedback.slice(0, 5).map((item) => (
                <div key={item.id} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {item.user?.full_name || 'Anonymous'}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating ? 'text-yellow-400' : 'text-gray-300'
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
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default ProductInsights
