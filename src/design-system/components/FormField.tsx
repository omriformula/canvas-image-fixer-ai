
import React from 'react';
import { designTokens } from '../tokens';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  children, 
  htmlFor,
  className = '' 
}) => {
  return (
    <div className={className}>
      <label 
        htmlFor={htmlFor}
        className="block mb-1.5"
        style={{
          fontSize: designTokens.typography.label.size,
          fontWeight: designTokens.typography.label.weight,
          color: designTokens.colors.text.secondary
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
};
