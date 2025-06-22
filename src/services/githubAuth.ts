
interface GitHubAuthConfig {
  clientId: string;
  redirectUri: string;
  scopes: string[];
}

interface GitHubToken {
  accessToken: string;
  tokenType: string;
  scope: string;
}

export class GitHubAuth {
  private config: GitHubAuthConfig = {
    clientId: process.env.VITE_GITHUB_CLIENT_ID || 'your-github-app-client-id',
    redirectUri: `${window.location.origin}/auth/github/callback`,
    scopes: ['repo', 'write:repo_hook']
  };

  async initiateOAuth(): Promise<void> {
    const state = this.generateState();
    localStorage.setItem('github_oauth_state', state);
    
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(' '),
      state: state,
      allow_signup: 'true'
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  }

  async handleCallback(code: string, state: string): Promise<GitHubToken | null> {
    const savedState = localStorage.getItem('github_oauth_state');
    if (state !== savedState) {
      throw new Error('Invalid OAuth state');
    }

    try {
      // In production, this would call your backend endpoint
      // For now, we'll simulate the token exchange
      const response = await fetch('/api/github/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state })
      });

      if (!response.ok) {
        throw new Error('Token exchange failed');
      }

      const token = await response.json();
      this.storeToken(token);
      return token;
    } catch (error) {
      console.error('GitHub OAuth callback failed:', error);
      return null;
    }
  }

  getStoredToken(): string | null {
    return localStorage.getItem('github_token');
  }

  storeToken(token: GitHubToken): void {
    localStorage.setItem('github_token', token.accessToken);
    localStorage.setItem('github_token_type', token.tokenType);
    localStorage.setItem('github_token_scope', token.scope);
  }

  clearToken(): void {
    localStorage.removeItem('github_token');
    localStorage.removeItem('github_token_type');
    localStorage.removeItem('github_token_scope');
    localStorage.removeItem('github_oauth_state');
  }

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

export const githubAuth = new GitHubAuth();
