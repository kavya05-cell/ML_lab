import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface FeatureImportanceProps {
  data: { feature: string; importance: number }[];
}

export function FeatureImportance({ data }: FeatureImportanceProps) {
  const chartData = data.length > 0 
    ? data 
    : [
        { feature: 'Feature 1', importance: 0.25 },
        { feature: 'Feature 2', importance: 0.20 },
        { feature: 'Feature 3', importance: 0.18 },
        { feature: 'Feature 4', importance: 0.15 },
      ];

  const colors = ['#f59e0b', '#8b5cf6', '#10b981', '#3b82f6'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-slate-400 mb-1">{payload[0].payload.feature}</p>
          <p className="text-sm font-semibold text-amber-400">
            Importance: {(payload[0].value * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Feature Importance</h3>
          <p className="text-xs text-slate-400">
            {data.length > 0 ? 'Most impactful features' : 'Available for Random Forest'}
          </p>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis 
              type="number" 
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <YAxis 
              type="category" 
              dataKey="feature" 
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill={colors[index % colors.length]} opacity={data.length > 0 ? 0.9 : 0.3} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {data.length === 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800/50">
          <p className="text-xs text-slate-500 text-center italic">
            Select Random Forest model to view feature importance
          </p>
        </div>
      )}
    </div>
  );
}