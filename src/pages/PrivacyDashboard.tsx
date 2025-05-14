
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Camera, Mic, MapPin, Clock, Shield, Lock, AlertTriangle } from 'lucide-react';
import BackButton from '@/components/BackButton';

// Sample data for permission usage
const permissionData = {
  camera: [
    { app: "SecureCam", time: "Today, 7:53 PM", duration: "2 mins" },
    { app: "VideoChat", time: "Today, 3:12 PM", duration: "5 mins" },
    { app: "Scanner", time: "Yesterday, 10:30 AM", duration: "1 min" }
  ],
  microphone: [
    { app: "Voice Recorder", time: "Today, 4:22 PM", duration: "10 mins" },
    { app: "VideoChat", time: "Today, 3:12 PM", duration: "5 mins" }
  ],
  location: [
    { app: "Maps", time: "Today, 2:15 PM", duration: "30 mins" },
    { app: "Weather", time: "Today, 9:00 AM", duration: "1 min" },
    { app: "Delivery", time: "Yesterday, 6:45 PM", duration: "5 mins" }
  ]
};

// Permission usage summary for the circular graphic
const permissionSummary = {
  camera: { used: true, count: 3, percentage: 35 },
  microphone: { used: true, count: 2, percentage: 25 },
  location: { used: true, count: 3, percentage: 40 }
};

const PermissionCircle = ({ percentage, icon, label, count }: { 
  percentage: number; 
  icon: React.ReactNode; 
  label: string;
  count: number;
}) => (
  <div className="relative flex flex-col items-center justify-center">
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle 
          className="text-slate-200 dark:text-slate-700 stroke-current" 
          strokeWidth="6" 
          cx="50" 
          cy="50" 
          r="40" 
          fill="transparent" 
        />
        <circle 
          className="text-blue-500 dark:text-blue-400 stroke-current transform -rotate-90 origin-center" 
          strokeWidth="6" 
          strokeDasharray={`${percentage * 2.51} 251`} 
          strokeLinecap="round" 
          cx="50" 
          cy="50" 
          r="40" 
          fill="transparent" 
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold">Past</span>
        <span className="text-lg">24 hours</span>
      </div>
    </div>
    <div className="mt-3 flex items-center gap-2">
      {icon}
      <span className="font-medium">{label}</span>
      <span className="text-sm text-slate-500 dark:text-slate-400">Used by {count} app(s)</span>
    </div>
  </div>
);

const PermissionUsageList = ({ data }: { data: {app: string; time: string; duration: string}[] }) => (
  <div className="space-y-4">
    {data.map((item, index) => (
      <div key={index} className="flex items-center justify-between p-3 border-b last:border-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <div className="w-6 h-6 text-blue-500">{item.app.charAt(0)}</div>
          </div>
          <div>
            <h4 className="font-medium">{item.app}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.time}</p>
          </div>
        </div>
        <span className="text-sm">{item.duration}</span>
      </div>
    ))}
  </div>
);

const PermissionCard = ({ 
  icon, 
  title, 
  usedBy, 
  isActive = true 
}: { 
  icon: React.ReactNode; 
  title: string; 
  usedBy: string; 
  isActive?: boolean 
}) => (
  <Card className={`border-l-4 ${isActive ? 'border-l-blue-500' : 'border-l-slate-300 dark:border-l-slate-600'}`}>
    <CardContent className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-slate-100 dark:bg-slate-800'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          {isActive ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{usedBy}</p>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">Not used in past 24 hours</p>
          )}
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
        Manage
      </Button>
    </CardContent>
  </Card>
);

const PrivacyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <BackButton />
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Privacy Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage app permissions and privacy</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="flex justify-center my-8">
                <PermissionCircle 
                  percentage={100} 
                  icon={<Lock className="w-5 h-5 text-blue-500" />} 
                  label="Permission Usage" 
                  count={Object.values(permissionSummary).filter(p => p.used).length}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Camera className="w-5 h-5 text-blue-500" />
                      Camera
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="py-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-500">Usage in last 24h</span>
                        <span className="text-sm font-medium">{permissionSummary.camera.percentage}%</span>
                      </div>
                      <Progress value={permissionSummary.camera.percentage} className="h-2" />
                    </div>
                    <p className="text-sm">Used by {permissionSummary.camera.count} apps</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Mic className="w-5 h-5 text-indigo-500" />
                      Microphone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="py-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-500">Usage in last 24h</span>
                        <span className="text-sm font-medium">{permissionSummary.microphone.percentage}%</span>
                      </div>
                      <Progress value={permissionSummary.microphone.percentage} className="h-2" />
                    </div>
                    <p className="text-sm">Used by {permissionSummary.microphone.count} apps</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-500" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="py-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-500">Usage in last 24h</span>
                        <span className="text-sm font-medium">{permissionSummary.location.percentage}%</span>
                      </div>
                      <Progress value={permissionSummary.location.percentage} className="h-2" />
                    </div>
                    <p className="text-sm">Used by {permissionSummary.location.count} apps</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Privacy Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Camera permission frequently used</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        SecureCam has accessed your camera multiple times in the last 24 hours.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">Review Permission</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="permissions" className="space-y-4">
              <h2 className="text-xl font-medium mb-4">Permission Access</h2>
              
              <PermissionCard 
                icon={<Camera className="w-5 h-5 text-blue-500" />} 
                title="Camera" 
                usedBy={`Used by ${permissionSummary.camera.count} apps`} 
              />
              
              <PermissionCard 
                icon={<Mic className="w-5 h-5 text-indigo-500" />} 
                title="Microphone" 
                usedBy={`Used by ${permissionSummary.microphone.count} apps`} 
              />
              
              <PermissionCard 
                icon={<MapPin className="w-5 h-5 text-green-500" />} 
                title="Location" 
                usedBy={`Used by ${permissionSummary.location.count} apps`} 
              />
              
              <h3 className="text-lg font-medium mt-8 mb-4">System Permissions</h3>
              
              <PermissionCard 
                icon={<Clock className="w-5 h-5 text-slate-500" />} 
                title="Background Activity" 
                usedBy="Used by 5 apps" 
              />
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  See all permissions
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Camera className="w-5 h-5 text-blue-500" />
                      Camera Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PermissionUsageList data={permissionData.camera} />
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Mic className="w-5 h-5 text-indigo-500" />
                      Microphone Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PermissionUsageList data={permissionData.microphone} />
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-500" />
                      Location Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PermissionUsageList data={permissionData.location} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PrivacyDashboard;
