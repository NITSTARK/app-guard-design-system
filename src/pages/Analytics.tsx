
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users,
  Calendar,
  FileText,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Sidebar from '@/components/Sidebar';
import { toast } from 'sonner';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Mock data for usage statistics
  const usageData = [
    { feature: 'App Lock', uses: 156, trend: 12 },
    { feature: 'Hidden Files', uses: 89, trend: 8 },
    { feature: 'Security Center', uses: 67, trend: -3 },
    { feature: 'Digital Vault', uses: 45, trend: 15 },
    { feature: 'Settings', uses: 34, trend: 2 }
  ];

  const dailyActivity = [
    { date: 'Mon', locks: 24, unlocks: 18, alerts: 2 },
    { date: 'Tue', locks: 31, unlocks: 25, alerts: 1 },
    { date: 'Wed', locks: 28, unlocks: 22, alerts: 3 },
    { date: 'Thu', locks: 35, unlocks: 30, alerts: 0 },
    { date: 'Fri', locks: 42, unlocks: 38, alerts: 2 },
    { date: 'Sat', locks: 19, unlocks: 15, alerts: 1 },
    { date: 'Sun', locks: 16, unlocks: 12, alerts: 0 }
  ];

  const securityEvents = [
    { type: 'Failed Login', count: 12, severity: 'high' },
    { type: 'Unauthorized Access', count: 3, severity: 'critical' },
    { type: 'App Unlock', count: 156, severity: 'low' },
    { type: 'Settings Change', count: 8, severity: 'medium' }
  ];

  const appUsageDistribution = [
    { name: 'Microsoft Word', value: 35, color: '#8884d8' },
    { name: 'Adobe Photoshop', value: 25, color: '#82ca9d' },
    { name: 'Chrome Browser', value: 20, color: '#ffc658' },
    { name: 'Spotify', value: 12, color: '#ff7300' },
    { name: 'Others', value: 8, color: '#0088fe' }
  ];

  const handleExport = (type: string) => {
    toast.success(`Exporting ${type} data...`, {
      description: "Your download will begin shortly"
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-applock-primary" />
                Analytics & Reports
              </h1>
              <p className="text-muted-foreground">
                Monitor usage patterns and security metrics
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleExport('usage')}>
                <Download className="h-4 w-4 mr-2" />
                Export Usage
              </Button>
              <Button variant="outline" onClick={() => handleExport('security')}>
                <Download className="h-4 w-4 mr-2" />
                Export Security
              </Button>
              <Button onClick={() => handleExport('all')}>
                <FileText className="h-4 w-4 mr-2" />
                Full Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total App Locks</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-green-600">+12% from last week</p>
                  </div>
                  <Shield className="h-8 w-8 text-applock-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                    <p className="text-2xl font-bold">42</p>
                    <p className="text-xs text-green-600">+5% from yesterday</p>
                  </div>
                  <Users className="h-8 w-8 text-applock-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Session Time</p>
                    <p className="text-2xl font-bold">4.2h</p>
                    <p className="text-xs text-yellow-600">-2% from last week</p>
                  </div>
                  <Clock className="h-8 w-8 text-applock-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Security Alerts</p>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-xs text-red-600">+3 new alerts</p>
                  </div>
                  <Activity className="h-8 w-8 text-applock-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="usage" className="space-y-6">
            <TabsList>
              <TabsTrigger value="usage">Usage Statistics</TabsTrigger>
              <TabsTrigger value="security">Security Reports</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="usage" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Usage</CardTitle>
                    <CardDescription>Most used features this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {usageData.map((item) => (
                        <div key={item.feature} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{item.feature}</span>
                              <span className="text-sm text-muted-foreground">{item.uses} uses</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-applock-primary h-2 rounded-full" 
                                style={{ width: `${(item.uses / 156) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <Badge variant={item.trend > 0 ? 'default' : 'secondary'} className="ml-4">
                            {item.trend > 0 ? '+' : ''}{item.trend}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>App Distribution</CardTitle>
                    <CardDescription>Most locked applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={appUsageDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {appUsageDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {appUsageDistribution.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-xs">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Activity</CardTitle>
                  <CardDescription>App locks, unlocks, and security alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="locks" fill="#8884d8" name="App Locks" />
                      <Bar dataKey="unlocks" fill="#82ca9d" name="App Unlocks" />
                      <Bar dataKey="alerts" fill="#ffc658" name="Security Alerts" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Events</CardTitle>
                  <CardDescription>Security incidents and their severity levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityEvents.map((event) => (
                      <div key={event.type} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{event.type}</p>
                            <p className="text-sm text-muted-foreground">{event.count} occurrences</p>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Timeline</CardTitle>
                  <CardDescription>Recent security events and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Failed login attempt detected</p>
                        <p className="text-xs text-muted-foreground">2 hours ago • IP: 203.0.113.1</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Unusual app access pattern</p>
                        <p className="text-xs text-muted-foreground">4 hours ago • Adobe Photoshop</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Security settings updated</p>
                        <p className="text-xs text-muted-foreground">1 day ago • Two-factor authentication enabled</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Trends</CardTitle>
                  <CardDescription>Feature usage over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="locks" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="unlocks" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
