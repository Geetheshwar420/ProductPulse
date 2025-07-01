import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const DatabaseStatus: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [schemaStatus, setSchemaStatus] = useState<'checking' | 'ready' | 'needs-setup'>('checking')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    checkStatus()
  }, [])

  const testSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Supabase connection error:', error)
        return false
      }
      return true
    } catch (error) {
      console.error('Unexpected error:', error)
      return false
    }
  }

  const checkDatabaseSchema = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, user_type, company, experience, interests')
        .limit(1)

      if (error) {
        console.error('Schema check error:', error)
        if (error.message.includes('column') && error.message.includes('does not exist')) {
          return false
        }
        return false
      }

      return true
    } catch (error) {
      console.error('Schema check failed:', error)
      return false
    }
  }

  const checkStatus = async () => {
    // Test connection
    const isConnected = await testSupabaseConnection()
    setConnectionStatus(isConnected ? 'connected' : 'error')

    if (isConnected) {
      // Test schema
      const schemaReady = await checkDatabaseSchema()
      setSchemaStatus(schemaReady ? 'ready' : 'needs-setup')
    }
  }

  // Only show if there are issues or in development
  const shouldShow = connectionStatus === 'error' || schemaStatus === 'needs-setup' || import.meta.env.DEV

  if (!shouldShow && !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          title="Database Status"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c0-2.21-1.79-4-4-4H4V7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v10" />
          </svg>
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Database Status</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                connectionStatus === 'checking' ? 'bg-yellow-400' :
                connectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <span className="text-sm">
                Supabase Connection: {
                  connectionStatus === 'checking' ? 'Checking...' :
                  connectionStatus === 'connected' ? 'Connected' : 'Error'
                }
              </span>
            </div>

            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                schemaStatus === 'checking' ? 'bg-yellow-400' :
                schemaStatus === 'ready' ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <span className="text-sm">
                Database Schema: {
                  schemaStatus === 'checking' ? 'Checking...' :
                  schemaStatus === 'ready' ? 'Ready' : 'Needs Setup'
                }
              </span>
            </div>
          </div>

          {schemaStatus === 'needs-setup' && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
              <p className="text-yellow-800 mb-1">Database setup required:</p>
              <ol className="text-yellow-700 list-decimal list-inside space-y-1">
                <li>Run <code className="bg-yellow-100 px-1 rounded">database/schema.sql</code> in Supabase SQL editor</li>
                <li>Run <code className="bg-yellow-100 px-1 rounded">database/migrations/add_user_types.sql</code> if updating existing database</li>
              </ol>
            </div>
          )}

          <button
            onClick={checkStatus}
            className="mt-3 w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded transition-colors"
          >
            Refresh Status
          </button>
        </div>
      )}
    </div>
  )
}

export default DatabaseStatus
