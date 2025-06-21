
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const PaymentOfferForm = () => {
  const [amount, setAmount] = useState('5,000');
  const [discount, setDiscount] = useState('2.5');
  const [dueDate, setDueDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dueDate) {
      toast.error('Please select a due date');
      return;
    }

    toast.success('Payment offer sent successfully!');
    console.log('Payment offer submitted:', {
      amount,
      discount,
      dueDate: format(dueDate, 'dd/MM/yyyy')
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto">
      {/* Hero Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="/lovable-uploads/52d08a01-376c-4bd3-b712-294f7355efdc.png" 
          alt="Mountain landscape with river at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Form Section */}
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Create a Payment Offer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Field */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                $
              </span>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 h-12 text-lg bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* Discount Field */}
          <div className="space-y-2">
            <Label htmlFor="discount" className="text-sm font-medium text-gray-700">
              Discount (%)
            </Label>
            <Input
              id="discount"
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="h-12 text-lg bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          {/* Due Date Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Select Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 text-lg bg-gray-50 border-gray-200 rounded-xl justify-start text-left font-normal hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    !dueDate && "text-gray-500"
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  {dueDate ? format(dueDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-colors duration-200 mt-8"
          >
            Send Offer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentOfferForm;
