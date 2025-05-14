
import React from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ className }) => {
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <button 
      className={cn(
        "relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800", 
        className
      )}
      onClick={() => navigate('/inbox')}
      aria-label={`Notifications (${unreadCount} unread)`}
    >
      <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;
