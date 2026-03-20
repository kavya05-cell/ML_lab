import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface HyperparameterTuningProps {
  data: { param: string; value: number; accuracy: number }[];
}

export function HyperparameterTuning({ data }: HyperparameterTuningProps) {
  // Group data by parameter
  const paramGroups = data.reduce((acc, item) => {
    if (!acc[item.param]) acc[item.param] = [];
    acc[item.param].push(item);
    return acc;
  }, {} as Record<string, typeof data>);

  // Take first parameter for visualization
  const firstParam = Object.keys(paramGroups)[0];
  const chartData = firstParam 
    ? paramGroups[firstParam].map((item, index) => ({
        index: index + 1,
        value: item.value,
        accuracy: item.accuracy * 100,
      }))
    : [];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-slate-400 mb-1">Value: {payload[0].payload.value.toFixed(2)}</p>
          <p className="text-sm font-semibold text-emerald-400">
            Accuracy: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Hyperparameter Tuning</h3>
          <p className="text-xs text-slate-400">Performance vs parameter values</p>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis 
              dataKey="index" 
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              label={{ value: 'Iteration', position: 'insideBottom', offset: -5, fill: '#64748b' }}
            />
            <YAxis 
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              domain={[60, 100]}
              label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#60a5fa' }}
              fill="url(#accuracyGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Parameter: {firstParam || 'N/A'}</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-400">Accuracy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
