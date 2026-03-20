import { Database, Brain, BarChart3 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface MinimalSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const NAV_ITEMS = [
  { id: 'dataset', icon: Database, label: 'Dataset' },
  { id: 'model', icon: Brain, label: 'Model' },
  { id: 'results', icon: BarChart3, label: 'Results' }
];

export function MinimalSidebar({ activeView, onViewChange }: MinimalSidebarProps) {
  return (
    <div className="w-16 bg-slate-950/50 backdrop-blur-sm border-r border-slate-800/50 flex flex-col items-center py-6 gap-4">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        
        return (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30 shadow-lg shadow-violet-500/20'
                    : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-slate-900 border-slate-700">
              <p className="text-slate-200">{item.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}