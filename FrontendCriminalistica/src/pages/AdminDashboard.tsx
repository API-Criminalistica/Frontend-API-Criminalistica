import { useEffect, useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import adminService from '../services/adminService';

export function AdminDashboard() {
  const { dashboardData, loading, error, setLoading, setError, setDashboardData } = useAdminStore();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.getDashboardData();
        setDashboardData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar datos del dashboard';
        setError(errorMessage);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [retryCount, setLoading, setError, setDashboardData]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard de administración...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Bienvenido al centro de control de API-Criminalística</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Crímenes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total de Crímenes</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {dashboardData?.statistics.totalCrimes || 0}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Usuarios Activos */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {dashboardData?.userManagement.activeUsers || 0}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total de Usuarios */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total de Usuarios</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {dashboardData?.userManagement.totalUsers || 0}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Estado del Sistema */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Estado del Sistema</p>
                <p className={`text-2xl font-bold mt-2 ${
                  dashboardData?.systemHealth.status === 'healthy' ? 'text-green-600' :
                  dashboardData?.systemHealth.status === 'warning' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {dashboardData?.systemHealth.status === 'healthy' ? 'Óptimo' :
                   dashboardData?.systemHealth.status === 'warning' ? 'Alerta' :
                   'Crítico'}
                </p>
              </div>
              <div className={`rounded-full p-3 ${
                dashboardData?.systemHealth.status === 'healthy' ? 'bg-green-100' :
                dashboardData?.systemHealth.status === 'warning' ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                <svg className={`w-6 h-6 ${
                  dashboardData?.systemHealth.status === 'healthy' ? 'text-green-600' :
                  dashboardData?.systemHealth.status === 'warning' ? 'text-yellow-600' :
                  'text-red-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Secciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Crímenes por Tipo */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Crímenes por Tipo</h2>
            <div className="space-y-3">
              {dashboardData?.statistics.crimesByType && 
                Object.entries(dashboardData.statistics.crimesByType).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-gray-600">{type}</span>
                    <span className="font-semibold text-gray-900">{count}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                Gestionar Usuarios
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
                Ver Crímenes
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition">
                Configuración
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition">
                Logs de Auditoría
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
