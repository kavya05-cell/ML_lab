import { Clock } from "lucide-react";

export function ExperimentHistory() {
  const experiments = [
    {
      id: "EXP-2451",
      algorithm: "Random Forest",
      accuracy: "94.2%",
      hyperparams: "depth=15, est=100",
      timestamp: "2026-03-12 14:32",
    },
    {
      id: "EXP-2450",
      algorithm: "SVM",
      accuracy: "91.8%",
      hyperparams: "kernel=rbf, C=1.0",
      timestamp: "2026-03-12 13:15",
    },
    {
      id: "EXP-2449",
      algorithm: "Logistic Regression",
      accuracy: "88.5%",
      hyperparams: "lr=0.01, iter=1000",
      timestamp: "2026-03-12 11:45",
    },
    {
      id: "EXP-2448",
      algorithm: "KNN",
      accuracy: "86.3%",
      hyperparams: "k=5, weights=uniform",
      timestamp: "2026-03-12 10:22",
    },
    {
      id: "EXP-2447",
      algorithm: "Random Forest",
      accuracy: "92.7%",
      hyperparams: "depth=10, est=50",
      timestamp: "2026-03-12 09:10",
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-5 h-5 text-gray-400" />
        <h2 className="text-xl font-semibold">Experiment History</h2>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                  Experiment ID
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                  Algorithm
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                  Accuracy
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                  Hyperparameters
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {experiments.map((exp, index) => (
                <tr key={exp.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-cyan-400">{exp.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-white">{exp.algorithm}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        parseFloat(exp.accuracy) > 92
                          ? "text-green-400"
                          : parseFloat(exp.accuracy) > 88
                          ? "text-yellow-400"
                          : "text-orange-400"
                      }`}
                    >
                      {exp.accuracy}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-400 font-mono">{exp.hyperparams}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-400">{exp.timestamp}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
