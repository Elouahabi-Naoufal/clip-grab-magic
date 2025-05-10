
// This is a frontend mock service
// In a real application, this would call a backend API

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

// Mock function to simulate API call delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

export const downloadVideo = async (videoUrl: string, platform: string): Promise<DownloadResult> => {
  try {
    // Simulate API call delay
    await delay(2000);
    
    // In a real application, we would call an actual API here
    // For now, we'll just return mock data
    
    // Random failure for demonstration (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to process video. Please try again.");
    }
    
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

// Function to trigger download
export const triggerDownload = (url: string, filename: string): void => {
  // In a real implementation, this would create a proper download
  // For now we'll just open the URL in a new tab
  window.open(url, '_blank');
  
  toast.success("Download started!");
};
