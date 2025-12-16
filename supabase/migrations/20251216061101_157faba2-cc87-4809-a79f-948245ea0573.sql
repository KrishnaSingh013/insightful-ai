-- Delete any orphaned models without user_id
DELETE FROM public.models WHERE user_id IS NULL;

-- Add NOT NULL constraint to user_id
ALTER TABLE public.models ALTER COLUMN user_id SET NOT NULL;