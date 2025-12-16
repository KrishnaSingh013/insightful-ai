-- Create table for storing uploaded models
CREATE TABLE public.models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'classification',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  file_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public access for now since no auth required)
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view models" 
ON public.models 
FOR SELECT 
USING (true);

-- Allow public insert access
CREATE POLICY "Anyone can create models" 
ON public.models 
FOR INSERT 
WITH CHECK (true);

-- Allow public delete access
CREATE POLICY "Anyone can delete models" 
ON public.models 
FOR DELETE 
USING (true);

-- Create storage bucket for model files
INSERT INTO storage.buckets (id, name, public) VALUES ('models', 'models', true);

-- Storage policies for model files
CREATE POLICY "Anyone can view model files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'models');

CREATE POLICY "Anyone can upload model files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'models');

CREATE POLICY "Anyone can delete model files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'models');