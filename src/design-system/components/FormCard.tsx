
import React from 'react';
import { designTokens } from '../tokens';

interface FormCardProps {
  children: React.ReactNode;
  title?: string;
  heroImage?: string;
  heroAlt?: string;
  className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({ 
  children, 
  title,
  heroImage,
  heroAlt = "Hero Image",
  className = '' 
}) => {
  return (
    <div className={className}>
      {/* Hero Image */}
      {heroImage && (
        <div 
          className="overflow-hidden"
          style={{ 
            aspectRatio: '16/9',
            borderRadius: `${designTokens.borderRadius.card} ${designTokens.borderRadius.card} 0 0`
          }}
        >
          <img 
            src={heroImage}
            alt={heroAlt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Form Container */}
      <div 
        className="shadow-lg"
        style={{ 
          backgroundColor: designTokens.colors.background.card,
          borderRadius: heroImage 
            ? `0 0 ${designTokens.borderRadius.card} ${designTokens.borderRadius.card}`
            : designTokens.borderRadius.card,
          padding: designTokens.spacing.container.padding,
          boxShadow: designTokens.shadows.card
        }}
      >
        {title && (
          <h3 
            className="mb-6"
            style={{
              fontSize: designTokens.typography.heading.size,
              fontWeight: designTokens.typography.heading.weight,
              color: designTokens.colors.text.primary,
              fontFamily: designTokens.typography.heading.family
            }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};
