
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Shield, 
  Settings, 
  Lock, 
  Activity, 
  Users, 
  FileText,
  Inbox,
  User,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Lock, label: 'App Security', path: '/app-security' },
  { icon: Shield, label: 'Security Center', path: '/security-center' },
  { icon: FileText, label: 'Hidden Files', path: '/hidden-files' },
  { icon: Activity, label: 'Activity Logs', path: '/activity-log' },
  { icon: Inbox, label: 'Inbox', path: '/inbox' },
  { icon: Shield, label: 'Privacy Dashboard', path: '/privacy-dashboard' },
  { icon: User, label: 'User Profile', path: '/user-profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-sidebar border-r flex flex-col">
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <div className="w-8 h-8 rounded-full bg-applock-primary flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-lg">PC App Lock</span>
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden">
            <img 
              src="https://i.pravatar.cc/32" 
              alt="Avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-slate-500">admin@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
