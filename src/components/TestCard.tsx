import React from 'react'
import { Link } from 'react-router-dom'

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

interface TestCardProps {
  product: Product
  onApply?: (productId: string) => void
  showApplyButton?: boolean
  applied?: boolean
}

const TestCard: React.FC<TestCardProps> = ({ 
  product, 
  onApply, 
  showApplyButton = true,
  applied = false 
}) => {
  const handleApply = () => {
    if (onApply) {
      onApply(product.id)
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {product.image_url && (
        <div className="mb-4">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-heading font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            by {product.company_name}
          </p>
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-3">
          {product.description}
        </p>
        
        {product.guidelines && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Testing Guidelines:
            </h4>
            <p className="text-sm text-blue-800">
              {product.guidelines}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4">
          <Link
            to={`/product-reviews/${product.id}`}
            className="text-primary-500 hover:text-primary-600 text-sm font-medium"
          >
            View Reviews
          </Link>
          
          {showApplyButton && (
            <button
              onClick={handleApply}
              disabled={applied}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                applied
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {applied ? 'Applied' : 'Apply to Test'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestCard
