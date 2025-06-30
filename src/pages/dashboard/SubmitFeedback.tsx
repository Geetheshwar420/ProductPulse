import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import FeedbackForm from '../../components/FeedbackForm'
import LoadingSpinner from '../../components/LoadingSpinner'
import { getProductById } from '../../services/supabase'

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

const SubmitFeedback: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    if (!productId) return

    try {
      const { data, error } = await getProductById(productId)
      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeedbackSuccess = () => {
    navigate('/dashboard', { 
      state: { message: 'Feedback submitted successfully! You earned 50 points.' }
    })
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
          <p className="text-gray-600 mb-6">
            The product you're trying to review doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Product Info */}
        <div className="card">
          <div className="flex items-start space-x-6">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                Submit Feedback for {product.name}
              </h1>
              <p className="text-gray-600 mb-2">
                by {product.company_name}
              </p>
              <p className="text-gray-700 text-sm">
                {product.description}
              </p>
            </div>
          </div>

          {product.guidelines && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                Testing Guidelines:
              </h3>
              <p className="text-blue-800 text-sm">
                {product.guidelines}
              </p>
            </div>
          )}
        </div>

        {/* Feedback Form */}
        <FeedbackForm 
          productId={productId!} 
          onSubmitSuccess={handleFeedbackSuccess}
        />

        {/* Tips */}
        <div className="card bg-green-50 border-green-200">
          <h3 className="text-lg font-heading font-semibold text-green-900 mb-4">
            💡 Tips for Great Feedback
          </h3>
          <ul className="text-sm text-green-800 space-y-2">
            <li>• Be specific about what you liked and didn't like</li>
            <li>• Mention how you used the product in your daily life</li>
            <li>• Include screenshots or photos if relevant</li>
            <li>• Compare it to similar products you've used</li>
            <li>• Suggest improvements or new features</li>
            <li>• Be honest and constructive in your criticism</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  )
}

export default SubmitFeedback
