
import React from 'react';
import Sidebar from '@/components/Sidebar';
import StatusCard from '@/components/StatusCard';
import QuickAction from '@/components/QuickAction';
import ActivityTable from '@/components/ActivityTable';
import { Shield, Lock, Eye, Search, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import NotificationBadge from '@/components/NotificationBadge';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const activities = [
    {
      id: '1',
      user: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      action: {
        type: 'vault',
        label: 'Vault Access'
      },
      status: {
        type: 'completed',
        label: 'Completed'
      },
      time: '2 minutes ago'
    },
    {
      id: '2',
      user: {
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      action: {
        type: 'hidden',
        label: 'Hidden File'
      },
      status: {
        type: 'progress',
        label: 'In Progress'
      },
      time: '5 minutes ago'
    },
    {
      id: '3',
      user: {
        name: 'Anna Smith',
        avatar: 'https://i.pravatar.cc/150?img=9'
      },
      action: {
        type: 'settings',
        label: 'Settings Update'
      },
      status: {
        type: 'completed',
        label: 'Completed'
      },
      time: '10 minutes ago'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  }
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">System Status</h1>
                <p className="text-slate-500 dark:text-slate-400">All systems operational</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <Search className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
              <NotificationBadge />
              <button 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => handleNavigation('/settings')}
              >
                <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatusCard title="Active Users" value="2,847" color="purple" percentage={75} />
            <StatusCard title="System Load" value="42%" color="blue" percentage={42} />
            <StatusCard title="Storage Used" value="756GB" color="indigo" percentage={65} />
            <StatusCard title="Uptime" value="99.9%" color="green" percentage={99.9} />
          </div>
          
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <QuickAction 
              icon={<Lock className="w-6 h-6" />}
              title="Digital Vault"
              description="Secure file storage"
              color="purple"
              onClick={() => {
                toast.info("Opening Digital Vault...");
                handleNavigation('/digital-vault');
              }}
            />
            
            <QuickAction 
              icon={<Eye className="w-6 h-6" />}
              title="Hidden Files"
              description="View protected content"
              color="orange"
              onClick={() => {
                toast.info("Opening Hidden Files...");
                handleNavigation('/hidden-files');
              }}
            />
            
            <QuickAction 
              icon={<Shield className="w-6 h-6" />}
              title="Security Center"
              description="Monitor system security"
              color="green"
              onClick={() => {
                toast.info("Opening Security Center...");
                handleNavigation('/security-center');
              }}
            />
          </div>
          
          <div className="mb-6">
            <ActivityTable activities={activities} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
