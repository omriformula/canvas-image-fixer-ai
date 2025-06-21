
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import {
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
      {/* Main Payment Card with Glassmorphism */}
      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-medium text-white mb-4">
            Payment Acceptance
          </h3>
          <p className="text-white/80 mb-2">
            Payment request from <strong className="text-white">{companyName}</strong>
          </p>
          <p className="text-xl font-medium text-white mb-2">
            Amount: {paymentAmount}
          </p>
          <p className="text-white/70 text-sm">
            Select your preferred payment date below
          </p>
        </div>

        <StyledForm onSubmit={handleSchedulePayment}>
          <div className="mb-8">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm mx-auto p-4"
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
                  backgroundColor: 'rgba(34, 197, 94, 0.3)', 
                  color: '#ffffff',
                  fontWeight: '500',
                  border: '1px solid rgba(34, 197, 94, 0.5)'
                },
                premium: { 
                  backgroundColor: 'rgba(251, 191, 36, 0.3)', 
                  color: '#ffffff',
                  fontWeight: '500',
                  border: '1px solid rgba(251, 191, 36, 0.5)'
                }
              }}
              components={{
                DayContent: ({ date }) => {
                  const rateInfo = getDailyRate(date);
                  return (
                    <div className="text-center">
                      <div className="text-white">{date.getDate()}</div>
                      <div className="text-xs text-white/80">
                        {rateInfo.rate}%
                      </div>
                    </div>
                  );
                }
              }}
            />
          </div>

          {selectedDate && (
            <div className="mb-6 p-4 rounded-2xl text-center bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-white font-medium">
                Selected: {selectedDate.toLocaleDateString()}
              </p>
              <p className="text-white/80 text-sm mt-1">
                Rate: {getDailyRate(selectedDate).rate}% {getDailyRate(selectedDate).type}
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 px-8 py-3 rounded-full font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Schedule Payment
            </button>
          </div>
        </StyledForm>
      </div>

      {/* Rate Legend with Glassmorphism */}
      <div className="backdrop-blur-md bg-white/15 border border-white/25 rounded-3xl p-6 shadow-xl">
        <h4 className="text-lg font-medium text-white mb-4">Rate Information</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-400/40 border border-green-400/60 rounded"></div>
            <span className="text-white/80">Early payment discount (green dates)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-yellow-400/40 border border-yellow-400/60 rounded"></div>
            <span className="text-white/80">Late payment premium (yellow dates)</span>
          </div>
          <p className="text-xs mt-3 text-white/60">
            Earlier dates offer discounts, later dates may include premiums
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcceptanceFlow;
