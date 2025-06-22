
import React from 'react';
import { StagingEnvironment } from '@/services/stagingDeployer';
import { ActualPageMockups } from './ActualPageMockups';

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
    <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
      <h3 className="font-semibold text-base sm:text-lg mb-4">🚀 Your Live Staging Environment</h3>
      
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm sm:text-base">Live URL:</p>
            <p className="text-xs sm:text-sm text-gray-600 break-all">{stagingEnv.url}</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => window.open(stagingEnv.url, '_blank')}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              🌐 Test Live App
            </button>
          </div>
        </div>

        {/* Actual Page Mockups */}
        <ActualPageMockups />

        <div className="pt-4 border-t">
          <button
            onClick={onCreatePR}
            disabled={creatingPR}
            className="w-full px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm sm:text-base font-medium"
          >
            {creatingPR ? '🔄 Creating PR...' : '📝 Create Pull Request for Dev Team'}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Now you can visually confirm the improvements before creating the PR!
          </p>
        </div>
      </div>
    </div>
  );
};
