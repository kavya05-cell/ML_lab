import { motion } from 'motion/react';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';

interface MetricsCardsProps {
  result: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
}

export function MetricsCards({ result }: MetricsCardsProps) {
  const metrics = [
    {
      label: 'Accuracy',
      value: result.accuracy,
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-500/10 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Precision',
      value: result.precision,
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Recall',
      value: result.recall,
      icon: Zap,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      label: 'F1 Score',
      value: result.f1Score,
      icon: Award,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'from-violet-500/10 to-purple-500/10',
      borderColor: 'border-violet-500/30',
      iconColor: 'text-violet-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative overflow-hidden bg-gradient-to-br ${metric.bgColor} backdrop-blur-sm border ${metric.borderColor} rounded-xl p-5`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
              <metric.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {(metric.value * 100).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-300 font-medium">{metric.label}</div>
          
          {/* Animated progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metric.value * 100}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${metric.color}`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
