
import React from 'react';
import { Input } from '@/components/ui/input';
import { designTokens } from '../tokens';

interface StyledInputProps extends React.ComponentProps<typeof Input> {
  // All standard input props are inherited
}

export const StyledInput: React.FC<StyledInputProps> = ({ 
  className = '', 
  ...props 
}) => {
  return (
    <Input
      className={`w-full ${className}`}
      style={{
        padding: '14px', // 3.5 * 4px
        fontSize: designTokens.typography.input.size,
        borderRadius: designTokens.borderRadius.input,
        borderColor: designTokens.colors.background.border,
        backgroundColor: designTokens.colors.background.card
      }}
      {...props}
    />
  );
};
