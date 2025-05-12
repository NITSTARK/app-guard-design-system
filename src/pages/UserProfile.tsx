
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Key, 
  Shield, 
  Fingerprint, 
  ActivityIcon,
  LogOut, 
  Trash, 
  Lock,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Sidebar from '@/components/Sidebar';
import { Separator } from '@/components/ui/separator';

const passwordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Current password is required",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password is required",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const profileSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const UserProfile = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "Admin User",
      email: "admin@example.com",
    },
  });

  const handlePasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    console.log(values);
    // Handle password change logic
    passwordForm.reset();
  };

  const handleProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log(values);
    // Handle profile update logic
  };

  const teamMembers = [
    {
      name: "John Doe",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Jane Smith",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Alex Johnson",
      image: "https://i.pravatar.cc/150?img=7",
    },
  ];

  const devices = [
    {
      name: "Windows Desktop",
      lastActive: "Today, 10:23 AM",
      location: "New York, US",
      current: true,
    },
    {
      name: "MacBook Pro",
      lastActive: "Yesterday, 8:45 PM",
      location: "New York, US",
      current: false,
    },
    {
      name: "iPhone 14 Pro",
      lastActive: "Jul 12, 2025",
      location: "Boston, US",
      current: false,
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">User Profile</h1>
              <p className="text-muted-foreground">Manage your account settings and security preferences</p>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://i.pravatar.cc/150?img=12" />
              <AvatarFallback className="bg-applock-primary text-white">AU</AvatarFallback>
            </Avatar>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-applock-primary" /> Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="mt-2">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-applock-primary" /> Team Access
                </CardTitle>
                <CardDescription>
                  Team members with admin access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <AnimatedTooltip
                    items={teamMembers}
                  />
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Team Members
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Password and Security */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-applock-primary" /> Change Password
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="mt-2">Update Password</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5 text-applock-primary" /> Two-Factor Authentication
                </CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Enable 2FA</div>
                    <div className="text-sm text-muted-foreground">
                      Secure your account with two-factor authentication
                    </div>
                  </div>
                  <Switch
                    checked={is2FAEnabled}
                    onCheckedChange={setIs2FAEnabled}
                  />
                </div>
                
                {is2FAEnabled && (
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Configure 2FA
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Devices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="h-5 w-5 text-applock-primary" /> Devices
              </CardTitle>
              <CardDescription>
                Manage devices that are currently signed in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        {device.name}
                        {device.current && (
                          <Badge variant="secondary" className="ml-2">Current</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last active: {device.lastActive}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Location: {device.location}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      disabled={device.current}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-applock-primary" /> Security Settings
              </CardTitle>
              <CardDescription>
                Quick links to security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-6">
                  <Lock className="h-5 w-5 text-applock-primary" />
                  <div className="text-left">
                    <div className="font-medium">Manage App Locks</div>
                    <div className="text-sm text-muted-foreground">Control which apps are locked</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-6">
                  <Fingerprint className="h-5 w-5 text-applock-primary" />
                  <div className="text-left">
                    <div className="font-medium">Biometric Settings</div>
                    <div className="text-sm text-muted-foreground">Configure biometric authentication</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-6">
                  <ActivityIcon className="h-5 w-5 text-applock-primary" />
                  <div className="text-left">
                    <div className="font-medium">Activity Logs</div>
                    <div className="text-sm text-muted-foreground">View recent account activity</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
