import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import MainLayout from '../layouts/MainLayout'
import FallbackDashboard from './FallbackDashboard'

const DashboardRouter: React.FC = () => {
  const { user, userProfile, loading } = useAuth()
  const navigate = useNavigate()
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!userProfile) {
        console.log('No user profile found, redirecting to login');
        navigate('/login', { replace: true })
      } else {
        console.log('DashboardRouter role check:', { role: userProfile.role, user_type: userProfile.user_type });
        
        // Route users to their appropriate dashboard based on role
        if (userProfile.role === 'super_user' || userProfile.user_type === 'super_user') {
          console.log('Redirecting to super admin dashboard');
          navigate('/super-admin/dashboard', { replace: true })
        } else if (userProfile.role === 'admin' || userProfile.user_type === 'admin') {
          console.log('Redirecting to admin dashboard');
          navigate('/admin/dashboard', { replace: true })
        } else if (userProfile.role === 'developer' || userProfile.user_type === 'developer') {
          console.log('Redirecting to developer dashboard');
          navigate('/developer/dashboard', { replace: true })
        } else {
          console.log('Redirecting to default tester dashboard');
          navigate('/tester/dashboard', { replace: true })
        }
        console.log('User exists but no profile yet, waiting...')
        // Give it a moment for profile to load, then show fallback
        setTimeout(() => {
          if (!userProfile) {
            console.log('Profile still not loaded, showing fallback dashboard')
            setShowFallback(true)
          }
        }, 2000) // Wait 2 seconds max
      }
    } else if (!loading && !user) {
      console.log('No user, redirecting to login')
      navigate('/login', { replace: true })
    }
  }, [userProfile, loading, user, navigate])

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    )
  }

  if (showFallback) {
    return <FallbackDashboard />
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="ml-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </MainLayout>
  )
}

export default DashboardRouter
