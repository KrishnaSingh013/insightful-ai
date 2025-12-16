import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { LIMEExplanation } from '@/types/xai';
import { Badge } from '@/components/ui/badge';

interface LIMEChartProps {
  data: LIMEExplanation;
}

const LIMEChart = ({ data }: LIMEChartProps) => {
  const chartData = [...data.features]
    .sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance))
    .map((f) => ({
      name: f.feature,
      value: f.importance,
      fill: f.importance >= 0 ? 'hsl(174, 72%, 56%)' : 'hsl(262, 60%, 58%)',
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass rounded-lg px-4 py-3 shadow-card">
          <p className="font-mono text-xs text-muted-foreground">{item.name}</p>
          <p className="font-mono text-lg font-semibold" style={{ color: item.fill }}>
            {item.value > 0 ? '+' : ''}{(item.value * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary">
            {data.prediction}
          </Badge>
          <span className="font-mono text-sm text-muted-foreground">
            Confidence: {(data.confidence * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Supports</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-secondary" />
            <span className="text-sm text-muted-foreground">Opposes</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 150, bottom: 0 }}>
          <XAxis
            type="number"
            stroke="hsl(215, 15%, 55%)"
            fontSize={12}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(215, 15%, 55%)"
            fontSize={11}
            tick={{ fill: 'hsl(210, 20%, 95%)', fontFamily: 'JetBrains Mono' }}
            width={140}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(220, 15%, 15%)' }} />
          <ReferenceLine x={0} stroke="hsl(220, 15%, 25%)" />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LIMEChart;
