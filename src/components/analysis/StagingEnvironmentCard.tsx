
import React from 'react';
import { StagingEnvironment } from '@/services/stagingDeployer';

interface StagingEnvironmentCardProps {
  stagingEnv: StagingEnvironment;
  onCreatePR: () => void;
  creatingPR: boolean;
}

export const StagingEnvironmentCard: React.FC<StagingEnvironmentCardProps> = ({
  stagingEnv,
  onCreatePR,
  creatingPR
}) => {
  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-4">🚀 Your Live Staging Environment</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Live URL:</p>
            <p className="text-sm text-gray-600 break-all">{stagingEnv.url}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.open(stagingEnv.url, '_blank')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🌐 Test Live App
            </button>
          </div>
        </div>

        {stagingEnv.previewImages && stagingEnv.previewImages.length > 0 && (
          <div>
            <p className="font-medium mb-2">Preview:</p>
            <div className="grid grid-cols-1 gap-4">
              {stagingEnv.previewImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="rounded-lg shadow-md max-w-full h-auto"
                />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <button
            onClick={onCreatePR}
            disabled={creatingPR}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {creatingPR ? '🔄 Creating PR...' : '📝 Create Pull Request for Dev Team'}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This will create a PR in your repository with the design system improvements
          </p>
        </div>
      </div>
    </div>
  );
};
