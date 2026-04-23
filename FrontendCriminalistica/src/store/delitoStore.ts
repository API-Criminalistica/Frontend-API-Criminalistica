import { create } from 'zustand';
import type { Delito } from '../types';
import { delitoService } from '../services/api';

interface DelitoStore {
  delitos: Delito[];
  loading: boolean;
  error: string | null;
  fetchDelitos: () => Promise<void>;
  addDelito: (delito: Omit<Delito, 'id'>) => Promise<void>;
  deleteDelito: (id: number) => Promise<void>;
}

export const useDelitoStore = create<DelitoStore>((set) => ({
  delitos: [],
  loading: false,
  error: null,

  fetchDelitos: async () => {
    set({ loading: true });
    try {
      const { data } = await delitoService.getAll();
      set({ delitos: data, error: null });
    } catch (error) {
      set({ error: 'Error al cargar delitos' });
    } finally {
      set({ loading: false });
    }
  },

  addDelito: async (delito) => {
    try {
      const { data } = await delitoService.create(delito);
      set((state) => ({
        delitos: [...state.delitos, data],
      }));
    } catch (error) {
      set({ error: 'Error al crear delito' });
    }
  },

  deleteDelito: async (id) => {
    try {
      await delitoService.delete(id);
      set((state) => ({
        delitos: state.delitos.filter((d) => d.id !== id),
      }));
    } catch (error) {
      set({ error: 'Error al eliminar delito' });
    }
  },
}));