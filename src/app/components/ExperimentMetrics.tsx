import { TrendingUp, Target, Crosshair, Activity } from "lucide-react";

export function ExperimentMetrics() {
  const metrics = [
    { label: "Accuracy", value: "94.2%", icon: Target, color: "cyan" },
    { label: "Precision", value: "91.8%", icon: Crosshair, color: "purple" },
    { label: "Recall", value: "88.5%", icon: TrendingUp, color: "blue" },
    { label: "F1 Score", value: "90.1%", icon: Activity, color: "pink" },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
      purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
      blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
      pink: { bg: "bg-pink-500/20", text: "text-pink-400" },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Experiment Monitoring</h2>
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const colors = getColorClasses(metric.color);
          return (
            <div
              key={metric.label}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <metric.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
              <p className={`text-3xl font-bold ${colors.text}`}>{metric.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
