
import React from 'react';
import { Shield, Lock, Activity, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import StatusCard from '@/components/StatusCard';
import Sidebar from '@/components/Sidebar';

const SecurityCenter = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-applock-primary" />
            <h1 className="text-2xl font-semibold">Security Center</h1>
          </div>
          
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Run Security Scan
          </Button>
        </div>
        
        {/* Security Score Card */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">85/100</span>
              <span className="text-sm text-green-600 font-medium">Good</span>
            </div>
            <Progress value={85} className="h-2 mb-2" />
            <p className="text-sm text-slate-500">3 recommendations to improve your security</p>
          </CardContent>
        </Card>
        
        {/* Security Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard 
            title="Protected Apps" 
            value="12" 
            color="green"
            percentage={92} 
          />
          <StatusCard 
            title="Hidden Files" 
            value="87 MB" 
            color="blue"
            percentage={64} 
          />
          <StatusCard 
            title="Security Alerts" 
            value="0" 
            color="green"
          />
        </div>
        
        {/* Security Recommendations */}
        <h2 className="text-lg font-semibold mb-4">Security Recommendations</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                  <Lock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-medium">Enable Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Fix Now</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Schedule Regular Backups</h3>
                  <p className="text-sm text-slate-500">Your last backup was more than 30 days ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                  <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Update App Lock Settings</h3>
                  <p className="text-sm text-slate-500">Set automatic locking when system is idle</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Security Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Firewall Status</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Last Security Scan</span>
                <span className="text-sm font-medium">3 days ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Encryption</span>
                <span className="text-sm font-medium text-green-600">Enabled (AES-256)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">App Lock Version</span>
                <span className="text-sm font-medium">2.4.1 (Up to date)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityCenter;
