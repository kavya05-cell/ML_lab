import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { HelpCircle, Sparkles } from 'lucide-react';

interface SmartHyperparametersProps {
  selectedModel: string | null;
  isAutoMode: boolean;
  onAutoModeToggle: (enabled: boolean) => void;
  hyperparameters: Record<string, number>;
  onHyperparameterChange: (name: string, value: number) => void;
}

const MODEL_PARAMS = {
  knn: [
    {
      name: 'n_neighbors',
      label: 'Number of Neighbors',
      min: 1,
      max: 20,
      default: 5,
      tooltip: 'How many nearby points to consider when making predictions'
    }
  ],
  random_forest: [
    {
      name: 'n_estimators',
      label: 'Number of Trees',
      min: 10,
      max: 200,
      default: 120,
      tooltip: 'More trees usually means better accuracy but slower training'
    },
    {
      name: 'max_depth',
      label: 'Maximum Depth',
      min: 2,
      max: 20,
      default: 8,
      tooltip: 'How deep each tree can grow. Higher values may cause overfitting'
    }
  ],
  svm: [
    {
      name: 'C',
      label: 'Regularization (C)',
      min: 0.1,
      max: 10,
      step: 0.1,
      default: 1.0,
      tooltip: 'Controls the trade-off between smooth decision boundary and classifying training points correctly'
    },
    {
      name: 'kernel_degree',
      label: 'Kernel Degree',
      min: 2,
      max: 5,
      default: 3,
      tooltip: 'Degree of the polynomial kernel function'
    }
  ]
};

export function SmartHyperparameters({
  selectedModel,
  isAutoMode,
  onAutoModeToggle,
  hyperparameters,
  onHyperparameterChange
}: SmartHyperparametersProps) {
  if (!selectedModel) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-5">
        <h3 className="mb-4 font-semibold text-white">Hyperparameters</h3>
        <p className="text-slate-500 text-center py-8 text-sm">Select a model to configure hyperparameters</p>
      </div>
    );
  }

  const params = MODEL_PARAMS[selectedModel as keyof typeof MODEL_PARAMS] || [];

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Hyperparameters</h3>
        <div className="flex items-center gap-2">
          <Sparkles className={`w-4 h-4 ${isAutoMode ? 'text-violet-400' : 'text-slate-500'}`} />
          <Label htmlFor="auto-mode" className="text-xs text-slate-300">Auto</Label>
          <Switch
            id="auto-mode"
            checked={isAutoMode}
            onCheckedChange={onAutoModeToggle}
          />
        </div>
      </div>

      {isAutoMode ? (
        <div className="p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-lg border border-violet-500/30">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-violet-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs mb-3 text-slate-300">
                Auto-suggested values (optimized for best performance):
              </p>
              <div className="space-y-2">
                {params.map((param) => (
                  <div key={param.name} className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{param.label}</span>
                    <span className="px-3 py-1 bg-slate-800/50 rounded-md border border-violet-500/30 text-xs text-violet-300 font-medium">
                      {hyperparameters[param.name] ?? param.default}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <TooltipProvider>
            {params.map((param) => (
              <div key={param.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-slate-300">{param.label}</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-3 h-3 text-slate-500 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-slate-900 border-slate-700">
                        <p className="text-xs text-slate-300">{param.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="px-3 py-1 bg-slate-800/50 rounded-md text-xs text-violet-300 font-medium">
                    {hyperparameters[param.name] ?? param.default}
                  </span>
                </div>
                <Slider
                  min={param.min}
                  max={param.max}
                  step={param.step || 1}
                  value={[hyperparameters[param.name] ?? param.default]}
                  onValueChange={(values) => onHyperparameterChange(param.name, values[0])}
                  className="w-full"
                />
                {param.name === 'max_depth' && (
                  <p className="text-xs text-amber-400 mt-1">
                    ⚠️ Higher depth may cause overfitting
                  </p>
                )}
              </div>
            ))}
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}