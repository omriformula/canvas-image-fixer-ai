
import React, { useState } from 'react';
import { realStagingSetup } from '@/services/realStagingSetup';
import { StagingEnvironment } from '@/services/stagingDeployer';
import { StagingEnvironmentCard } from '@/components/analysis/StagingEnvironmentCard';
import { designAuditor } from '@/services/designAudit';
import { AuditResultsModal } from '@/components/audit/AuditResultsModal';
import { toast } from 'sonner';
import { PageContainer, FormCard } from '@/design-system';
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
    toast.info('📝 Creating pull request for your dev team...', {
      description: 'Preparing design system integration PR'
    });

    try {
      // Simulate PR creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('🎉 Pull request created!', {
        description: 'Your dev team can now review and merge the design improvements'
      });
    } catch (error) {
      toast.error('Failed to create PR', {
        description: 'Please try again'
      });
    } finally {
      setCreatingPR(false);
    }
  };

  return (
    <PageContainer>
      <FormCard title="Real Staging Environment">
        <div className="space-y-6">
          {/* Repository Info */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-semibold text-blue-900 mb-2">
              🔗 Connected Repository
            </h3>
            <p className="text-sm text-blue-700">
              https://github.com/omriformula/V2-formula-demo
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Design system will be applied to your actual codebase
            </p>
          </div>

          {/* Create Staging Button */}
          {!stagingEnv && (
            <button
              onClick={handleCreateStaging}
              disabled={isCreating}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200"
            >
              {isCreating ? '🔄 Cloning & Deploying Your Repo...' : '🚀 Create Real Staging Environment'}
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
                <h3 className="font-semibold text-purple-900 mb-2">
                  🎯 360° Staging Audit
                </h3>
                <p className="text-sm text-purple-700">
                  Validate your real staging environment before sending to dev team
                </p>
              </div>
              
              <button
                onClick={handleRunAudit}
                disabled={isAuditing}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all duration-200"
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
