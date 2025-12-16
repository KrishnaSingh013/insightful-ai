-- Add user_id to models table
ALTER TABLE public.models ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view models" ON public.models;
DROP POLICY IF EXISTS "Anyone can create models" ON public.models;
DROP POLICY IF EXISTS "Anyone can delete models" ON public.models;

-- Create user-specific RLS policies
CREATE POLICY "Users can view their own models" 
ON public.models 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own models" 
ON public.models 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own models" 
ON public.models 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own models" 
ON public.models 
FOR DELETE 
USING (auth.uid() = user_id);

-- Update storage policies for user-specific access
DROP POLICY IF EXISTS "Anyone can view model files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload model files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete model files" ON storage.objects;

CREATE POLICY "Users can view their own model files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'models' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own model files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'models' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own model files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'models' AND auth.uid()::text = (storage.foldername(name))[1]);