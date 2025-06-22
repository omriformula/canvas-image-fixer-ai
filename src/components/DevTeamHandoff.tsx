
import React, { useState } from 'react';
import { toast } from 'sonner';
import { FormCard, PageContainer } from '@/design-system';
import { CheckCircle, AlertCircle, Clock, Download, Mail, ExternalLink } from 'lucide-react';

interface HandoffRequest {
  id: string;
  title: string;
  submittedBy: string;
  submittedAt: string;
  stagingUrl: string;
  componentsAffected: string[];
  status: 'pending' | 'approved' | 'deployed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  screenshots?: string[];
}

export const DevTeamHandoff: React.FC = () => {
  const [handoffRequests] = useState<HandoffRequest[]>([
    {
      id: '1',
      title: 'Payment Form Design System Application',
      submittedBy: 'Eleanor (Design)',
      submittedAt: '2024-01-15 14:30',
      stagingUrl: 'https://design-system-v2-formula-demo.vercel.app',
      componentsAffected: ['Button', 'Form', 'Input', 'Card'],
      status: 'pending',
      priority: 'medium',
      screenshots: ['/lovable-uploads/79eb6228-916f-4f9d-811b-563c4803553b.png']
    }
  ]);

  const [processing, setProcessing] = useState<string | null>(null);

  const handleOneClickDeploy = async (requestId: string) => {
    setProcessing(requestId);
    
    toast.info('🚀 Starting automated deployment...', {
      description: 'Installing dependencies and applying design system'
    });

    // Simulate automated deployment process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast.success('✅ Deployed to production!', {
      description: 'Design system applied successfully. No manual work required.',
      duration: 5000
    });

    setProcessing(null);
  };

  const handleReject = async (requestId: string) => {
    toast.success('❌ Request rejected and designer notified');
  };

  const handlePreview = (stagingUrl: string) => {
    window.open(stagingUrl, '_blank');
  };

  const getStatusIcon = (status: HandoffRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: HandoffRequest['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <PageContainer variant="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
          <h1 className="text-2xl font-bold mb-2">Dev Team Handoff Dashboard</h1>
          <p className="text-blue-100">One-click deployment of design system improvements</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deployed Today</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold text-blue-600">4.5h</p>
              </div>
              <Download className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Components</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <Mail className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Handoff Requests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pending Design Handoffs</h2>
          
          {handoffRequests.map((request) => (
            <FormCard key={request.id} className="border border-gray-200">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(request.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{request.title}</h3>
                      <p className="text-sm text-gray-600">
                        by {request.submittedBy} • {request.submittedAt}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                    {request.priority.toUpperCase()}
                  </span>
                </div>

                {/* Components Affected */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Components Updated:</p>
                  <div className="flex flex-wrap gap-2">
                    {request.componentsAffected.map((component) => (
                      <span key={component} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Live Staging Preview</h4>
                    <button
                      onClick={() => handlePreview(request.stagingUrl)}
                      className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Test Live</span>
                    </button>
                  </div>
                  
                  {request.screenshots && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {request.screenshots.map((screenshot, index) => (
                        <img
                          key={index}
                          src={screenshot}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-600">
                    URL: {request.stagingUrl}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => handleOneClickDeploy(request.id)}
                    disabled={processing === request.id}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {processing === request.id ? (
                      '🔄 Deploying...'
                    ) : (
                      '✅ One-Click Deploy to Production'
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleReject(request.id)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    ❌ Reject
                  </button>
                </div>

                {/* What Happens Next */}
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-blue-900 mb-1">What happens when you click deploy:</p>
                  <ul className="text-blue-700 space-y-1 text-xs">
                    <li>• Automatically installs required dependencies</li>
                    <li>• Copies design system files to your repo</li>
                    <li>• Updates components without breaking existing functionality</li>
                    <li>• Creates deployment and notifies the team</li>
                    <li>• Zero manual coding required!</li>
                  </ul>
                </div>
              </div>
            </FormCard>
          ))}
        </div>

        {/* Email Notifications Setup */}
        <FormCard title="🔔 Notification Preferences" className="border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email notifications for new handoffs</h4>
                <p className="text-sm text-gray-600">Get notified when designers submit new requests</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Slack integration</h4>
                <p className="text-sm text-gray-600">Post notifications to #dev-team channel</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </FormCard>
      </div>
    </PageContainer>
  );
};
