import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { SHAPExplanation, LIMEExplanation } from '@/types/xai';
import SHAPChart from './charts/SHAPChart';
import LIMEChart from './charts/LIMEChart';
import FeatureWaterfall from './charts/FeatureWaterfall';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

interface ExplanationPanelProps {
  shap: SHAPExplanation | null;
  lime: LIMEExplanation | null;
  prediction?: string | number;
  probability?: number;
}

const ExplanationPanel = ({ shap, lime, prediction, probability }: ExplanationPanelProps) => {
  if (!shap && !lime) {
    return (
      <Card className="flex h-96 items-center justify-center border-dashed border-border bg-muted/20">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Sparkles className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground">No Explanation Available</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Select a model and run a prediction to see XAI explanations
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Prediction Summary */}
      {prediction !== undefined && (
        <Card className="p-6 bg-gradient-card border-border animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/20 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Model Prediction</p>
                <p className="text-2xl font-bold text-foreground">{prediction}</p>
              </div>
            </div>
            {probability !== undefined && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Confidence</p>
                <p className="text-2xl font-bold text-primary">
                  {(probability * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* XAI Explanations */}
      <Tabs defaultValue="shap" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="shap" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Zap className="h-4 w-4 mr-2" />
            SHAP Values
          </TabsTrigger>
          <TabsTrigger value="lime" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Sparkles className="h-4 w-4 mr-2" />
            LIME
          </TabsTrigger>
          <TabsTrigger value="waterfall" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <TrendingUp className="h-4 w-4 mr-2" />
            Waterfall
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shap" className="mt-4">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary font-mono">
                SHAP
              </Badge>
              <span className="text-sm text-muted-foreground">
                SHapley Additive exPlanations
              </span>
            </div>
            {shap ? (
              <SHAPChart data={shap} />
            ) : (
              <p className="text-center text-muted-foreground py-8">SHAP data not available</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="lime" className="mt-4">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="outline" className="border-secondary/50 bg-secondary/10 text-secondary font-mono">
                LIME
              </Badge>
              <span className="text-sm text-muted-foreground">
                Local Interpretable Model-agnostic Explanations
              </span>
            </div>
            {lime ? (
              <LIMEChart data={lime} />
            ) : (
              <p className="text-center text-muted-foreground py-8">LIME data not available</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="waterfall" className="mt-4">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="outline" className="border-positive/50 bg-positive/10 text-positive font-mono">
                Waterfall
              </Badge>
              <span className="text-sm text-muted-foreground">
                Feature contribution breakdown
              </span>
            </div>
            {shap ? (
              <FeatureWaterfall data={shap} />
            ) : (
              <p className="text-center text-muted-foreground py-8">Waterfall data not available</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplanationPanel;
