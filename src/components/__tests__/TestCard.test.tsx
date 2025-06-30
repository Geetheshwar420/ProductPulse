import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TestCard from '../TestCard'

// Local Product type definition for testing
interface Product {
  id: string
  name: string
  description: string
  company_name: string
  image_url?: string
  guidelines?: string
  status: string
  created_at: string
  updated_at: string
}

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product description',
  company_name: 'Test Company',
  image_url: 'https://example.com/image.jpg',
  guidelines: 'Please test this product carefully',
  status: 'active',
  created_at: '2023-01-01',
  updated_at: '2023-01-01'
}

const renderTestCard = (props = {}) => {
  const defaultProps = {
    product: mockProduct,
    onApply: vi.fn(),
    showApplyButton: true,
    applied: false,
    ...props
  }

  return render(
    <BrowserRouter>
      <TestCard {...defaultProps} />
    </BrowserRouter>
  )
}

describe('TestCard', () => {
  it('renders product information correctly', () => {
    renderTestCard()
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('by Test Company')).toBeInTheDocument()
    expect(screen.getByText('This is a test product description')).toBeInTheDocument()
  })

  it('displays product image when provided', () => {
    renderTestCard()
    
    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('shows testing guidelines when provided', () => {
    renderTestCard()
    
    expect(screen.getByText('Testing Guidelines:')).toBeInTheDocument()
    expect(screen.getByText('Please test this product carefully')).toBeInTheDocument()
  })

  it('calls onApply when apply button is clicked', () => {
    const mockOnApply = vi.fn()
    renderTestCard({ onApply: mockOnApply })
    
    const applyButton = screen.getByText('Apply to Test')
    fireEvent.click(applyButton)
    
    expect(mockOnApply).toHaveBeenCalledWith('1')
  })

  it('shows "Applied" button when already applied', () => {
    renderTestCard({ applied: true })
    
    const appliedButton = screen.getByText('Applied')
    expect(appliedButton).toBeInTheDocument()
    expect(appliedButton).toBeDisabled()
  })

  it('hides apply button when showApplyButton is false', () => {
    renderTestCard({ showApplyButton: false })
    
    expect(screen.queryByText('Apply to Test')).not.toBeInTheDocument()
  })

  it('renders View Reviews link', () => {
    renderTestCard()
    
    const reviewsLink = screen.getByText('View Reviews')
    expect(reviewsLink).toBeInTheDocument()
    expect(reviewsLink.closest('a')).toHaveAttribute('href', '/product-reviews/1')
  })
})
