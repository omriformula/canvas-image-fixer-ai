
import React from 'react';
import { Button } from '@/components/ui/button';
import { designTokens } from '../tokens';

interface StyledButtonProps extends React.ComponentProps<typeof Button> {
  variant?: 'primary' | 'secondary';
}

export const StyledButton: React.FC<StyledButtonProps> = ({ 
  variant = 'primary',
  className = '',
  children,
  ...props 
}) => {
  const baseStyles = {
    width: '100%',
    marginTop: '1.5rem',
    fontWeight: '500',
    fontSize: '15px',
    padding: '12px',
    borderRadius: designTokens.borderRadius.button,
    transition: 'all 300ms ease'
  };

  const primaryStyles = {
    ...baseStyles,
    backgroundColor: 'transparent',
    border: `1px solid ${designTokens.colors.button.border}`,
    color: designTokens.colors.button.text,
  };

  return (
    <Button
      className={`hover:bg-[#2d2d2d] hover:text-white transition-colors duration-300 ${className}`}
      style={primaryStyles}
      {...props}
    >
      {children}
    </Button>
  );
};
