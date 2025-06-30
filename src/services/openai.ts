import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
})

export interface FeedbackAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral'
  keyPoints: string[]
  suggestions: string[]
  summary: string
  score: number // 1-10 overall satisfaction score
}

export const analyzeFeedback = async (
  feedbackText: string,
  productName: string,
  rating: number
): Promise<FeedbackAnalysis> => {
  try {
    const prompt = `
Analyze the following product feedback for "${productName}" (rated ${rating}/5 stars):

"${feedbackText}"

Please provide a JSON response with the following structure:
{
  "sentiment": "positive|negative|neutral",
  "keyPoints": ["key point 1", "key point 2", ...],
  "suggestions": ["suggestion 1", "suggestion 2", ...],
  "summary": "Brief summary of the feedback",
  "score": number (1-10 overall satisfaction score)
}

Focus on:
- Overall sentiment of the feedback
- Key positive and negative points mentioned
- Actionable suggestions for product improvement
- A concise summary of the user's experience
- An overall satisfaction score based on the content and rating

Respond only with valid JSON.
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert product analyst who specializes in analyzing user feedback to provide actionable insights for product improvement. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const analysis: FeedbackAnalysis = JSON.parse(content)
    return analysis
  } catch (error) {
    console.error('Error analyzing feedback:', error)
    
    // Fallback analysis if OpenAI fails
    const fallbackSentiment = rating >= 4 ? 'positive' : rating >= 3 ? 'neutral' : 'negative'
    
    return {
      sentiment: fallbackSentiment,
      keyPoints: ['User provided feedback about the product'],
      suggestions: ['Continue monitoring user feedback for improvements'],
      summary: `User rated the product ${rating}/5 stars and provided detailed feedback.`,
      score: rating * 2 // Convert 5-star rating to 10-point scale
    }
  }
}

export const generateProductInsights = async (
  feedbackList: Array<{ comment: string; rating: number }>,
  productName: string
): Promise<{
  overallSentiment: string
  commonThemes: string[]
  improvementAreas: string[]
  strengths: string[]
  averageScore: number
  summary: string
}> => {
  try {
    const feedbackSummary = feedbackList.map((f, i) => 
      `Feedback ${i + 1} (${f.rating}/5): ${f.comment}`
    ).join('\n\n')

    const prompt = `
Analyze all feedback for product "${productName}":

${feedbackSummary}

Provide a comprehensive analysis in JSON format:
{
  "overallSentiment": "positive|negative|neutral",
  "commonThemes": ["theme 1", "theme 2", ...],
  "improvementAreas": ["area 1", "area 2", ...],
  "strengths": ["strength 1", "strength 2", ...],
  "averageScore": number (1-10),
  "summary": "Executive summary of all feedback"
}

Focus on identifying patterns, common complaints, frequently mentioned positives, and actionable improvement areas.
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a product insights analyst. Analyze user feedback to identify trends, strengths, and improvement opportunities. Respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(content)
  } catch (error) {
    console.error('Error generating product insights:', error)
    
    // Fallback insights
    const avgRating = feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length
    
    return {
      overallSentiment: avgRating >= 4 ? 'positive' : avgRating >= 3 ? 'neutral' : 'negative',
      commonThemes: ['User experience', 'Product quality'],
      improvementAreas: ['Based on user feedback analysis'],
      strengths: ['Positive user engagement'],
      averageScore: avgRating * 2,
      summary: `Analysis of ${feedbackList.length} feedback entries with an average rating of ${avgRating.toFixed(1)}/5 stars.`
    }
  }
}
