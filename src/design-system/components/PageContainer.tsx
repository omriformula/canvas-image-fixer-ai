
import React from 'react';
import { designTokens } from '../tokens';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'narrow' | 'wide';
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  className = '',
  variant = 'narrow'
}) => {
  const maxWidth = variant === 'wide' ? '800px' : designTokens.container.maxWidth;
  
  return (
    <div 
      className={`min-h-screen py-10 px-4 ${className}`}
      style={{ backgroundColor: designTokens.colors.background.primary }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth }}
      >
        {children}
      </div>
    </div>
  );
};
