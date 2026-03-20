import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function VisualizationCharts() {
  // Confusion Matrix data (simulated as a heatmap using bars)
  const confusionMatrixData = [
    { name: "True Neg", value: 2450, color: "#06b6d4" },
    { name: "False Pos", value: 124, color: "#a855f7" },
    { name: "False Neg", value: 98, color: "#ec4899" },
    { name: "True Pos", value: 2328, color: "#0ea5e9" },
  ];

  // ROC Curve data
  const rocData = [
    { fpr: 0, tpr: 0 },
    { fpr: 0.05, tpr: 0.65 },
    { fpr: 0.1, tpr: 0.78 },
    { fpr: 0.15, tpr: 0.85 },
    { fpr: 0.2, tpr: 0.89 },
    { fpr: 0.3, tpr: 0.93 },
    { fpr: 0.4, tpr: 0.95 },
    { fpr: 0.5, tpr: 0.97 },
    { fpr: 0.7, tpr: 0.98 },
    { fpr: 1, tpr: 1 },
  ];

  // Accuracy vs Hyperparameter data
  const accuracyData = [
    { param: "5", accuracy: 87.2 },
    { param: "10", accuracy: 91.5 },
    { param: "15", accuracy: 94.2 },
    { param: "20", accuracy: 93.8 },
    { param: "25", accuracy: 92.1 },
    { param: "30", accuracy: 90.5 },
  ];

  // Feature Importance data
  const featureData = [
    { feature: "Age", importance: 0.18 },
    { feature: "Income", importance: 0.24 },
    { feature: "Credit Score", importance: 0.31 },
    { feature: "Tenure", importance: 0.15 },
    { feature: "Balance", importance: 0.28 },
    { feature: "Products", importance: 0.12 },
  ].sort((a, b) => b.importance - a.importance);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Visualizations</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Confusion Matrix */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4 text-cyan-400">Confusion Matrix</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={confusionMatrixData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {confusionMatrixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ROC Curve */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4 text-purple-400">ROC Curve</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="fpr"
                label={{ value: "False Positive Rate", position: "insideBottom", offset: -5, fill: "#9ca3af" }}
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                label={{ value: "True Positive Rate", angle: -90, position: "insideLeft", fill: "#9ca3af" }}
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line type="monotone" dataKey="tpr" stroke="#a855f7" strokeWidth={3} dot={false} />
              <Line type="monotone" data={[{ fpr: 0, tpr: 0 }, { fpr: 1, tpr: 1 }]} dataKey="tpr" stroke="#4b5563" strokeDasharray="5 5" strokeWidth={1} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2 text-center">AUC = 0.94</p>
        </div>

        {/* Accuracy vs Hyperparameter */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4 text-blue-400">Accuracy vs Max Depth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="param"
                label={{ value: "Max Depth", position: "insideBottom", offset: -5, fill: "#9ca3af" }}
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                domain={[85, 95]}
                label={{ value: "Accuracy (%)", angle: -90, position: "insideLeft", fill: "#9ca3af" }}
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line type="monotone" dataKey="accuracy" stroke="#06b6d4" strokeWidth={3} dot={{ fill: "#06b6d4", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Importance */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4 text-pink-400">Feature Importance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={featureData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis type="category" dataKey="feature" stroke="#9ca3af" style={{ fontSize: "12px" }} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="importance" fill="#ec4899" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
