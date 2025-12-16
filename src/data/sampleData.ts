import { FeatureImportance, SHAPExplanation, LIMEExplanation, ModelInfo } from '@/types/xai';

export const sampleSHAPData: SHAPExplanation = {
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
};

export const sampleLIMEData: LIMEExplanation = {
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
};

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
