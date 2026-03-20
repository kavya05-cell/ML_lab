import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Brain } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string | null;
  onModelSelect: (model: string) => void;
}

const MODELS = [
  { value: 'knn', label: 'K-Nearest Neighbors (KNN)', description: 'Great for beginners' },
  { value: 'random_forest', label: 'Random Forest', description: 'Powerful and accurate' },
  { value: 'svm', label: 'Support Vector Machine (SVM)', description: 'Works well for complex data' }
];

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-5">
      <h3 className="mb-4 font-semibold text-white">Model Selection</h3>
      
      <div className="mb-3">
        <Select value={selectedModel || undefined} onValueChange={onModelSelect}>
          <SelectTrigger className="w-full bg-slate-800/50 border-slate-700 text-slate-200">
            <SelectValue placeholder="Choose a model..." />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            {MODELS.map((model) => (
              <SelectItem 
                key={model.value} 
                value={model.value}
                className="text-slate-200 focus:bg-slate-800 focus:text-white"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-violet-400" />
                  <span>{model.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/30">
        <p className="text-xs text-violet-300">
          💡 Don't worry — we'll suggest the best settings for you
        </p>
      </div>

      {selectedModel && (
        <div className="mt-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <p className="text-xs text-slate-400">
            {MODELS.find(m => m.value === selectedModel)?.description}
          </p>
        </div>
      )}
    </div>
  );
}