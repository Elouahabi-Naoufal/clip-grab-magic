
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UrlInput from "@/components/UrlInput";
import DownloadCard from "@/components/DownloadCard";
import { downloadVideo, mockDownloadVideo, type DownloadResult } from "@/services/downloadService";
import { Instagram, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { TikTok } from "@/components/Icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [isDev, setIsDev] = useState(false);
  const [apiConfigured, setApiConfigured] = useState(true);

  // Check if we're in development mode and if the API endpoint is configured
  useEffect(() => {
    // Check if we're in development mode
    setIsDev(import.meta.env.DEV === true);
    
    // Check if API endpoint is configured
    const apiUrl = import.meta.env.VITE_DOWNLOAD_API_URL;
    setApiConfigured(!!apiUrl);
  }, []);

  const handleSubmit = async (url: string, platform: string) => {
    setIsLoading(true);
    setResult(null);
    
    try {
      // Use mock service in development mode if API is not configured
      const downloadResult = (!apiConfigured && isDev) 
        ? await mockDownloadVideo(url, platform) 
        : await downloadVideo(url, platform);
        
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

        {(!apiConfigured && !isDev) && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>API Not Configured</AlertTitle>
            <AlertDescription>
              The API endpoint is not configured. Please set the VITE_DOWNLOAD_API_URL environment variable.
            </AlertDescription>
          </Alert>
        )}

        {(isDev && !apiConfigured) && (
          <Alert className="mb-6 bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle>Development Mode</AlertTitle>
            <AlertDescription>
              Running in development mode with mock data. Set VITE_DOWNLOAD_API_URL for real API calls.
            </AlertDescription>
          </Alert>
        )}

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
                <TikTok className="h-5 w-5" />
                <h3 className="font-semibold">TikTok</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Download videos from TikTok without watermark
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12 text-white text-sm opacity-80">
          <p>Note: This application is for personal use only. Please respect copyright and terms of service.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
