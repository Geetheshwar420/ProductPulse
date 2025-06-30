import React from 'react'

const DemoNotice: React.FC = () => {
  const isDemo = import.meta.env.VITE_SUPABASE_URL === 'your_supabase_project_url' || 
                 !import.meta.env.VITE_SUPABASE_URL ||
                 import.meta.env.VITE_SUPABASE_URL === 'https://demo.supabase.co'

  if (!isDemo) return null

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Demo Mode:</strong> This is a demo version of ProductPulse. To enable full functionality, please:
          </p>
          <ol className="mt-2 text-sm text-yellow-700 list-decimal list-inside space-y-1">
            <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
            <li>Run the database schema from <code className="bg-yellow-100 px-1 rounded">database/schema.sql</code></li>
            <li>Update your <code className="bg-yellow-100 px-1 rounded">.env</code> file with your Supabase credentials</li>
            <li>Restart the development server</li>
          </ol>
          <p className="mt-2 text-sm text-yellow-700">
            See <code className="bg-yellow-100 px-1 rounded">SETUP_INSTRUCTIONS.md</code> for detailed setup instructions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DemoNotice
