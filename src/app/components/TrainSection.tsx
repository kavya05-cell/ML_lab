import { Card } from './ui/card';
import { Button } from './ui/button';
import { Loader2, Zap } from 'lucide-react';

interface TrainSectionProps {
  isReady: boolean;
  onTrain: () => void;
  isTraining: boolean;
}

export function TrainSection({ isReady, onTrain, isTraining }: TrainSectionProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-5">
      <div className="text-center">
        <Button
          size="lg"
          onClick={onTrain}
          disabled={!isReady || isTraining}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
        >
          {isTraining ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Training...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Train Model
            </>
          )}
        </Button>
        
        {!isReady && !isTraining && (
          <p className="mt-3 text-xs text-slate-500">
            Select a dataset and model to start training
          </p>
        )}
      </div>
    </div>
  );
}