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
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl">
  <div className="absolute inset-0 opacity-10">
    <div className="w-full h-full bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
  </div>

  <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

      <div>
        <span className="uppercase tracking-[0.3em] text-blue-300 text-xs font-semibold">
          Sistema Nacional de Criminalística
        </span>

        <h1 className="text-4xl font-black mt-2">
          Centro de Monitoreo Criminal
        </h1>

        <p className="text-slate-300 mt-3 max-w-2xl">
          Plataforma de análisis geoespacial y monitoreo de delitos para la
          toma de decisiones estratégicas.
        </p>
      </div>

      <Link
        to="/mapa"
        className="
          flex items-center gap-3
          bg-blue-600
          hover:bg-blue-500
          px-6 py-3
          rounded-xl
          font-semibold
          transition-all
          hover:scale-105
          shadow-lg
        "
      >
        <Map className="w-5 h-5" />
        Abrir Centro Geoespacial
      </Link>

    </div>
  </div>
</header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* KPI Ejecutivo */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
    <p className="text-gray-500 text-sm">
      Localidad crítica
    </p>

    <h3 className="text-xl font-bold mt-2">
      {stats.localidadConMasDelitos}
    </h3>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
    <p className="text-gray-500 text-sm">
      Delito predominante
    </p>

    <h3 className="text-xl font-bold mt-2">
      {stats.tipoDelitoMasComun}
    </h3>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
    <p className="text-gray-500 text-sm">
      Tasa de resolución
    </p>

    <h3 className="text-xl font-bold mt-2 text-green-600">
      {stats.totalDelitos > 0
        ? (
            (stats.delitosPorEstado.cerrados /
              stats.totalDelitos) *
            100
          ).toFixed(1)
        : 0}
      %
    </h3>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
    <p className="text-gray-500 text-sm">
      Registros totales
    </p>

    <h3 className="text-xl font-bold mt-2 text-blue-600">
      {stats.totalDelitos}
    </h3>
  </div>

</div>
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
            description="Delitos registrados"
          />

          <StatCard
            title="Delitos Abiertos"
            value={stats.delitosPorEstado.abiertos}
            icon={Activity}
            description="Sin resolver"
          />

          <StatCard
            title="En Investigación"
            value={stats.delitosPorEstado.investigacion}
            icon={BarChart3}
            description="Bajo análisis"
          />

          <StatCard
            title="Cerrados"
            value={stats.delitosPorEstado.cerrados}
            icon={TrendingUp}
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