import { Play, RotateCcw, Sliders as SlidersIcon } from "lucide-react";

interface HyperparameterPanelProps {
  hyperparameters: {
    learning_rate: number;
    max_depth: number;
    n_estimators: number;
    kernel: string;
    criterion: string;
  };
  onHyperparametersChange: (params: any) => void;
  onRunExperiment: () => void;
  onResetParameters: () => void;
}

export function HyperparameterPanel({
  hyperparameters,
  onHyperparametersChange,
  onRunExperiment,
  onResetParameters,
}: HyperparameterPanelProps) {
  const updateParam = (key: string, value: number | string) => {
    onHyperparametersChange({ ...hyperparameters, [key]: value });
  };

  return (
    <aside className="w-80 bg-gray-900 border-l border-gray-800 p-6 overflow-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <SlidersIcon className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold">Hyperparameters</h2>
      </div>

      <div className="space-y-6">
        {/* Learning Rate Slider */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Learning Rate</label>
          <input
            type="range"
            min="0.001"
            max="0.1"
            step="0.001"
            value={hyperparameters.learning_rate}
            onChange={(e) => updateParam("learning_rate", parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            title="Learning Rate"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">0.001</span>
            <span className="text-sm font-medium text-cyan-400">{hyperparameters.learning_rate.toFixed(3)}</span>
            <span className="text-xs text-gray-500">0.1</span>
          </div>
        </div>

        {/* Max Depth Slider */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Max Depth</label>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={hyperparameters.max_depth}
            onChange={(e) => updateParam("max_depth", parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            title="Max Depth"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">1</span>
            <span className="text-sm font-medium text-purple-400">{hyperparameters.max_depth}</span>
            <span className="text-xs text-gray-500">50</span>
          </div>
        </div>

        {/* N Estimators Slider */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">N Estimators</label>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={hyperparameters.n_estimators}
            onChange={(e) => updateParam("n_estimators", parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            title="N Estimators"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">10</span>
            <span className="text-sm font-medium text-blue-400">{hyperparameters.n_estimators}</span>
            <span className="text-xs text-gray-500">500</span>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          {/* Kernel Type Dropdown */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Kernel Type</label>
            <select
              value={hyperparameters.kernel}
              onChange={(e) => updateParam("kernel", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              title="Kernel Type"
            >
              <option value="rbf">RBF (Radial Basis Function)</option>
              <option value="linear">Linear</option>
              <option value="poly">Polynomial</option>
              <option value="sigmoid">Sigmoid</option>
            </select>
          </div>

          {/* Criterion Dropdown */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Criterion</label>
            <select
              value={hyperparameters.criterion}
              onChange={(e) => updateParam("criterion", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              title="Criterion"
            >
              <option value="gini">Gini Impurity</option>
              <option value="entropy">Entropy</option>
              <option value="log_loss">Log Loss</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 space-y-3">
          {/* Run Experiment Button */}
          <button
            onClick={onRunExperiment}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Play className="w-5 h-5" />
            Run Experiment
          </button>

          {/* Reset Parameters Button */}
          <button
            onClick={onResetParameters}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-700"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Parameters
          </button>
        </div>

        {/* Current Configuration Summary */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 mt-6">
          <p className="text-xs text-gray-400 mb-3 font-medium">Current Configuration</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Learning Rate:</span>
              <span className="text-white">{hyperparameters.learning_rate.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Max Depth:</span>
              <span className="text-white">{hyperparameters.max_depth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">N Estimators:</span>
              <span className="text-white">{hyperparameters.n_estimators}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Kernel:</span>
              <span className="text-white">{hyperparameters.kernel.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Criterion:</span>
              <span className="text-white capitalize">{hyperparameters.criterion}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
