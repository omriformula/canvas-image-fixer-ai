
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { designAuditor, AuditResult } from '@/services/designAudit';
import { AuditResultsModal } from '@/components/audit/AuditResultsModal';
import { Link } from 'react-router-dom';
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
  
  // New audit-related state
  const [auditInProgress, setAuditInProgress] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);

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

  const handle360Audit = async () => {
    setAuditInProgress(true);
    
    toast.info('🔍 Starting comprehensive 360° audit...', {
      description: 'Checking visual design and functional integrity'
    });

    try {
      const result = await designAuditor.perform360Audit();
      setAuditResult(result);
      setShowAuditModal(true);
    } catch (error) {
      toast.error('Audit failed to complete', {
        description: 'Please try again or contact support'
      });
    } finally {
      setAuditInProgress(false);
    }
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

          {/* Real Staging Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-green-50 p-4 rounded-xl mb-4">
              <h3 className="font-semibold text-green-900 mb-2">
                🚀 Ready for Real Staging?
              </h3>
              <p className="text-sm text-green-700 mb-3">
                Apply this design system to your actual GitHub repository and create a real staging environment for your dev team.
              </p>
              <Link
                to="/real-staging"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                🔗 Set Up Real Staging
              </Link>
            </div>
          </div>

          {/* Local Audit Section */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded-xl mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                🔍 Local Design Validation
              </h3>
              <p className="text-sm text-blue-700">
                Test the design system implementation on this reference form before applying to your real codebase.
              </p>
            </div>
            
            <button
              type="button"
              onClick={handle360Audit}
              disabled={auditInProgress}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-200 mb-4"
            >
              {auditInProgress ? '🔄 Running Local Audit...' : '🎯 Run Local Design Audit'}
            </button>
          </div>

          <StyledButton type="submit">
            Send Offer
          </StyledButton>
        </StyledForm>
      </FormCard>

      {/* Audit Results Modal */}
      <AuditResultsModal
        result={auditResult}
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />
    </PageContainer>
  );
};

export default PaymentOfferForm;
