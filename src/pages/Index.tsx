import { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import ModelSelector from '@/components/ModelSelector';
import ModelUpload from '@/components/ModelUpload';
import { useAuth } from '@/hooks/useAuth';
import FeatureInput from '@/components/FeatureInput';
import APIConfigPanel from '@/components/APIConfig';
import ExplanationPanel from '@/components/ExplanationPanel';
import StatsCard from '@/components/StatsCard';
import { Card } from '@/components/ui/card';
import { sampleModels, sampleFeatureValues, sampleSHAPData, sampleLIMEData } from '@/data/sampleData';
import { ModelInfo, APIConfig, SHAPExplanation, LIMEExplanation } from '@/types/xai';
import { Brain, BarChart3, Layers, Zap, Activity, Sparkles, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

import { Button } from '@/components/ui/button';

const Index = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null);
  const [apiConfig, setApiConfig] = useState<APIConfig>({ baseUrl: 'http://localhost:5000/api' });
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [isLoading, setIsLoading] = useState(false);
  const [shapData, setShapData] = useState<SHAPExplanation | null>(null);
  const [limeData, setLimeData] = useState<LIMEExplanation | null>(null);
  const [prediction, setPrediction] = useState<string | number | undefined>();
  const [probability, setProbability] = useState<number | undefined>();
  const [uploadedModels, setUploadedModels] = useState<ModelInfo[]>([]);
  const { toast } = useToast();

  // Fetch uploaded models from database
  const fetchModels = async () => {
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching models:', error);
      }
      return;
    }

    if (data) {
      const models: ModelInfo[] = data.map((m) => ({
        id: m.id,
        name: m.name,
        type: m.type,
        features: Array.isArray(m.features) ? m.features as string[] : [],
        description: m.description || ''
      }));
      setUploadedModels(models);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Combine sample models with uploaded models
  const allModels = [...uploadedModels, ...sampleModels];

  const handleModelSelect = (model: ModelInfo) => {
    setSelectedModel(model);
    setShapData(null);
    setLimeData(null);
    setPrediction(undefined);
    setProbability(undefined);
  };

  const handlePredict = async (values: Record<string, number | string>) => {
    setIsLoading(true);
    
    // Simulate API call - in production, this would call your Flask backend
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Using sample data for demonstration
      setShapData(sampleSHAPData);
      setLimeData(sampleLIMEData);
      setPrediction(sampleLIMEData.prediction);
      setProbability(sampleLIMEData.confidence);
      
      toast({
        title: 'Prediction Complete',
        description: 'SHAP and LIME explanations generated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get prediction. Check your API connection.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simulated - in production, this would actually test the endpoint
    setConnectionStatus('disconnected');
    toast({
      title: 'Connection Test',
      description: 'Unable to connect. Using sample data for demonstration.',
      variant: 'destructive',
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
              <p className="text-muted-foreground mt-1">
                Monitor your ML model explanations and visualizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Models Available"
                value={allModels.length}
                subtitle="Ready for analysis"
                icon={<Brain className="h-6 w-6" />}
                delay={0}
              />
              <StatsCard
                title="Uploaded Models"
                value={uploadedModels.length}
                subtitle="Your custom models"
                icon={<Activity className="h-6 w-6" />}
                trend={uploadedModels.length > 0 ? { value: uploadedModels.length, isPositive: true } : undefined}
                delay={100}
              />
              <StatsCard
                title="SHAP Explanations"
                value="156"
                subtitle="Total generated"
                icon={<Zap className="h-6 w-6" />}
                trend={{ value: 8, isPositive: true }}
                delay={200}
              />
              <StatsCard
                title="LIME Analyses"
                value="89"
                subtitle="Local explanations"
                icon={<Sparkles className="h-6 w-6" />}
                trend={{ value: 5, isPositive: true }}
                delay={300}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-card border-border">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Quick Start</h3>
                </div>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                      1
                    </span>
                    <span className="text-muted-foreground">
                      Upload your model or use existing ones from Models tab
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                      2
                    </span>
                    <span className="text-muted-foreground">
                      Select a model to analyze
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                      3
                    </span>
                    <span className="text-muted-foreground">
                      Input feature values and run prediction
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                      4
                    </span>
                    <span className="text-muted-foreground">
                      View SHAP and LIME explanations
                    </span>
                  </li>
                </ol>
              </Card>

              <Card className="p-6 bg-gradient-card border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="h-5 w-5 text-secondary" />
                  <h3 className="font-semibold text-foreground">XAI Methods</h3>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-mono text-sm font-semibold text-primary">SHAP</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Uses Shapley values from game theory to calculate feature importance
                      for individual predictions.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-mono text-sm font-semibold text-secondary">LIME</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Creates local approximations using interpretable models to explain
                      individual predictions.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'models':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Available Models</h2>
              <p className="text-muted-foreground mt-1">
                Select a model to analyze or upload your own
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {uploadedModels.length > 0 ? 'Your Models & Sample Models' : 'Sample Models'}
                </h3>
                <ModelSelector
                  models={allModels}
                  selectedModel={selectedModel}
                  onSelect={handleModelSelect}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Add New Model</h3>
                <ModelUpload onUploadSuccess={fetchModels} />
              </div>
            </div>
          </div>
        );

      case 'visualize':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Visualize Predictions</h2>
              <p className="text-muted-foreground mt-1">
                Input feature values and see model explanations
              </p>
            </div>

            {selectedModel ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Input Features - {selectedModel.name}
                  </h3>
                  <FeatureInput
                    model={selectedModel}
                    initialValues={sampleFeatureValues[selectedModel.id] || {}}
                    onPredict={handlePredict}
                    isLoading={isLoading}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Prediction Result
                  </h3>
                  <ExplanationPanel
                    shap={shapData}
                    lime={limeData}
                    prediction={prediction}
                    probability={probability}
                  />
                </div>
              </div>
            ) : (
              <Card className="flex h-64 items-center justify-center border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <Brain className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground">No Model Selected</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Go to the Models tab and select a model first
                  </p>
                </div>
              </Card>
            )}
          </div>
        );

      case 'explain':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Model Explanations</h2>
              <p className="text-muted-foreground mt-1">
                Detailed SHAP and LIME analysis for your predictions
              </p>
            </div>
            <ExplanationPanel
              shap={shapData}
              lime={limeData}
              prediction={prediction}
              probability={probability}
            />
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              <p className="text-muted-foreground mt-1">
                Configure your API connection and preferences
              </p>
            </div>
            <div className="max-w-2xl">
              <APIConfigPanel
                config={apiConfig}
                onSave={setApiConfig}
                connectionStatus={connectionStatus}
                onTest={handleTestConnection}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground">
              API: {connectionStatus === 'connected' ? 'Connected' : 'Using Sample Data'}
            </span>
            <div
              className={`h-2 w-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-positive' : 'bg-negative'
              }`}
            />
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Index;
