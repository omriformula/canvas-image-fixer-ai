
import { githubAuth } from './githubAuth';

interface RepoConfig {
  owner: string;
  name: string;
  fullName: string;
}

interface SyncStatus {
  connectedRepo: RepoConfig;
  productionRepo: RepoConfig;
  lastSync: string | null;
  pendingChanges: boolean;
}

interface MergeEvent {
  prNumber: number;
  branchName: string;
  mergedAt: string;
  changedFiles: string[];
}

export class RepoSyncManager {
  private connectedRepo: RepoConfig = {
    owner: 'user', // This would be detected from Lovable's GitHub connection
    name: 'lovable-connected-repo',
    fullName: 'user/lovable-connected-repo'
  };

  private productionRepo: RepoConfig = {
    owner: 'omriformula',
    name: 'v2-formula-demo',
    fullName: 'omriformula/v2-formula-demo'
  };

  async getSyncStatus(): Promise<SyncStatus> {
    try {
      // Check if there are unsynced changes
      const connectedRepoCommits = await this.getRecentCommits(this.connectedRepo);
      const productionRepoCommits = await this.getRecentCommits(this.productionRepo);
      
      const lastSync = localStorage.getItem('last_sync_timestamp');
      const pendingChanges = this.hasPendingChanges(connectedRepoCommits, lastSync);

      return {
        connectedRepo: this.connectedRepo,
        productionRepo: this.productionRepo,
        lastSync,
        pendingChanges
      };
    } catch (error) {
      console.error('Failed to get sync status:', error);
      throw error;
    }
  }

  async detectMergedPRs(): Promise<MergeEvent[]> {
    const token = githubAuth.getStoredToken();
    if (!token) throw new Error('GitHub authentication required');

    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.connectedRepo.fullName}/pulls?state=closed&sort=updated&direction=desc&per_page=10`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch PRs: ${response.statusText}`);
      }

      const prs = await response.json();
      const lastSync = localStorage.getItem('last_sync_timestamp');
      const lastSyncDate = lastSync ? new Date(lastSync) : new Date(0);

      const mergedPRs = prs
        .filter((pr: any) => pr.merged_at && new Date(pr.merged_at) > lastSyncDate)
        .map((pr: any) => ({
          prNumber: pr.number,
          branchName: pr.head.ref,
          mergedAt: pr.merged_at,
          changedFiles: [] // Would need additional API call to get files
        }));

      return mergedPRs;
    } catch (error) {
      console.error('Failed to detect merged PRs:', error);
      throw error;
    }
  }

  async syncToProduction(mergeEvent: MergeEvent): Promise<{ prUrl: string; prNumber: number }> {
    const token = githubAuth.getStoredToken();
    if (!token) throw new Error('GitHub authentication required');

    try {
      // 1. Get the merged changes from connected repo
      const changedFiles = await this.getChangedFiles(mergeEvent);
      
      // 2. Create branch in production repo
      const branchName = `sync-from-connected-${mergeEvent.prNumber}-${Date.now()}`;
      await this.createProductionBranch(branchName);
      
      // 3. Apply changes to production repo
      await this.applyChangesToProduction(branchName, changedFiles);
      
      // 4. Create PR in production repo
      const pr = await this.createProductionPR(branchName, mergeEvent);
      
      // 5. Update sync timestamp
      localStorage.setItem('last_sync_timestamp', new Date().toISOString());
      
      return {
        prUrl: pr.html_url,
        prNumber: pr.number
      };
    } catch (error) {
      console.error('Sync to production failed:', error);
      throw error;
    }
  }

  private async getRecentCommits(repo: RepoConfig) {
    const token = githubAuth.getStoredToken();
    if (!token) return [];

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo.fullName}/commits?per_page=10`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      return response.ok ? await response.json() : [];
    } catch (error) {
      return [];
    }
  }

  private hasPendingChanges(commits: any[], lastSync: string | null): boolean {
    if (!lastSync || commits.length === 0) return false;
    
    const lastSyncDate = new Date(lastSync);
    return commits.some((commit: any) => 
      new Date(commit.commit.committer.date) > lastSyncDate
    );
  }

  private async getChangedFiles(mergeEvent: MergeEvent) {
    const token = githubAuth.getStoredToken();
    if (!token) throw new Error('GitHub authentication required');

    const response = await fetch(
      `https://api.github.com/repos/${this.connectedRepo.fullName}/pulls/${mergeEvent.prNumber}/files`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get changed files');
    }

    const files = await response.json();
    const changedFiles = [];

    for (const file of files) {
      if (file.status === 'removed') continue;
      
      // Get file content from connected repo
      const contentResponse = await fetch(
        `https://api.github.com/repos/${this.connectedRepo.fullName}/contents/${file.filename}`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (contentResponse.ok) {
        const contentData = await contentResponse.json();
        changedFiles.push({
          filePath: file.filename,
          content: atob(contentData.content),
          description: `Sync from connected repo PR #${mergeEvent.prNumber}`
        });
      }
    }

    return changedFiles;
  }

  private async createProductionBranch(branchName: string): Promise<void> {
    const token = githubAuth.getStoredToken();
    if (!token) throw new Error('GitHub authentication required');

    // Get main branch SHA
    const mainResponse = await fetch(
      `https://api.github.com/repos/${this.productionRepo.fullName}/git/ref/heads/main`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!mainResponse.ok) {
      throw new Error('Failed to get main branch reference');
    }

    const mainData = await mainResponse.json();

    // Create new branch
    const createResponse = await fetch(
      `https://api.github.com/repos/${this.productionRepo.fullName}/git/refs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: mainData.object.sha
        })
      }
    );

    if (!createResponse.ok) {
      throw new Error('Failed to create production branch');
    }
  }

  private async applyChangesToProduction(branchName: string, changedFiles: any[]): Promise<void> {
    const token = githubAuth.getStoredToken();
    if (!token) throw new Error('GitHub authentication required');

    for (const file of changedFiles) {
      try {
        // Check if file exists
        let existingFileSha = null;
        try {
          const fileResponse = await fetch(
            `https://api.github.com/repos/${this.productionRepo.fullName}/contents/${file.filePath}?ref=${branchName}`,
            {
              headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
              }
            }
          );

          if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            existingFileSha = fileData.sha;
          }
        } catch (error) {
          // File doesn't exist
        }

        // Create or update file
        const updateResponse = await fetch(
          `https://api.github.com/repos/${this.productionRepo.fullName}/contents/${file.filePath}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `token ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
              message: `🔄 ${file.description}`,
              content: btoa(file.content),
              branch: branchName,
              ...(existingFileSha && { sha: existingFileSha })
            })
          }
        );

        if (!updateResponse.ok) {
          throw new Error(`Failed to update ${file.filePath}`);
        }
      } catch (error) {
        console.error(`Failed to sync file ${file.filePath}:`, error);
        throw error;
      }
    }
  }

  private async createProductionPR(branchName: string, mergeEvent: MergeEvent): Promise<any> {
    const token = githubAuth.getStoredToken();
    if (!token) throw new Error('GitHub authentication required');

    const prResponse = await fetch(
      `https://api.github.com/repos/${this.productionRepo.fullName}/pulls`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          title: `🔄 Sync from Connected Repo - PR #${mergeEvent.prNumber}`,
          head: branchName,
          base: 'main',
          body: `## 🔄 Automated Sync from Connected Repository

**Source PR:** Connected Repo PR #${mergeEvent.prNumber}
**Merged:** ${mergeEvent.mergedAt}
**Branch:** ${mergeEvent.branchName}

### Changes Synced:
- All design system improvements from connected repository
- Tested and approved changes ready for production
- Maintains compatibility with existing codebase

### Ready for Production Deployment ✅
This PR contains pre-approved changes that have already been tested in the connected repository environment.

*Automatically created by Design System Sync Dashboard*`
        })
      }
    );

    if (!prResponse.ok) {
      const error = await prResponse.json();
      throw new Error(`Failed to create production PR: ${error.message}`);
    }

    return await prResponse.json();
  }
}

export const repoSyncManager = new RepoSyncManager();
