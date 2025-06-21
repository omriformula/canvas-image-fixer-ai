
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
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

const PaymentOfferForm = () => {
  const [recipient, setRecipient] = useState('');
  const [fromCompany, setFromCompany] = useState('');
  const [toCompany, setToCompany] = useState('');
  const [discount, setDiscount] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [latePayment, setLatePayment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Payment offer sent successfully!');
    console.log('Payment offer submitted:', {
      recipient,
      fromCompany,
      toCompany,
      discount,
      amount,
      dueDate,
      latePayment
    });
  };

  const recipientOptions = [
    { value: 'vendor', label: 'Vendor' },
    { value: 'customer', label: 'Customer' }
  ];

  return (
    <PageContainer>
      <FormCard
        title="Create a Payment Offer"
        heroImage="/lovable-uploads/3ddd0a66-6fbf-4d23-ac56-bd6b303c55c5.png"
        heroAlt="Hero Image"
      >
        <StyledForm onSubmit={handleSubmit}>
          <FormField label="Who will receive the offer?" htmlFor="recipient">
            <StyledSelect
              value={recipient}
              onValueChange={setRecipient}
              placeholder="Select recipient"
              options={recipientOptions}
            />
          </FormField>

          <FormField label="From (your company name)" htmlFor="from">
            <StyledInput
              id="from"
              type="text"
              value={fromCompany}
              onChange={(e) => setFromCompany(e.target.value)}
              placeholder="Your Company"
            />
          </FormField>

          <FormField label="To (recipient's company name)" htmlFor="to">
            <StyledInput
              id="to"
              type="text"
              value={toCompany}
              onChange={(e) => setToCompany(e.target.value)}
              placeholder="Recipient Company"
            />
          </FormField>

          <FormField label="Discount Rate (%)" htmlFor="discount">
            <StyledInput
              id="discount"
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="e.g. 2.5"
            />
          </FormField>

          <FormField label="Full Payment Amount" htmlFor="amount">
            <StyledInput
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$5,000"
            />
          </FormField>

          <FormField label="Payment Due Date" htmlFor="due-date">
            <StyledInput
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormField>

          <div className="flex items-center justify-between mt-4">
            <FormField label="Late Payment Offer" htmlFor="late" className="mb-0">
              <span></span>
            </FormField>
            <Switch
              id="late"
              checked={latePayment}
              onCheckedChange={setLatePayment}
            />
          </div>

          <StyledButton type="submit">
            Send Offer
          </StyledButton>
        </StyledForm>
      </FormCard>
    </PageContainer>
  );
};

export default PaymentOfferForm;
