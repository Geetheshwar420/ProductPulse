import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const RegisterSelect: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Join ProductPulse
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you'd like to participate in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tester Registration */}
          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                I'm a Tester
              </h2>
              <p className="text-gray-600 mb-6">
                Test products, provide feedback, and earn rewards
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Access to exclusive product testing opportunities</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Earn points and rewards for quality feedback</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Try new products before they launch</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Build your testing portfolio</span>
              </div>
            </div>

            <Link
              to="/register/tester"
              className="w-full btn-primary text-center block"
            >
              Register as Tester
            </Link>
          </div>

          {/* Developer Registration */}
          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                I'm a Developer
              </h2>
              <p className="text-gray-600 mb-6">
                Submit products for testing and get valuable feedback
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Submit products for community testing</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Receive detailed feedback and insights</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">AI-powered feedback analysis</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Connect with your target audience</span>
              </div>
            </div>

            <Link
              to="/register/developer"
              className="w-full btn-secondary text-center block"
            >
              Register as Developer
            </Link>
          </div>

          {/* Admin Registration */}
          <div className="card hover:shadow-lg transition-shadow duration-300 border-red-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                I'm an Admin
              </h2>
              <p className="text-gray-600 mb-6">
                Manage the platform and approve users
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Full platform administration access</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">User approval and management</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Platform analytics and insights</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">System configuration and settings</span>
              </div>
            </div>

            <Link
              to="/register/admin"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
            >
              Register as Admin
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default RegisterSelect
