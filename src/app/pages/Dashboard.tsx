import { useState } from "react";
import { DatasetOverview } from "../components/DatasetOverview";
import { ModelSelection } from "../components/ModelSelection";
import { ExperimentMetrics } from "../components/ExperimentMetrics";
import { VisualizationCharts } from "../components/VisualizationCharts";
import { HyperparameterPanel } from "../components/HyperparameterPanel";
import { ExperimentHistory } from "../components/ExperimentHistory";

export function Dashboard() {
  const [selectedModel, setSelectedModel] = useState("random-forest");
  const [hyperparameters, setHyperparameters] = useState({
    learning_rate: 0.01,
    max_depth: 10,
    n_estimators: 100,
    kernel: "rbf",
    criterion: "gini",
  });

  const handleTrainModel = () => {
    console.log("Training model:", selectedModel);
    // Simulate training
  };

  const handleRunExperiment = () => {
    console.log("Running experiment with:", hyperparameters);
    // Simulate experiment
  };

  const handleResetParameters = () => {
    setHyperparameters({
      learning_rate: 0.01,
      max_depth: 10,
      n_estimators: 100,
      kernel: "rbf",
      criterion: "gini",
    });
  };

  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Experiment Dashboard
          </h1>
          <p className="text-gray-400">Monitor and manage your ML experiments</p>
        </div>

        {/* Top Section: Dataset & Model */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <DatasetOverview />
          <ModelSelection
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onTrainModel={handleTrainModel}
          />
        </div>

        {/* Metrics Section */}
        <ExperimentMetrics />

        {/* Visualization Section */}
        <VisualizationCharts />

        {/* Experiment History */}
        <ExperimentHistory />
      </div>

      {/* Right Panel: Hyperparameters */}
      <HyperparameterPanel
        hyperparameters={hyperparameters}
        onHyperparametersChange={setHyperparameters}
        onRunExperiment={handleRunExperiment}
        onResetParameters={handleResetParameters}
      />
    </div>
  );
}
