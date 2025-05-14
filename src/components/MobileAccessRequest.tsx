
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone } from 'lucide-react';
import { toast } from "sonner";
import notificationService from '@/services/notificationService';

const MobileAccessRequest: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [deviceName, setDeviceName] = useState('');

  const handleRequest = () => {
    if (!deviceName.trim()) {
      toast.error("Please enter a device name");
      return;
    }

    // Simulate sending a request notification
    // In a real app, this would use a backend API
    notificationService.requestAccess(deviceName, 'current-user-id');
    toast.success("Access request sent", {
      description: "You'll be notified when access is granted"
    });
    setOpen(false);
    setDeviceName('');
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Smartphone className="w-4 h-4" />
        <span>Request Mobile Access</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Mobile Access</DialogTitle>
            <DialogDescription>
              Enter your mobile device name to request access to hidden files.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="device-name" className="text-sm font-medium">
                Device Name
              </label>
              <Input
                id="device-name"
                placeholder="iPhone 13, Samsung Galaxy, etc."
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequest}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileAccessRequest;
