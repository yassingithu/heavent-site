import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, File, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  label: string;
  bucket: 'photos' | 'identites';
  onFileUploaded: (fileName: string) => void;
  uploadedFile?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  bucket,
  onFileUploaded,
  uploadedFile
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset l'input pour permettre de sélectionner le même fichier si nécessaire
    event.target.value = '';

    // Validation du type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Type de fichier non supporté",
        description: "Veuillez choisir une image (JPEG, PNG, WebP)",
        variant: "destructive",
      });
      return;
    }

    // Validation de la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      toast({
        title: "Fichier trop volumineux",
        description: `La taille maximale autorisée est de 5MB. Votre fichier fait ${(file.size / (1024 * 1024)).toFixed(1)}MB`,
        variant: "destructive",
      });
      return;
    }

    // Validation des dimensions d'image (optionnel)
    const img = new Image();
    img.onload = async () => {
      // Libérer la mémoire
      URL.revokeObjectURL(img.src);
      
      // Procéder à l'upload
      await performUpload(file);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      toast({
        title: "Fichier invalide",
        description: "Le fichier sélectionné n'est pas une image valide",
        variant: "destructive",
      });
    };
    
    img.src = URL.createObjectURL(file);
  };

  const performUpload = async (file: File) => {
    setIsUploading(true);

    try {
      // Créer un nom de fichier unique avec timestamp et chaîne aléatoire
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2);
      const fileName = `${timestamp}-${randomString}.${fileExt}`;
      const filePath = `${bucket}/${fileName}`;

      console.log(`📤 Début upload: ${fileName} (${(file.size / 1024).toFixed(1)}KB)`);

      // Upload vers Supabase Storage avec retry en cas d'échec
      let uploadError;
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        const { error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (!error) {
          uploadError = null;
          break;
        }

        uploadError = error;
        retryCount++;
        
        if (retryCount < maxRetries) {
          console.log(`⚠️ Échec upload, tentative ${retryCount + 1}/${maxRetries}`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Délai croissant
        }
      }

      if (uploadError) {
        throw new Error(`Échec upload après ${maxRetries} tentatives: ${uploadError.message}`);
      }

      // Créer une URL de prévisualisation locale
      const localPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(localPreviewUrl);

      onFileUploaded(fileName);
      
      console.log(`✅ Upload réussi: ${fileName}`);
      
      toast({
        title: "Fichier uploadé avec succès",
        description: `${file.name} a été uploadé avec succès`,
      });

    } catch (error: any) {
      console.error('❌ Erreur upload:', error);
      
      let errorMessage = "Une erreur est survenue lors de l'upload. Veuillez réessayer.";
      
      // Messages d'erreur spécifiques
      if (error.message?.includes('duplicate')) {
        errorMessage = "Un fichier avec ce nom existe déjà. Veuillez réessayer.";
      } else if (error.message?.includes('Payload too large')) {
        errorMessage = "Le fichier est trop volumineux pour être uploadé.";
      } else if (error.message?.includes('Network')) {
        errorMessage = "Problème de connexion. Vérifiez votre connexion internet.";
      }
      
      toast({
        title: "Erreur d'upload",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setPreviewUrl(null);
    onFileUploaded('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-dashed border-muted-foreground rounded-lg">
      <div className="flex items-center space-x-2">
        {uploadedFile || previewUrl ? (
          <Check className="text-green-500" size={20} />
        ) : (
          <Upload size={20} />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">{label}</span>
          {(uploadedFile || previewUrl) && (
            <span className="text-xs text-green-600">✓ Fichier uploadé</span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {previewUrl && (
          <img 
            src={previewUrl} 
            alt="Aperçu" 
            className="w-10 h-10 object-cover rounded border"
          />
        )}
        
        {(uploadedFile || previewUrl) && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeFile}
            className="text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </Button>
        )}
        
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            disabled={isUploading}
          >
            {isUploading ? 'Upload...' : 'Choisir un fichier'}
          </Button>
        </div>
      </div>
    </div>
  );
};