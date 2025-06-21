
import React from 'react';
import { designTokens } from '../tokens';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div 
      className={`min-h-screen py-10 px-4 ${className}`}
      style={{ backgroundColor: designTokens.colors.background.primary }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: designTokens.container.maxWidth }}
      >
        {children}
      </div>
    </div>
  );
};
