import { useEffect } from 'react';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useDelitoStore } from '../store/delitoStore';
import { MapPin } from 'lucide-react';

export const MapView = () => {
  const { delitos, loading, fetchDelitos } = useDelitoStore();

  useEffect(() => {
    fetchDelitos();
  }, [fetchDelitos]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <div
          className="
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            rounded-2xl
            px-6
            py-4
            shadow-lg
          "
        >
          <p className="text-slate-700 font-medium">
            Cargando información geográfica...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">

      {/* Card principal */}
      <div
        className="
          absolute
          top-5
          left-5
          z-[1000]
          bg-white/70
          backdrop-blur-xl
          border
          border-white/50
          rounded-2xl
          px-5
          py-4
          shadow-xl
        "
      >
        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-blue-500/10
              flex
              items-center
              justify-center
            "
          >
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <h2 className="font-semibold text-black">
              Mapa Criminalístico
            </h2>

            <p className="text-sm text-slate-500">
              {delitos.length} incidentes registrados
            </p>
          </div>

        </div>
      </div>

      {/* Indicadores flotantes */}
      <div
        className="
          absolute
          top-5
          right-5
          z-[1000]
          flex
          gap-3
        "
      >
        <div
          className="
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            rounded-full
            px-4
            py-2
            shadow-lg
          "
        >
          <span className="text-sm font-medium text-slate-700">
            {delitos.length} delitos
          </span>
        </div>

        <div
          className="
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            rounded-full
            px-4
            py-2
            shadow-lg
          "
        >
          <span className="text-sm font-medium text-slate-700">
            {
              new Set(
                delitos.map(
                  (d) => d.ubicacion.localidad.nombre
                )
              ).size
            } localidades
          </span>
        </div>
      </div>

      <InteractiveMap delitos={delitos} />
    </div>
  );
};

export default MapView;