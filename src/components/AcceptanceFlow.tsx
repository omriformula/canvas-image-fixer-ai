
import { useState } from 'react';
import { toast } from 'sonner';
import {
  PageContainer,
  FormCard,
  FormField,
  StyledInput,
  StyledSelect,
  StyledButton,
  StyledForm
} from '@/design-system';

const AcceptanceFlow = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [acceptanceType, setAcceptanceType] = useState('');
  const [terms, setTerms] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Acceptance submitted successfully!');
    console.log('Acceptance submitted:', {
      companyName,
      contactPerson,
      acceptanceType,
      terms,
      notes
    });
  };

  const acceptanceTypeOptions = [
    { value: 'full', label: 'Full Acceptance' },
    { value: 'partial', label: 'Partial Acceptance' },
    { value: 'conditional', label: 'Conditional Acceptance' }
  ];

  return (
    <PageContainer>
      <FormCard
        title="Acceptance Review"
        heroImage="/lovable-uploads/838a1349-55fb-4cc8-aea2-51a09d22f300.png"
        heroAlt="Acceptance Flow Hero"
      >
        <StyledForm onSubmit={handleSubmit}>
          <FormField label="Company Name" htmlFor="company">
            <StyledInput
              id="company"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Corporation"
            />
          </FormField>

          <FormField label="Contact Person" htmlFor="contact">
            <StyledInput
              id="contact"
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="John Smith"
            />
          </FormField>

          <FormField label="Acceptance Type" htmlFor="type">
            <StyledSelect
              value={acceptanceType}
              onValueChange={setAcceptanceType}
              placeholder="Select acceptance type"
              options={acceptanceTypeOptions}
            />
          </FormField>

          <FormField label="Terms Agreement" htmlFor="terms">
            <StyledInput
              id="terms"
              type="text"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Standard terms and conditions"
            />
          </FormField>

          <FormField label="Additional Notes" htmlFor="notes">
            <StyledInput
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requirements..."
            />
          </FormField>

          <StyledButton type="submit">
            Submit Acceptance
          </StyledButton>
        </StyledForm>
      </FormCard>
    </PageContainer>
  );
};

export default AcceptanceFlow;
