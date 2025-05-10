
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UrlInput from "@/components/UrlInput";
import DownloadCard from "@/components/DownloadCard";
import { downloadVideo, type DownloadResult } from "@/services/downloadService";
import { Instagram, Youtube } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);

  const handleSubmit = async (url: string, platform: string) => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const downloadResult = await downloadVideo(url, platform);
      setResult(downloadResult);
    } catch (error) {
      toast.error("Failed to process video");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center mb-8 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Social Media Video Downloader
          </h1>
          <p className="text-lg opacity-90 max-w-lg">
            Download videos from Instagram and TikTok with just a link
          </p>
        </div>

        <Card className="w-full shadow-xl">
          <CardHeader>
            <CardTitle>Download Video</CardTitle>
            <CardDescription>
              Paste the link to the video you want to download
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-8">
            <div className="flex items-center justify-center p-8">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Your Video</h2>
            <DownloadCard result={result} />
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Instagram className="h-5 w-5 text-pink-500" />
                <h3 className="font-semibold">Instagram</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Download Reels, Stories, and posts from Instagram
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Youtube className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">TikTok</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Download videos from TikTok without watermark
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12 text-white text-sm opacity-80">
          <p>Note: This is a demo application. In a real implementation, downloading would require a backend service.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
