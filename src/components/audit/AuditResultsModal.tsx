
import React from 'react';
import { AuditResult } from '@/services/designAudit';
import { CheckCircle, XCircle, AlertTriangle, Eye, Zap } from 'lucide-react';

interface AuditResultsModalProps {
  result: AuditResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AuditResultsModal: React.FC<AuditResultsModalProps> = ({
  result,
  isOpen,
  onClose
}) => {
  if (!isOpen || !result) return null;

  const StatusIcon = () => {
    switch (result.overallStatus) {
      case 'PASSED':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'WARNING':
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      case 'FAILED':
        return <XCircle className="w-8 h-8 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (result.overallStatus) {
      case 'PASSED': return 'green';
      case 'WARNING': return 'yellow';
      case 'FAILED': return 'red';
    }
  };

  const statusColor = getStatusColor();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`bg-${statusColor}-50 p-6 border-b`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <StatusIcon />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  360° Design Audit Results
                </h2>
                <p className={`text-${statusColor}-700 font-medium`}>
                  Status: {result.overallStatus}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overall Status */}
          <div className={`bg-${statusColor}-50 p-4 rounded-xl border border-${statusColor}-200`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Deployment Status</h3>
                <p className={`text-${statusColor}-700`}>
                  {result.readyForDeployment 
                    ? '✅ Ready for deployment to dev team'
                    : '⚠️ Requires attention before deployment'
                  }
                </p>
              </div>
              {result.readyForDeployment && (
                <div className="text-green-600 text-2xl">🚀</div>
              )}
            </div>
          </div>

          {/* Visual Design Audit */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Visual Design Audit</h3>
              {result.visualAudit.passed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Components Checked:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {result.visualAudit.componentsChecked.map((component, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{component}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {result.visualAudit.issues.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Issues Found:</h4>
                  <ul className="space-y-1">
                    {result.visualAudit.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-start space-x-2">
                        <span>•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Functional Flow Audit */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Functional Flow Audit</h3>
              {result.functionalAudit.passed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Flows Tested:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {result.functionalAudit.flowsChecked.map((flow, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{flow}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {result.functionalAudit.issues.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Issues Found:</h4>
                  <ul className="space-y-1">
                    {result.functionalAudit.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-start space-x-2">
                        <span>•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            {result.readyForDeployment ? (
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
                🚀 Send to Dev Team
              </button>
            ) : (
              <button className="px-6 py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 transition-colors">
                ⚠️ Fix Issues First
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
              Close Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
