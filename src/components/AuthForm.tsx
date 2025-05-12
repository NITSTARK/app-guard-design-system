
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Fingerprint, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("pin");
  const [pinValues, setPinValues] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // For PIN input focus management
  const pinRefs = [
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
  ];

  const handlePinChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
    
    // Auto-focus next input if this one is filled
    if (value && index < pinRefs.length - 1) {
      pinRefs[index + 1].current?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !pinValues[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleBiometricAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Biometric authentication successful");
      navigate("/dashboard");
    }, 1500);
  };

  const handleUnlock = () => {
    setLoading(true);
    setError("");
    
    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      
      if (activeTab === "pin" && pinValues.join("") === "1234") {
        toast.success("PIN authentication successful");
        navigate("/dashboard");
      } else if (activeTab === "password" && password === "password") {
        toast.success("Password authentication successful");
        navigate("/dashboard");
      } else {
        setError("Invalid credentials, please try again");
        toast.error("Authentication failed");
        
        if (activeTab === "pin") {
          setPinValues(["", "", "", ""]);
          pinRefs[0].current?.focus();
        }
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-applock-purple-light dark:bg-slate-800 flex items-center justify-center">
          <Shield className="w-9 h-9 text-applock-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">PC App Lock</h2>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-6">Secure your applications and files</p>
      
      <Tabs defaultValue="pin" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="pin" className="text-center">
            PIN
          </TabsTrigger>
          <TabsTrigger value="password" className="text-center">
            Password
          </TabsTrigger>
          <TabsTrigger value="biometric" className="text-center">
            Biometric
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pin" className="animate-slide-in">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex justify-center space-x-3 w-full">
              {pinValues.map((pin, index) => (
                <input
                  key={index}
                  ref={pinRefs[index]}
                  type="text"
                  maxLength={1}
                  value={pin}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(index, e)}
                  className="pin-input"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your 4-digit PIN</p>
          </div>
        </TabsContent>
        
        <TabsContent value="password" className="animate-slide-in">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your password</p>
          </div>
        </TabsContent>
        
        <TabsContent value="biometric" className="animate-slide-in">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleBiometricAuth}
              className="w-20 h-20 rounded-full bg-applock-purple-light dark:bg-slate-800 flex items-center justify-center hover:bg-applock-purple/10 transition-colors"
            >
              <Fingerprint className="w-10 h-10 text-applock-primary" />
            </button>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Tap to authenticate with biometric</p>
          </div>
        </TabsContent>
        
        {error && (
          <div className="text-red-500 text-sm mt-4 text-center animate-shake">
            {error}
          </div>
        )}
        
        <div className="mt-8">
          <Button 
            onClick={handleUnlock}
            disabled={
              loading || 
              (activeTab === "pin" && pinValues.some(p => p === "")) || 
              (activeTab === "password" && !password) ||
              activeTab === "biometric"
            }
            className="w-full bg-applock-primary hover:bg-applock-primary/90 text-white py-6"
          >
            <Lock className="mr-2 h-4 w-4" />
            {loading ? "Authenticating..." : "Unlock"}
          </Button>
        </div>
      </Tabs>
      
      <div className="mt-6 text-center">
        <a href="#" className="text-applock-primary hover:underline text-sm">
          Forgot PIN or Password?
        </a>
      </div>
      
      <div className="mt-8 pt-4 border-t text-center">
        <button className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center mx-auto hover:text-slate-700 dark:hover:text-slate-300">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Switch Account
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
