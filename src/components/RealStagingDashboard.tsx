import React, { useState } from 'react';
import { realStagingSetup } from '@/services/realStagingSetup';
import { StagingEnvironment } from '@/services/stagingDeployer';
import { StagingEnvironmentCard } from '@/components/analysis/StagingEnvironmentCard';
import { designAuditor } from '@/services/designAudit';
import { AuditResultsModal } from '@/components/audit/AuditResultsModal';
import { toast } from 'sonner';
import { PageContainer, FormCard } from '@/design-system';
import { Link } from 'react-router-dom';
import type { AuditResult } from '@/services/designAudit';

export const RealStagingDashboard: React.FC = () => {
  const [stagingEnv, setStagingEnv] = useState<StagingEnvironment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [creatingPR, setCreatingPR] = useState(false);

  const handleCreateStaging = async () => {
    setIsCreating(true);
    try {
      const env = await realStagingSetup.initializeRealStaging();
      setStagingEnv(env);
    } catch (error) {
      console.error('Failed to create staging environment:', error);
      toast.error('Failed to create staging environment', {
        description: error instanceof Error ? error.message : 'Please check your GitHub permissions and try again'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleRunAudit = async () => {
    if (!stagingEnv) return;
    
    setIsAuditing(true);
    toast.info('🔍 Running 360° audit on your real staging environment...', {
      description: 'Validating design system implementation on actual code'
    });

    try {
      const result = await designAuditor.perform360Audit();
      setAuditResult(result);
      setShowAuditModal(true);
    } catch (error) {
      toast.error('Audit failed', {
        description: 'Please try again or contact support'
      });
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCreatePR = async () => {
    if (!stagingEnv) return;
    
    setCreatingPR(true);
    toast.info('📝 Creating REAL pull request for your dev team...', {
      description: 'This will create an actual PR in your GitHub repository'
    });

    try {
      const result = await realStagingSetup.createRealPullRequest(stagingEnv);
      
      toast.success('🎉 Real pull request created!', {
        description: `PR #${result.prNumber} is now live in your GitHub repo`,
        action: {
          label: 'View PR',
          onClick: () => window.open(result.prUrl, '_blank')
        }
      });
    } catch (error) {
      console.error('Failed to create PR:', error);
      toast.error('Failed to create pull request', {
        description: error instanceof Error ? error.message : 'Please check your GitHub permissions'
      });
    } finally {
      setCreatingPR(false);
    }
  };

  return (
    <PageContainer>
      <FormCard title="Real GitHub Integration">
        <div className="space-y-6">
          {/* Dev Team Dashboard Link */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border-l-4 border-green-400">
            <h3 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">
              👥 For Dev Teams
            </h3>
            <p className="text-xs sm:text-sm text-green-700 mb-3">
              One-click deployment dashboard for development teams. No manual coding required!
            </p>
            <Link
              to="/dev-handoff"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
            >
              🚀 Open Dev Team Dashboard
            </Link>
          </div>

          {/* GitHub Setup Requirements */}
          <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
            <h3 className="font-semibold text-yellow-900 mb-2 text-sm sm:text-base">
              ⚠️ GitHub Setup Required
            </h3>
            <div className="text-xs sm:text-sm text-yellow-800 space-y-2">
              <p>To create real PRs, you need to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Connect your GitHub account (click GitHub button in top right)</li>
                <li>Grant repository permissions</li>
                <li>Set up GitHub API access</li>
              </ul>
              <p className="font-medium">Without these, the system will show demo behavior only.</p>
            </div>
          </div>

          {/* Repository Info */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">
              🔗 Target Repository
            </h3>
            <p className="text-xs sm:text-sm text-blue-700 break-all">
              https://github.com/omriformula/V2-formula-demo
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Real branches and PRs will be created in this repository
            </p>
          </div>

          {/* Create Staging Button */}
          {!stagingEnv && (
            <button
              onClick={handleCreateStaging}
              disabled={isCreating}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 text-sm sm:text-base"
            >
              {isCreating ? '🔄 Creating Real Branch & Staging...' : '🚀 Create Real Staging Environment'}
            </button>
          )}

          {/* Staging Environment Card */}
          {stagingEnv && (
            <StagingEnvironmentCard
              stagingEnv={stagingEnv}
              onCreatePR={handleCreatePR}
              creatingPR={creatingPR}
            />
          )}

          {/* Audit Section */}
          {stagingEnv && (
            <div className="border-t pt-6">
              <div className="bg-purple-50 p-4 rounded-xl mb-4">
                <h3 className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">
                  🎯 360° Staging Audit
                </h3>
                <p className="text-xs sm:text-sm text-purple-700">
                  Validate your real staging environment before sending to dev team
                </p>
              </div>
              
              <button
                onClick={handleRunAudit}
                disabled={isAuditing}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all duration-200 text-sm sm:text-base"
              >
                {isAuditing ? '🔄 Auditing Real Environment...' : '🔍 Run 360° Audit on Staging'}
              </button>
            </div>
          )}
        </div>
      </FormCard>

      {/* Audit Results Modal */}
      <AuditResultsModal
        result={auditResult}
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />
    </PageContainer>
  );
};
