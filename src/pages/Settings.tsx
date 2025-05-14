import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  User,
  Bell,
  Eye,
  Globe,
  Lock,
  Shield,
  Smartphone,
  Upload,
  Trash2
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    stealthMode: false,
    panicMode: false,
    autoLock: true,
    emailAlerts: true,
    desktopNotifications: true,
    weeklyDigest: false
  });
  
  const handleSwitchChange = (setting: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: checked }));
    toast.success(`${setting.charAt(0).toUpperCase() + setting.slice(1)} ${checked ? 'enabled' : 'disabled'}`);
  };
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Settings</h1>
          
          <Tabs defaultValue="account">
            <TabsList className="w-full mb-8">
              <TabsTrigger value="account" className="flex-1">
                <User className="w-4 h-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Appearance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="animate-fade-in">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700 mb-6">
                <h2 className="text-xl font-semibold mb-6">Account settings</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  Manage your account preferences and personal information.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Profile</h3>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/150?img=12" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload new picture
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full name
                      </label>
                      <Input defaultValue="Admin User" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Display name
                      </label>
                      <Input defaultValue="Admin" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input defaultValue="admin@example.com" />
                  </div>
                </div>
                
                <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mb-8">
                  <h3 className="text-lg font-medium mb-4">Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email notifications</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Receive updates about your account via email
                        </p>
                      </div>
                      <Switch 
                        checked={settings.emailAlerts} 
                        onCheckedChange={(checked) => handleSwitchChange('emailAlerts', checked)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Desktop notifications</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Show notifications on your desktop
                        </p>
                      </div>
                      <Switch 
                        checked={settings.desktopNotifications} 
                        onCheckedChange={(checked) => handleSwitchChange('desktopNotifications', checked)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly digest</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Get a weekly summary of your activity
                        </p>
                      </div>
                      <Switch 
                        checked={settings.weeklyDigest} 
                        onCheckedChange={(checked) => handleSwitchChange('weeklyDigest', checked)} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                  <h3 className="text-lg font-medium text-red-500 mb-4">Delete account</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete account
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="animate-fade-in">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700 mb-6">
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Protection Options</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Stealth Mode</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Hide the app from task manager and app list
                        </p>
                      </div>
                      <Switch 
                        checked={settings.stealthMode} 
                        onCheckedChange={(checked) => handleSwitchChange('stealthMode', checked)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Panic Mode</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Quick close all protected apps with hotkey
                        </p>
                      </div>
                      <Switch 
                        checked={settings.panicMode} 
                        onCheckedChange={(checked) => handleSwitchChange('panicMode', checked)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-Lock Timer</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Lock apps after period of inactivity
                        </p>
                      </div>
                      <Switch 
                        checked={settings.autoLock} 
                        onCheckedChange={(checked) => handleSwitchChange('autoLock', checked)} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Inactivity Lock Timeout</h3>
                  
                  <div>
                    <Select defaultValue="5min">
                      <SelectTrigger className="w-full md:w-[300px]">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">1 minute</SelectItem>
                        <SelectItem value="5min">5 minutes</SelectItem>
                        <SelectItem value="10min">10 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Authentication</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      Change PIN
                    </Button>
                    
                    <Button variant="outline" className="justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    
                    <Button variant="outline" className="justify-start">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Configure Biometric
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Backup Email</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    For account recovery
                  </p>
                  <Input defaultValue="backup@example.com" className="mb-6" />
                  
                  <h3 className="text-lg font-medium mb-4">Security Question</h3>
                  <Select defaultValue="pet">
                    <SelectTrigger className="w-full mb-2">
                      <SelectValue placeholder="Select a security question" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pet">What was your first pet's name?</SelectItem>
                      <SelectItem value="school">What was the name of your first school?</SelectItem>
                      <SelectItem value="city">In what city were you born?</SelectItem>
                      <SelectItem value="mother">What is your mother's maiden name?</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input defaultValue="Fluffy" className="mb-6" />
                  
                  <Button className="w-full md:w-auto">Save Security Settings</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="animate-fade-in">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Alert Types</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Failed login attempts</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Notify when someone tries to access your protected apps
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Unauthorized access</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Notify when unauthorized applications try to access protected files
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">System events</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Updates about system restarts and maintenance
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Feature updates</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Notify about new features and app updates
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email notifications</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Send alerts to your email
                          </p>
                        </div>
                        <Switch 
                          checked={settings.emailAlerts} 
                          onCheckedChange={(checked) => handleSwitchChange('emailAlerts', checked)} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Desktop notifications</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Show popup on your desktop
                          </p>
                        </div>
                        <Switch 
                          checked={settings.desktopNotifications} 
                          onCheckedChange={(checked) => handleSwitchChange('desktopNotifications', checked)} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mobile notifications</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Send alerts to your mobile device
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="animate-fade-in">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Theme</h3>
                  
                  <ThemeToggle />
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Language</h3>
                  
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Accessibility</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Larger Text</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Increase text size for better readability
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Animations</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Enable or disable UI animations
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">High Contrast</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Enhance visual distinction between elements
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
