
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { StyledButton, StyledForm } from '@/design-system';

const AcceptanceFlow = () => {
  // Set 25th of current month as default due date
  const currentDate = new Date();
  const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 25);
  
  const [selectedDate, setSelectedDate] = useState<Date>(dueDate);
  const [paymentAmount] = useState('$10,000');
  const [companyName] = useState('Example Company');

  // Mock data for daily rates (in real app, this would come from your backend)
  const getDailyRate = (date: Date) => {
    const day = date.getDate();
    
    // Due date is the 25th - before this date, there are discounts
    if (day < 25) {
      // Early payment discounts: higher discounts for earlier dates
      const daysEarly = 25 - day;
      if (daysEarly >= 15) {
        return {
          rate: (4.0 - (daysEarly - 15) * 0.1).toFixed(1),
          type: 'discount'
        };
      } else if (daysEarly >= 10) {
        return {
          rate: (3.0 - (daysEarly - 10) * 0.2).toFixed(1),
          type: 'discount'
        };
      } else {
        return {
          rate: (1.0 - daysEarly * 0.1).toFixed(1),
          type: 'discount'
        };
      }
    }
    
    if (day === 25) {
      // Due date - no discount or penalty
      return {
        rate: '0.0',
        type: 'due'
      };
    }
    
    // After 25th: Late payment penalties
    const daysLate = day - 25;
    let rate;
    
    if (daysLate <= 7) {
      // First week late: 0% to 1.5%
      rate = (daysLate * 1.5 / 7).toFixed(1);
    } else {
      // Second week late: 1.5% to 2.5%
      const additionalDays = Math.min(daysLate - 7, 7);
      rate = (1.5 + (additionalDays * 1.0 / 7)).toFixed(1);
      // Cap at 2.5% for anything beyond 2 weeks
      if (parseFloat(rate) > 2.5) {
        rate = '2.5';
      }
    }
    
    return {
      rate,
      type: 'penalty'
    };
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

  // Check if a date is in the selected range (from due date to selected date or vice versa)
  const isInRange = (date: Date) => {
    if (!selectedDate) return false;
    
    const dateTime = date.getTime();
    const dueDateTime = dueDate.getTime();
    const selectedDateTime = selectedDate.getTime();
    
    const startTime = Math.min(dueDateTime, selectedDateTime);
    const endTime = Math.max(dueDateTime, selectedDateTime);
    
    return dateTime >= startTime && dateTime <= endTime;
  };

  const isRangeStart = (date: Date) => {
    if (!selectedDate) return false;
    return date.getTime() === Math.min(dueDate.getTime(), selectedDate.getTime());
  };

  const isRangeEnd = (date: Date) => {
    if (!selectedDate) return false;
    return date.getTime() === Math.max(dueDate.getTime(), selectedDate.getTime());
  };

  return <div className="space-y-6">
      {/* Main Payment Card with Glassmorphism */}
      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8 px-0 mx-[83px]">
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
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center text-white font-semibold",
                caption_label: "text-sm font-semibold text-white",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-white/20 border border-white/30 rounded-md p-0 text-white hover:bg-white/30 transition-colors shadow-sm",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-gray-700 rounded-md w-12 font-medium text-xs uppercase tracking-wide",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 h-12 w-12",
                day: "h-12 w-12 p-0 font-medium text-gray-700 hover:text-gray-900 rounded-lg transition-colors flex flex-col items-center justify-center text-xs",
                day_selected: "text-white",
                day_today: "text-gray-800 font-semibold",
                day_outside: "text-gray-400 opacity-50",
                day_disabled: "text-gray-300 opacity-30",
                day_hidden: "invisible"
              }} 
              components={{
                DayContent: ({ date }) => {
                  const rateInfo = getDailyRate(date);
                  const inRange = isInRange(date);
                  const isStart = isRangeStart(date);
                  const isEnd = isRangeEnd(date);
                  const isDue = date.getDate() === 25;
                  
                  return (
                    <div 
                      className={`flex flex-col items-center justify-center h-full relative ${
                        inRange 
                          ? isDue 
                            ? 'bg-blue-500 text-white rounded-lg' 
                            : 'bg-blue-200 text-gray-800' +
                              (isStart ? ' rounded-l-lg' : '') +
                              (isEnd ? ' rounded-r-lg' : '')
                          : ''
                      } ${
                        isDue && !inRange ? 'bg-blue-500 text-white rounded-lg' : ''
                      }`}
                    >
                      <div className="font-semibold">{date.getDate()}</div>
                      <div className="text-[9px] leading-tight">
                        {rateInfo.rate}%
                      </div>
                      {isDue && (
                        <div className="text-[7px] font-bold">DUE</div>
                      )}
                    </div>
                  );
                }
              }} 
              className="rounded-2xl border border-white/20 backdrop-blur-sm p-4 bg-white/0" 
            />
          </div>

          {selectedDate && <div className="mb-6 p-4 rounded-2xl text-center bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-white font-medium">
                Selected: {selectedDate.toLocaleDateString()}
              </p>
              <p className="text-white/80 text-sm mt-1">
                Rate: {getDailyRate(selectedDate).rate}% {getDailyRate(selectedDate).type}
              </p>
              {selectedDate.getTime() !== dueDate.getTime() && (
                <p className="text-white/70 text-xs mt-1">
                  Due date: {dueDate.toLocaleDateString()} (0% rate)
                </p>
              )}
            </div>}

          <div className="flex justify-center">
            <button type="submit" className="border border-white/30 hover:border-white/50 py-3 rounded-full font-medium transition-all duration-200 backdrop-blur-sm text-slate-50 bg-slate-900 hover:bg-slate-800 px-[90px]">
              Schedule Payment
            </button>
          </div>
        </StyledForm>
      </div>

      {/* Rate Legend with Glassmorphism */}
      <div className="backdrop-blur-md bg-white/15 border border-white/25 rounded-3xl p-6 shadow-xl">
        <h4 className="text-lg font-medium mb-4 text-black/[0.63]">Rate Information</h4>
        <div className="space-y-3 text-sm">
          <p className="text-slate-800">Due date: 25th of the month (0% rate). Earlier dates offer discounts, later dates include penalties.</p>
          <p className="text-xs text-slate-900">
            Late payments: 1.5% after 1 week, 2.5% after 2 weeks
          </p>
        </div>
      </div>
    </div>;
};

export default AcceptanceFlow;
