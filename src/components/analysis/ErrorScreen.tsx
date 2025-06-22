
import React from 'react';
import { PageContainer, FormCard } from '@/design-system';

interface ErrorScreenProps {
  error?: string | null;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => {
  return (
    <PageContainer>
      <FormCard title="⚠️ Analysis Failed">
        <div className="text-center space-y-4">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Unable to process repository</h3>
            <p className="text-red-600">{error || 'An unexpected error occurred'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
            <p><strong>Common issues:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Repository is private and we don't have access</li>
              <li>Invalid repository URL</li>
              <li>Repository doesn't contain React components</li>
            </ul>
          </div>
        </div>
      </FormCard>
    </PageContainer>
  );
};
