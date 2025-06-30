import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LoadingSpinner from '../components/LoadingSpinner'
import { getProductById, getFeedbackByProduct } from '../services/supabase'

// Local type definitions
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

interface Feedback {
  id: string
  user_id: string
  product_id: string
  rating: number
  comment: string
  screenshots?: string[]
  video_url?: string
  ai_insights?: string
  sentiment?: string
  created_at: string
  updated_at: string
}

const ProductReviews: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (productId) {
      fetchProductAndReviews()
    }
  }, [productId])

  const fetchProductAndReviews = async () => {
    if (!productId) return

    try {
      const [productResult, feedbackResult] = await Promise.all([
        getProductById(productId),
        getFeedbackByProduct(productId)
      ])

      if (productResult.data) setProduct(productResult.data)
      if (feedbackResult.data) setFeedback(feedbackResult.data)
    } catch (error) {
      console.error('Error fetching product reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const averageRating = feedback.length > 0 
    ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length 
    : 0

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
          <p className="text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Product Header */}
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.image_url && (
              <div className="md:col-span-1">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            <div className={product.image_url ? "md:col-span-2" : "md:col-span-3"}>
              <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                by {product.company_name}
              </p>
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
              
              {/* Rating Summary */}
              <div className="flex items-center space-x-4">
                {renderStars(Math.round(averageRating))}
                <span className="text-lg font-semibold">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-gray-600">
                  ({feedback.length} review{feedback.length !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            User Reviews
          </h2>

          {feedback.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.436L3 21l1.436-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-600">
                Be the first to test this product and share your feedback!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedback.map((review) => (
                <div key={review.id} className="card">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {(review as any).users?.full_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {(review as any).users?.full_name || 'Anonymous User'}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-600">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        {review.comment}
                      </p>
                      
                      {review.screenshots && review.screenshots.length > 0 && (
                        <div className="flex space-x-2">
                          {review.screenshots.map((screenshot, index) => (
                            <img
                              key={index}
                              src={screenshot}
                              alt={`Screenshot ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                              onClick={() => window.open(screenshot, '_blank')}
                            />
                          ))}
                        </div>
                      )}

                      {review.ai_insights && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <h5 className="text-sm font-medium text-blue-900 mb-1">
                            AI Insights:
                          </h5>
                          <p className="text-sm text-blue-800">
                            {review.ai_insights}
                          </p>
                        </div>
                      )}
                    </div>
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

export default ProductReviews
