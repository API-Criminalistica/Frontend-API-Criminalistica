import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
}) => {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-slate-200
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
      "
    >
      {/* Glow decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
              {title}
            </p>
          </div>

          <div
            className="
              flex
              items-center
              justify-center
              w-14
              h-14
              rounded-2xl
              bg-gradient-to-br
              from-blue-600
              to-blue-800
              shadow-lg
            "
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

        </div>

        {/* Valor principal */}
        <div className="mb-3">

          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {value}
          </h2>

          {description && (
            <p className="text-sm text-slate-500 mt-1">
              {description}
            </p>
          )}

        </div>

        {/* Tendencia */}
        {trend && (
          <div
            className={`
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              text-sm
              font-semibold
              ${
                trend.isPositive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }
            `}
          >
            <span>
              {trend.isPositive ? '▲' : '▼'}
            </span>

            <span>
              {Math.abs(trend.value)}%
            </span>

            <span className="opacity-70 font-normal">
              último período
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;