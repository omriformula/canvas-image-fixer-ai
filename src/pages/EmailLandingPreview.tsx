
import React from 'react';
import { PageContainer, FormCard, StyledButton } from '@/design-system';
import { useNavigate } from 'react-router-dom';

const EmailLandingPreview = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/get-integration');
  };

  return (
    <PageContainer>
      <FormCard 
        title="Share access with Eli" 
        heroImage="/lovable-uploads/79eb6228-916f-4f9d-811b-563c4803553b.png" 
        heroAlt="Blue sky with clouds"
      >
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600 text-lg">
              @Eleanor wants to boost the design of a few screens - without taking any of your time!
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg text-left">
              <h4 className="font-medium text-gray-800 mb-3">Here's how it works:</h4>
              <div className="space-y-2 text-gray-700">
                <p>✅ Share your GitHub repo and email (takes 30 seconds)</p>
                <p>✅ Stay in the loop and approve all changes</p>
                <p>✅ Sit back while we ship design updates for you!</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-medium">
                🚀 No setup required • Works with any React app • Production ready
              </p>
            </div>
          </div>

          <StyledButton onClick={handleGetStarted}>
            Get Started - Share Access
          </StyledButton>

          <p className="text-sm text-gray-500">
            Takes less than a minute to set up
          </p>
        </div>
      </FormCard>
    </PageContainer>
  );
};

export default EmailLandingPreview;
