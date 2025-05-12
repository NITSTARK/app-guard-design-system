
import { format } from 'date-fns';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface LogItemProps {
  timestamp: Date;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'success' | 'warning' | 'error';
  statusIcon: LucideIcon;
}

export function LogItem({
  timestamp,
  title,
  description,
  icon: Icon,
  status,
  statusIcon: StatusIcon,
}: LogItemProps) {
  const statusColors = {
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  
  const iconColors = {
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn("p-2 rounded-full", iconColors[status])}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 w-px bg-border my-2" />
      </div>
      <div className="flex-1 pt-1 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
          <div className="font-medium">{title}</div>
          <div className="flex items-center gap-2">
            <time className="text-sm text-muted-foreground" dateTime={timestamp.toISOString()}>
              {format(timestamp, 'MMM d, yyyy h:mm a')}
            </time>
            <Badge variant="outline" className={cn("flex items-center gap-1", statusColors[status])}>
              <StatusIcon className="h-3 w-3" />
              <span>{status === 'success' ? 'Success' : status === 'warning' ? 'Warning' : 'Error'}</span>
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
