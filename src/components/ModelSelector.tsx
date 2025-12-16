import { ModelInfo } from '@/types/xai';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, ChevronRight } from 'lucide-react';

interface ModelSelectorProps {
  models: ModelInfo[];
  selectedModel: ModelInfo | null;
  onSelect: (model: ModelInfo) => void;
}

const ModelSelector = ({ models, selectedModel, onSelect }: ModelSelectorProps) => {
  return (
    <div className="space-y-3">
      {models.map((model, index) => (
        <Card
          key={model.id}
          onClick={() => onSelect(model)}
          className={`group cursor-pointer p-4 transition-all duration-300 animate-fade-in opacity-0 ${
            selectedModel?.id === model.id
              ? 'border-primary/50 bg-primary/5 shadow-glow'
              : 'border-border hover:border-primary/30 hover:bg-muted/50'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`rounded-lg p-2 transition-colors ${
                  selectedModel?.id === model.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                }`}
              >
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{model.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="font-mono text-xs">
                    {model.type}
                  </Badge>
                  <Badge variant="outline" className="font-mono text-xs">
                    {model.features.length} features
                  </Badge>
                </div>
              </div>
            </div>
            <ChevronRight
              className={`h-5 w-5 transition-all ${
                selectedModel?.id === model.id
                  ? 'text-primary translate-x-1'
                  : 'text-muted-foreground group-hover:text-primary group-hover:translate-x-1'
              }`}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ModelSelector;
