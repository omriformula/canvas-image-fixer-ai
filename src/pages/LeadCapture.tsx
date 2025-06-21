import React, { useState } from 'react';
import { PageContainer, FormCard, FormField, StyledInput, StyledButton, StyledForm } from '@/design-system';
import { useToast } from '@/hooks/use-toast';
import { Mail, Camera } from 'lucide-react';

const LeadCapture = () => {
  const [githubRepo, setGithubRepo] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Request Submitted!",
        description: "We'll integrate the AcceptanceFlow and send you the updated code within 24 hours."
      });
      setIsSubmitting(false);
      setGithubRepo('');
      setEmail('');
    }, 1000);
  };

  const sendViaGmail = () => {
    const currentUrl = window.location.href;
    const subject = "Share access with Eli - Design Integration Request";
    
    // Create a simple email with image preview and call-to-action
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a; margin-bottom: 20px;">Design Integration Request</h2>
        
        <p style="color: #666; margin-bottom: 20px;">Hi! I'd like to share this design integration form with you.</p>
        
        <p style="color: #666; margin-bottom: 20px;">Eleanor wants to boost the design of a few screens without taking any of your time!</p>
        
        <!-- Form Preview Image Placeholder -->
        <div style="border: 2px solid #e2e2e2; border-radius: 12px; padding: 40px; text-align: center; margin: 30px 0; background-color: #f9f9f9;">
          <div style="background-color: #f3f2ed; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1a1a1a; margin: 0 0 10px 0;">📸 Form Preview</h3>
            <p style="color: #666; font-size: 14px; margin: 0;">Click the button below to view and fill out the interactive form</p>
          </div>
          
          <a href="${currentUrl}" style="display: inline-block; padding: 16px 32px; background-color: #2d2d2d; color: white; text-decoration: none; border-radius: 32px; font-weight: 500; margin-top: 10px;">
            📋 Fill Out Form
          </a>
        </div>
        
        <div style="background-color: #f0f0f0; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            <strong>What happens next:</strong><br>
            • Fill out your GitHub repo and email<br>
            • Stay in the loop and approve changes<br>
            • Sit back while we ship updates for you!
          </p>
        </div>
        
        <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">
          No setup required • Works with any React app • Production ready
        </p>
      </div>
    `;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=omri@formula.inc&cc=eleanor@formula.inc&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(htmlBody)}`;
    
    window.open(gmailUrl, '_blank');
    
    toast({
      title: "Gmail Opened",
      description: "A clean email with form preview has been created in Gmail."
    });
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
            {isSubmitting ? 'Submitting...' : 'Share'}
          </StyledButton>
        </StyledForm>

        <div className="mt-4">
          <button
            onClick={sendViaGmail}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Mail size={16} />
            Send via Gmail (with preview)
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>No setup required • Works with any React app • Production ready</p>
        </div>
      </FormCard>
    </PageContainer>
  );
};

export default LeadCapture;
