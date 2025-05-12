
import { format } from 'date-fns';
import { LogIn, Lock, Settings, ShieldCheck, AlertTriangle, Check } from 'lucide-react';
import { LogEvent } from '@/pages/ActivityLog';
import { Badge } from '@/components/ui/badge';

interface LogTableProps {
  logs: LogEvent[];
}

export function LogTable({ logs }: LogTableProps) {
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'login':
        return <LogIn className="h-4 w-4" />;
      case 'unlock':
        return <Lock className="h-4 w-4" />;
      case 'settings':
        return <Settings className="h-4 w-4" />;
      case 'security':
        return <ShieldCheck className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const statusColors = {
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const getStatusBadge = (status: LogEvent['status']) => {
    const icon = status === 'success' ? 
      <Check className="h-3 w-3" /> : 
      <AlertTriangle className="h-3 w-3" />;
    
    return (
      <Badge variant="outline" className={`flex items-center gap-1 ${statusColors[status]}`}>
        {icon}
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Event</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Device & IP</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <tr key={log.id} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    {getEventIcon(log.eventType)}
                    <span className="capitalize">{log.eventType}</span>
                  </div>
                </td>
                <td className="p-4 align-middle">{log.description}</td>
                <td className="p-4 align-middle">{log.user}</td>
                <td className="p-4 align-middle">
                  <div>
                    <div>{log.device}</div>
                    <div className="text-xs text-muted-foreground">{log.ipAddress}</div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div>
                    <div>{format(log.timestamp, 'MMM d, yyyy')}</div>
                    <div className="text-xs text-muted-foreground">{format(log.timestamp, 'h:mm a')}</div>
                  </div>
                </td>
                <td className="p-4 align-middle">{getStatusBadge(log.status)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="h-32 text-center">
                No activity logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
