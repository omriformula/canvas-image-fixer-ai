
import React, { useState } from 'react';
import { PageContainer, FormCard, FormField, StyledInput, StyledButton, StyledForm } from '@/design-system';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

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
    
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 460px; margin: 0 auto; background-color: #f3f2ed; padding: 40px 16px;">
        <div style="background-color: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);">
          
          <!-- Hero Image -->
          <div style="aspect-ratio: 16/9; overflow: hidden;">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop" alt="Blue sky with clouds" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          
          <!-- Content -->
          <div style="padding: 24px;">
            <h3 style="font-size: 32px; font-weight: 300; color: #1a1a1a; margin: 0 0 24px 0; font-family: 'Work Sans', sans-serif;">Share access with Eli</h3>
            
            <p style="color: #666; margin-bottom: 16px; text-align: left;">@Eleanor wants to boost the design of a few screens - without taking any of your time!</p>
            
            <div style="font-size: 14px; color: #888; margin-bottom: 24px;">
              <p style="margin: 4px 0; text-align: left;">- Fill out the details below</p>
              <p style="margin: 4px 0; text-align: left;">- Stay in the loop and approve changes</p>
              <p style="margin: 4px 0; text-align: left;">- Sit back while others ship updates so you don't have to!</p>
            </div>
            
            <!-- Form Visual -->
            <div style="border: 1px solid #e2e2e2; border-radius: 12px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">
              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 14px; font-weight: 500; color: #2d2d2d; margin-bottom: 6px;">GitHub Repository URL</label>
                <div style="padding: 14px; border: 1px solid #e2e2e2; border-radius: 12px; background-color: white; color: #999;">https://github.com/yourcompany/your-repo</div>
              </div>
              
              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 14px; font-weight: 500; color: #2d2d2d; margin-bottom: 6px;">Your Email</label>
                <div style="padding: 14px; border: 1px solid #e2e2e2; border-radius: 12px; background-color: white; color: #999;">you@yourcompany.com</div>
              </div>
              
              <div style="margin-top: 24px; padding: 12px; border: 1px solid #2d2d2d; border-radius: 32px; text-align: center; background-color: transparent; color: #2d2d2d; font-weight: 500;">
                Share
              </div>
            </div>
            
            <!-- Call to Action -->
            <div style="background-color: #f0f0f0; padding: 16px; border-radius: 12px; text-align: center; margin: 20px 0;">
              <p style="margin: 0 0 12px 0; font-weight: 500; color: #2d2d2d;">Ready to get started?</p>
              <a href="${currentUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2d2d2d; color: white; text-decoration: none; border-radius: 32px; font-weight: 500;">Fill Out Form</a>
            </div>
            
            <div style="text-align: center; font-size: 12px; color: #888; margin-top: 24px;">
              <p style="margin: 0;">No setup required • Works with any React app • Production ready</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=omri@formula.inc&cc=eleanor@formula.inc&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(htmlBody)}`;
    
    window.open(gmailUrl, '_blank');
    
    toast({
      title: "Gmail Opened",
      description: "A new Gmail compose window has opened with a beautifully formatted email."
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
            Send this form via Gmail
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
