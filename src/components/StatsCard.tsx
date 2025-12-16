import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; isPositive: boolean };
  delay?: number;
}

const StatsCard = ({ title, value, subtitle, icon, trend, delay = 0 }: StatsCardProps) => {
  return (
    <Card
      className="relative overflow-hidden p-6 bg-gradient-card border-border hover:border-primary/30 transition-all duration-300 animate-fade-in opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-positive' : 'text-negative'
                }`}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
    </Card>
  );
};

export default StatsCard;
