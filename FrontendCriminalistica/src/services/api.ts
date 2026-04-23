import axios from 'axios';
import type { Delito } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const delitoService = {
  // Obtener todos los delitos
  getAll: () => apiClient.get<Delito[]>('/delitos'),
  
  // Obtener delito por ID
  getById: (id: number) => apiClient.get<Delito>(`/delitos/${id}`),
  
  // Crear delito
  create: (data: Omit<Delito, 'id'>) => apiClient.post<Delito>('/delitos', data),
  
  // Actualizar delito
  update: (id: number, data: Partial<Delito>) =>
    apiClient.put<Delito>(`/delitos/${id}`, data),
  
  // Eliminar delito
  delete: (id: number) => apiClient.delete(`/delitos/${id}`),
};

export default apiClient;