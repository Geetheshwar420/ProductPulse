import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Something went wrong
                </h3>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                An error occurred while loading the application. This might be due to:
              </p>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Missing environment variables</li>
                <li>Network connectivity issues</li>
                <li>Configuration problems</li>
              </ul>
            </div>

            {this.state.error && (
              <div className="mb-4 p-3 bg-red-50 rounded-md">
                <p className="text-sm text-red-800 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Check the console for more details or see{' '}
                <code className="bg-gray-100 px-1 rounded">SETUP_INSTRUCTIONS.md</code>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
