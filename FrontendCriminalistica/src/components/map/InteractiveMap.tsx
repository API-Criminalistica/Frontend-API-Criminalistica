import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Map as LeafletMap, LatLngExpression } from 'leaflet';
import type { Delito } from '../../types';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

// Configurar icono por defecto
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  delitos: Delito[];
  center?: LatLngExpression;
  zoom?: number;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  delitos,
  center = [4.6097, -74.0817],
  zoom = 12,
}) => {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div className="w-full h-screen rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        style={{ minHeight: '500px' }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        {...{
            attribution: '&copy; OpenStreetMap contributors',
        }}
        />

        {delitos.map((delito) => (
          <Marker
            key={delito.id}
            position={[
              delito.ubicacion.latitud,
              delito.ubicacion.longitud,
            ]}
          >
            <Popup>
              <div className="w-64">
                <h3 className="font-bold text-lg mb-2">
                  {delito.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {delito.descripcion}
                </p>
                <div className="text-xs">
                  <p><strong>Tipo:</strong> {delito.tipoDelito.nombre}</p>
                  <p><strong>Localidad:</strong> {delito.ubicacion.localidad.nombre}</p>
                  <p><strong>Barrio:</strong> {delito.ubicacion.barrio.nombre}</p>
                  <p><strong>Fecha:</strong> {new Date(delito.fecha).toLocaleDateString()}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};