export interface FeatureImportance {
  feature: string;
  importance: number;
  direction: 'positive' | 'negative' | 'neutral';
}

export interface SHAPExplanation {
  baseValue: number;
  outputValue: number;
  features: FeatureImportance[];
}

export interface LIMEExplanation {
  prediction: string;
  confidence: number;
  features: FeatureImportance[];
}

export interface PredictionRequest {
  modelId: string;
  features: Record<string, number | string>;
}

export interface PredictionResponse {
  prediction: string | number;
  probability?: number;
  shap?: SHAPExplanation;
  lime?: LIMEExplanation;
}

export interface ModelInfo {
  id: string;
  name: string;
  type: string;
  features: string[];
  description: string;
}

export interface APIConfig {
  baseUrl: string;
  apiKey?: string;
}
