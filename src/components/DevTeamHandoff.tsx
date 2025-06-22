
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FormCard, PageContainer } from '@/design-system';
import { CheckCircle, AlertCircle, Clock, Download, Mail, ExternalLink, Github, Settings, RefreshCw } from 'lucide-react';
import { githubAuth } from '@/services/githubAuth';
import { productionDeployer } from '@/services/productionDeployer';
import { GitHubTokenInput } from './GitHubTokenInput';

interface DemoProjectHandoff {
  projectName: string;
  description: string;
  filesChanged: string[];
  improvements: string[];
  readyForProduction: boolean;
}

export const DevTeamHandoff: React.FC = () => {
  const [githubConnected, setGithubConnected] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<any>(null);

  // Our demo project that needs to be handed off
  const demoProject: DemoProjectHandoff = {
    projectName: "Design System Demo Project",
    description: "Complete design system improvements ready for V2 Formula Demo production",
    filesChanged: [
      "src/components/ui/Button.tsx",
      "src/components/ui/Form.tsx", 
      "src/design-system/tokens.ts",
      "src/components/FormCard.tsx",
      "src/components/PageContainer.tsx",
      "src/design-system/components/*"
    ],
    improvements: [
      "Enhanced button component with consistent hover states",
      "Improved form layouts with better spacing",
      "Professional color scheme and typography",
      "Responsive design improvements",
      "Modern card layouts and styling",
      "Production-ready design tokens"
    ],
    readyForProduction: true
  };

  useEffect(() => {
    checkGitHubConnection();
  }, []);

  const checkGitHubConnection = () => {
    setGithubConnected(githubAuth.isAuthenticated());
  };

  const handleDeployToProduction = async () => {
    if (!githubConnected) {
      toast.error('⚠️ GitHub connection required');
      return;
    }

    setDeploying(true);
    
    toast.info('🚀 Creating production deployment...', {
      description: 'Applying design system changes to V2 Formula Demo repository'
    });

    try {
      const result = await productionDeployer.deployToProduction('demo-project-handoff');
      
      setDeploymentResult(result);
      
      toast.success('✅ Production deployment created successfully!', {
        description: `PR created in V2 Formula Demo repository - ready for Omri to review`,
        duration: 15000,
        action: {
          label: 'View PR',
          onClick: () => window.open(result.prUrl, '_blank')
        }
      });

    } catch (error) {
      console.error('Production deployment failed:', error);
      toast.error('❌ Production deployment failed', {
        description: error instanceof Error ? error.message : 'Please check GitHub permissions and try again'
      });
    } finally {
      setDeploying(false);
    }
  };

  const handleEmailOmri = () => {
    const subject = encodeURIComponent("Design System Handoff - Ready for Production Review");
    const body = encodeURIComponent(`Hi Omri,

The design system improvements are ready for production deployment!

🎯 What's Ready:
• Complete design system with enhanced components
• Professional styling and improved user experience  
• All changes tested and production-ready
• PR created in V2 Formula Demo repository

${deploymentResult ? `
🔗 Production PR: ${deploymentResult.prUrl}
📁 Repository: ${deploymentResult.repoUrl}
🌟 Branch: ${deploymentResult.branchName}

The PR is ready for your review and can be merged immediately.
` : ''}

Next Steps:
1. Review the PR in the V2 Formula Demo repository
2. Merge when ready (all changes are tested)
3. Changes will auto-deploy to production

Let me know if you have any questions!

Best regards`);

    window.open(`mailto:omri@formula.inc?subject=${subject}&body=${body}`, '_blank');
    
    toast.success('Email ready for Omri', {
      description: 'Email opened with production deployment details'
    });
  };

  return (
    <PageContainer variant="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">🚀 Production Handoff Ready</h1>
              <p className="text-green-100">Design system improvements ready for V2 Formula Demo</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-green-100">Ready to Deploy</div>
            </div>
          </div>
        </div>

        {/* GitHub Connection Status */}
        {!githubConnected ? (
          <GitHubTokenInput onTokenSet={checkGitHubConnection} />
        ) : (
          <FormCard className="border border-green-200 bg-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Github className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">✅ Connected to V2 Formula Demo</h3>
                  <p className="text-sm text-green-700">
                    Ready to deploy to omriformula/v2-formula-demo
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                PRODUCTION READY
              </span>
            </div>
          </FormCard>
        )}

        {/* Demo Project Status */}
        <FormCard className="border border-blue-200 bg-blue-50">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg text-blue-900">{demoProject.projectName}</h3>
                  <p className="text-sm text-blue-700">{demoProject.description}</p>
                </div>
              </div>
              
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                READY FOR HANDOFF
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-2 text-blue-900">📁 Files to Update:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {demoProject.filesChanged.map((file, index) => (
                    <li key={index} className="font-mono text-xs">• {file}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-2 text-blue-900">✨ Improvements Included:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {demoProject.improvements.map((improvement, index) => (
                    <li key={index}>• {improvement}</li>
                  ))}
                </ul>
              </div>
            </div>

            {deploymentResult && (
              <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium mb-2 text-green-900">🎉 Production Deployment Created!</h4>
                <div className="space-y-2 text-sm text-green-700">
                  <p><strong>Repository:</strong> {deploymentResult.repoUrl}</p>
                  <p><strong>Branch:</strong> {deploymentResult.branchName}</p>
                  <p><strong>Pull Request:</strong> <a href={deploymentResult.prUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline">#{deploymentResult.prNumber}</a></p>
                  {deploymentResult.deploymentUrl && (
                    <p><strong>Preview:</strong> <a href={deploymentResult.deploymentUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline">Live Preview</a></p>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-4 border-t border-blue-200">
              {!deploymentResult ? (
                <button
                  onClick={handleDeployToProduction}
                  disabled={!githubConnected || deploying}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {deploying ? (
                    '🚀 Creating Production PR...'
                  ) : (
                    '🚀 Deploy to V2 Formula Demo'
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => window.open(deploymentResult.prUrl, '_blank')}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    📝 View Production PR
                  </button>
                  <button
                    onClick={handleEmailOmri}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                  >
                    📧 Email Omri
                  </button>
                </>
              )}
            </div>

            <div className="bg-yellow-100 p-3 rounded-lg text-sm border border-yellow-200">
              <p className="font-medium text-yellow-900 mb-1">🎯 Next Steps for Omri:</p>
              <ul className="text-yellow-700 space-y-1 text-xs">
                <li>1. Review the pull request in V2 Formula Demo repository</li>
                <li>2. Test the changes (all pre-tested and ready)</li>
                <li>3. Merge the PR when ready</li>
                <li>4. Changes will automatically deploy to production</li>
              </ul>
            </div>
          </div>
        </FormCard>

        {/* Repository Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Target Repository</p>
                <p className="text-lg font-bold text-green-600">V2 Formula Demo</p>
                <p className="text-xs text-gray-500">omriformula/v2-formula-demo</p>
              </div>
              <ExternalLink className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-bold text-blue-600">
                  {deploymentResult ? 'PR Created' : 'Ready to Deploy'}
                </p>
                <p className="text-xs text-gray-500">Production ready</p>
              </div>
              <Github className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
