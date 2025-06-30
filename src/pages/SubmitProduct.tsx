import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'
import LoadingSpinner from '../components/LoadingSpinner'

const SubmitProduct: React.FC = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    companyName: '',
    guidelines: '',
    category: '',
    estimatedTestingTime: ''
  })
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Implement product submission to Supabase
      // This would include uploading the image to Supabase Storage
      // and inserting the product data into the database
      
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      setSuccess(true)
      setFormData({
        name: '',
        description: '',
        companyName: '',
        guidelines: '',
        category: '',
        estimatedTestingTime: ''
      })
      setImage(null)
    } catch (error) {
      console.error('Error submitting product:', error)
      alert('Error submitting product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto">
          <div className="card text-center py-12">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Product Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for submitting your product. Our team will review it and get back to you within 2-3 business days.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="btn-primary"
            >
              Submit Another Product
            </button>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Submit Your Product for Testing
          </h1>
          <p className="text-gray-600">
            Get valuable feedback from real users to improve your product before launch.
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter company name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Product Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input-field"
                placeholder="Describe your product, its features, and target audience..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="home-garden">Home & Garden</option>
                  <option value="health-beauty">Health & Beauty</option>
                  <option value="food-beverage">Food & Beverage</option>
                  <option value="clothing">Clothing & Accessories</option>
                  <option value="software">Software & Apps</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="estimatedTestingTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Testing Time
                </label>
                <select
                  id="estimatedTestingTime"
                  name="estimatedTestingTime"
                  value={formData.estimatedTestingTime}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select duration</option>
                  <option value="1-3 days">1-3 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2+ months">2+ months</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="guidelines" className="block text-sm font-medium text-gray-700 mb-2">
                Testing Guidelines
              </label>
              <textarea
                id="guidelines"
                name="guidelines"
                value={formData.guidelines}
                onChange={handleChange}
                rows={3}
                className="input-field"
                placeholder="Provide specific instructions for testers (optional)..."
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="input-field"
              />
              {image && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {image.name}
                </p>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Our team will review your submission within 2-3 business days</li>
                <li>• We'll contact you to discuss testing parameters and timeline</li>
                <li>• Once approved, your product will be available to our tester community</li>
                <li>• You'll receive detailed feedback and insights from real users</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default SubmitProduct
