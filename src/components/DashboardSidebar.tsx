import { Brain, BarChart3, Settings, Layers, Activity, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'models', label: 'Models', icon: Brain },
  { id: 'visualize', label: 'Visualize', icon: BarChart3 },
  { id: 'explain', label: 'Explanations', icon: Layers },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const DashboardSidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">X-Model</h1>
            <p className="text-xs text-muted-foreground">Visualizer</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
                {item.label}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <a
            href="https://shap.readthedocs.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Documentation
          </a>
          <div className="mt-3 px-3">
            <p className="text-xs text-muted-foreground">
              Powered by SHAP & LIME
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
