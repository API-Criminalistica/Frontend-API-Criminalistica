// Tipos para el módulo de administración

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface CrimeStatistics {
  totalCrimes: number;
  crimesByType: Record<string, number>;
  crimesByLocation: Record<string, number>;
  crimesTrend: Array<{
    date: string;
    count: number;
  }>;
}

export interface UserManagement {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  recentUsers: AdminUser[];
}

export interface SystemSettings {
  appName: string;
  maintenanceMode: boolean;
  maxUploadSize: number;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export interface AdminDashboardData {
  statistics: CrimeStatistics;
  userManagement: UserManagement;
  systemHealth: {
    status: 'healthy' | 'warning' | 'critical';
    uptime: number;
    dbStatus: 'connected' | 'disconnected';
  };
}

export interface AdminAction {
  id: string;
  action: string;
  adminId: string;
  timestamp: string;
  details: Record<string, unknown>;
}
