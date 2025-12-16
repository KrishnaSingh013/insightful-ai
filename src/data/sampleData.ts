import { FeatureImportance, SHAPExplanation, LIMEExplanation, ModelInfo } from '@/types/xai';

// Model-specific SHAP explanations
export const sampleSHAPDataByModel: Record<string, SHAPExplanation> = {
  'loan-approval': {
    baseValue: 0.5,
    outputValue: 0.82,
    features: [
      { feature: 'income', importance: 0.25, direction: 'positive' },
      { feature: 'credit_score', importance: 0.18, direction: 'positive' },
      { feature: 'age', importance: 0.12, direction: 'positive' },
      { feature: 'employment_years', importance: 0.08, direction: 'positive' },
      { feature: 'debt_ratio', importance: -0.15, direction: 'negative' },
      { feature: 'num_accounts', importance: -0.06, direction: 'negative' },
      { feature: 'loan_amount', importance: -0.10, direction: 'negative' },
      { feature: 'education', importance: 0.05, direction: 'positive' },
    ],
  },
  'churn-prediction': {
    baseValue: 0.35,
    outputValue: 0.28,
    features: [
      { feature: 'tenure', importance: -0.22, direction: 'negative' },
      { feature: 'monthly_charges', importance: 0.18, direction: 'positive' },
      { feature: 'total_charges', importance: -0.12, direction: 'negative' },
      { feature: 'contract_type', importance: -0.15, direction: 'negative' },
      { feature: 'payment_method', importance: 0.08, direction: 'positive' },
      { feature: 'internet_service', importance: 0.16, direction: 'positive' },
    ],
  },
  'price-prediction': {
    baseValue: 350000,
    outputValue: 485000,
    features: [
      { feature: 'sqft', importance: 85000, direction: 'positive' },
      { feature: 'location_score', importance: 45000, direction: 'positive' },
      { feature: 'bedrooms', importance: 25000, direction: 'positive' },
      { feature: 'bathrooms', importance: 18000, direction: 'positive' },
      { feature: 'age', importance: -22000, direction: 'negative' },
      { feature: 'garage', importance: 12000, direction: 'positive' },
      { feature: 'pool', importance: 8000, direction: 'positive' },
    ],
  },
};

// Model-specific LIME explanations
export const sampleLIMEDataByModel: Record<string, LIMEExplanation> = {
  'loan-approval': {
    prediction: 'Approved',
    confidence: 0.82,
    features: [
      { feature: 'income > 75000', importance: 0.32, direction: 'positive' },
      { feature: 'credit_score > 700', importance: 0.24, direction: 'positive' },
      { feature: 'employment_years > 5', importance: 0.15, direction: 'positive' },
      { feature: 'age between 30-50', importance: 0.11, direction: 'positive' },
      { feature: 'debt_ratio < 0.3', importance: -0.18, direction: 'negative' },
      { feature: 'num_accounts > 5', importance: -0.08, direction: 'negative' },
    ],
  },
  'churn-prediction': {
    prediction: 'Stay',
    confidence: 0.72,
    features: [
      { feature: 'tenure > 12 months', importance: -0.28, direction: 'negative' },
      { feature: 'contract = One year', importance: -0.22, direction: 'negative' },
      { feature: 'monthly_charges > 70', importance: 0.19, direction: 'positive' },
      { feature: 'internet = Fiber optic', importance: 0.15, direction: 'positive' },
      { feature: 'payment = Credit card', importance: 0.08, direction: 'positive' },
      { feature: 'total_charges > 1500', importance: -0.12, direction: 'negative' },
    ],
  },
  'price-prediction': {
    prediction: '$485,000',
    confidence: 0.89,
    features: [
      { feature: 'sqft > 2000', importance: 0.35, direction: 'positive' },
      { feature: 'location_score > 8', importance: 0.25, direction: 'positive' },
      { feature: 'bedrooms = 4', importance: 0.15, direction: 'positive' },
      { feature: 'age < 20 years', importance: -0.12, direction: 'negative' },
      { feature: 'has pool', importance: 0.08, direction: 'positive' },
      { feature: 'garage spaces = 2', importance: 0.06, direction: 'positive' },
    ],
  },
};

// Legacy exports for backward compatibility
export const sampleSHAPData = sampleSHAPDataByModel['loan-approval'];
export const sampleLIMEData = sampleLIMEDataByModel['loan-approval'];

export const sampleModels: ModelInfo[] = [
  {
    id: 'loan-approval',
    name: 'Loan Approval Model',
    type: 'Random Forest Classifier',
    features: ['income', 'credit_score', 'age', 'employment_years', 'debt_ratio', 'num_accounts', 'loan_amount', 'education'],
    description: 'Predicts whether a loan application will be approved based on applicant features.',
  },
  {
    id: 'churn-prediction',
    name: 'Customer Churn Model',
    type: 'XGBoost Classifier',
    features: ['tenure', 'monthly_charges', 'total_charges', 'contract_type', 'payment_method', 'internet_service'],
    description: 'Predicts customer churn probability for subscription services.',
  },
  {
    id: 'price-prediction',
    name: 'House Price Model',
    type: 'Gradient Boosting Regressor',
    features: ['sqft', 'bedrooms', 'bathrooms', 'location_score', 'age', 'garage', 'pool'],
    description: 'Predicts house prices based on property features.',
  },
];

export const sampleFeatureValues: Record<string, Record<string, number | string>> = {
  'loan-approval': {
    income: 85000,
    credit_score: 720,
    age: 35,
    employment_years: 8,
    debt_ratio: 0.25,
    num_accounts: 4,
    loan_amount: 250000,
    education: 'Bachelor',
  },
  'churn-prediction': {
    tenure: 24,
    monthly_charges: 75.5,
    total_charges: 1812,
    contract_type: 'One year',
    payment_method: 'Credit card',
    internet_service: 'Fiber optic',
  },
  'price-prediction': {
    sqft: 2200,
    bedrooms: 4,
    bathrooms: 2.5,
    location_score: 8.5,
    age: 15,
    garage: 2,
    pool: 1,
  },
};
