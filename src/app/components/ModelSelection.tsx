import { Brain, Play } from "lucide-react";

interface ModelSelectionProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  onTrainModel: () => void;
}

export function ModelSelection({ selectedModel, onModelChange, onTrainModel }: ModelSelectionProps) {
  const models = [
    { value: "logistic-regression", label: "Logistic Regression" },
    { value: "random-forest", label: "Random Forest" },
    { value: "svm", label: "Support Vector Machine (SVM)" },
    { value: "knn", label: "K-Nearest Neighbors (KNN)" },
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold">Model Selection</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Select Algorithm</label>
          <select
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            title="Select Algorithm"
          >
            {models.map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">Current Model</p>
          <p className="font-medium text-cyan-400">
            {models.find((m) => m.value === selectedModel)?.label}
          </p>
        </div>

        <button
          onClick={onTrainModel}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Play className="w-5 h-5" />
          Train Model
        </button>
      </div>
    </div>
  );
}
