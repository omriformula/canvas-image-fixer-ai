
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

const LinkCreationForm = () => {
  const [linkType, setLinkType] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Payment link created successfully!');
    console.log('Link created:', {
      linkType,
      recipientEmail,
      amount,
      description,
      expiryDate
    });
  };

  const linkTypeOptions = [
    { value: 'payment', label: 'Payment Request' },
    { value: 'invoice', label: 'Invoice Link' },
    { value: 'subscription', label: 'Subscription Link' }
  ];

  return (
    <PageContainer>
      <FormCard
        title="Create Payment Link"
        heroImage="/lovable-uploads/52d08a01-376c-4bd3-b712-294f7355efdc.png"
        heroAlt="Create Link Hero"
      >
        <StyledForm onSubmit={handleSubmit}>
          <FormField label="Link Type" htmlFor="linkType">
            <StyledSelect
              value={linkType}
              onValueChange={setLinkType}
              placeholder="Select link type"
              options={linkTypeOptions}
            />
          </FormField>

          <FormField label="Recipient Email" htmlFor="email">
            <StyledInput
              id="email"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="recipient@company.com"
            />
          </FormField>

          <FormField label="Amount" htmlFor="amount">
            <StyledInput
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$1,000"
            />
          </FormField>

          <FormField label="Description" htmlFor="description">
            <StyledInput
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Invoice #INV-001"
            />
          </FormField>

          <FormField label="Expiry Date" htmlFor="expiry">
            <StyledInput
              id="expiry"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </FormField>

          <StyledButton type="submit">
            Create Link
          </StyledButton>
        </StyledForm>
      </FormCard>
    </PageContainer>
  );
};

export default LinkCreationForm;
