import { useState } from 'react';
import { ModelInfo } from '@/types/xai';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

interface FeatureInputProps {
  model: ModelInfo;
  initialValues: Record<string, number | string>;
  onPredict: (values: Record<string, number | string>) => void;
  isLoading?: boolean;
}

const FeatureInput = ({ model, initialValues, onPredict, isLoading }: FeatureInputProps) => {
  const [values, setValues] = useState<Record<string, number | string>>(initialValues);

  const handleChange = (feature: string, value: string) => {
    const numValue = parseFloat(value);
    setValues((prev) => ({
      ...prev,
      [feature]: isNaN(numValue) ? value : numValue,
    }));
  };

  const handleReset = () => {
    setValues(initialValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(values);
  };

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {model.features.map((feature, index) => (
            <div
              key={feature}
              className="space-y-2 animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Label htmlFor={feature} className="font-mono text-sm text-muted-foreground">
                {feature}
              </Label>
              <Input
                id={feature}
                type="text"
                value={values[feature] ?? ''}
                onChange={(e) => handleChange(feature, e.target.value)}
                className="font-mono bg-background/50 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Play className="h-4 w-4 mr-2" />
            {isLoading ? 'Analyzing...' : 'Run Prediction'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="border-border hover:bg-muted"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FeatureInput;
