import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FormCard, PageContainer } from '@/design-system';
import { CheckCircle, AlertCircle, Clock, Download, Mail, ExternalLink, Github, Settings, RefreshCw } from 'lucide-react';
import { githubAuth } from '@/services/githubAuth';
import { repoSyncManager } from '@/services/repoSyncManager';
import { GitHubTokenInput } from './GitHubTokenInput';

interface MergeEvent {
  prNumber: number;
  branchName: string;
  mergedAt: string;
  changedFiles: string[];
}

interface SyncStatus {
  connectedRepo: { owner: string; name: string; fullName: string };
  productionRepo: { owner: string; name: string; fullName: string };
  lastSync: string | null;
  pendingChanges: boolean;
}

export const DevTeamHandoff: React.FC = () => {
  const [githubConnected, setGithubConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [mergedPRs, setMergedPRs] = useState<MergeEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState<number | null>(null);

  useEffect(() => {
    checkGitHubConnection();
    if (githubAuth.isAuthenticated()) {
      loadSyncStatus();
      loadMergedPRs();
    }
  }, [githubConnected]);

  const checkGitHubConnection = () => {
    setGithubConnected(githubAuth.isAuthenticated());
  };

  const loadSyncStatus = async () => {
    try {
      const status = await repoSyncManager.getSyncStatus();
      setSyncStatus(status);
    } catch (error) {
      console.error('Failed to load sync status:', error);
    }
  };

  const loadMergedPRs = async () => {
    try {
      setLoading(true);
      const prs = await repoSyncManager.detectMergedPRs();
      setMergedPRs(prs);
    } catch (error) {
      console.error('Failed to load merged PRs:', error);
      toast.error('Failed to load merged PRs', {
        description: 'Please check your GitHub permissions'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGithub = async () => {
    try {
      await githubAuth.initiateOAuth();
    } catch (error) {
      toast.error('Failed to initiate GitHub connection', {
        description: 'Please try again or contact support'
      });
    }
  };

  const handleSyncToProduction = async (mergeEvent: MergeEvent) => {
    if (!githubConnected) {
      toast.error('⚠️ GitHub connection required');
      return;
    }

    setSyncing(mergeEvent.prNumber);
    
    toast.info('🔄 Syncing to production repository...', {
      description: `Creating PR for merged changes from PR #${mergeEvent.prNumber}`
    });

    try {
      const result = await repoSyncManager.syncToProduction(mergeEvent);
      
      toast.success('✅ Successfully synced to production!', {
        description: `PR #${result.prNumber} created in production repository`,
        duration: 10000,
        action: {
          label: 'View PR',
          onClick: () => window.open(result.prUrl, '_blank')
        }
      });

      // Refresh the data
      await loadSyncStatus();
      await loadMergedPRs();

    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('❌ Sync to production failed', {
        description: error instanceof Error ? error.message : 'Please check permissions and try again'
      });
    } finally {
      setSyncing(null);
    }
  };

  const handleRefresh = async () => {
    if (!githubConnected) return;
    
    setLoading(true);
    try {
      await Promise.all([loadSyncStatus(), loadMergedPRs()]);
      toast.success('Data refreshed');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer variant="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Real Repository Sync Dashboard</h1>
              <p className="text-blue-100">Sync design changes from connected repo to production</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
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
                  <h3 className="font-semibold text-green-900">✅ GitHub Connected & Ready</h3>
                  <p className="text-sm text-green-700">
                    All systems go for real repository operations!
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  githubAuth.clearToken();
                  setGithubConnected(false);
                }}
                className="px-3 py-1 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </FormCard>
        )}

        {/* Repository Sync Status */}
        {syncStatus && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormCard className="border border-blue-200 bg-blue-50">
              <div className="flex items-start space-x-3">
                <Settings className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Connected Repository</h3>
                  <p className="text-sm text-blue-700 font-mono break-all">
                    {syncStatus.connectedRepo.fullName}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Source of design system changes
                  </p>
                </div>
              </div>
            </FormCard>

            <FormCard className="border border-green-200 bg-green-50">
              <div className="flex items-start space-x-3">
                <ExternalLink className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Production Repository</h3>
                  <p className="text-sm text-green-700 font-mono break-all">
                    {syncStatus.productionRepo.fullName}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Target for production deployment
                  </p>
                </div>
              </div>
            </FormCard>
          </div>
        )}

        {/* Sync Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Syncs</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mergedPRs.length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Sync</p>
                <p className="text-sm font-bold text-blue-600">
                  {syncStatus?.lastSync ? new Date(syncStatus.lastSync).toLocaleDateString() : 'Never'}
                </p>
              </div>
              <Download className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-sm font-bold text-green-600">
                  {githubConnected ? 'Ready' : 'Disconnected'}
                </p>
              </div>
              <Github className={`h-8 w-8 ${githubConnected ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>

        {/* Merged PRs Ready for Sync */}
        {githubConnected && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Merged PRs Ready for Production Sync</h2>
            
            {loading ? (
              <FormCard className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Loading merged PRs...</p>
              </FormCard>
            ) : mergedPRs.length === 0 ? (
              <FormCard className="text-center py-8">
                <CheckCircle className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">No pending changes to sync</p>
                <p className="text-sm text-gray-500 mt-1">All changes are up to date</p>
              </FormCard>
            ) : (
              mergedPRs.map((mergeEvent) => (
                <FormCard key={mergeEvent.prNumber} className="border border-orange-200 bg-orange-50">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        <div>
                          <h3 className="font-semibold text-lg">PR #{mergeEvent.prNumber} - Ready for Sync</h3>
                          <p className="text-sm text-gray-600">
                            Branch: {mergeEvent.branchName} • Merged: {new Date(mergeEvent.mergedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <span className="px-3 py-1 rounded-full text-xs font-medium border bg-orange-100 text-orange-800 border-orange-200">
                        NEEDS SYNC
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <h4 className="font-medium mb-2">What will be synced:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• All file changes from merged PR #{mergeEvent.prNumber}</li>
                        <li>• Design system improvements</li>
                        <li>• Component updates and styling changes</li>
                        <li>• Maintains existing functionality</li>
                      </ul>
                    </div>

                    <div className="flex space-x-3 pt-4 border-t border-orange-200">
                      <button
                        onClick={() => handleSyncToProduction(mergeEvent)}
                        disabled={syncing === mergeEvent.prNumber}
                        className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {syncing === mergeEvent.prNumber ? (
                          '🔄 Creating Production PR...'
                        ) : (
                          '🚀 Sync to Production'
                        )}
                      </button>
                    </div>

                    <div className="bg-green-100 p-3 rounded-lg text-sm">
                      <p className="font-medium text-green-900 mb-1">Real sync process:</p>
                      <ul className="text-green-700 space-y-1 text-xs">
                        <li>• Fetches actual changes from connected repository</li>
                        <li>• Creates real branch in {syncStatus?.productionRepo.fullName}</li>
                        <li>• Applies file changes via GitHub API</li>
                        <li>• Creates pull request ready for review</li>
                        <li>• Tracks sync history and status</li>
                      </ul>
                    </div>
                  </div>
                </FormCard>
              ))
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
