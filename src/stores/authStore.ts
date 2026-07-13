import { create } from 'zustand';
import { User, LoginForm, RegisterForm } from '@/types';
import { apiClient } from '@/api';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (credentials: LoginForm) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  
  login: async (credentials) => {
    try {
      const data = await apiClient.post('/api/auth/login', credentials);
      localStorage.setItem('token', data.token);
      set({ 
        user: data.user, 
        token: data.token, 
        isLoggedIn: true 
      });
    } catch (error) {
      throw error;
    }
  },
  
  register: async (data) => {
    try {
      const result = await apiClient.post('/api/auth/register', data);
      localStorage.setItem('token', result.token);
      set({ 
        user: result.user, 
        token: result.token, 
        isLoggedIn: true 
      });
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isLoggedIn: false });
  },
  
  loadUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      const user = await apiClient.get('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      set({ user, isLoggedIn: true });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isLoggedIn: false });
    }
  },
}));
