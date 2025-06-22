
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, FormCard, FormField, StyledInput, StyledButton, StyledForm } from '@/design-system';
import { useToast } from '@/hooks/use-toast';

const LeadCapture = () => {
  const [githubRepo, setGithubRepo] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Starting Analysis!",
        description: "Analyzing your repository for design improvements..."
      });
      
      // Navigate to analysis results with parameters
      const params = new URLSearchParams({
        repo: githubRepo,
        email: email
      });
      
      navigate(`/analysis-results?${params.toString()}`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <PageContainer>
      <FormCard 
        title="Share access with Eli" 
        heroImage="/lovable-uploads/79eb6228-916f-4f9d-811b-563c4803553b.png" 
        heroAlt="Blue sky with clouds"
      >
        <div className="mb-6 text-center">
          <p className="text-gray-600 mb-4 text-left">@Eleanor wants to boost the design of a few screens - without taking any of your time!</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p className="text-left"> - Fill out the details below</p>
            <p className="text-left"> - Stay in the loop and approve changes 
 - Sit back while others ship updates so you don't have to!</p>
            <p>
          </p>
            
          </div>
        </div>

        <StyledForm onSubmit={handleSubmit}>
          <FormField label="GitHub Repository URL" htmlFor="github-repo">
            <StyledInput 
              id="github-repo" 
              type="url" 
              placeholder="https://github.com/yourcompany/your-repo" 
              value={githubRepo} 
              onChange={e => setGithubRepo(e.target.value)} 
              required 
            />
          </FormField>

          <FormField label="Your Email" htmlFor="email">
            <StyledInput 
              id="email" 
              type="email" 
              placeholder="you@yourcompany.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </FormField>

          <StyledButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Starting Analysis...' : 'Analyze My Repository'}
          </StyledButton>
        </StyledForm>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>No setup required • Works with any React app • Production ready</p>
        </div>
      </FormCard>
    </PageContainer>
  );
};

export default LeadCapture;
