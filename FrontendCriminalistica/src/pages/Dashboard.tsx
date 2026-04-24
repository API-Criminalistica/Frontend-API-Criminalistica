import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  MapPin,
  TrendingUp,
  BarChart3,
  Map,
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { DelitosList } from '../components/dashboard/DelitosList';
import { DelitosByTypeChart } from '../components/dashboard/DelitosByTypeChart';
import { DelitosByLocalityChart } from '../components/dashboard/DelitosByLocalityChart';
import { DelitosByDateChart } from '../components/dashboard/DelitosByDateChart';
import { useDelitoStore } from '../store/delitoStore';

export const Dashboard: React.FC = () => {
  const { delitos, loading, fetchDelitos } = useDelitoStore();

  useEffect(() => {
    fetchDelitos();
  }, [fetchDelitos]);

  // Cálculos de estadísticas
  const stats = useMemo(() => {
    if (delitos.length === 0) {
      return {
        totalDelitos: 0,
        delitosPorEstado: { abiertos: 0, investigacion: 0, cerrados: 0 },
        localidadConMasDelitos: 'N/A',
        tipoDelitoMasComun: 'N/A',
        trendDelitos: 0,
        trendPorLocalidad: 0,
      };
    }

    // Total de delitos
    const totalDelitos = delitos.length;

    // Delitos por estado
    const delitosPorEstado = {
      abiertos: delitos.filter((d) => d.idEstado === 1).length,
      investigacion: delitos.filter((d) => d.idEstado === 2).length,
      cerrados: delitos.filter((d) => d.idEstado === 3).length,
    };

    // Localidad con más delitos
    const localidades: { [key: string]: number } = {};
    delitos.forEach((d) => {
      localidades[d.ubicacion.localidad.nombre] =
        (localidades[d.ubicacion.localidad.nombre] || 0) + 1;
    });
    const localidadConMasDelitos = Object.entries(localidades).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || 'N/A';

    // Tipo de delito más común
    const tipos: { [key: string]: number } = {};
    delitos.forEach((d) => {
      tipos[d.tipoDelito.nombre] = (tipos[d.tipoDelito.nombre] || 0) + 1;
    });
    const tipoDelitoMasComun = Object.entries(tipos).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    // Tendencias (simuladas - en producción vienen del backend)
    const trendDelitos = Math.floor(Math.random() * 20) - 10; // -10 a +10%
    const trendPorLocalidad = Math.floor(Math.random() * 15) - 7; // -7 a +15%

    return {
      totalDelitos,
      delitosPorEstado,
      localidadConMasDelitos,
      tipoDelitoMasComun,
      trendDelitos,
      trendPorLocalidad,
    };
  }, [delitos]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sistema de Criminalística
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Dashboard de monitoreo de delitos en Bogotá
            </p>
          </div>

          <Link
            to="/mapa"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Map className="w-5 h-5" />
            Ver Mapa
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Delitos"
            value={stats.totalDelitos}
            icon={AlertTriangle}
            trend={{
              value: Math.abs(stats.trendDelitos),
              isPositive: stats.trendDelitos > 0,
            }}
            bgColor="bg-red-50"
            description="Delitos registrados"
          />

          <StatCard
            title="Delitos Abiertos"
            value={stats.delitosPorEstado.abiertos}
            icon={Activity}
            bgColor="bg-yellow-50"
            description="Sin resolver"
          />

          <StatCard
            title="En Investigación"
            value={stats.delitosPorEstado.investigacion}
            icon={BarChart3}
            bgColor="bg-blue-50"
            description="Bajo análisis"
          />

          <StatCard
            title="Cerrados"
            value={stats.delitosPorEstado.cerrados}
            icon={TrendingUp}
            bgColor="bg-green-50"
            description="Resueltos"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Información Clave
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">
                  Localidad con más delitos:
                </span>
                <span className="text-gray-900 font-bold">
                  {stats.localidadConMasDelitos}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">
                  Tipo de delito más común:
                </span>
                <span className="text-gray-900 font-bold">
                  {stats.tipoDelitoMasComun}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Tasa de resolución:
                </span>
                <span className="text-gray-900 font-bold">
                  {stats.totalDelitos > 0
                    ? (
                        (stats.delitosPorEstado.cerrados /
                          stats.totalDelitos) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Resumen por Localidad
            </h3>
            <div className="space-y-3">
              {Object.entries(
                delitos.reduce(
                  (acc, d) => {
                    const localidad = d.ubicacion.localidad.nombre;
                    acc[localidad] = (acc[localidad] || 0) + 1;
                    return acc;
                  },
                  {} as { [key: string]: number }
                )
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([localidad, count]) => (
                  <div
                    key={localidad}
                    className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{localidad}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DelitosByTypeChart delitos={delitos} />
          <DelitosByLocalityChart delitos={delitos} />
        </div>

        {/* Timeline Chart */}
        <div className="mb-8">
          <DelitosByDateChart delitos={delitos} />
        </div>

        {/* Recent Delitos Table */}
        <div>
          <DelitosList delitos={delitos} loading={loading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
          <p>© 2026 Sistema de Criminalística. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;