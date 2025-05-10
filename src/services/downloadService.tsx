import { toast } from "@/components/ui/sonner";

export interface DownloadResult {
  id: string;
  url: string;
  platform: string;
  thumbnailUrl: string;
  videoUrl: string;
  author: string;
  title: string;
}

/**
 * API endpoint for the backend service
 * IMPORTANT: Replace with your actual Supabase Edge Function URL when deployed
 */
const API_ENDPOINT = import.meta.env.VITE_DOWNLOAD_API_URL || "/api/download"; 

/**
 * Make a request to the backend to download a social media video
 */
export const downloadVideo = async (videoUrl: string, platform: string): Promise<DownloadResult> => {
  try {
    // Show a loading toast
    const loadingToast = toast.loading("Processing your video...");
    
    // Make a request to our backend API
    const response = await fetch(`${API_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: videoUrl,
        platform: platform,
      }),
    });
    
    // Dismiss loading toast
    toast.dismiss(loadingToast);
    
    if (!response.ok) {
      // Handle error responses
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || "Failed to process video";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    // Parse the response
    const data = await response.json();
    
    // Return the download result
    return {
      id: data.id || Math.random().toString(36).substring(2, 9),
      url: videoUrl,
      platform,
      thumbnailUrl: data.thumbnailUrl,
      videoUrl: data.videoUrl,
      author: data.author || `@${platform}_user`,
      title: data.title || "Video from " + platform
    };
  } catch (error) {
    console.error("Download error:", error);
    let errorMessage = "Failed to process video";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Function to trigger a file download
 */
export const triggerDownload = (url: string, filename: string): void => {
  // Create a hidden anchor element
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  
  // Add to the DOM
  document.body.appendChild(a);
  
  // Trigger the download
  a.click();
  
  // Clean up
  document.body.removeChild(a);
  
  toast.success("Download started!");
};

/**
 * DEV MODE: Use this function for local testing with mock data
 * This simulates the backend service response
 */
export const mockDownloadVideo = async (videoUrl: string, platform: string): Promise<DownloadResult> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, we would call an actual API here
    // For now, we'll just return mock data
    
    // Random failure for demonstration (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to process video. Please try again.");
    }
    
    // Mock data for different platforms
    const mockData = {
      instagram: {
        thumbnailUrl: "https://picsum.photos/seed/insta/640/640",
        author: "@instagram_user",
        title: "Check out this amazing Instagram video!"
      },
      tiktok: {
        thumbnailUrl: "https://picsum.photos/seed/tiktok/640/640",
        author: "@tiktok_user",
        title: "Trending TikTok video #fyp"
      }
    };
    
    // Return mock result
    return {
      id: Math.random().toString(36).substring(2, 9),
      url: videoUrl,
      platform: platform,
      thumbnailUrl: mockData[platform as keyof typeof mockData].thumbnailUrl,
      videoUrl: "https://example.com/mock-video.mp4", // This would be the actual downloadable URL
      author: mockData[platform as keyof typeof mockData].author,
      title: mockData[platform as keyof typeof mockData].title
    };
  } catch (error) {
    toast.error("Failed to process video");
    throw error;
  }
};
