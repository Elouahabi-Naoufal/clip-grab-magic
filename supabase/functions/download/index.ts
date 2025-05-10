
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface DownloadRequest {
  url: string;
  platform: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { url, platform } = await req.json() as DownloadRequest;

    if (!url || !platform) {
      return new Response(
        JSON.stringify({ error: "URL and platform are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate platform
    if (!["instagram", "tiktok"].includes(platform)) {
      return new Response(
        JSON.stringify({ error: "Unsupported platform" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // IMPORTANT: Add your API keys in Supabase secrets
    // For Instagram: Use RapidAPI's Instagram Downloader API
    // For TikTok: Use RapidAPI's TikTok Downloader API
    const INSTAGRAM_API_KEY = Deno.env.get("INSTAGRAM_API_KEY");
    const TIKTOK_API_KEY = Deno.env.get("TIKTOK_API_KEY");
    
    let apiResponse;
    
    if (platform === "instagram") {
      // Call Instagram Downloader API
      apiResponse = await fetchInstagramVideo(url, INSTAGRAM_API_KEY);
    } else {
      // Call TikTok Downloader API
      apiResponse = await fetchTikTokVideo(url, TIKTOK_API_KEY);
    }

    return new Response(
      JSON.stringify(apiResponse),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to process video" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function fetchInstagramVideo(url: string, apiKey?: string) {
  if (!apiKey) {
    // Fallback to mock data if API key is missing
    console.warn("INSTAGRAM_API_KEY is missing, returning mock data");
    return mockInstagramResponse(url);
  }

  try {
    // Using RapidAPI's Instagram Downloader API as an example
    // You may need to replace this with your preferred API service
    const response = await fetch("https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "instagram-downloader-download-instagram-videos-stories.p.rapidapi.com",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform API response to our format
    return {
      id: new URL(url).pathname.split("/").filter(Boolean).pop() || "unknown",
      thumbnailUrl: data.thumbnail || "https://picsum.photos/seed/insta/640/640",
      videoUrl: data.media || "",
      author: data.username || "@instagram_user",
      title: data.title || "Instagram video",
    };
  } catch (error) {
    console.error("Instagram API error:", error);
    // Fall back to mock data in case of error
    return mockInstagramResponse(url);
  }
}

async function fetchTikTokVideo(url: string, apiKey?: string) {
  if (!apiKey) {
    // Fallback to mock data if API key is missing
    console.warn("TIKTOK_API_KEY is missing, returning mock data");
    return mockTikTokResponse(url);
  }

  try {
    // Using RapidAPI's TikTok Downloader API as an example
    // You may need to replace this with your preferred API service
    const response = await fetch("https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform API response to our format
    return {
      id: data.id || "unknown",
      thumbnailUrl: data.cover || "https://picsum.photos/seed/tiktok/640/640",
      videoUrl: data.video || "",
      author: data.author || "@tiktok_user",
      title: data.title || "TikTok video",
    };
  } catch (error) {
    console.error("TikTok API error:", error);
    // Fall back to mock data in case of error
    return mockTikTokResponse(url);
  }
}

// Mock responses for development or when API keys are missing
function mockInstagramResponse(url: string) {
  return {
    id: new URL(url).pathname.split("/").filter(Boolean).pop() || "unknown",
    thumbnailUrl: "https://picsum.photos/seed/insta/640/640",
    videoUrl: "https://example.com/mock-instagram-video.mp4",
    author: "@instagram_user",
    title: "Check out this amazing Instagram video!",
  };
}

function mockTikTokResponse(url: string) {
  return {
    id: new URL(url).pathname.split("/").filter(Boolean).pop() || "unknown",
    thumbnailUrl: "https://picsum.photos/seed/tiktok/640/640",
    videoUrl: "https://example.com/mock-tiktok-video.mp4",
    author: "@tiktok_user",
    title: "Trending TikTok video #fyp",
  };
}
