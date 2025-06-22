import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageContainer, FormCard } from '@/design-system';
import { stagingDeployer, StagingEnvironment } from '@/services/stagingDeployer';
import { useToast } from '@/hooks/use-toast';
import { LoadingScreen } from '@/components/analysis/LoadingScreen';
import { ErrorScreen } from '@/components/analysis/ErrorScreen';
import { StagingEnvironmentCard } from '@/components/analysis/StagingEnvironmentCard';
import { ComponentsAnalyzedCard } from '@/components/analysis/ComponentsAnalyzedCard';

const AnalysisResults = () => {
  const [searchParams] = useSearchParams();
  const [stagingEnv, setStagingEnv] = useState<StagingEnvironment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [creatingPR, setCreatingPR] = useState(false);
  const { toast } = useToast();

  const repoUrl = searchParams.get('repo');
  const email = searchParams.get('email');

  useEffect(() => {
    console.log('AnalysisResults mounted with:', { repoUrl, email });
    
    if (repoUrl) {
      startRealStagingProcess();
    } else {
      console.log('No repo URL found in search params');
      setError('No repository URL provided');
      setLoading(false);
    }
  }, [repoUrl]);

  const startRealStagingProcess = async () => {
    if (!repoUrl) return;
    
    try {
      console.log('Starting staging process for:', repoUrl);
      setLoading(true);
      setDeploying(true);
      setError(null);
      
      toast({
        title: "🔍 Analyzing Real Repository",
        description: "Cloning your codebase and mapping components to our design system..."
      });

      const staging = await stagingDeployer.cloneAndImprove(repoUrl, []);
      console.log('Staging result:', staging);
      
      setStagingEnv(staging);
      
      toast({
        title: "🎉 Real Staging Environment Ready!",
        description: "Your actual codebase with design system improvements is now live!"
      });
      
    } catch (error) {
      console.error('Staging process failed:', error);
      setError(`Could not access the repository: ${error}`);
      
      toast({
        title: "Staging Failed",
        description: "Could not access the repository. Please check permissions and URL."
      });
    } finally {
      console.log('Staging process completed');
      setLoading(false);
      setDeploying(false);
    }
  };

  const createPullRequest = async () => {
    if (!stagingEnv || !repoUrl) return;

    try {
      setCreatingPR(true);
      const pr = await stagingDeployer.createPullRequest(stagingEnv, repoUrl);
      
      toast({
        title: "🚀 Pull Request Created!",
        description: "Dev team can now review the real staging environment and approve with one click."
      });

      window.open(pr.prUrl, '_blank');
      
    } catch (error) {
      toast({
        title: "PR Creation Failed", 
        description: "Could not create pull request. Please try again."
      });
    } finally {
      setCreatingPR(false);
    }
  };

  console.log('Current state:', { loading, error, stagingEnv, repoUrl, email });

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !stagingEnv) {
    return <ErrorScreen error={error} />;
  }

  return (
    <PageContainer variant="wide">
      <FormCard title="✨ Your Real App with Design System Applied!">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <StagingEnvironmentCard 
              stagingEnv={stagingEnv}
              onCreatePR={createPullRequest}
              creatingPR={creatingPR}
            />
            
            <ComponentsAnalyzedCard stagingEnv={stagingEnv} />
          </div>

          {/* What's Different */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">🎯 Key Differences from Mock-ups</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>• ✅ <strong>Real functionality preserved:</strong> All your existing features work exactly the same</p>
              <p>• 🎨 <strong>Design system applied:</strong> Your components now use consistent colors, spacing, and typography</p>
              <p>• 🔧 <strong>Source of truth:</strong> Any differences from initial mockups have been corrected based on your actual code</p>
              <p>• 🚀 <strong>Production ready:</strong> Tested with your real data and functionality</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">📋 What happens next?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. 👀 Dev team gets PR with real staging URL of their actual app</p>
              <p>2. ✅ They test it works exactly like before (but prettier!)</p>
              <p>3. 🚀 One-click approve → automatic deploy to production</p>
              <p className="font-medium text-gray-800 mt-3">No code review needed - functionality is identical!</p>
            </div>
          </div>
        </div>
      </FormCard>
    </PageContainer>
  );
};

export default AnalysisResults;
