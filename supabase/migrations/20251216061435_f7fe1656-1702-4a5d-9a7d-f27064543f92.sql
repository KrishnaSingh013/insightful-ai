-- Set the models bucket to private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'models';