
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidSocialMediaUrl } from "@/utils/validators";
import { Instagram, Download, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

interface UrlInputProps {
  onSubmit: (url: string, platform: string) => void;
  isLoading: boolean;
}

const UrlInput = ({ onSubmit, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; platform: string | null } | null>(null);
  
  const validateUrl = (value: string) => {
    if (value.trim()) {
      const result = isValidSocialMediaUrl(value);
      setValidationResult(result);
      return result;
    }
    setValidationResult(null);
    return { isValid: false, platform: null };
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Only validate if we have some content
    if (newUrl.trim()) {
      // Debounce validation to avoid too many checks while typing
      setTimeout(() => validateUrl(newUrl), 300);
    } else {
      setValidationResult(null);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, platform } = validateUrl(url);
    
    if (!isValid) {
      toast.error("Please enter a valid Instagram or TikTok URL");
      return;
    }
    
    if (platform) {
      onSubmit(url, platform);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="space-y-2">
          <Label htmlFor="video-url">Video URL</Label>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                id="video-url"
                type="url"
                placeholder="Paste Instagram or TikTok link here"
                className="w-full pl-10 pr-4 h-12 text-base"
                value={url}
                onChange={handleUrlChange}
                disabled={isLoading}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Instagram className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <Button 
              type="submit" 
              className="h-12 px-6" 
              disabled={isLoading || !url.trim() || (validationResult && !validationResult.isValid)}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Processing
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {validationResult && !validationResult.isValid && url.trim() && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <p className="ml-2">This doesn't look like a valid Instagram or TikTok URL</p>
        </Alert>
      )}
      
      {validationResult && validationResult.isValid && validationResult.platform && (
        <Alert variant="default" className="mt-2 bg-muted border-primary">
          <p className="text-sm">
            Ready to download from {validationResult.platform === 'instagram' ? 'Instagram' : 'TikTok'}
          </p>
        </Alert>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>Example Instagram URL: https://www.instagram.com/p/ABC123/</p>
        <p>Example TikTok URL: https://www.tiktok.com/@username/video/1234567890</p>
      </div>
    </div>
  );
};

export default UrlInput;
