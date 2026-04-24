import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Delito } from '../../types';

interface DelitosByDateChartProps {
  delitos: Delito[];
}

export const DelitosByDateChart: React.FC<DelitosByDateChartProps> = ({
  delitos,
}) => {
  const data = useMemo(() => {
    const groupedByDate: { [key: string]: number } = {};

    delitos.forEach((delito) => {
      const date = new Date(delito.fecha).toLocaleDateString('es-CO');
      groupedByDate[date] = (groupedByDate[date] || 0) + 1;
    });

    return Object.entries(groupedByDate)
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .slice(-30) // Últimos 30 días
      .map(([fecha, cantidad]) => ({
        fecha,
        cantidad,
      }));
  }, [delitos]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Delitos por Fecha (Últimos 30 días)
      </h3>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No hay datos disponibles
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="cantidad"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DelitosByDateChart;