import axios from 'axios';
import type {
  AdminDashboardData,
  AdminUser,
  CrimeStatistics,
  SystemSettings,
  AdminAction,
} from '../types/admin';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminService = {
  // Dashboard
  getDashboardData: async (): Promise<AdminDashboardData> => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },

  // Estadísticas de crímenes
  getCrimeStatistics: async (startDate?: string, endDate?: string): Promise<CrimeStatistics> => {
    const response = await apiClient.get('/admin/statistics/crimes', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  // Gestión de usuarios
  getAllUsers: async (page = 1, limit = 10): Promise<{ users: AdminUser[]; total: number }> => {
    const response = await apiClient.get('/admin/users', {
      params: { page, limit },
    });
    return response.data;
  },

  getUserById: async (userId: string): Promise<AdminUser> => {
    const response = await apiClient.get(`/admin/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId: string, userData: Partial<AdminUser>): Promise<AdminUser> => {
    const response = await apiClient.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await apiClient.delete(`/admin/users/${userId}`);
  },

  disableUser: async (userId: string): Promise<AdminUser> => {
    const response = await apiClient.patch(`/admin/users/${userId}/disable`, {});
    return response.data;
  },

  enableUser: async (userId: string): Promise<AdminUser> => {
    const response = await apiClient.patch(`/admin/users/${userId}/enable`, {});
    return response.data;
  },

  // Configuraciones del sistema
  getSystemSettings: async (): Promise<SystemSettings> => {
    const response = await apiClient.get('/admin/settings');
    return response.data;
  },

  updateSystemSettings: async (settings: Partial<SystemSettings>): Promise<SystemSettings> => {
    const response = await apiClient.put('/admin/settings', settings);
    return response.data;
  },

  // Auditoría y logs
  getAdminActions: async (page = 1, limit = 10): Promise<{ actions: AdminAction[]; total: number }> => {
    const response = await apiClient.get('/admin/audit-logs', {
      params: { page, limit },
    });
    return response.data;
  },

  // Mantenimiento
  triggerDatabaseBackup: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post('/admin/maintenance/backup', {});
    return response.data;
  },

  checkSystemHealth: async (): Promise<{ status: string; details: Record<string, unknown> }> => {
    const response = await apiClient.get('/admin/system-health');
    return response.data;
  },

  // Crímenes
  getAllCrimes: async (page = 1, limit = 10): Promise<{ crimes: unknown[]; total: number }> => {
    const response = await apiClient.get('/admin/crimes', {
      params: { page, limit },
    });
    return response.data;
  },

  deleteCrime: async (crimeId: string): Promise<void> => {
    await apiClient.delete(`/admin/crimes/${crimeId}`);
  },

  approveCrime: async (crimeId: string): Promise<unknown> => {
    const response = await apiClient.patch(`/admin/crimes/${crimeId}/approve`, {});
    return response.data;
  },

  rejectCrime: async (crimeId: string, reason: string): Promise<unknown> => {
    const response = await apiClient.patch(`/admin/crimes/${crimeId}/reject`, { reason });
    return response.data;
  },
};

export default adminService;
