import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import type { Delito } from '../../types';

interface DelitosByLocalityChartProps {
  delitos: Delito[];
}

const COLORS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#f97316',
];

export const DelitosByLocalityChart: React.FC<
  DelitosByLocalityChartProps
> = ({ delitos }) => {
  const data = useMemo(() => {
    const groupedByLocality: { [key: string]: number } = {};

    delitos.forEach((delito) => {
      const localidad = delito.ubicacion.localidad.nombre;
      groupedByLocality[localidad] = (groupedByLocality[localidad] || 0) + 1;
    });

    return Object.entries(groupedByLocality)
      .map(([localidad, value], index) => ({
        name: localidad,
        value,
        color: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 localidades
  }, [delitos]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Delitos por Localidad
      </h3>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No hay datos disponibles
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DelitosByLocalityChart;