
import React from 'react';
import { PageContainer, FormCard, FormField, StyledInput, StyledButton, StyledForm } from '@/design-system';

const EmailLandingPreview = () => {
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
            <p className="text-left">- Fill out the details below</p>
            <p className="text-left">- Stay in the loop and approve changes</p>
            <p className="text-left">- Sit back while others ship updates so you don't have to!</p>
          </div>
        </div>

        <StyledForm>
          <FormField label="GitHub Repository URL" htmlFor="github-repo">
            <StyledInput 
              id="github-repo" 
              type="url" 
              placeholder="https://github.com/yourcompany/your-repo" 
              value=""
              readOnly
            />
          </FormField>

          <FormField label="Your Email" htmlFor="email">
            <StyledInput 
              id="email" 
              type="email" 
              placeholder="you@yourcompany.com" 
              value=""
              readOnly
            />
          </FormField>

          <StyledButton type="button">
            Share
          </StyledButton>
        </StyledForm>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>No setup required • Works with any React app • Production ready</p>
        </div>
      </FormCard>
    </PageContainer>
  );
};

export default EmailLandingPreview;
