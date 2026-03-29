import React from 'react'
import { useAuth } from '../context/AuthContext'

const RewardTracker: React.FC = () => {
  const { userProfile } = useAuth()

  const getRewardLevel = (points: number) => {
    if (points >= 1000) return { level: 'Gold', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    if (points >= 500) return { level: 'Silver', color: 'text-gray-600', bgColor: 'bg-gray-100' }
    if (points >= 100) return { level: 'Bronze', color: 'text-orange-600', bgColor: 'bg-orange-100' }
    return { level: 'Starter', color: 'text-blue-600', bgColor: 'bg-blue-100' }
  }

  const points = userProfile?.points || 0
  const reward = getRewardLevel(points)

  return (
    <div className="card">
      <h3 className="text-lg font-heading font-semibold mb-4">Your Rewards</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Current Points:</span>
          <span className="text-2xl font-bold text-accent-500">{points}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Level:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${reward.color} ${reward.bgColor}`}>
            {reward.level}
          </span>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Progress to Next Level</h4>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, (points % 500) / 5)}%` 
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {500 - (points % 500)} points to next level
          </p>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-2">How to Earn Points</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Submit feedback: 50 points</li>
            <li>• Complete product testing: 100 points</li>
            <li>• Upload screenshots: 25 points</li>
            <li>• Video review: 150 points</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RewardTracker
