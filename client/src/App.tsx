import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterSelect from './pages/RegisterSelect'
import ResetPassword from './pages/ResetPassword'
import DashboardRouter from './pages/DashboardRouter'
import FallbackDashboard from './pages/FallbackDashboard'
import TesterDashboard from './pages/tester/TesterDashboard'
import DeveloperDashboard from './pages/developer/DeveloperDashboard'
import DeveloperReviews from './pages/developer/DeveloperReviews'
import SubmitProduct from './pages/SubmitProduct'
import ProductReviews from './pages/ProductReviews'
import SubmitFeedback from './pages/dashboard/SubmitFeedback'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import OpportunityManagement from './pages/admin/OpportunityManagement'
import ProductInsights from './pages/admin/ProductInsights'
import SuperUserLogin from './pages/super-admin/SuperUserLogin'
import SuperUserDashboard from './pages/super-admin/SuperUserDashboard'
import AdminManagement from './pages/super-admin/AdminManagement'
import AdminActions from './pages/super-admin/AdminActions'
import CreateAdmin from './pages/super-admin/CreateAdmin'
import AdminRoute from './components/AdminRoute'
import SuperUserRoute from './components/SuperUserRoute'
import LoadingSpinner from './components/LoadingSpinner'

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/login" />
}

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return !user ? <>{children}</> : <Navigate to="/dashboard" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterSelect /></PublicRoute>} />
            <Route path="/register-select" element={<PublicRoute><RegisterSelect /></PublicRoute>} />
            <Route path="/register/:userType" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Dashboard Router */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />

            {/* Tester Routes */}
            <Route path="/tester/*" element={
              <ProtectedRoute>
                <Routes>
                  <Route path="dashboard" element={<TesterDashboard />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Developer Routes */}
            <Route path="/developer/*" element={
              <ProtectedRoute>
                <Routes>
                  <Route path="dashboard" element={<DeveloperDashboard />} />
                  <Route path="reviews" element={<DeveloperReviews />} />
                  <Route path="products/:productId/insights" element={<ProductInsights />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <AdminRoute>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="opportunities" element={<OpportunityManagement />} />
                  <Route path="products/:productId/insights" element={<ProductInsights />} />
                  <Route path="login" element={<AdminLogin />} />
                </Routes>
              </AdminRoute>
            } />

            {/* Super User Routes */}
            <Route path="/super-admin/*" element={
              <SuperUserRoute>
                <Routes>
                  <Route path="dashboard" element={<SuperUserDashboard />} />
                  <Route path="admins" element={<AdminManagement />} />
                  <Route path="admins/create" element={<CreateAdmin />} />
                  <Route path="create-admin" element={<CreateAdmin />} />
                  <Route path="actions" element={<AdminActions />} />
                  <Route path="admin-actions" element={<AdminActions />} />
                  <Route path="login" element={<SuperUserLogin />} />
                </Routes>
              </SuperUserRoute>
            } />

            {/* Common Protected Routes */}
            <Route path="/submit-product" element={<ProtectedRoute><SubmitProduct /></ProtectedRoute>} />
            <Route path="/submit-feedback/:productId" element={<ProtectedRoute><SubmitFeedback /></ProtectedRoute>} />
            <Route path="/fallback-dashboard" element={<ProtectedRoute><FallbackDashboard /></ProtectedRoute>} />

            {/* Public product reviews */}
            <Route path="/product-reviews/:productId" element={<ProductReviews />} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
