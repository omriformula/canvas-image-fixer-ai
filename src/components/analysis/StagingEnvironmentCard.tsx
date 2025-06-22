
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

        {/* Visual Preview Section */}
        <div>
          <p className="font-medium mb-3">📸 Visual Preview - Before vs After:</p>
          <div className="space-y-4">
            {/* Before/After Comparison */}
            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Before */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">❌ Before (Current)</p>
                  <div className="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
                    <div className="space-y-2">
                      <div className="bg-blue-500 text-white px-3 py-1.5 text-sm">Old Button Style</div>
                      <div className="border border-gray-400 px-2 py-1 text-sm bg-white">Basic Input</div>
                      <div className="bg-white border border-gray-300 p-3 text-sm">Standard Card</div>
                    </div>
                  </div>
                </div>
                
                {/* After */}
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">✨ After (Design System)</p>
                  <div className="bg-green-50 p-4 rounded border-2 border-green-300">
                    <div className="space-y-2">
                      <button className="px-6 py-3 rounded-2xl font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white text-sm">
                        New Button Style
                      </button>
                      <input 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 text-sm" 
                        placeholder="Enhanced Input"
                        readOnly
                      />
                      <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 text-sm">
                        <strong>Modern Card</strong> - with design tokens
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Page Preview */}
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-sm font-medium text-gray-700 mb-2">🎨 Sample Page with Design System Applied:</p>
              <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-lg border-2 border-gray-200">
                <h3 className="text-xl font-medium text-gray-900 mb-4">Your App Header</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="px-6 py-3 rounded-2xl font-medium bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all text-sm">
                      Primary Action
                    </button>
                    <button className="px-6 py-3 rounded-2xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all text-sm">
                      Secondary
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h4 className="font-medium mb-3 text-gray-900">Enhanced Form</h4>
                    <div className="space-y-3">
                      <input className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Modern input field" readOnly />
                      <input className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Consistent styling" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={onCreatePR}
            disabled={creatingPR}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
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
