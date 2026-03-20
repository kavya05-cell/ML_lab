import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Hexagon } from 'lucide-react';

interface DecisionBoundaryProps {
  data: { x: number; y: number; class: number }[];
}

export function DecisionBoundary({ data }: DecisionBoundaryProps) {
  const classColors = ['#f59e0b', '#8b5cf6', '#10b981'];
  const classLabels = ['Class 0', 'Class 1', 'Class 2'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-slate-400 mb-1">
            Position: ({payload[0].payload.x.toFixed(2)}, {payload[0].payload.y.toFixed(2)})
          </p>
          <p className="text-sm font-semibold" style={{ color: classColors[payload[0].payload.class] }}>
            {classLabels[payload[0].payload.class]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
          <Hexagon className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Decision Boundary</h3>
          <p className="text-xs text-slate-400">Classification regions visualization</p>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis 
              type="number" 
              dataKey="x" 
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              domain={[-5, 5]}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              domain={[-5, 5]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`scatter-cell-${index}`} fill={classColors[entry.class]} opacity={0.6} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/50">
        <div className="flex items-center justify-center gap-4 text-xs">
          {classLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: classColors[i] }}
              ></div>
              <span className="text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}