export const API_BASE_URL = 'https://longwei-herbs-platform-production.up.railway.app';

export const apiClient = {
  get: async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }
    return response.json();
  },

  post: async <T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> => {
    const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
    const response = await fetch(url, {
      method: 'POST',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }
    return response.json();
  },

  put: async <T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> => {
    const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
    const response = await fetch(url, {
      method: 'PUT',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }
    return response.json();
  },

  delete: async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
    const response = await fetch(url, {
      method: 'DELETE',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }
    return response.json();
  },
};
