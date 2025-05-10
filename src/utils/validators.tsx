
export const isValidSocialMediaUrl = (url: string): { isValid: boolean; platform: string | null } => {
  // Basic validation for empty string
  if (!url.trim()) {
    return { isValid: false, platform: null };
  }

  try {
    // Try to parse the URL to check its validity
    const urlObj = new URL(url);
    
    // Check for Instagram links
    if (urlObj.hostname.includes("instagram.com") || urlObj.hostname.includes("instagr.am")) {
      // Check if it's a valid Instagram post/reel URL structure
      if (urlObj.pathname.includes("/p/") || urlObj.pathname.includes("/reel/") || urlObj.pathname.includes("/tv/")) {
        return { isValid: true, platform: "instagram" };
      }
    }
    
    // Check for TikTok links
    else if (urlObj.hostname.includes("tiktok.com") || urlObj.hostname.includes("vm.tiktok.com")) {
      // TikTok video URLs usually have a structure with /video/ or @username
      if (urlObj.pathname.includes("/video/") || urlObj.pathname.match(/\/@[\w.-]+\/video\//)) {
        return { isValid: true, platform: "tiktok" };
      }
    }
    
    // Not a supported link format
    return { isValid: false, platform: null };
  } catch (error) {
    // URL is not valid
    return { isValid: false, platform: null };
  }
};

/**
 * Extract video ID from social media URL
 */
export const extractVideoId = (url: string, platform: string): string | null => {
  try {
    const urlObj = new URL(url);
    
    if (platform === "instagram") {
      // Extract ID from Instagram URL pattern: /p/{id}/ or /reel/{id}/
      const match = urlObj.pathname.match(/\/(p|reel|tv)\/([^\/]+)/);
      return match ? match[2] : null;
    } 
    else if (platform === "tiktok") {
      // Extract ID from TikTok URL pattern: /video/{id}
      const match = urlObj.pathname.match(/\/video\/(\d+)/);
      return match ? match[1] : null;
      
      // Alternative: extract from @username/video/{id} pattern
      const altMatch = urlObj.pathname.match(/\/@[\w.-]+\/video\/(\d+)/);
      return altMatch ? altMatch[1] : null;
    }
    
    return null;
  } catch {
    return null;
  }
};
