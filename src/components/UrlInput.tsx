
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidSocialMediaUrl } from "@/utils/validators";
import { Instagram, Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface UrlInputProps {
  onSubmit: (url: string, platform: string) => void;
  isLoading: boolean;
}

const UrlInput = ({ onSubmit, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, platform } = isValidSocialMediaUrl(url);
    
    if (!isValid) {
      toast.error("Please enter a valid Instagram or TikTok URL");
      return;
    }
    
    if (platform) {
      onSubmit(url, platform);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            type="url"
            placeholder="Paste Instagram or TikTok link here"
            className="w-full pl-10 pr-4 h-12 text-base"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Instagram className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6" 
          disabled={isLoading || !url.trim()}
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
    </form>
  );
};

export default UrlInput;
