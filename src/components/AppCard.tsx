
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Eye } from 'lucide-react';

type AppCardProps = {
  name: string;
  icon: string;
  lastAccess: string;
  isProtected: boolean;
  onToggleProtection: (isProtected: boolean) => void;
}

const AppCard: React.FC<AppCardProps> = ({ 
  name, 
  icon, 
  lastAccess, 
  isProtected, 
  onToggleProtection 
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
          {icon === 'mail' && <span className="text-xl">📧</span>}
          {icon === 'message' && <span className="text-xl">💬</span>}
          {icon === 'photo' && <span className="text-xl">📷</span>}
          {icon === 'browser' && <span className="text-xl">🌐</span>}
          {icon === 'document' && <span className="text-xl">📄</span>}
          {icon === 'calendar' && <span className="text-xl">📅</span>}
          {icon === 'contact' && <span className="text-xl">👤</span>}
          {icon === 'notes' && <span className="text-xl">📝</span>}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Last access: {lastAccess}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          isProtected 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-400'
        }`}>
          {isProtected ? 'Protected' : 'Unlocked'}
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <Eye size={18} />
        </button>
        <Switch
          checked={isProtected}
          onCheckedChange={onToggleProtection}
        />
      </div>
    </div>
  );
};

export default AppCard;
