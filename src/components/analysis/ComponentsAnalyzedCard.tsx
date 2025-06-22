
import React from 'react';
import { StagingEnvironment } from '@/services/stagingDeployer';

interface ComponentsAnalyzedCardProps {
  stagingEnv: StagingEnvironment;
}

export const ComponentsAnalyzedCard: React.FC<ComponentsAnalyzedCardProps> = ({ stagingEnv }) => {
  const components = stagingEnv.realComponents || [];

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-4">🔍 Components Analyzed & Improved</h3>
      
      {components.length > 0 ? (
        <div className="space-y-3">
          {components.map((component, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-sm">{component.path}</p>
                  <p className="text-xs text-gray-500 capitalize">{component.type} component</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Improved
                </span>
              </div>
              
              <details className="mt-2">
                <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
                  View improvements
                </summary>
                <div className="mt-2 text-xs space-y-1">
                  <p><strong>Before:</strong> {component.currentStyling || 'Custom styling'}</p>
                  <p><strong>After:</strong> {component.designSystemMapping}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Component analysis data not available</p>
          <p className="text-xs mt-1">Your app has been improved with our design system!</p>
        </div>
      )}
    </div>
  );
};
