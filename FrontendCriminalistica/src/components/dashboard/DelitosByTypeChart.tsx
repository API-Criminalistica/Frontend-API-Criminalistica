import  { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Delito } from '../../types';

interface DelitosByTypeChartProps {
  delitos: Delito[];
}

export const DelitosByTypeChart: React.FC<DelitosByTypeChartProps> = ({
  delitos,
}) => {
  const data = useMemo(() => {
    const groupedByType: { [key: string]: number } = {};

    delitos.forEach((delito) => {
      const tipo = delito.tipoDelito.nombre;
      groupedByType[tipo] = (groupedByType[tipo] || 0) + 1;
    });

    return Object.entries(groupedByType)
      .map(([tipo, count]) => ({
        tipo,
        cantidad: count,
      }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }, [delitos]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Delitos por Tipo
      </h3>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No hay datos disponibles
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="tipo" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="cantidad" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DelitosByTypeChart;