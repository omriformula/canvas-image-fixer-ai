
import React from 'react';

export const ActualPageMockups: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
      <h4 className="text-base sm:text-lg font-semibold mb-4">🎨 Your Actual Pages with Design System Applied</h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <button className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium">
          Payment Offer Form
        </button>
        <button className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">
          Acceptance Flow
        </button>
      </div>

      {/* Mock Form Preview - Mobile Optimized */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            From (your company name)
          </label>
          <div className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg bg-white text-xs sm:text-sm text-gray-500">
            Your Company
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            To (recipient's company name)
          </label>
          <div className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg bg-white text-xs sm:text-sm text-gray-500">
            Recipient Company
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Discount Rate (%)
          </label>
          <div className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg bg-white text-xs sm:text-sm text-gray-500">
            e.g. 2.5
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Full Payment Amount
          </label>
          <div className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg bg-white text-xs sm:text-sm text-gray-500">
            $5,000
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 sm:py-3 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors text-sm sm:text-base font-medium">
          Send Offer
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        ✨ Design system tokens applied: consistent spacing, typography, and interactions
      </p>
    </div>
  );
};
