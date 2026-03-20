import { motion } from 'motion/react';
import { ConfusionMatrix } from './ConfusionMatrix';
import { HyperparameterTuning } from './HyperparameterTuning';
import { DecisionBoundary } from './DecisionBoundary';
import { FeatureImportance } from './FeatureImportance';

interface VisualizationGridProps {
  result: {
    confusionMatrix: number[][];
    hyperparameterHistory: { param: string; value: number; accuracy: number }[];
    decisionBoundary?: { x: number; y: number; class: number }[];
    featureImportance?: { feature: string; importance: number }[];
  };
  selectedModel: string | null;
}

export function VisualizationGrid({ result, selectedModel }: VisualizationGridProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ConfusionMatrix data={result.confusionMatrix} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <HyperparameterTuning data={result.hyperparameterHistory} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <DecisionBoundary data={result.decisionBoundary || []} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {selectedModel === 'random_forest' && result.featureImportance ? (
          <FeatureImportance data={result.featureImportance} />
        ) : (
          <FeatureImportance data={[]} />
        )}
      </motion.div>
    </div>
  );
}
