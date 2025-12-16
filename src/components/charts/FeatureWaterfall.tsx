import { SHAPExplanation } from '@/types/xai';

interface FeatureWaterfallProps {
  data: SHAPExplanation;
}

const FeatureWaterfall = ({ data }: FeatureWaterfallProps) => {
  const sortedFeatures = [...data.features].sort(
    (a, b) => Math.abs(b.importance) - Math.abs(a.importance)
  );

  const maxAbsValue = Math.max(...sortedFeatures.map((f) => Math.abs(f.importance)));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-sm text-muted-foreground">Base Value</span>
        <span className="font-mono text-lg font-semibold text-primary">{data.baseValue.toFixed(3)}</span>
      </div>

      {sortedFeatures.map((feature, index) => {
        const barWidth = (Math.abs(feature.importance) / maxAbsValue) * 100;
        const isPositive = feature.importance >= 0;

        return (
          <div
            key={feature.feature}
            className="animate-slide-in opacity-0"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-sm text-foreground">{feature.feature}</span>
              <span
                className={`font-mono text-sm font-semibold ${
                  isPositive ? 'text-positive' : 'text-negative'
                }`}
              >
                {isPositive ? '+' : ''}{feature.importance.toFixed(3)}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  isPositive ? 'bg-positive' : 'bg-negative'
                }`}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-between border-t border-border pt-3 mt-4">
        <span className="font-mono text-sm text-muted-foreground">Output Value</span>
        <span className="font-mono text-lg font-semibold text-primary">{data.outputValue.toFixed(3)}</span>
      </div>
    </div>
  );
};

export default FeatureWaterfall;
