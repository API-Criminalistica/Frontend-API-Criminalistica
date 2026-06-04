import type { AdminUser } from '../types/admin';

export const usuariosMock: AdminUser[] = [
  {
    id: '1',
    email: 'juan@apicriminalistica.com',
    name: 'Juan Pérez',
    role: 'super_admin',
    createdAt: '2026-01-10T08:00:00Z',
    lastLogin: '2026-06-01T08:15:00Z',
    isActive: true,
  },

  {
    id: '2',
    email: 'maria@apicriminalistica.com',
    name: 'María López',
    role: 'admin',
    createdAt: '2026-02-15T09:00:00Z',
    lastLogin: '2026-06-01T09:20:00Z',
    isActive: true,
  },

  {
    id: '3',
    email: 'carlos@apicriminalistica.com',
    name: 'Carlos Ramírez',
    role: 'moderator',
    createdAt: '2026-03-01T10:00:00Z',
    lastLogin: '2026-05-28T17:00:00Z',
    isActive: false,
  },

  {
    id: '4',
    email: 'ana@apicriminalistica.com',
    name: 'Ana Gómez',
    role: 'admin',
    createdAt: '2026-03-22T11:00:00Z',
    lastLogin: '2026-06-01T11:45:00Z',
    isActive: true,
  },

  {
    id: '5',
    email: 'david@apicriminalistica.com',
    name: 'David Torres',
    role: 'super_admin',
    createdAt: '2026-04-05T12:00:00Z',
    lastLogin: '2026-06-01T12:30:00Z',
    isActive: true,
  },
];