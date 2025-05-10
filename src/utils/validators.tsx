
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
      return { isValid: true, platform: "instagram" };
    }
    
    // Check for TikTok links
    else if (urlObj.hostname.includes("tiktok.com") || urlObj.hostname.includes("vm.tiktok.com")) {
      return { isValid: true, platform: "tiktok" };
    }
    
    // Not a supported platform
    return { isValid: false, platform: null };
  } catch (error) {
    // URL is not valid
    return { isValid: false, platform: null };
  }
};
