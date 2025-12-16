import { useState } from 'react';
import { APIConfig } from '@/types/xai';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link2, Check, AlertCircle } from 'lucide-react';

interface APIConfigProps {
  config: APIConfig;
  onSave: (config: APIConfig) => void;
  connectionStatus: 'connected' | 'disconnected' | 'testing';
  onTest: () => void;
}

const APIConfigPanel = ({ config, onSave, connectionStatus, onTest }: APIConfigProps) => {
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    onSave(localConfig);
  };

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-secondary/20 p-2">
            <Link2 className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">API Configuration</h3>
            <p className="text-sm text-muted-foreground">Connect to your Flask backend</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`font-mono text-xs ${
            connectionStatus === 'connected'
              ? 'border-positive/50 bg-positive/10 text-positive'
              : connectionStatus === 'testing'
              ? 'border-primary/50 bg-primary/10 text-primary'
              : 'border-negative/50 bg-negative/10 text-negative'
          }`}
        >
          {connectionStatus === 'connected' && <Check className="h-3 w-3 mr-1" />}
          {connectionStatus === 'disconnected' && <AlertCircle className="h-3 w-3 mr-1" />}
          {connectionStatus}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="baseUrl" className="font-mono text-sm text-muted-foreground">
            Base URL
          </Label>
          <Input
            id="baseUrl"
            type="url"
            placeholder="http://localhost:5000/api"
            value={localConfig.baseUrl}
            onChange={(e) => setLocalConfig((prev) => ({ ...prev, baseUrl: e.target.value }))}
            className="font-mono bg-background/50 border-border focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apiKey" className="font-mono text-sm text-muted-foreground">
            API Key (optional)
          </Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Enter your API key"
            value={localConfig.apiKey || ''}
            onChange={(e) => setLocalConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
            className="font-mono bg-background/50 border-border focus:border-primary"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onTest}
            disabled={connectionStatus === 'testing'}
            className="border-border hover:bg-muted"
          >
            {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-secondary text-secondary-foreground hover:opacity-90"
          >
            Save Configuration
          </Button>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Expected Endpoints:</span>
        </p>
        <ul className="mt-2 space-y-1 font-mono text-xs text-muted-foreground">
          <li>GET /models - List available models</li>
          <li>POST /predict - Get prediction with XAI</li>
          <li>GET /health - Check API status</li>
        </ul>
      </div>
    </Card>
  );
};

export default APIConfigPanel;
