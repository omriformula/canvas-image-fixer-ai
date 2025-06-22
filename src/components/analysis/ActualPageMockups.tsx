
import React, { useState } from 'react';
import { designTokens } from '@/design-system/tokens';

export const ActualPageMockups: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payment-offer');

  const TabButton = ({ id, label, active }: { id: string; label: string; active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">🎨 Your Actual Pages with Design System Applied</h3>
        </div>
        
        <div className="flex space-x-2">
          <TabButton id="payment-offer" label="Payment Offer Form" active={activeTab === 'payment-offer'} />
          <TabButton id="acceptance" label="Acceptance Flow" active={activeTab === 'acceptance'} />
        </div>
      </div>

      <div className="h-[600px] overflow-y-auto" style={{ backgroundColor: designTokens.colors.background.primary }}>
        {activeTab === 'payment-offer' && (
          <div className="min-h-full py-10 px-4">
            <div className="mx-auto" style={{ maxWidth: designTokens.container.maxWidth }}>
              {/* Hero Image */}
              <div className="overflow-hidden mb-0" style={{
                aspectRatio: '16/9',
                borderRadius: `${designTokens.borderRadius.card} ${designTokens.borderRadius.card} 0 0`
              }}>
                <img 
                  src="/lovable-uploads/3ddd0a66-6fbf-4d23-ac56-bd6b303c55c5.png" 
                  alt="Hero Image" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Form Container */}
              <div 
                className="shadow-lg p-6"
                style={{
                  backgroundColor: designTokens.colors.background.card,
                  borderRadius: `0 0 ${designTokens.borderRadius.card} ${designTokens.borderRadius.card}`,
                  boxShadow: designTokens.shadows.card
                }}
              >
                <h3 className="mb-6 font-light text-4xl" style={{
                  fontSize: designTokens.typography.heading.size,
                  fontWeight: designTokens.typography.heading.weight,
                  color: designTokens.colors.text.primary,
                  fontFamily: designTokens.typography.heading.family
                }}>
                  Create a Payment Offer
                </h3>
                
                <div className="space-y-4">
                  {/* Form Fields */}
                  <div>
                    <label className="block mb-1.5" style={{
                      fontSize: designTokens.typography.label.size,
                      fontWeight: designTokens.typography.label.weight,
                      color: designTokens.colors.text.secondary
                    }}>
                      Who will receive the offer?
                    </label>
                    <div 
                      className="w-full p-3.5 border rounded-xl bg-white text-gray-900"
                      style={{
                        borderRadius: designTokens.borderRadius.input,
                        borderColor: designTokens.colors.background.border,
                        fontSize: designTokens.typography.input.size
                      }}
                    >
                      Select recipient ▼
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-1.5" style={{
                      fontSize: designTokens.typography.label.size,
                      fontWeight: designTokens.typography.label.weight,
                      color: designTokens.colors.text.secondary
                    }}>
                      From (your company name)
                    </label>
                    <input 
                      type="text"
                      placeholder="Your Company"
                      className="w-full p-3.5 border rounded-xl bg-white"
                      style={{
                        borderRadius: designTokens.borderRadius.input,
                        borderColor: designTokens.colors.background.border,
                        fontSize: designTokens.typography.input.size
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1.5" style={{
                      fontSize: designTokens.typography.label.size,
                      fontWeight: designTokens.typography.label.weight,
                      color: designTokens.colors.text.secondary
                    }}>
                      To (recipient's company name)
                    </label>
                    <input 
                      type="text"
                      placeholder="Recipient Company"
                      className="w-full p-3.5 border rounded-xl bg-white"
                      style={{
                        borderRadius: designTokens.borderRadius.input,
                        borderColor: designTokens.colors.background.border,
                        fontSize: designTokens.typography.input.size
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1.5" style={{
                      fontSize: designTokens.typography.label.size,
                      fontWeight: designTokens.typography.label.weight,
                      color: designTokens.colors.text.secondary
                    }}>
                      Discount Rate (%)
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. 2.5"
                      className="w-full p-3.5 border rounded-xl bg-white"
                      style={{
                        borderRadius: designTokens.borderRadius.input,
                        borderColor: designTokens.colors.background.border,
                        fontSize: designTokens.typography.input.size
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1.5" style={{
                      fontSize: designTokens.typography.label.size,
                      fontWeight: designTokens.typography.label.weight,
                      color: designTokens.colors.text.secondary
                    }}>
                      Full Payment Amount
                    </label>
                    <input 
                      type="text"
                      placeholder="$5,000"
                      className="w-full p-3.5 border rounded-xl bg-white"
                      style={{
                        borderRadius: designTokens.borderRadius.input,
                        borderColor: designTokens.colors.background.border,
                        fontSize: designTokens.typography.input.size
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1.5" style={{
                      fontSize: designTokens.typography.label.size,
                      fontWeight: designTokens.typography.label.weight,
                      color: designTokens.colors.text.secondary
                    }}>
                      Payment Due Date
                    </label>
                    <input 
                      type="date"
                      className="w-full p-3.5 border rounded-xl bg-white"
                      style={{
                        borderRadius: designTokens.borderRadius.input,
                        borderColor: designTokens.colors.background.border,
                        fontSize: designTokens.typography.input.size
                      }}
                    />
                  </div>
                  
                  {/* Late Payment Toggle */}
                  <div className="flex items-center justify-between mt-4">
                    <label style={{
                      fontSize: designTokens.typography.label.size,
                      fontWeight: designTokens.typography.label.weight,
                      color: designTokens.colors.text.secondary
                    }}>
                      Late Payment Offer
                    </label>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    className="w-full mt-6 px-6 py-3 font-medium transition-all duration-300 hover:bg-gray-800 hover:text-white"
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${designTokens.colors.button.border}`,
                      color: designTokens.colors.button.text,
                      borderRadius: designTokens.borderRadius.button,
                      fontSize: '15px'
                    }}
                  >
                    Send Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'acceptance' && (
          <div 
            className="min-h-full py-10 px-4"
            style={{
              backgroundImage: `url(/lovable-uploads/72723866-ac46-41eb-b95e-d98e28b8649a.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="relative z-10 mx-auto" style={{ maxWidth: designTokens.container.maxWidth }}>
              {/* Main Payment Card with Glassmorphism */}
              <div className="backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl bg-white/0 mb-6">
                <div className="text-center mb-8">
                  <p className="text-white/80 mb-2">
                    Payment request from <strong className="text-white">Example Company</strong>
                  </p>
                  <p className="text-xl font-medium text-white mb-2">
                    Amount: $10,000
                  </p>
                  <p className="text-white/70 text-sm">
                    Select your preferred payment date below
                  </p>
                </div>

                {/* Calendar Area Mockup */}
                <div className="mb-8 flex justify-center">
                  <div className="rounded-2xl border border-white/20 backdrop-blur-sm p-6 bg-white/0">
                    <div className="text-center text-white/80 font-medium mb-4">December 2024</div>
                    
                    {/* Calendar Grid Mockup */}
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {/* Header */}
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-white/60 text-xs font-medium p-2">{day}</div>
                      ))}
                      
                      {/* Sample calendar dates */}
                      {Array.from({ length: 35 }, (_, i) => {
                        const date = i - 6;
                        const isValid = date > 0 && date <= 31;
                        const isDue = date === 25;
                        const isSelected = date === 20;
                        
                        return (
                          <div key={i} className="h-14 w-14 relative">
                            {isValid && (
                              <div className={`flex flex-col items-center justify-center h-full w-full rounded-full text-xs ${
                                isSelected ? 'bg-slate-900 text-white' : 
                                isDue ? 'bg-slate-800 text-white' : 'text-white/90 hover:bg-white/5'
                              }`}>
                                <div className="font-medium leading-none mb-1">{date}</div>
                                <div className="text-[10px] leading-none opacity-90">
                                  {date < 25 ? '1.5%' : date === 25 ? '0%' : '2.0%'}
                                </div>
                                {isDue && <div className="text-[8px] font-bold leading-none mt-0.5 opacity-80">DUE</div>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Selected Date Info */}
                <div className="mb-6 p-4 rounded-2xl text-center bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="text-white font-medium">
                    Selected: December 20, 2024
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Rate: 1.5% discount
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Due date: December 25, 2024 (0% rate)
                  </p>
                </div>

                {/* Schedule Button */}
                <div className="flex justify-center">
                  <button className="border border-white/30 hover:border-white/50 py-3 px-24 rounded-full font-medium transition-all duration-200 backdrop-blur-sm text-slate-50 bg-slate-900 hover:bg-slate-800">
                    Schedule Payment
                  </button>
                </div>
              </div>

              {/* Rate Legend */}
              <div className="backdrop-blur-md bg-white/15 border border-white/25 rounded-3xl p-6 shadow-xl">
                <h4 className="text-lg font-medium mb-4 text-black/60">Rate Information</h4>
                <div className="space-y-3 text-sm">
                  <p className="text-slate-800">Due date: 25th of the month (0% rate). Earlier dates offer discounts, later dates include penalties.</p>
                  <p className="text-xs text-slate-900">
                    Late payments: 1.5% after 1 week, 2.5% after 2 weeks
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 border-t text-center">
        <p className="text-sm text-gray-600">
          ✨ These are your actual page designs with our design system applied
        </p>
      </div>
    </div>
  );
};
