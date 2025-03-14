import { LoaderCircle } from 'lucide-react'
import React from 'react'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  color = 'currentColor',
  text,
  speed = 'normal',
  className = ''
}) => {
  // Size variants
  const sizeClasses: Record<string, string> = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  }

  // Animation speed variants
  const speedClasses: Record<string, string> = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast'
  }

  return (
    <div 
      className={`flex flex-col items-center justify-center h-full ${className}`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle 
        className={`${sizeClasses[size]} ${speedClasses[speed]}`} 
        color={color}
      />
      {text && (
        <span className="mt-2 text-sm text-gray-500">
          {text}
        </span>
      )}
      <span className="sr-only">Loading</span>
    </div>
  )
}

export default Loader