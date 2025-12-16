import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus, FileCode } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ModelUploadProps {
  onUploadSuccess: () => void;
}

const ModelUpload = ({ onUploadSuccess }: ModelUploadProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('classification');
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a model name');
      return;
    }
    
    if (features.length === 0) {
      toast.error('Please add at least one feature');
      return;
    }

    setIsUploading(true);

    try {
      let filePath = null;

      // Upload file if provided
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${name.replace(/\s+/g, '-')}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('models')
          .upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }
        
        filePath = fileName;
      }

      // Insert model metadata
      const { error: insertError } = await supabase
        .from('models')
        .insert({
          name,
          description,
          type,
          features,
          file_path: filePath
        });

      if (insertError) {
        throw insertError;
      }

      toast.success('Model uploaded successfully!');
      
      // Reset form
      setName('');
      setDescription('');
      setType('classification');
      setFeatures([]);
      setFile(null);
      
      onUploadSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload model');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg p-2 bg-primary/20">
          <Upload className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Upload New Model</h3>
          <p className="text-sm text-muted-foreground">Add your ML model for XAI visualization</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Model Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Credit Risk Classifier"
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this model does..."
            className="bg-background border-border resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Model Type</Label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground"
          >
            <option value="classification">Classification</option>
            <option value="regression">Regression</option>
            <option value="clustering">Clustering</option>
            <option value="neural-network">Neural Network</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Features</Label>
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add feature name"
              className="bg-background border-border"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={handleAddFeature}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {features.map((feature) => (
              <Badge key={feature} variant="secondary" className="gap-1">
                {feature}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => handleRemoveFeature(feature)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Model File (optional)</Label>
          <div className="flex items-center gap-3">
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".pkl,.h5,.pt,.onnx,.joblib,.json"
              className="bg-background border-border"
            />
            {file && (
              <Badge variant="outline" className="gap-1">
                <FileCode className="h-3 w-3" />
                {file.name}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Supported formats: .pkl, .h5, .pt, .onnx, .joblib, .json
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? (
            <>Uploading...</>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Model
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ModelUpload;
