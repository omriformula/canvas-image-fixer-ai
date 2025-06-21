
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import {
  FormCard,
  FormField,
  StyledInput,
  StyledButton,
  StyledForm
} from '@/design-system';

const AcceptanceFlow = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [paymentAmount] = useState('$10,000');
  const [companyName] = useState('Example Company');

  // Mock data for daily rates (in real app, this would come from your backend)
  const getDailyRate = (date: Date) => {
    const day = date.getDate();
    // Sample rates - earlier dates have higher discounts, later dates have premiums
    if (day <= 10) return { rate: (4.0 - day * 0.3).toFixed(1), type: 'discount' };
    if (day <= 20) return { rate: (3.0 - (day - 10) * 0.2).toFixed(1), type: 'discount' };
    if (day <= 25) return { rate: (1.0 - (day - 20) * 0.2).toFixed(1), type: 'discount' };
    return { rate: ((day - 25) * 0.2).toFixed(1), type: 'premium' };
  };

  const handleSchedulePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error('Please select a payment date');
      return;
    }
    
    const rateInfo = getDailyRate(selectedDate);
    toast.success(`Payment scheduled for ${selectedDate.toLocaleDateString()} with ${rateInfo.rate}% ${rateInfo.type}`);
    console.log('Payment scheduled:', {
      date: selectedDate,
      amount: paymentAmount,
      rate: rateInfo
    });
  };

  return (
    <div className="space-y-6">
      <FormCard title="Select a payment date">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-2">
            provided to you by <strong>{companyName}</strong>
          </p>
          <p className="text-lg font-medium">
            Payment Amount: {paymentAmount}
          </p>
        </div>

        <StyledForm onSubmit={handleSchedulePayment}>
          <div className="mb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border mx-auto"
              modifiers={{
                discount: (date) => {
                  const rate = getDailyRate(date);
                  return rate.type === 'discount';
                },
                premium: (date) => {
                  const rate = getDailyRate(date);
                  return rate.type === 'premium';
                }
              }}
              modifiersStyles={{
                discount: { 
                  backgroundColor: '#dcf4dc', 
                  color: '#166534',
                  fontWeight: '500'
                },
                premium: { 
                  backgroundColor: '#fef3c7', 
                  color: '#92400e',
                  fontWeight: '500'
                }
              }}
              components={{
                DayContent: ({ date }) => {
                  const rateInfo = getDailyRate(date);
                  return (
                    <div className="text-center">
                      <div>{date.getDate()}</div>
                      <div className="text-xs">
                        {rateInfo.rate}%
                      </div>
                    </div>
                  );
                }
              }}
            />
          </div>

          {selectedDate && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-800">
                Selected: {selectedDate.toLocaleDateString()}
              </p>
              <p className="text-sm text-blue-600">
                Rate: {getDailyRate(selectedDate).rate}% {getDailyRate(selectedDate).type}
              </p>
            </div>
          )}

          <StyledButton type="submit">
            Schedule Payment
          </StyledButton>
        </StyledForm>

        <div className="mt-4 text-center text-xs text-gray-500">
          Powered by formula
        </div>
      </FormCard>

      {/* Legend */}
      <FormCard title="Rate Legend">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 rounded"></div>
            <span>Early payment discount (green dates)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 rounded"></div>
            <span>Late payment premium (yellow dates)</span>
          </div>
        </div>
      </FormCard>
    </div>
  );
};

export default AcceptanceFlow;
