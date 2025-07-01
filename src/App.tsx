import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterSelect from './pages/RegisterSelect'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/dashboard/Dashboard'
import SubmitProduct from './pages/SubmitProduct'
import ProductReviews from './pages/ProductReviews'
import SubmitFeedback from './pages/dashboard/SubmitFeedback'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import AdminRoute from './components/AdminRoute'
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
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterSelect />
                </PublicRoute>
              }
            />
            <Route
              path="/register-select"
              element={
                <PublicRoute>
                  <RegisterSelect />
                </PublicRoute>
              }
            />
            <Route
              path="/register/:userType"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit-product"
              element={
                <ProtectedRoute>
                  <SubmitProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit-feedback/:productId"
              element={
                <ProtectedRoute>
                  <SubmitFeedback />
                </ProtectedRoute>
              }
            />

            {/* Public product reviews */}
            <Route path="/product-reviews/:productId" element={<ProductReviews />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
