const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('productpulse_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  async get(endpoint: string, options?: { params?: Record<string, string> }) {
    let url = `${API_URL}${endpoint}`;
    if (options?.params) {
      const searchParams = new URLSearchParams(options.params);
      url += `?${searchParams.toString()}`;
    }
    const response = await fetch(url, {
      headers: getHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  },

  async post(endpoint: string, body: unknown) {
    const isFormData = body instanceof FormData;
    const headers = getHeaders() as Record<string, string>;
    
    if (isFormData) {
      delete (headers as Record<string, string | undefined>)['Content-Type'];
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: isFormData ? body : JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  },

  async put(endpoint: string, body: unknown) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  },

  async patch(endpoint: string, body: unknown) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  }
};

// Database Helpers Replacement
export const getProducts = () => api.get('/products');
export const getProductById = (id: string) => api.get(`/products/${id}`);
export const submitFeedback = (feedback: unknown) => api.post('/feedback', feedback);
export const getFeedbackByProduct = (productId: string) => api.get(`/feedback/product/${productId}`);
export const getMyOpportunities = () => api.get('/opportunities/me');
export const applyForOpportunity = (productId: string) => api.post('/opportunities/apply', { product_id: productId });
export const getUserProfile = (userId: string) => api.get(`/auth/profile/${userId}`);
