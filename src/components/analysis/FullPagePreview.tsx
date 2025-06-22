
import React, { useState } from 'react';
import { StagingEnvironment } from '@/services/stagingDeployer';
import { designTokens } from '@/design-system/tokens';

interface FullPagePreviewProps {
  stagingEnv: StagingEnvironment;
}

export const FullPagePreview: React.FC<FullPagePreviewProps> = ({ stagingEnv }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
          <h3 className="font-semibold text-lg">📱 Full Page Preview - Your App with Design System</h3>
          <div className="text-xs text-gray-500">Live staging URL: {stagingEnv.url}</div>
        </div>
        
        <div className="flex space-x-2">
          <TabButton id="dashboard" label="Dashboard" active={activeTab === 'dashboard'} />
          <TabButton id="form" label="Contact Form" active={activeTab === 'form'} />
          <TabButton id="profile" label="User Profile" active={activeTab === 'profile'} />
        </div>
      </div>

      <div className="h-96 overflow-y-auto bg-gray-50">
        {activeTab === 'dashboard' && (
          <div className="p-6" style={{ backgroundColor: designTokens.colors.background.primary }}>
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6" style={{ borderRadius: designTokens.borderRadius.card }}>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-medium text-gray-900">Dashboard Overview</h1>
                <div className="flex space-x-3">
                  <button 
                    className="px-6 py-3 rounded-2xl font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                    style={{ borderRadius: designTokens.borderRadius.button }}
                  >
                    Export Data
                  </button>
                  <button 
                    className="px-6 py-3 rounded-2xl font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700"
                    style={{ borderRadius: designTokens.borderRadius.button }}
                  >
                    New Project
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <div className="text-2xl font-bold text-green-800">2,847</div>
                  <div className="text-sm text-green-600">Active Users</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="text-2xl font-bold text-blue-800">$12,450</div>
                  <div className="text-sm text-blue-600">Revenue</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <div className="text-2xl font-bold text-purple-800">98.2%</div>
                  <div className="text-sm text-purple-600">Uptime</div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6" style={{ borderRadius: designTokens.borderRadius.card }}>
                <h3 className="text-lg font-medium mb-4 text-gray-900">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">📊</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">New report generated</div>
                      <div className="text-xs text-gray-500">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✅</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Project completed</div>
                      <div className="text-xs text-gray-500">5 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6" style={{ borderRadius: designTokens.borderRadius.card }}>
                <h3 className="text-lg font-medium mb-4 text-gray-900">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 text-left bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">Create New Project</div>
                    <div className="text-sm text-gray-500">Start a new project from template</div>
                  </button>
                  <button className="w-full p-4 text-left bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">Invite Team Member</div>
                    <div className="text-sm text-gray-500">Add someone to your workspace</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'form' && (
          <div className="p-6" style={{ backgroundColor: designTokens.colors.background.primary }}>
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8" style={{ borderRadius: designTokens.borderRadius.card }}>
                <h2 className="text-xl font-medium mb-6 text-gray-900" style={{ fontFamily: designTokens.typography.heading.family }}>
                  Contact Us
                </h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ borderRadius: designTokens.borderRadius.input }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ borderRadius: designTokens.borderRadius.input }}
                      placeholder="your.email@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      style={{ borderRadius: designTokens.borderRadius.input }}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full px-6 py-3 bg-transparent border-2 border-gray-800 text-gray-800 rounded-2xl font-medium hover:bg-gray-800 hover:text-white transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                    style={{ borderRadius: designTokens.borderRadius.button }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-6" style={{ backgroundColor: designTokens.colors.background.primary }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ borderRadius: designTokens.borderRadius.card }}>
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold">Sarah Johnson</h2>
                      <p className="text-blue-100">Product Manager</p>
                    </div>
                  </div>
                </div>
                
                {/* Profile Content */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-900">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input 
                            type="email"
                            value="sarah.johnson@company.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
                            style={{ borderRadius: designTokens.borderRadius.input }}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input 
                            type="tel"
                            value="+1 (555) 123-4567"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
                            style={{ borderRadius: designTokens.borderRadius.input }}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-900">Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                          <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                          <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button 
                        className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-all"
                        style={{ borderRadius: designTokens.borderRadius.button }}
                      >
                        Save Changes
                      </button>
                      <button 
                        className="px-6 py-3 bg-transparent border-2 border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-all"
                        style={{ borderRadius: designTokens.borderRadius.button }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 border-t text-center">
        <p className="text-sm text-gray-600">
          ✨ This is how your actual app pages will look with the design system applied
        </p>
      </div>
    </div>
  );
};
