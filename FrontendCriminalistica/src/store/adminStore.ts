import { create } from 'zustand';
import type { AdminDashboardData, AdminUser, SystemSettings } from '../types/admin';

interface AdminState {
  // Estado
  dashboardData: AdminDashboardData | null;
  systemSettings: SystemSettings | null;
  adminUsers: AdminUser[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  currentAdmin: AdminUser | null;

  // Acciones
  setDashboardData: (data: AdminDashboardData) => void;
  setSystemSettings: (settings: SystemSettings) => void;
  setAdminUsers: (users: AdminUser[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAuthenticated: (authenticated: boolean, user?: AdminUser) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  // Estado inicial
  dashboardData: null,
  systemSettings: null,
  adminUsers: [],
  loading: false,
  error: null,
  isAuthenticated: false,
  currentAdmin: null,

  // Acciones
  setDashboardData: (data) => set({ dashboardData: data }),
  
  setSystemSettings: (settings) => set({ systemSettings: settings }),
  
  setAdminUsers: (users) => set({ adminUsers: users }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  setAuthenticated: (authenticated, user) =>
    set({
      isAuthenticated: authenticated,
      currentAdmin: user || null,
    }),
  
  logout: () =>
    set({
      isAuthenticated: false,
      currentAdmin: null,
      dashboardData: null,
      systemSettings: null,
      adminUsers: [],
    }),
  
  clearError: () => set({ error: null }),
}));
