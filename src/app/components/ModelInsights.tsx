import { motion } from 'motion/react';
import { Lightbulb, CheckCircle2, Settings } from 'lucide-react';

interface ModelInsightsProps {
  result: {
    insights: string;
    bestHyperparameters: Record<string, number>;
    accuracy: number;
  };
}

export function ModelInsights({ result }: ModelInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Model Insights</h3>
          <p className="text-sm text-slate-400">Performance analysis and recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Hyperparameters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-violet-400" />
            <h4 className="font-medium text-white text-sm">Best Configuration</h4>
          </div>
          <div className="space-y-2">
            {Object.entries(result.bestHyperparameters).map(([param, value]) => (
              <div 
                key={param}
                className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
              >
                <span className="text-sm text-slate-300 capitalize">
                  {param.replace(/_/g, ' ')}
                </span>
                <span className="text-sm font-semibold text-violet-400">
                  {typeof value === 'number' ? value.toFixed(2) : value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h4 className="font-medium text-white text-sm">Analysis</h4>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg">
            <p className="text-sm text-slate-300 leading-relaxed">
              {result.insights}
            </p>
          </div>
          
          {/* Performance Badge */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-lg">
            <div className="flex-1">
              <p className="text-xs text-slate-400 mb-1">Overall Performance</p>
              <p className="text-lg font-bold text-white">
                {result.accuracy >= 0.9 ? 'Excellent' : result.accuracy >= 0.8 ? 'Good' : 'Fair'}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
              result.accuracy >= 0.9 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : result.accuracy >= 0.8
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              {(result.accuracy * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
