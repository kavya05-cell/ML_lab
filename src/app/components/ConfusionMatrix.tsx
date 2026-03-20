import { Grid3x3 } from 'lucide-react';

interface ConfusionMatrixProps {
  data: number[][];
}

export function ConfusionMatrix({ data }: ConfusionMatrixProps) {
  const maxValue = Math.max(...data.flat());
  
  const getHeatColor = (value: number) => {
    const intensity = value / maxValue;
    if (intensity > 0.8) return 'bg-emerald-500/90 text-white';
    if (intensity > 0.6) return 'bg-emerald-500/60 text-white';
    if (intensity > 0.4) return 'bg-emerald-500/30 text-emerald-100';
    if (intensity > 0.2) return 'bg-rose-500/30 text-rose-100';
    return 'bg-rose-500/60 text-white';
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
          <Grid3x3 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Confusion Matrix</h3>
          <p className="text-xs text-slate-400">Prediction accuracy breakdown</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Labels */}
        <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 text-center">
          <div></div>
          <div>Class 0</div>
          <div>Class 1</div>
          <div>Class 2</div>
        </div>

        {/* Matrix */}
        {data.map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            <div className="text-xs text-slate-400 flex items-center justify-end pr-2">
              Class {i}
            </div>
            {row.map((value, j) => (
              <div
                key={j}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all hover:scale-105 ${getHeatColor(value)}`}
              >
                {value}
              </div>
            ))}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
          <span className="text-xs text-slate-400">Predicted</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Low</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-rose-500/60"></div>
              <div className="w-4 h-4 rounded bg-rose-500/30"></div>
              <div className="w-4 h-4 rounded bg-emerald-500/30"></div>
              <div className="w-4 h-4 rounded bg-emerald-500/60"></div>
              <div className="w-4 h-4 rounded bg-emerald-500/90"></div>
            </div>
            <span className="text-slate-500">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
