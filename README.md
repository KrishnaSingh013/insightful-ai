## Project Title: Explainable AI Dashboard
# Overview

This project is an interactive dashboard for Explainable AI (XAI) which provides visualizations of machine learning model predictions and insights. The dashboard integrates various charting techniques like SHAP and **LIME** for model explainability, alongside features to upload, select, and view machine learning models.

The project is divided into four core modules, handled by different team members for efficient development and maintenance.

# Tech Stack

**Frontend:-**

React.js

TypeScript

Tailwind CSS

Shadcn UI Components

**Backend:-**

Supabase (for database & authentication)

**Data Visualization:-**:

SHAP (Shapley Additive Explanations)

LIME (Local Interpretable Model-Agnostic Explanations)

**State Management:-**

React Hooks

**Development Tools**:

Vite (Build tool)

Git (Version control)

Project Structure

The project is divided into the following key parts, with each team member responsible for specific sections:

# 1. Frontend Components (Harshit Dubey)

**UI Components**:

Custom Shadcn UI components for reusable UI elements.

Dashboard sidebar, model selector, feature input components, etc.

**Charts**:

FeatureWaterfall.tsx: Visualization of feature importance using SHAP.

LIMEChart.tsx: Visualization of LIME-based explainability.

SHAPChart.tsx: Display of SHAP explanations for model predictions.

**Pages**:

Auth.tsx: Login page.

Index.tsx: Main dashboard to visualize models and explanations.

# 2. Backend Integrations (Abhishek Naman)

**Supabase Integration**:

client.ts: Initialization and connection to Supabase for database & authentication.

types.ts: Type definitions for data coming from Supabase.

**Authentication**:

Handling user authentication with Supabase’s auth services.

# 3. Data & Model Management (Anshuman Dash)

**Data**:

sampleData.ts: Contains sample machine learning models and sample data for SHAP and LIME visualizations.

**Model Upload & Selection**:

Handle uploading and selecting models, interacting with the SHAP and LIME algorithms.

# 4. UI/UX and Style (Priyavrat Singh)

**Global Styling**:

App.css: Global styles for the application.

tailwind.config.ts: Tailwind CSS configuration for utility-first styling.

Custom UI components and styling to ensure a user-friendly experience.

**App & Routing**:

App.tsx: Main app structure with routing to various components.

index.tsx: Entry point for the React app.

# Installation

Follow these steps to set up the project locally:

**Clone the repository**:

git clone https://github.com/KrishnaSingh013/insightful-ai

**Install dependencies**:

Make sure you have Node.js
 installed. Then, run:

npm install


# Running Locally

To start the app locally:

**Start the development server**:

npm run dev


**Open your browser**:

Navigate to http://localhost:3000 to view the app in action.

# Contributing

We welcome contributions! If you'd like to contribute, please fork this repository and create a pull request. Here are a few guidelines to follow:

**Feature Requests**: Open an issue if you have an idea for a new feature.

**Bug Reports**: Report any bugs or issues by creating an issue.

**Code Style**: Make sure your code adheres to the existing style and conventions.

# Team Members

**Priyavrat Singh** - UI/UX Specialist & UI Components

**Anshuman Dash** - Data Management & Model Handling

**Harshit Dubey** - Frontend Developer

**Abhishek Naman** - Backend,Supabase Integration & React Development
