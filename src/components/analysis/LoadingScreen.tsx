
import React from 'react';
import { PageContainer, FormCard } from '@/design-system';

export const LoadingScreen = () => {
  return (
    <PageContainer>
      <FormCard title="🔍 Analyzing Your Repository...">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600">Cloning your codebase and mapping components to our design system...</p>
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
            <p>This process typically takes 30-60 seconds for most repositories.</p>
          </div>
        </div>
      </FormCard>
    </PageContainer>
  );
};
