
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Instagram, Youtube } from "lucide-react";
import { triggerDownload } from "@/services/downloadService";
import type { DownloadResult } from "@/services/downloadService";

interface DownloadCardProps {
  result: DownloadResult;
}

const DownloadCard = ({ result }: DownloadCardProps) => {
  const handleDownload = () => {
    triggerDownload(result.videoUrl, `video-${result.id}.mp4`);
  };

  const PlatformIcon = () => {
    switch (result.platform) {
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "tiktok":
        return <Youtube className="h-5 w-5" />;
      default:
        return <Download className="h-5 w-5" />;
    }
  };

  return (
    <Card className="overflow-hidden border shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={result.thumbnailUrl}
          alt="Video thumbnail"
          className="h-full w-full object-cover"
        />
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
      </CardContent>
    </Card>
  );
};

export default DownloadCard;
