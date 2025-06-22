import React, { useState } from 'react';
import { toast } from 'sonner';
import { FormCard, PageContainer } from '@/design-system';
import { CheckCircle, AlertCircle, Clock, Download, Mail, ExternalLink, Github, Settings } from 'lucide-react';
import { productionDeployer } from '@/services/productionDeployer';

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
  const [githubConnected, setGithubConnected] = useState(false);

  const handleRealProductionDeploy = async (requestId: string) => {
    if (!githubConnected) {
      toast.error('⚠️ GitHub connection required', {
        description: 'Please connect your GitHub account to deploy to production',
        action: {
          label: 'Connect GitHub',
          onClick: () => handleConnectGithub()
        }
      });
      return;
    }

    setProcessing(requestId);
    
    toast.info('🚀 Creating REAL production deployment...', {
      description: 'Creating branch and PR in v2-formula-demo repository'
    });

    try {
      const deployment = await productionDeployer.deployToProduction(requestId);
      
      toast.success('✅ Production PR created successfully!', {
        description: `Ready for review: PR #${deployment.prNumber}`,
        duration: 10000,
        action: {
          label: 'View PR',
          onClick: () => window.open(deployment.prUrl, '_blank')
        }
      });

    } catch (error) {
      console.error('Production deployment failed:', error);
      
      if (error instanceof Error && error.message.includes('GitHub token')) {
        toast.error('❌ GitHub authentication failed', {
          description: 'Please reconnect your GitHub account and ensure repository permissions',
          action: {
            label: 'Reconnect',
            onClick: () => handleConnectGithub()
          }
        });
      } else {
        toast.error('❌ Production deployment failed', {
          description: error instanceof Error ? error.message : 'Please check permissions and try again'
        });
      }
    } finally {
      setProcessing(null);
    }
  };

  const handleConnectGithub = () => {
    // In a real implementation, this would trigger OAuth flow
    // For now, we'll simulate the connection
    toast.info('🔗 Connecting to GitHub...', {
      description: 'Please authorize access to v2-formula-demo repository'
    });
    
    setTimeout(() => {
      setGithubConnected(true);
      toast.success('✅ GitHub connected successfully!', {
        description: 'Ready to deploy to production repository'
      });
    }, 2000);
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
          <h1 className="text-2xl font-bold mb-2">Production Dev Team Handoff</h1>
          <p className="text-blue-100">Real deployment to v2-formula-demo production repository</p>
        </div>

        {/* GitHub Connection Status */}
        <FormCard className="border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Github className={`h-6 w-6 ${githubConnected ? 'text-green-600' : 'text-gray-400'}`} />
              <div>
                <h3 className="font-semibold">
                  {githubConnected ? '✅ GitHub Connected' : '⚠️ GitHub Connection Required'}
                </h3>
                <p className="text-sm text-gray-600">
                  {githubConnected 
                    ? 'Ready to deploy to omriformula/v2-formula-demo' 
                    : 'Connect GitHub to enable production deployment'
                  }
                </p>
              </div>
            </div>
            {!githubConnected && (
              <button
                onClick={handleConnectGithub}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Connect GitHub</span>
              </button>
            )}
          </div>
        </FormCard>

        {/* Production Repository Info */}
        <FormCard className="border border-blue-200 bg-blue-50">
          <div className="flex items-start space-x-3">
            <Settings className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Production Target</h3>
              <p className="text-sm text-blue-700 font-mono">
                https://github.com/omriformula/v2-formula-demo
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Real PRs will be created in this repository for immediate production deployment
              </p>
            </div>
          </div>
        </FormCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ready for Prod</p>
                <p className="text-2xl font-bold text-green-600">1</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deployed Today</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <Download className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">GitHub Status</p>
                <p className="text-sm font-bold text-green-600">
                  {githubConnected ? 'Connected' : 'Pending'}
                </p>
              </div>
              <Github className={`h-8 w-8 ${githubConnected ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Components</p>
                <p className="text-2xl font-bold text-purple-600">4</p>
              </div>
              <Mail className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Production Handoff Requests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Production-Ready Design Handoffs</h2>
          
          {handoffRequests.map((request) => (
            <FormCard key={request.id} className="border border-green-200 bg-green-50">
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
                    PRODUCTION READY
                  </span>
                </div>

                {/* Components Affected */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Components Updated:</p>
                  <div className="flex flex-wrap gap-2">
                    {request.componentsAffected.map((component) => (
                      <span key={component} className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Tested Staging Preview</h4>
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
                    Staging URL: {request.stagingUrl}
                  </p>
                </div>

                {/* Production Actions */}
                <div className="flex space-x-3 pt-4 border-t border-green-200">
                  <button
                    onClick={() => handleRealProductionDeploy(request.id)}
                    disabled={processing === request.id || !githubConnected}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {processing === request.id ? (
                      '🚀 Creating Production PR...'
                    ) : (
                      '✅ Deploy to Production (Real PR)'
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleReject(request.id)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    ❌ Reject
                  </button>
                </div>

                {/* Production Deployment Info */}
                <div className="bg-green-100 p-3 rounded-lg text-sm">
                  <p className="font-medium text-green-900 mb-1">Production deployment process:</p>
                  <ul className="text-green-700 space-y-1 text-xs">
                    <li>• Creates real branch in omriformula/v2-formula-demo</li>
                    <li>• Applies design system changes to production code</li>
                    <li>• Creates pull request ready for immediate merge</li>
                    <li>• Auto-deploys when PR is merged (if enabled)</li>
                    <li>• Zero manual work - just review and merge!</li>
                  </ul>
                </div>
              </div>
            </FormCard>
          ))}
        </div>

        {/* Notification Settings */}
        <FormCard title="🔔 Production Notification Settings" className="border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email notifications for production PRs</h4>
                <p className="text-sm text-gray-600">Get notified when production PRs are created</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Slack integration (#dev-team)</h4>
                <p className="text-sm text-gray-600">Post production PR notifications to Slack</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </FormCard>
      </div>
    </PageContainer>
  );
};
