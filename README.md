
# Social Media Video Downloader

A web application that allows users to download videos from Instagram and TikTok using just the video URL.

## Features

- Download videos from Instagram (Reels, Posts, IGTV)
- Download videos from TikTok
- Preview videos before download
- Clean and responsive UI

## Setup Instructions

### Frontend Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
4. Update the `.env` file with your Supabase Edge Function URL
5. Run the development server:
   ```
   npm run dev
   ```

### Backend Setup (Supabase)

This application uses Supabase Edge Functions to handle the video downloading process.

1. Connect your Lovable project to Supabase using the green Supabase button in the interface
2. Deploy the Edge Function to your Supabase project:
   ```
   npx supabase functions deploy download
   ```
3. Set up the required API keys in your Supabase project:
   ```
   npx supabase secrets set INSTAGRAM_API_KEY=your_instagram_api_key
   npx supabase secrets set TIKTOK_API_KEY=your_tiktok_api_key
   ```

## API Keys

This application requires API keys for downloading videos from Instagram and TikTok. You can get these from RapidAPI:

1. Instagram Downloader API: https://rapidapi.com/datascraper/api/instagram-downloader-download-instagram-videos-stories/
2. TikTok Downloader API: https://rapidapi.com/datascraper/api/tiktok-downloader-download-tiktok-videos-without-watermark/

After signing up for these APIs, add the API keys to your Supabase secrets.

## Environment Variables

- `VITE_DOWNLOAD_API_URL`: The URL of your deployed Supabase Edge Function

## Technology Stack

- Frontend: React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Supabase Edge Functions (Deno)
- APIs: RapidAPI Instagram & TikTok Downloader APIs

## Important Note

This application is for personal use only. Please respect the terms of service of Instagram and TikTok, as well as copyright laws when using this tool.
