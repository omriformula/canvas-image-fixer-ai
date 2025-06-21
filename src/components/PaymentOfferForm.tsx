
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

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

  return (
    <div className="bg-[#f3f2ed] min-h-screen py-10 px-4">
      <div className="max-w-[460px] mx-auto">
        {/* Hero Image - completely separate */}
        <img 
          src="/lovable-uploads/52d08a01-376c-4bd3-b712-294f7355efdc.png" 
          alt="Hero Image"
          className="w-full h-auto rounded-t-3xl block"
        />
        
        {/* Form Container - separate from image */}
        <div className="bg-white rounded-b-3xl shadow-lg p-6">
          <h3 className="text-xl font-medium mb-6 text-[#1a1a1a] font-['Work_Sans']">
            Create a Payment Offer
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="recipient" className="block text-sm font-medium mb-1.5 text-[#2d2d2d]">
                Who will receive the offer?
              </Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger className="w-full p-3.5 text-base rounded-xl border-[#e2e2e2] bg-white">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="from" className="block text-sm font-medium mb-1.5 text-[#2d2d2d]">
                From (your company name)
              </Label>
              <Input
                id="from"
                type="text"
                value={fromCompany}
                onChange={(e) => setFromCompany(e.target.value)}
                placeholder="Your Company"
                className="w-full p-3.5 text-base rounded-xl border-[#e2e2e2] bg-white"
              />
            </div>

            <div>
              <Label htmlFor="to" className="block text-sm font-medium mb-1.5 text-[#2d2d2d]">
                To (recipient's company name)
              </Label>
              <Input
                id="to"
                type="text"
                value={toCompany}
                onChange={(e) => setToCompany(e.target.value)}
                placeholder="Recipient Company"
                className="w-full p-3.5 text-base rounded-xl border-[#e2e2e2] bg-white"
              />
            </div>

            <div>
              <Label htmlFor="discount" className="block text-sm font-medium mb-1.5 text-[#2d2d2d]">
                Discount Rate (%)
              </Label>
              <Input
                id="discount"
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="e.g. 2.5"
                className="w-full p-3.5 text-base rounded-xl border-[#e2e2e2] bg-white"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="block text-sm font-medium mb-1.5 text-[#2d2d2d]">
                Full Payment Amount
              </Label>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$5,000"
                className="w-full p-3.5 text-base rounded-xl border-[#e2e2e2] bg-white"
              />
            </div>

            <div>
              <Label htmlFor="due-date" className="block text-sm font-medium mb-1.5 text-[#2d2d2d]">
                Payment Due Date
              </Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3.5 text-base rounded-xl border-[#e2e2e2] bg-white"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <Label htmlFor="late" className="text-sm font-medium text-[#2d2d2d]">
                Late Payment Offer
              </Label>
              <Switch
                id="late"
                checked={latePayment}
                onCheckedChange={setLatePayment}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-transparent border border-[#2d2d2d] text-[#2d2d2d] font-medium text-[15px] py-3 rounded-[32px] hover:bg-[#2d2d2d] hover:text-white transition-colors duration-300"
            >
              Send Offer
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentOfferForm;
