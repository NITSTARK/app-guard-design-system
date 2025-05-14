
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useNotifications } from '@/contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { Inbox as InboxIcon, Check, Trash2, AlertTriangle, FileText, ShieldCheck } from 'lucide-react';
import BackButton from '@/components/BackButton';

const NotificationItem: React.FC<{
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  from?: { name: string; avatar?: string };
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onGrantAccess?: (id: string) => void;
  onDenyAccess?: (id: string) => void;
}> = ({ 
  id, 
  type, 
  title, 
  message, 
  timestamp, 
  read, 
  from, 
  onMarkAsRead, 
  onDelete,
  onGrantAccess,
  onDenyAccess
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'access_request':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'file_shared':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'access_granted':
        return <ShieldCheck className="w-5 h-5 text-green-500" />;
      default:
        return <InboxIcon className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleClick = () => {
    if (!read) {
      onMarkAsRead(id);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`p-4 border-b transition-colors ${!read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className={`font-medium ${!read ? 'font-semibold' : ''}`}>{title}</h3>
            <span className="text-xs text-slate-500">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{message}</p>
          
          {from && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-slate-300 overflow-hidden">
                {from.avatar ? (
                  <img src={from.avatar} alt={from.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    {from.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-xs text-slate-500">{from.name}</span>
            </div>
          )}
          
          {isExpanded && type === 'access_request' && onGrantAccess && onDenyAccess && (
            <div className="flex gap-2 mt-3">
              <button 
                className="px-3 py-1.5 bg-green-500 text-white text-xs rounded flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onGrantAccess(id);
                }}
              >
                <Check className="w-3 h-3" /> Allow Access
              </button>
              <button 
                className="px-3 py-1.5 bg-slate-500 text-white text-xs rounded flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onDenyAccess(id);
                }}
              >
                <Trash2 className="w-3 h-3" /> Deny
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Inbox = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    grantAccess,
    denyAccess
  } = useNotifications();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <BackButton />
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <InboxIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Inbox</h1>
                <p className="text-slate-500 dark:text-slate-400">
                  {unreadCount === 0 
                    ? 'No new notifications' 
                    : `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`}
                </p>
              </div>
            </div>
            
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <InboxIcon className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                <h3 className="mt-4 text-lg font-medium">Your inbox is empty</h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  You'll receive notifications for file sharing and access requests here
                </p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    title={notification.title}
                    message={notification.message}
                    timestamp={notification.timestamp}
                    read={notification.read}
                    from={notification.from}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                    onGrantAccess={notification.type === 'access_request' ? grantAccess : undefined}
                    onDenyAccess={notification.type === 'access_request' ? denyAccess : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inbox;
