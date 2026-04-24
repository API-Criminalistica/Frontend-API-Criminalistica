import type { Delito } from '../../types';
import { MapPin, Calendar, Badge } from 'lucide-react';

interface DelitosListProps {
  delitos: Delito[];
  loading: boolean;
}

export const DelitosList: React.FC<DelitosListProps> = ({ delitos, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Delitos Recientes</h3>
      </div>

      <div className="overflow-y-auto max-h-96">
        {delitos.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay delitos registrados
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {delitos.slice(0, 10).map((delito) => (
              <div
                key={delito.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {delito.nombre}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {delito.descripcion || 'Sin descripción'}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Badge className="w-4 h-4" />
                        {delito.tipoDelito.nombre}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {delito.ubicacion.localidad.nombre}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(delito.fecha).toLocaleDateString('es-CO')}
                      </div>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    delito.idEstado === 1
                      ? 'bg-yellow-100 text-yellow-800'
                      : delito.idEstado === 2
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {delito.idEstado === 1
                      ? 'Abierto'
                      : delito.idEstado === 2
                      ? 'En Investigación'
                      : 'Cerrado'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DelitosList;