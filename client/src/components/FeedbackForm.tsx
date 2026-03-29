import React, { useState } from 'react'
import { api } from '../services/api'
import { analyzeFeedback } from '../services/openai'
import { useAuth } from '../context/AuthContext'

interface FeedbackFormProps {
  productId: string
  productName?: string
  onSubmitSuccess?: () => void
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ productId, productName = 'Product', onSubmitSuccess }) => {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [screenshots, setScreenshots] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingClick = (value: number) => {
    setRating(value)
  }

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setScreenshots(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user || !rating || !comment.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Generate AI insights for the feedback
      let aiInsights = null
      try {
        aiInsights = await analyzeFeedback(comment.trim(), productName, rating)
      } catch (aiError) {
        console.warn('AI analysis failed, continuing without insights:', aiError)
      }

      // Upload screenshots to our local backend
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('product_id', productId);
      formData.append('rating', rating.toString());
      formData.append('comment', comment.trim());
      
      if (aiInsights) {
        formData.append('ai_insights', JSON.stringify(aiInsights));
      }

      screenshots.forEach((file) => {
        formData.append('screenshots', file);
      });

      await api.post('/feedback', formData);

      // Award points to user for feedback submission
      const pointsToAward = 50 + (screenshots.length * 25) // Base 50 + 25 per screenshot
      try {
        await api.post('/users/award-points', {
          user_id: user.id,
          points: pointsToAward,
          reason: 'feedback_submission'
        })
      } catch (pointsError) {
        console.warn('Failed to award points:', pointsError)
      }

      // Reset form
      setRating(0)
      setComment('')
      setScreenshots([])

      if (onSubmitSuccess) {
        onSubmitSuccess()
      }

      alert(`Feedback submitted successfully! You earned ${pointsToAward} points.`)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Error submitting feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card">
      <h3 className="text-xl font-heading font-semibold mb-6">Submit Your Feedback</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`w-8 h-8 ${
                  star <= rating
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                } hover:text-yellow-400 transition-colors`}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-full h-full"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="input-field"
            placeholder="Share your experience with this product..."
            required
          />
        </div>

        {/* Screenshots */}
        <div>
          <label htmlFor="screenshots" className="block text-sm font-medium text-gray-700 mb-2">
            Screenshots (Optional)
          </label>
          <input
            type="file"
            id="screenshots"
            multiple
            accept="image/*"
            onChange={handleScreenshotChange}
            className="input-field"
          />
          {screenshots.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {screenshots.length} file(s) selected
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !rating || !comment.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
