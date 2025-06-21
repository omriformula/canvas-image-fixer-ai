
import React from 'react';
import { designTokens } from '../tokens';

interface StyledFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const StyledForm: React.FC<StyledFormProps> = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <form 
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.form.gap }}
      {...props}
    >
      {children}
    </form>
  );
};
