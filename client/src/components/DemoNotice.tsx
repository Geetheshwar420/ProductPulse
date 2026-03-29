import React from 'react'

const DemoNotice: React.FC = () => {
  const isDemo = !import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL.includes('demo')

  if (!isDemo) return null

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            <strong>Local SQLite Backend:</strong> ProductPulse is now running on a local SQLite database. 
          </p>
          <p className="mt-1 text-sm text-blue-700">
            For production use, ensure your <code className="bg-blue-100 px-1 rounded">.env</code> file is properly configured with your JWT secrets and API keys.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DemoNotice
