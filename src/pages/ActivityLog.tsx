import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  ActivityIcon, 
  Search, 
  Calendar, 
  Filter, 
  Lock,
  Settings,
  LogIn,
  ShieldCheck,
  AlertTriangle,
  Check
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from '@/components/Sidebar';
import { Separator } from '@/components/ui/separator';
import { LogItem } from '@/components/ui/log-item';
import { LogTable } from '@/components/ui/log-table';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';

// Define activity log data types
export type LogStatus = 'success' | 'warning' | 'error';

export type LogEvent = {
  id: string;
  timestamp: Date;
  eventType: 'login' | 'unlock' | 'settings' | 'security';
  description: string;
  device: string;
  ipAddress: string;
  status: LogStatus;
  user: string;
};

const ActivityLog = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');
  
  // Mock data for activity logs
  const activityLogs: LogEvent[] = [
    {
      id: '1',
      timestamp: new Date(2025, 4, 12, 10, 30),
      eventType: 'login',
      description: 'User logged in successfully',
      device: 'Windows Desktop (Chrome)',
      ipAddress: '192.168.1.1',
      status: 'success',
      user: 'admin@example.com',
    },
    {
      id: '2',
      timestamp: new Date(2025, 4, 12, 9, 45),
      eventType: 'unlock',
      description: 'Microsoft Word was unlocked',
      device: 'Windows Desktop (System)',
      ipAddress: '192.168.1.1',
      status: 'success',
      user: 'admin@example.com',
    },
    {
      id: '3',
      timestamp: new Date(2025, 4, 11, 16, 20),
      eventType: 'settings',
      description: 'Password policy updated',
      device: 'Windows Desktop (Chrome)',
      ipAddress: '192.168.1.1',
      status: 'success',
      user: 'admin@example.com',
    },
    {
      id: '4',
      timestamp: new Date(2025, 4, 11, 14, 10),
      eventType: 'login',
      description: 'Failed login attempt',
      device: 'Unknown Device',
      ipAddress: '203.0.113.1',
      status: 'error',
      user: 'admin@example.com',
    },
    {
      id: '5',
      timestamp: new Date(2025, 4, 10, 11, 5),
      eventType: 'security',
      description: 'Two-factor authentication enabled',
      device: 'Windows Desktop (Firefox)',
      ipAddress: '192.168.1.1',
      status: 'success',
      user: 'admin@example.com',
    },
    {
      id: '6',
      timestamp: new Date(2025, 4, 10, 9, 30),
      eventType: 'unlock',
      description: 'Adobe Photoshop unlock attempt failed',
      device: 'Windows Desktop (System)',
      ipAddress: '192.168.1.1',
      status: 'warning',
      user: 'admin@example.com',
    }
  ];

  // Filter logs based on search query and active tab
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || log.eventType === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'login':
        return LogIn;
      case 'unlock':
        return Lock;
      case 'settings':
        return Settings;
      case 'security':
        return ShieldCheck;
      default:
        return ActivityIcon;
    }
  };

  const getStatusIcon = (status: LogStatus) => {
    switch (status) {
      case 'success':
        return Check;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertTriangle;
      default:
        return Check;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <ActivityIcon className="h-6 w-6 text-applock-primary" />
                Activity Log
              </h1>
              <p className="text-muted-foreground">
                Monitor and track all activities related to your PC App Lock
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search logs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" /> Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Show only errors</DropdownMenuItem>
                  <DropdownMenuItem>Show only warnings</DropdownMenuItem>
                  <DropdownMenuItem>Show login events</DropdownMenuItem>
                  <DropdownMenuItem>Show app unlock events</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-xl font-semibold">{activityLogs.length}</div>
                <div className="text-sm text-muted-foreground">Total events logged</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-xl font-semibold">
                  {activityLogs.filter(log => log.status === 'error' || log.status === 'warning').length}
                </div>
                <div className="text-sm text-muted-foreground">Security alerts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-xl font-semibold">
                  {format(new Date(Math.max(...activityLogs.map(log => log.timestamp.getTime()))), 'MMM d, yyyy')}
                </div>
                <div className="text-sm text-muted-foreground">Last activity date</div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Activity Timeline</CardTitle>
                  <CardDescription>Review recent activities and events</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <DatePickerWithRange />
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <Button 
                      variant={viewMode === 'timeline' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setViewMode('timeline')}
                      className="rounded-none"
                    >
                      Timeline
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button 
                      variant={viewMode === 'table' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className="rounded-none"
                    >
                      Table
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="login">Logins</TabsTrigger>
                  <TabsTrigger value="unlock">App Unlocks</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-0">
                  {viewMode === 'timeline' ? (
                    <div className="space-y-6">
                      {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                          <LogItem 
                            key={log.id}
                            timestamp={log.timestamp}
                            title={log.description}
                            description={`${log.device} • ${log.ipAddress}`}
                            icon={getEventIcon(log.eventType)}
                            status={log.status}
                            statusIcon={getStatusIcon(log.status)}
                          />
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-muted-foreground">No activity logs found</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <LogTable logs={filteredLogs} />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {activityLogs.length} events
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary/10">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
