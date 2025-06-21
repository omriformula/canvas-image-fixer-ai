
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { designTokens } from '../tokens';

interface StyledSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  className?: string;
}

export const StyledSelect: React.FC<StyledSelectProps> = ({ 
  value,
  onValueChange,
  placeholder,
  options,
  className = '' 
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger 
        className={`w-full ${className}`}
        style={{
          padding: '14px',
          fontSize: designTokens.typography.input.size,
          borderRadius: designTokens.borderRadius.input,
          borderColor: designTokens.colors.background.border,
          backgroundColor: designTokens.colors.background.card
        }}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
