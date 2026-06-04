import axios from 'axios';
import type {
  AdminDashboardData,
  AdminUser,
  CrimeStatistics,
  SystemSettings,
  AdminAction,
} from '../types/admin';

import { adminMock } from '../mocks/adminMock';
import { usuariosMock } from '../mocks/usuariosMock';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5107/api';

const USE_MOCKS =
  import.meta.env.VITE_USE_MOCKS === 'true';


console.log('VITE_USE_MOCKS =', import.meta.env.VITE_USE_MOCKS);
console.log('USE_MOCKS =', USE_MOCKS);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const adminService = {
  // ===========================
  // DASHBOARD
  // ===========================

  getDashboardData: async (): Promise<AdminDashboardData> => {
    if (USE_MOCKS) {
      await delay(800);
      return adminMock as unknown as AdminDashboardData;
    }

    const response = await apiClient.get('/admin/dashboard');

    return response.data;
  },

  // ===========================
  // ESTADÍSTICAS
  // ===========================

  getCrimeStatistics: async (
    startDate?: string,
    endDate?: string
  ): Promise<CrimeStatistics> => {
    if (USE_MOCKS) {
      await delay();

      return adminMock.statistics as unknown as CrimeStatistics;
    }

    const response = await apiClient.get(
      '/admin/statistics/crimes',
      {
        params: {
          startDate,
          endDate,
        },
      }
    );

    return response.data;
  },

  // ===========================
  // USUARIOS
  // ===========================

  getAllUsers: async (
    page = 1,
    limit = 10
  ): Promise<{
    users: AdminUser[];
    total: number;
  }> => {
    if (USE_MOCKS) {
      await delay();

      return {
        users: usuariosMock as AdminUser[],
        total: usuariosMock.length,
      };
    }

    const response = await apiClient.get(
      '/admin/users',
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  },

  getUserById: async (
    userId: string
  ): Promise<AdminUser> => {
    if (USE_MOCKS) {
      await delay();

      const user = usuariosMock.find(
        (u) => u.id === userId
      );

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user as AdminUser;
    }

    const response = await apiClient.get(
      `/admin/users/${userId}`
    );

    return response.data;
  },

  updateUser: async (
    userId: string,
    userData: Partial<AdminUser>
  ): Promise<AdminUser> => {
    if (USE_MOCKS) {
      await delay();

      const user = usuariosMock.find(
        (u) => u.id === userId
      );

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return {
        ...user,
        ...userData,
      } as AdminUser;
    }

    const response = await apiClient.put(
      `/admin/users/${userId}`,
      userData
    );

    return response.data;
  },

  deleteUser: async (
    userId: string
  ): Promise<void> => {
    if (USE_MOCKS) {
      await delay();
      return;
    }

    await apiClient.delete(
      `/admin/users/${userId}`
    );
  },

  disableUser: async (
    userId: string
  ): Promise<AdminUser> => {
    if (USE_MOCKS) {
      await delay();

      const user = usuariosMock.find(
        (u) => u.id === userId
      );

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return {
        ...user,
        isActive: false,
      } as AdminUser;
    }

    const response = await apiClient.patch(
      `/admin/users/${userId}/disable`,
      {}
    );

    return response.data;
  },

  enableUser: async (
    userId: string
  ): Promise<AdminUser> => {
    if (USE_MOCKS) {
      await delay();

      const user = usuariosMock.find(
        (u) => u.id === userId
      );

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return {
        ...user,
        isActive: true,
      } as AdminUser;
    }

    const response = await apiClient.patch(
      `/admin/users/${userId}/enable`,
      {}
    );

    return response.data;
  },

  // ===========================
  // CONFIGURACIÓN
  // ===========================

  getSystemSettings: async (): Promise<SystemSettings> => {
    if (USE_MOCKS) {
      await delay();

      return {
        appName: 'API Criminalística',
        maintenanceMode: false,
        maxUploadSize: 10,
        notificationsEnabled: true,
        emailNotifications: true,
        logLevel: 'info',
      };
    }

    const response = await apiClient.get(
      '/admin/settings'
    );

    return response.data;
  },

  updateSystemSettings: async (
    settings: Partial<SystemSettings>
  ): Promise<SystemSettings> => {
    if (USE_MOCKS) {
      await delay();

      return {
        appName: 'API Criminalística',
        maintenanceMode: false,
        maxUploadSize: 10,
        notificationsEnabled: true,
        emailNotifications: true,
        logLevel: 'info',
        ...settings,
      };
    }

    const response = await apiClient.put(
      '/admin/settings',
      settings
    );

    return response.data;
  },

  // ===========================
  // AUDITORÍA
  // ===========================

  getAdminActions: async (
    page = 1,
    limit = 10
  ): Promise<{
    actions: AdminAction[];
    total: number;
  }> => {
    if (USE_MOCKS) {
      await delay();

      return {
        actions: [],
        total: 0,
      };
    }

    const response = await apiClient.get(
      '/admin/audit-logs',
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  },

  // ===========================
  // MANTENIMIENTO
  // ===========================

  triggerDatabaseBackup: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    if (USE_MOCKS) {
      await delay();

      return {
        success: true,
        message: 'Backup generado correctamente',
      };
    }

    const response = await apiClient.post(
      '/admin/maintenance/backup',
      {}
    );

    return response.data;
  },

  checkSystemHealth: async (): Promise<{
    status: string;
    details: Record<string, unknown>;
  }> => {
    if (USE_MOCKS) {
      return {
        status: adminMock.systemHealth.status,
        details: {
          uptime: adminMock.systemHealth.uptime,
          dbStatus: adminMock.systemHealth.dbStatus,
        },
      };
    }

    const response = await apiClient.get(
      '/admin/system-health'
    );

    return response.data;
  },

  // ===========================
  // CRÍMENES
  // ===========================

  getAllCrimes: async (
    page = 1,
    limit = 10
  ): Promise<{
    crimes: unknown[];
    total: number;
  }> => {
    if (USE_MOCKS) {
      await delay();

      return {
        crimes: [],
        total: 0,
      };
    }

    const response = await apiClient.get(
      '/admin/crimes',
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  },

  deleteCrime: async (
    crimeId: string
  ): Promise<void> => {
    if (USE_MOCKS) {
      await delay();
      return;
    }

    await apiClient.delete(
      `/admin/crimes/${crimeId}`
    );
  },

  approveCrime: async (
    crimeId: string
  ): Promise<unknown> => {
    if (USE_MOCKS) {
      await delay();

      return {
        success: true,
      };
    }

    const response = await apiClient.patch(
      `/admin/crimes/${crimeId}/approve`,
      {}
    );

    return response.data;
  },

  rejectCrime: async (
    crimeId: string,
    reason: string
  ): Promise<unknown> => {
    if (USE_MOCKS) {
      await delay();

      return {
        success: true,
        reason,
      };
    }

    const response = await apiClient.patch(
      `/admin/crimes/${crimeId}/reject`,
      { reason }
    );

    return response.data;
  },
};

export default adminService;