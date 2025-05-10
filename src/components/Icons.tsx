
import React from "react";

export const TikTok: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8v0Z" />
      <path d="M15 8a4 4 0 1 0 0-0.01" />
      <path d="M12 12v-2a4 4 0 0 0 4-4v0" />
      <path d="M16 8v8a4 4 0 0 1-4 4v0a4 4 0 0 1-4-4v0" />
    </svg>
  );
};
