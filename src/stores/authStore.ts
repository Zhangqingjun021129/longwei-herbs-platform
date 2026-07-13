import { create } from 'zustand';
import { User, LoginForm, RegisterForm } from '@/types';

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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '登录失败');
      }
      
      const data = await response.json();
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '注册失败');
      }
      
      const result = await response.json();
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
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (response.ok) {
        const user = await response.json();
        set({ user, isLoggedIn: true });
      }
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isLoggedIn: false });
    }
  },
}));