import type { AdminDashboardData } from '../types/admin';

export const adminMock: AdminDashboardData = {
  statistics: {
    totalCrimes: 1523,

    crimesByType: {
      Hurto: 820,
      Robo: 450,
      Homicidio: 120,
      Fraude: 133,
    },

    crimesByLocation: {
      Usaquén: 320,
      Chapinero: 280,
      Suba: 250,
      Kennedy: 220,
      Fontibón: 180,
      Bosa: 273,
    },

    crimesTrend: [
      {
        date: '2026-01-01',
        count: 120,
      },
      {
        date: '2026-02-01',
        count: 145,
      },
      {
        date: '2026-03-01',
        count: 178,
      },
      {
        date: '2026-04-01',
        count: 190,
      },
      {
        date: '2026-05-01',
        count: 210,
      },
      {
        date: '2026-06-01',
        count: 235,
      },
    ],
  },

  userManagement: {
    totalUsers: 120,

    activeUsers: 95,

    inactiveUsers: 25,

    recentUsers: [
      {
        id: '1',
        email: 'juan.perez@criminalistica.com',
        name: 'Juan Pérez',
        role: 'admin',
        createdAt: '2026-05-01T08:00:00Z',
        lastLogin: '2026-06-04T10:00:00Z',
        isActive: true,
      },

      {
        id: '2',
        email: 'maria.lopez@criminalistica.com',
        name: 'María López',
        role: 'moderator',
        createdAt: '2026-05-12T08:00:00Z',
        lastLogin: '2026-06-04T09:00:00Z',
        isActive: true,
      },

      {
        id: '3',
        email: 'carlos.ramirez@criminalistica.com',
        name: 'Carlos Ramírez',
        role: 'admin',
        createdAt: '2026-05-15T08:00:00Z',
        lastLogin: '2026-06-03T17:00:00Z',
        isActive: false,
      },
    ],
  },

  systemHealth: {
    status: 'healthy',

    uptime: 99.9,

    dbStatus: 'connected',
  },
};