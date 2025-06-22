
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageContainer, FormCard, StyledButton } from '@/design-system';
import { repoAnalyzer, RepoAnalysisResult, DesignSuggestion } from '@/services/repoAnalyzer';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';

const AnalysisResults = () => {
  const [searchParams] = useSearchParams();
  const [analysis, setAnalysis] = useState<RepoAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [creatingStaging, setCreatingStaging] = useState(false);
  const { toast } = useToast();

  const repoUrl = searchParams.get('repo');
  const email = searchParams.get('email');

  useEffect(() => {
    if (repoUrl) {
      analyzeRepo();
    }
  }, [repoUrl]);

  const analyzeRepo = async () => {
    if (!repoUrl) return;
    
    try {
      setLoading(true);
      const result = await repoAnalyzer.analyzeRepository(repoUrl, email || undefined);
      setAnalysis(result);
      // Pre-select high impact suggestions
      setSelectedSuggestions(result.prioritySuggestions.map(s => s.id));
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the repository. Please check the URL and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStaging = async () => {
    if (!analysis || selectedSuggestions.length === 0) return;

    try {
      setCreatingStaging(true);
      const stagingUrl = await repoAnalyzer.createStagingBranch(analysis, selectedSuggestions);
      
      toast({
        title: "Staging Environment Created!",
        description: "Your design improvements are now live on staging."
      });

      // Update analysis with staging URL
      setAnalysis(prev => prev ? { ...prev, stagingUrl } : null);
    } catch (error) {
      toast({
        title: "Staging Creation Failed",
        description: "Could not create staging environment. Please try again."
      });
    } finally {
      setCreatingStaging(false);
    }
  };

  const toggleSuggestion = (suggestionId: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(suggestionId) 
        ? prev.filter(id => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <FormCard title="Analyzing Repository...">
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Scanning your React components for design improvements...</p>
          </div>
        </FormCard>
      </PageContainer>
    );
  }

  if (!analysis) {
    return (
      <PageContainer>
        <FormCard title="Analysis Error">
          <div className="text-center py-8">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-600">Could not analyze the repository. Please check the URL and try again.</p>
          </div>
        </FormCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormCard title="Repository Analysis Complete">
        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Analysis Overview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Repository:</span>
                <p className="font-medium">{analysis.repoUrl}</p>
              </div>
              <div>
                <span className="text-gray-600">Design Score:</span>
                <p className="font-medium text-lg">{analysis.overallScore}/10</p>
              </div>
              <div>
                <span className="text-gray-600">Components Analyzed:</span>
                <p className="font-medium">{analysis.components.length}</p>
              </div>
              <div>
                <span className="text-gray-600">Improvement Opportunities:</span>
                <p className="font-medium">{analysis.prioritySuggestions.length}</p>
              </div>
            </div>
          </div>

          {/* Priority Suggestions */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Recommended Improvements</h3>
            <div className="space-y-4">
              {analysis.prioritySuggestions.map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={selectedSuggestions.includes(suggestion.id)}
                          onChange={() => toggleSuggestion(suggestion.id)}
                          className="rounded"
                        />
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(suggestion.impact)}`}>
                          {suggestion.impact} impact
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{suggestion.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Before:</span>
                      <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                        <code>{suggestion.beforeCode}</code>
                      </pre>
                    </div>
                    <div>
                      <span className="text-gray-500">After:</span>
                      <pre className="bg-green-50 p-2 rounded mt-1 overflow-x-auto">
                        <code>{suggestion.afterCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <StyledButton 
              onClick={handleCreateStaging}
              disabled={selectedSuggestions.length === 0 || creatingStaging}
            >
              {creatingStaging ? 'Creating Staging...' : `Create Staging with ${selectedSuggestions.length} improvements`}
            </StyledButton>
            
            {analysis.stagingUrl && (
              <button
                onClick={() => window.open(analysis.stagingUrl, '_blank')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ExternalLink size={16} />
                View Staging
              </button>
            )}
          </div>

          {analysis.stagingUrl && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-600" size={20} />
                <h4 className="font-medium text-green-800">Staging Environment Ready!</h4>
              </div>
              <p className="text-green-700 text-sm mb-2">
                Your improvements are now live at: <a href={analysis.stagingUrl} target="_blank" rel="noopener noreferrer" className="underline">{analysis.stagingUrl}</a>
              </p>
              <p className="text-green-600 text-sm">
                ✅ Review the changes • ✅ Request tweaks • ✅ When ready, we'll send it to your dev team for one-click approval
              </p>
            </div>
          )}
        </div>
      </FormCard>
    </PageContainer>
  );
};

export default AnalysisResults;
