import { stagingDeployer, ComponentImprovement, StagingEnvironment } from './stagingDeployer';
import { toast } from 'sonner';

export class RealStagingSetup {
  private repoUrl = 'https://github.com/omriformula/V2-formula-demo';
  
  async initializeRealStaging() {
    console.log('🚀 Initializing REAL staging environment from your GitHub repo...');
    
    toast.info('🔄 Creating real branch in your GitHub repository...', {
      description: 'This will create actual commits and deploy a real staging environment'
    });

    try {
      // Real improvements that will be applied to actual files
      const improvements: ComponentImprovement[] = [
        {
          filePath: 'src/components/ui/Button.tsx',
          originalCode: '',
          improvedCode: this.getImprovedButtonCode(),
          description: 'Applied design system tokens with consistent styling and hover states'
        },
        {
          filePath: 'src/components/ui/Form.tsx', 
          originalCode: '',
          improvedCode: this.getImprovedFormCode(),
          description: 'Improved form layout with proper spacing and design tokens'
        },
        {
          filePath: 'src/components/ui/Card.tsx',
          originalCode: '',
          improvedCode: this.getImprovedCardCode(),
          description: 'Enhanced card styling with shadows and border radius from design system'
        },
        {
          filePath: 'src/design-system/tokens.ts',
          originalCode: '',
          improvedCode: this.getDesignTokensCode(),
          description: 'Added design system tokens for consistent styling'
        }
      ];

      // Deploy to REAL staging with actual GitHub integration
      const stagingEnv = await stagingDeployer.cloneAndImprove(this.repoUrl, improvements);
      
      toast.success('🎉 Real staging environment created!', {
        description: `Live at: ${stagingEnv.url} | Branch: ${stagingEnv.branchName}`,
        duration: 5000
      });

      return stagingEnv;
      
    } catch (error) {
      console.error('Failed to set up real staging:', error);
      
      if (error instanceof Error && error.message.includes('GitHub token')) {
        toast.error('GitHub authentication required', {
          description: 'Please connect your GitHub account and grant repository permissions'
        });
      } else {
        toast.error('Failed to create staging environment', {
          description: error instanceof Error ? error.message : 'Please check your repository permissions and try again'
        });
      }
      throw error;
    }
  }

  async createRealPullRequest(stagingEnv: StagingEnvironment) {
    console.log('📝 Creating REAL pull request in GitHub...');
    
    try {
      const result = await stagingDeployer.createPullRequest(stagingEnv, this.repoUrl);
      
      console.log('✅ Real PR created:', result);
      
      return result;
      
    } catch (error) {
      console.error('Failed to create real PR:', error);
      throw error;
    }
  }

  private getDesignTokensCode(): string {
    return `
export const designTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a'
    },
    gray: {
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
};
    `;
  }

  private getImprovedButtonCode(): string {
    return `
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  children,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2";
  const primaryStyles = "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white";
  const secondaryStyles = "bg-gray-100 text-gray-800 hover:bg-gray-200";
  
  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button
      className={\`\${baseStyles} \${variantStyles} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};
    `;
  }

  private getImprovedFormCode(): string {
    return `
import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <form 
      className={\`space-y-4 p-6 bg-white rounded-2xl shadow-lg \${className}\`}
      {...props}
    >
      {children}
    </form>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label,
  className = '',
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        className={\`w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent \${className}\`}
        {...props}
      />
    </div>
  );
};
    `;
  }

  private getImprovedCardCode(): string {
    return `
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = ''
}) => {
  return (
    <div className={\`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 \${className}\`}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
    `;
  }
}

export const realStagingSetup = new RealStagingSetup();
