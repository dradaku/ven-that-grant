
import React from 'react';

interface LogoIconProps {
  variant?: 'v' | 'document' | 'pillars' | 'pen';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ 
  variant = 'v', 
  size = 'medium',
  className = ''
}) => {
  // Classes based on size
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };
  
  const combinedClasses = `${sizeClasses[size]} ${className}`;
  
  // V logo (top left in the image)
  if (variant === 'v') {
    return (
      <svg 
        className={combinedClasses}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M3 3L9 21L12 15M21 3L15 21L12 15" 
          stroke="#0066CC" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="#0066CC"
        />
      </svg>
    );
  }
  
  // Document logo (top right in the image)
  if (variant === 'document') {
    return (
      <svg 
        className={combinedClasses}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
          stroke="#0066CC" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M14 2V8H20" 
          stroke="#0066CC" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M8 13H16" 
          stroke="#0066CC" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M8 17H16" 
          stroke="#0066CC" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M10 9H10.01" 
          stroke="#0066CC" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  // Pillars logo (bottom left in the image)
  if (variant === 'pillars') {
    return (
      <svg 
        className={combinedClasses}
        viewBox="0 0 24 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect 
          x="1" 
          y="1" 
          width="22" 
          height="3" 
          fill="#0066CC"
        />
        <rect 
          x="3" 
          y="4" 
          width="2" 
          height="11" 
          fill="#0066CC"
        />
        <rect 
          x="11" 
          y="4" 
          width="2" 
          height="11" 
          fill="#0066CC"
        />
        <rect 
          x="19" 
          y="4" 
          width="2" 
          height="11" 
          fill="#0066CC"
        />
      </svg>
    );
  }
  
  // Pen logo (bottom right in the image)
  if (variant === 'pen') {
    return (
      <svg 
        className={combinedClasses}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" 
          stroke="#0066CC" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="#D4AF37"
        />
      </svg>
    );
  }
  
  // Default to 'v' variant
  return (
    <svg 
      className={combinedClasses}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M3 3L9 21L12 15M21 3L15 21L12 15" 
        stroke="#0066CC" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="#0066CC"
      />
    </svg>
  );
};

export default LogoIcon;
