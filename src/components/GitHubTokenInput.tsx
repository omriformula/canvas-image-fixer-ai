
import React, { useState } from 'react';
import { toast } from 'sonner';
import { FormCard } from '@/design-system';
import { Github, Key, ExternalLink } from 'lucide-react';
import { githubAuth } from '@/services/githubAuth';

interface GitHubTokenInputProps {
  onTokenSet: () => void;
}

export const GitHubTokenInput: React.FC<GitHubTokenInputProps> = ({ onTokenSet }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetToken = async () => {
    if (!token.trim()) {
      toast.error('Please enter a GitHub token');
      return;
    }

    if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
      toast.error('Invalid GitHub token format');
      return;
    }

    setLoading(true);
    try {
      // Test the token by making a simple API call
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error('Invalid token or insufficient permissions');
      }

      const userData = await response.json();
      
      githubAuth.setTestToken(token);
      
      toast.success(`🎉 Connected as ${userData.login}!`, {
        description: 'GitHub token validated and stored'
      });
      
      onTokenSet();
      setToken('');
    } catch (error) {
      console.error('Token validation failed:', error);
      toast.error('❌ Invalid GitHub token', {
        description: 'Please check your token and permissions'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard className="border border-yellow-200 bg-yellow-50">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Key className="h-6 w-6 text-yellow-600" />
          <div>
            <h3 className="font-semibold text-yellow-900">GitHub Personal Access Token</h3>
            <p className="text-sm text-yellow-700">
              Enter your GitHub token to enable real repository operations
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-yellow-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Token
          </label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your token needs 'repo' and 'write:repo_hook' permissions
          </p>
        </div>

        <div className="flex items-center justify-between">
          <a
            href="https://github.com/settings/tokens/new?scopes=repo,write:repo_hook"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Create GitHub Token</span>
          </a>
          
          <button
            onClick={handleSetToken}
            disabled={loading || !token.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '🔄 Validating...' : '✅ Connect'}
          </button>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg text-sm">
          <p className="font-medium text-blue-900 mb-1">How to create a GitHub token:</p>
          <ul className="text-blue-700 space-y-1 text-xs">
            <li>1. Go to GitHub → Settings → Developer settings → Personal access tokens</li>
            <li>2. Click "Generate new token (classic)"</li>
            <li>3. Select scopes: <code className="bg-blue-100 px-1 rounded">repo</code> and <code className="bg-blue-100 px-1 rounded">write:repo_hook</code></li>
            <li>4. Copy the token and paste it above</li>
          </ul>
        </div>
      </div>
    </FormCard>
  );
};
