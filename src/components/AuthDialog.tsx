
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Key } from "lucide-react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
}

const AuthDialog = ({ isOpen, onClose, onAuthenticate }: AuthDialogProps) => {
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset pin when dialog opens
  useEffect(() => {
    if (isOpen) {
      setPin("");
      setError(null);
    }
  }, [isOpen]);

  // Add blur effect to the page when the dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('privacy-blur');
    } else {
      document.body.classList.remove('privacy-blur');
    }
    
    // Clean up on unmount
    return () => {
      document.body.classList.remove('privacy-blur');
    };
  }, [isOpen]);

  // Auto-authenticate when PIN is complete
  useEffect(() => {
    if (pin.length === 4) {
      handleSubmit();
    }
  }, [pin]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simple mock authentication (replace with actual authentication logic)
    setTimeout(() => {
      // For demo purposes, use "1234" as the PIN
      if (pin === "1234") {
        setIsLoading(false);
        onAuthenticate();
        toast.success("Authentication successful", {
          description: "You now have access to hidden files",
        });
      } else {
        setIsLoading(false);
        setError("Incorrect PIN. Please try again.");
        setPin("");
      }
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[425px] z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-applock-primary" />
            Authentication Required
          </DialogTitle>
          <DialogDescription>
            Enter your PIN to access hidden files.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-center py-2">
              <InputOTP 
                maxLength={4} 
                value={pin} 
                onChange={setPin}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot 
                        key={index} 
                        index={index}
                        className="w-16 h-12 text-lg bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                      />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || pin.length === 0}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating
                </>
              ) : (
                "Authenticate"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
