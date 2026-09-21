import React from 'react';

/**
 * Uber Eats official brand logo (supports custom color, default #70121D)
 */
export const UberEatsLogo: React.FC<{ className?: string; color?: string }> = ({
  className = 'h-5 w-auto',
  color = '#70121D',
}) => (
  <svg
    viewBox="0 0 135 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Uber Eats"
  >
    {/* Uber text */}
    <path
      d="M2.5 16.5V4h3.3v7.6c0 1.6.8 2.5 2.1 2.5 1.3 0 2.1-.9 2.1-2.5V4h3.3v12.5h-3.2v-1.4c-.6 1-1.6 1.6-2.8 1.6-2.5 0-4.8-1.7-4.8-5.2zM15.5 4h3.2v4.8c.7-.9 1.8-1.5 2.9-1.5 2.5 0 4.6 2.1 4.6 5.5 0 3.3-2.1 5.4-4.6 5.4-1.2 0-2.3-.6-3-1.6v1.4h-3.1V4zm3.2 8.7c0 1.6 1 2.7 2.4 2.7 1.3 0 2.3-1.1 2.3-2.7s-1-2.7-2.3-2.7c-1.4 0-2.4 1.1-2.4 2.7zM28.4 12.3c0-2.9 2-5 4.9-5 2.8 0 4.7 2 4.7 4.9v.8H31.5c.2 1.4 1.3 2.3 2.8 2.3 1.1 0 2-.5 2.5-1.4l2.5 1.4c-1 1.7-2.7 2.8-5 2.8-3.4 0-5.9-2.3-5.9-5.8zm6.5-1.2c-.1-1.2-1-2-2.1-2s-2 .8-2.2 2h4.3zM40.2 7.5h3.1v1.6c.5-1.1 1.6-1.8 2.9-1.8.4 0 .7.1 1 .2v3.1c-.4-.2-.8-.3-1.3-.3-1.4 0-2.5 1-2.6 2.5v5.4h-3.1V7.5z"
      fill={color}
    />
    {/* Eats text with bold stylized weight */}
    <g transform="translate(56, 0)">
      {/* E */}
      <path
        d="M2.5 4h8.8v2.8H5.9v2.6h4.8v2.7H5.9v2.8h5.6v2.8H2.5V4z"
        fill={color}
      />
      {/* a */}
      <path
        d="M19.4 8.2c2.7 0 4.5 1.7 4.5 4.3v5.2h-3v-1.1c-.7.8-1.7 1.3-2.8 1.3-1.9 0-3.3-1.2-3.3-2.8 0-1.8 1.4-2.8 3.8-2.9l2.2-.1v-.3c0-.9-.6-1.4-1.6-1.4-.9 0-1.5.4-1.8 1l-2.6-1.4c.9-1.3 2.5-1.9 4.6-1.9zm1.4 5.3l-1.6.1c-1 .1-1.5.5-1.5 1.1 0 .6.5 1 1.2 1 .9 0 1.6-.5 1.8-1.2l.1-1z"
        fill={color}
      />
      {/* t */}
      <path
        d="M26.2 5.5h3.1v2.9h2.2v2.5h-2.2v3.8c0 .6.3.9.9.9.4 0 .8-.1 1.1-.2l.4 2.4c-.6.3-1.5.4-2.3.4-2.1 0-3.2-1.1-3.2-3.2v-4.1h-1.6V8.4h1.6V5.5z"
        fill={color}
      />
      {/* s */}
      <path
        d="M33.6 15.3l2.5-1.5c.7.8 1.5 1.2 2.4 1.2.8 0 1.2-.3 1.2-.7 0-.5-.4-.7-1.7-1.1-2.4-.6-3.8-1.4-3.8-3.2 0-1.9 1.6-3.1 3.8-3.1 1.8 0 3.2.7 4.1 1.9l-2.3 1.6c-.6-.7-1.2-1-1.9-1-.7 0-1.1.3-1.1.7 0 .4.4.6 1.6.9 2.5.7 3.9 1.5 3.9 3.4 0 2-1.6 3.2-4.1 3.2-2 0-3.6-.9-4.6-2.3z"
        fill={color}
      />
    </g>
  </svg>
);

export const UberEatsLogoWhite: React.FC<{ className?: string }> = ({ className = 'h-5 w-auto' }) => (
  <UberEatsLogo className={className} color="#FFFFFF" />
);

/**
 * SkipTheDishes official brand logo (supports custom color, default #70121D)
 */
export const SkipTheDishesLogo: React.FC<{ className?: string; color?: string }> = ({
  className = 'h-5 w-auto',
  color = '#70121D',
}) => (
  <svg
    viewBox="0 0 160 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="SkipTheDishes"
  >
    {/* Stylized Fork & Spoon Icon */}
    <g transform="translate(1, 2)">
      <circle cx="11" cy="11" r="10" stroke={color} strokeWidth="1.8" fill="none" />
      {/* Fork prongs and spoon cross */}
      <path
        d="M8.2 6.5v4.2c0 .9.6 1.6 1.4 1.8v4.5h1.2v-4.5c.8-.2 1.4-.9 1.4-1.8V6.5h-.9v3.6h-.6V6.5h-.8v3.6h-.6V6.5h-.7z"
        fill={color}
      />
      <path
        d="M13.2 6.5c-.8 0-1.5.8-1.5 1.8 0 1.2.6 1.9 1.2 2.2v6.5h1.2v-6.5c.6-.3 1.2-1 1.2-2.2 0-1-.7-1.8-1.5-1.8h-.6v-.01z"
        fill={color}
      />
    </g>

    {/* SKIP text (Bold Display) */}
    <text
      x="28"
      y="18"
      fill={color}
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontWeight="900"
      fontSize="17"
      letterSpacing="-0.02em"
    >
      SKIP
    </text>

    {/* THEDISHES text (Light/Medium Clean Display) */}
    <text
      x="71"
      y="18"
      fill={color}
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontWeight="500"
      fontSize="13.5"
      letterSpacing="-0.01em"
      opacity="0.95"
    >
      THEDISHES
    </text>
  </svg>
);

export const SkipTheDishesLogoWhite: React.FC<{ className?: string }> = ({ className = 'h-5 w-auto' }) => (
  <SkipTheDishesLogo className={className} color="#FFFFFF" />
);
