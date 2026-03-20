import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Target, Award } from 'lucide-react';

interface TrainingResult {
  accuracy: number;
  improvement: number;
  confusionMatrix: number[][];
  hyperparameterHistory: { param: string; value: number; accuracy: number }[];
  decisionBoundary?: { x: number; y: number; class: number }[];
}

interface ResultsVisualizationProps {
  result: TrainingResult | null;
  selectedModel: string | null;
}

export function ResultsVisualization({ result, selectedModel }: ResultsVisualizationProps) {
  if (!result) {
    return (
      <Card className="p-8 bg-white border border-gray-200 rounded-xl">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No results yet</p>
          <p className="text-sm text-gray-400">Train your model to see visualizations</p>
        </div>
      </Card>
    );
  }

  // Prepare hyperparameter vs accuracy data
  const hyperparamData = result.hyperparameterHistory.map((item, idx) => ({
    name: `Trial ${idx + 1}`,
    value: item.value,
    accuracy: (item.accuracy * 100).toFixed(1)
  }));

  // Prepare confusion matrix visualization data
  const confusionData = result.confusionMatrix.flatMap((row, i) =>
    row.map((value, j) => ({
      predicted: j,
      actual: i,
      value: value
    }))
  );

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-green-700 mb-1">Model Accuracy</p>
              <h2 className="text-green-900">{(result.accuracy * 100).toFixed(1)}%</h2>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-blue-700 mb-1">Improvement</p>
              <h2 className="text-blue-900">
                {result.improvement > 0 ? '+' : ''}{result.improvement.toFixed(1)}%
              </h2>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <p className="text-sm text-blue-700 mt-2">
            {result.improvement > 0 
              ? '🎉 Great improvement!' 
              : result.improvement < 0 
                ? '📉 Try adjusting hyperparameters' 
                : 'Same as before'}
          </p>
        </Card>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix */}
        <Card className="p-6 bg-white border border-gray-200 rounded-xl">
          <h4 className="mb-4 text-gray-900">Confusion Matrix</h4>
          <div className="aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="predicted" 
                  name="Predicted" 
                  domain={[0, result.confusionMatrix.length - 1]}
                  ticks={Array.from({ length: result.confusionMatrix.length }, (_, i) => i)}
                />
                <YAxis 
                  type="number" 
                  dataKey="actual" 
                  name="Actual"
                  domain={[0, result.confusionMatrix.length - 1]}
                  ticks={Array.from({ length: result.confusionMatrix.length }, (_, i) => i)}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter 
                  data={confusionData} 
                  fill="#3b82f6"
                  shape={(props: any) => {
                    const { cx, cy, payload } = props;
                    const size = payload.value * 5;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={size}
                        fill={payload.predicted === payload.actual ? '#10b981' : '#ef4444'}
                        opacity={0.6}
                      />
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Hyperparameter vs Accuracy */}
        <Card className="p-6 bg-white border border-gray-200 rounded-xl">
          <h4 className="mb-4 text-gray-900">Hyperparameter Impact</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hyperparamData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Accuracy %"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Feature Importance (for tree-based models) */}
      {selectedModel === 'random_forest' && (
        <Card className="p-6 bg-white border border-gray-200 rounded-xl">
          <h4 className="mb-4 text-gray-900">Feature Importance</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { feature: 'Feature 1', importance: 0.35 },
                { feature: 'Feature 2', importance: 0.25 },
                { feature: 'Feature 3', importance: 0.20 },
                { feature: 'Feature 4', importance: 0.15 },
                { feature: 'Feature 5', importance: 0.05 }
              ]}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 1]} />
              <YAxis type="category" dataKey="feature" />
              <Tooltip />
              <Bar dataKey="importance" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
