import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { api } from '../../services/api'

const CreateAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      await api.post('/auth/register', {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'admin',
        user_type: 'admin'
      })
      setSuccess('Administrator account created successfully!')
      setTimeout(() => {
        navigate('/super-admin/admins')
      }, 2000)
    } catch (err: any) {
      console.error('Error creating admin:', err)
      setError(err.response?.data?.message || 'Error occurred while creating admin account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold text-gray-900">Create Admin</h1>
          <Link to="/super-admin/admins" className="text-sm text-blue-600 hover:text-blue-800">
            ← Back to Admins
          </Link>
        </div>

        <div className="card">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="input-field mt-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-field mt-1"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Creating...' : 'Create Admin Account'}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateAdmin
