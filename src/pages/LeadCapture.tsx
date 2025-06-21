
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
    const body = `Hi,

I'd like to share this design integration request form with you:

${currentUrl}

Eleanor wants to boost the design of a few screens without taking any of your time!

Best regards,
Eleanor`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=omri@formula.inc&cc=eleanor@formula.inc&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl, '_blank');
    
    toast({
      title: "Gmail Opened",
      description: "A new Gmail compose window has opened with the form link and details."
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
