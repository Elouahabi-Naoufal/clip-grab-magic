
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Instagram, Play } from "lucide-react";
import { triggerDownload } from "@/services/downloadService";
import { TikTok } from "@/components/Icons";
import type { DownloadResult } from "@/services/downloadService";

interface DownloadCardProps {
  result: DownloadResult;
}

const DownloadCard = ({ result }: DownloadCardProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = () => {
    triggerDownload(result.videoUrl, `video-${result.id}.mp4`);
  };

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  const PlatformIcon = () => {
    switch (result.platform) {
      case "instagram":
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case "tiktok":
        return <TikTok className="h-5 w-5 text-black" />;
      default:
        return <Download className="h-5 w-5" />;
    }
  };

  return (
    <Card className="overflow-hidden border shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {isPreviewOpen ? (
          <div className="w-full h-full">
            <video 
              src={result.videoUrl} 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <>
            <img
              src={result.thumbnailUrl}
              alt="Video thumbnail"
              className="h-full w-full object-cover"
            />
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute inset-0 m-auto h-12 w-12 rounded-full opacity-80 hover:opacity-100"
              onClick={togglePreview}
            >
              <Play className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <PlatformIcon />
              <p className="text-sm font-medium text-muted-foreground">
                {result.author}
              </p>
            </div>
            <h3 className="font-semibold line-clamp-2" title={result.title}>
              {result.title}
            </h3>
          </div>
          <Button
            size="sm"
            className="ml-2 shrink-0"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        {isPreviewOpen && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={togglePreview}
          >
            Hide Preview
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DownloadCard;
