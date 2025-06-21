
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
          <div className="mb-8 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center text-gray-800 font-semibold",
                caption_label: "text-sm font-semibold text-gray-800",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-white/80 border border-gray-300 rounded-md p-0 text-gray-700 hover:bg-white hover:text-gray-900 transition-colors shadow-sm",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-gray-600 rounded-md w-12 font-medium text-xs uppercase tracking-wide",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 h-12 w-12",
                day: "h-12 w-12 p-0 font-medium text-gray-700 hover:bg-white/30 hover:text-gray-900 rounded-lg transition-colors flex flex-col items-center justify-center text-xs border border-transparent",
                day_selected: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white border border-blue-600 shadow-md",
                day_today: "bg-white/50 text-gray-900 border border-gray-400 font-semibold",
                day_outside: "text-gray-400 opacity-50",
                day_disabled: "text-gray-300 opacity-30",
                day_hidden: "invisible",
              }}
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
                  border: '2px solid #22c55e',
                  color: '#059669',
                  fontWeight: '600'
                },
                premium: { 
                  border: '2px solid #f59e0b',
                  color: '#d97706',
                  fontWeight: '600'
                }
              }}
              components={{
                DayContent: ({ date }) => {
                  const rateInfo = getDailyRate(date);
                  return (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="font-semibold">{date.getDate()}</div>
                      <div className="text-[9px] leading-tight opacity-80">
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
            <div className="w-4 h-4 border-2 border-green-500 rounded"></div>
            <span className="text-white/80">Early payment discount (green border)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-orange-500 rounded"></div>
            <span className="text-white/80">Late payment premium (orange border)</span>
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
