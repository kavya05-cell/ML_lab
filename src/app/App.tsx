import { useState } from 'react';
import { MinimalSidebar } from './components/MinimalSidebar';
import { DatasetUpload } from './components/DatasetUpload';
import { ModelSelector } from './components/ModelSelector';
import { SmartHyperparameters } from './components/SmartHyperparameters';
import { TrainSection } from './components/TrainSection';
import { MetricsCards } from './components/MetricsCards';
import { VisualizationGrid } from './components/VisualizationGrid';
import { ModelInsights } from './components/ModelInsights';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrainingResult {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
  hyperparameterHistory: { param: string; value: number; accuracy: number }[];
  featureImportance?: { feature: string; importance: number }[];
  decisionBoundary?: { x: number; y: number; class: number }[];
  bestHyperparameters: Record<string, number>;
  insights: string;
}

// Default hyperparameters for each model
const DEFAULT_HYPERPARAMETERS = {
  knn: { n_neighbors: 5 },
  random_forest: { n_estimators: 120, max_depth: 8 },
  svm: { C: 1.0, kernel_degree: 3 }
};

function App() {
  const [activeView, setActiveView] = useState('dataset');
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [hyperparameters, setHyperparameters] = useState<Record<string, number>>({});
  const [isTraining, setIsTraining] = useState(false);
  const [trainingStage, setTrainingStage] = useState('');
  const [trainingResult, setTrainingResult] = useState<TrainingResult | null>(null);

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const handleDatasetSelect = (dataset: string) => {
    setSelectedDataset(dataset);
    setActiveView('model');
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    const defaults = DEFAULT_HYPERPARAMETERS[model as keyof typeof DEFAULT_HYPERPARAMETERS] || {};
    setHyperparameters(defaults);
    setActiveView('model');
  };

  const handleAutoModeToggle = (enabled: boolean) => {
    setIsAutoMode(enabled);
    if (enabled && selectedModel) {
      const defaults = DEFAULT_HYPERPARAMETERS[selectedModel as keyof typeof DEFAULT_HYPERPARAMETERS] || {};
      setHyperparameters(defaults);
    }
  };

  const handleHyperparameterChange = (name: string, value: number) => {
    setHyperparameters(prev => ({ ...prev, [name]: value }));
  };

  const handleTrain = async () => {
    setIsTraining(true);
    setTrainingStage('Training model...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTrainingStage('Evaluating performance...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate comprehensive mock results
    const baseAccuracy = 0.82 + Math.random() * 0.15;
    const accuracy = Math.min(0.98, baseAccuracy + (isAutoMode ? 0.03 : 0));
    const precision = accuracy - 0.02 + Math.random() * 0.04;
    const recall = accuracy - 0.01 + Math.random() * 0.03;
    const f1Score = 2 * (precision * recall) / (precision + recall);

    // Generate confusion matrix (3 classes)
    const confusionMatrix = [
      [85, 8, 7],
      [5, 92, 3],
      [6, 4, 90]
    ];

    // Generate hyperparameter tuning history
    const hyperparameterHistory = Object.entries(hyperparameters).flatMap(([param, value]) => 
      Array.from({ length: 8 }, (_, i) => ({
        param,
        value: value * (0.5 + i * 0.15),
        accuracy: 0.65 + Math.random() * 0.3 + (i === 5 ? 0.05 : 0)
      }))
    );

    // Feature importance (for Random Forest)
    const featureImportance = selectedModel === 'random_forest' ? [
      { feature: 'Feature 1', importance: 0.35 },
      { feature: 'Feature 2', importance: 0.28 },
      { feature: 'Feature 3', importance: 0.22 },
      { feature: 'Feature 4', importance: 0.15 }
    ] : undefined;

    // Generate decision boundary data
    const decisionBoundary = Array.from({ length: 200 }, () => ({
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
      class: Math.floor(Math.random() * 3)
    }));

    // Generate insights
    let insights = '';
    if (selectedModel === 'random_forest') {
      const depth = hyperparameters.max_depth || 8;
      insights = depth > 10 
        ? 'Higher depth improved accuracy but increased risk of overfitting. Consider reducing depth for better generalization.'
        : 'Good depth balance achieved. Model shows strong generalization capabilities with current settings.';
    } else if (selectedModel === 'knn') {
      const k = hyperparameters.n_neighbors || 5;
      insights = k < 3
        ? 'Low K value makes the model sensitive to noise. Consider increasing K for smoother decision boundaries.'
        : 'Optimal K value selected. Model achieves good balance between bias and variance.';
    } else {
      const C = hyperparameters.C || 1.0;
      insights = C > 10
        ? 'High C value prioritizes accuracy over margin. May lead to overfitting on training data.'
        : 'Well-tuned regularization parameter. Model shows robust performance across validation sets.';
    }

    const result: TrainingResult = {
      accuracy,
      precision,
      recall,
      f1Score,
      confusionMatrix,
      hyperparameterHistory,
      featureImportance,
      decisionBoundary,
      bestHyperparameters: hyperparameters,
      insights
    };

    setTrainingResult(result);
    setIsTraining(false);
    setTrainingStage('');
    setActiveView('results');
  };

  const isReady = selectedDataset !== null && selectedModel !== null;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <MinimalSidebar activeView={activeView} onViewChange={handleViewChange} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">ML Playground</h1>
                <p className="text-sm text-slate-400">Hyperparameter Tuning Visualizer</p>
              </div>
            </div>
            {isTraining && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-lg"
              >
                <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                <span className="text-sm text-violet-300">{trainingStage}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-[1800px] mx-auto px-8 py-8">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Panel - Controls */}
              <div className="col-span-12 lg:col-span-3 space-y-5">
                <DatasetUpload
                  selectedDataset={selectedDataset}
                  onDatasetSelect={handleDatasetSelect}
                />

                <ModelSelector
                  selectedModel={selectedModel}
                  onModelSelect={handleModelSelect}
                />

                <SmartHyperparameters
                  selectedModel={selectedModel}
                  isAutoMode={isAutoMode}
                  onAutoModeToggle={handleAutoModeToggle}
                  hyperparameters={hyperparameters}
                  onHyperparameterChange={handleHyperparameterChange}
                />

                <TrainSection
                  isReady={isReady}
                  onTrain={handleTrain}
                  isTraining={isTraining}
                />
              </div>

              {/* Right Panel - Results Dashboard */}
              <div className="col-span-12 lg:col-span-9">
                <AnimatePresence mode="wait">
                  {trainingResult ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {/* Metrics Cards */}
                      <MetricsCards result={trainingResult} />

                      {/* Visualization Grid */}
                      <VisualizationGrid 
                        result={trainingResult} 
                        selectedModel={selectedModel}
                      />

                      {/* Model Insights */}
                      <ModelInsights result={trainingResult} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex items-center justify-center"
                    >
                      <div className="text-center max-w-md">
                        <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-violet-500/30">
                          <Sparkles className="w-10 h-10 text-violet-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Ready to Train</h3>
                        <p className="text-slate-400 leading-relaxed">
                          Select a dataset and model from the left panel, then click "Train Model" to see comprehensive ML performance metrics and visualizations.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;