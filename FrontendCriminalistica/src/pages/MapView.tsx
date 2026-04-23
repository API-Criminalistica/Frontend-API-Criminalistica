import { useEffect } from 'react';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useDelitoStore } from '../store/delitoStore';

export const MapView = () => {
  const { delitos, loading, fetchDelitos } = useDelitoStore();

  useEffect(() => {
    fetchDelitos();
  }, []);

  if (loading) return <div className="text-center py-10">Cargando delitos...</div>;

  return (
    <div className="w-full h-screen">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Mapa de Delitos</h2>
        <p className="text-sm text-gray-600">{delitos.length} delitos reportados</p>
      </div>
      <InteractiveMap delitos={delitos} />
    </div>
  );
};

export default MapView;