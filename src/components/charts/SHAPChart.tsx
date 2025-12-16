import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { SHAPExplanation } from '@/types/xai';

interface SHAPChartProps {
  data: SHAPExplanation;
}

const SHAPChart = ({ data }: SHAPChartProps) => {
  const chartData = [...data.features]
    .sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance))
    .map((f) => ({
      name: f.feature,
      value: f.importance,
      fill: f.importance >= 0 ? 'hsl(152, 76%, 50%)' : 'hsl(0, 72%, 55%)',
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass rounded-lg px-4 py-3 shadow-card">
          <p className="font-mono text-sm text-foreground">{item.name}</p>
          <p className="font-mono text-lg font-semibold" style={{ color: item.fill }}>
            {item.value > 0 ? '+' : ''}{item.value.toFixed(3)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-positive" />
            <span className="text-sm text-muted-foreground">Positive Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-negative" />
            <span className="text-sm text-muted-foreground">Negative Impact</span>
          </div>
        </div>
        <div className="font-mono text-sm text-muted-foreground">
          Base: {data.baseValue.toFixed(2)} → Output: {data.outputValue.toFixed(2)}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 120, bottom: 0 }}>
          <XAxis type="number" stroke="hsl(215, 15%, 55%)" fontSize={12} tickFormatter={(v) => v.toFixed(2)} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(215, 15%, 55%)"
            fontSize={12}
            tick={{ fill: 'hsl(210, 20%, 95%)', fontFamily: 'JetBrains Mono' }}
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

export default SHAPChart;
