
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'vertical' | 'document' | 'pillars' | 'pen';
  size?: 'small' | 'medium' | 'large';
  withTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'medium',
  withTagline = false
}) => {
  // Classes based on size
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-12'
  };
  
  // Default logo (top left in the image)
  if (variant === 'default') {
    return (
      <div className="flex flex-col items-start">
        <div className="text-brand-blue font-bold">
          <span className="text-brand-blue text-2xl">Ven</span>
          <span className="text-brand-dark-blue text-2xl">That</span>
          <span className="text-brand-dark-blue text-2xl">Grant</span>
        </div>
        {withTagline && (
          <span className="text-brand-dark-blue text-xs mt-1">
            Get That Grant. Shape That Future.
          </span>
        )}
      </div>
    );
  }
  
  // Document logo (top right in the image)
  if (variant === 'document') {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <svg 
            className={`${sizeClasses[size]} text-brand-blue`} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M14 2V8H20" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M8 13H16" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M8 17H16" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M10 9H10.01" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-brand-dark-blue font-bold">
            <span className="text-xl">VenThatGrant</span>
          </div>
        </div>
        {withTagline && (
          <span className="text-brand-dark-blue text-xs mt-1">
            Get That Grant. Shape That Future.
          </span>
        )}
      </div>
    );
  }
  
  // Pillars logo (bottom left in the image)
  if (variant === 'pillars') {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <svg 
            className={`${sizeClasses[size]} text-brand-blue mb-1`} 
            viewBox="0 0 24 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M23 1H1V4H23V1Z"
              stroke="currentColor" 
              strokeWidth="2" 
              fill="currentColor"
            />
            <path 
              d="M5 4H3V15H5V4Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="currentColor"
            />
            <path 
              d="M13 4H11V15H13V4Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="currentColor"
            />
            <path 
              d="M21 4H19V15H21V4Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="currentColor"
            />
          </svg>
          <div className="text-brand-blue font-bold text-2xl">
            VenThatGrant
          </div>
        </div>
        {withTagline && (
          <span className="text-brand-dark-blue text-xs mt-1">
            Get That Grant. Shape That Future.
          </span>
        )}
      </div>
    );
  }
  
  // Pen logo (bottom right in the image)
  if (variant === 'pen') {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <div className="text-brand-dark-blue font-serif italic text-2xl">
            VenThatGrant
          </div>
        </div>
        {withTagline && (
          <span className="text-brand-dark-blue text-xs mt-1">
            Get That Grant. Shape That Future.
          </span>
        )}
      </div>
    );
  }
  
  // Vertical logo (top left in the image, but vertical layout)
  if (variant === 'vertical') {
    return (
      <div className="flex flex-col items-center">
        <svg 
          className={`${sizeClasses[size]} text-brand-blue mb-2`} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M20.24 12.24C21.3658 11.1142 21.9983 9.58722 21.9983 7.99504C21.9983 6.40285 21.3658 4.87588 20.24 3.75004C19.1142 2.62419 17.5872 1.9917 15.995 1.9917C14.4028 1.9917 12.8758 2.62419 11.75 3.75004L5 10.5V19H13.5L20.24 12.24Z" 
            fill="currentColor" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M16 8L2 22" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-brand-dark-blue font-bold text-3xl">
          <div>Ven<span className="text-brand-dark-blue">That</span></div>
          <div><span className="text-brand-dark-blue">Grant</span></div>
        </div>
        {withTagline && (
          <span className="text-brand-dark-blue text-xs mt-1">
            Get That Grant. Shape That Future.
          </span>
        )}
      </div>
    );
  }
  
  // Fallback to default if variant is not recognized
  return (
    <div className="flex items-center">
      <span className="text-brand-blue font-bold text-2xl">Ven</span>
      <span className="text-brand-dark-blue font-bold text-2xl">That</span>
      <span className="text-brand-dark-blue font-bold text-2xl">Grant</span>
    </div>
  );
};

export default Logo;
