
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import AppCard from '@/components/AppCard';
import { Button } from '@/components/ui/button';
import { Lock, Search, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const AppSecurity = () => {
  const [apps, setApps] = useState([
    { id: '1', name: 'Mail Client', icon: 'mail', lastAccess: '2 minutes ago', isProtected: true },
    { id: '2', name: 'Messages', icon: 'message', lastAccess: '5 minutes ago', isProtected: false },
    { id: '3', name: 'Photos', icon: 'photo', lastAccess: '15 minutes ago', isProtected: true },
    { id: '4', name: 'Web Browser', icon: 'browser', lastAccess: '30 minutes ago', isProtected: false },
    { id: '5', name: 'Documents', icon: 'document', lastAccess: '1 hour ago', isProtected: true },
    { id: '6', name: 'Calendar', icon: 'calendar', lastAccess: '3 hours ago', isProtected: false },
    { id: '7', name: 'Contacts', icon: 'contact', lastAccess: '1 day ago', isProtected: true },
    { id: '8', name: 'Notes', icon: 'notes', lastAccess: '2 days ago', isProtected: false },
  ]);

  const handleToggleProtection = (id: string, isProtected: boolean) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, isProtected } : app
    ));
    
    // Show toast notification
    const app = apps.find(app => app.id === id);
    if (app) {
      if (isProtected) {
        toast.success(`${app.name} is now protected`);
      } else {
        toast.info(`${app.name} is now accessible`);
      }
    }
  };
  
  const handleLockAll = () => {
    setApps(apps.map(app => ({ ...app, isProtected: true })));
    toast.success("All applications are now protected");
  };
  
  // Count protected apps
  const protectedAppsCount = apps.filter(app => app.isProtected).length;
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">App Security</h1>
              <p className="text-slate-500 dark:text-slate-400">Manage app access and security settings</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Input 
                placeholder="Search applications..." 
                className="w-64"
              />
              <Button variant="outline" onClick={() => toast.info("Settings opened")}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Protected Apps</h3>
              <p className="text-2xl font-bold mt-2">
                {protectedAppsCount} of {apps.length}
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Security Status</h3>
              <div className="flex items-center mt-2 gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-lg font-medium text-green-600 dark:text-green-500">Protected</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Last Scan</h3>
              <p className="text-lg font-medium mt-2">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Installed Applications</h2>
            <Button onClick={handleLockAll}>
              <Lock className="w-4 h-4 mr-2" />
              Lock All
            </Button>
          </div>
          
          <div className="space-y-4">
            {apps.map(app => (
              <AppCard 
                key={app.id}
                name={app.name}
                icon={app.icon}
                lastAccess={app.lastAccess}
                isProtected={app.isProtected}
                onToggleProtection={(isProtected) => handleToggleProtection(app.id, isProtected)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppSecurity;
