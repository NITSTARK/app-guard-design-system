import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Fingerprint, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("password");
  const [pinValue, setPinValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === "pin" && pinValue.length === 4) {
      handleUnlock();
    }
  }, [pinValue, activeTab]);

  const handlePinChange = (value: string) => {
    setPinValue(value);
    setError("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleBiometricRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const regResp = await axios.post('http://localhost:5000/api/webauthn/register/begin');
      const asseResp = await startRegistration(regResp.data.data);
      const verificationResp = await axios.post('http://localhost:5000/api/webauthn/register/complete', asseResp);
      if (verificationResp.data.success) {
        toast.success("Biometric registration successful");
      } else {
        throw new Error(verificationResp.data.error || "Registration failed");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    setLoading(true);
    setError("");
    try {
      const authResp = await axios.post('http://localhost:5000/api/webauthn/authenticate/begin');
      const asseResp = await startAuthentication(authResp.data.data);
      const verificationResp = await axios.post('http://localhost:5000/api/webauthn/authenticate/complete', asseResp);

      if (verificationResp.data.success) {
        // This part needs to be updated to handle the JWT token from the backend
        toast.success("Biometric authentication successful");
        navigate("/dashboard");
      } else {
        throw new Error(verificationResp.data.error || "Authentication failed");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async () => {
    setLoading(true);
    setError("");

    try {
      let response;
      if (activeTab === "password") {
        response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      } else if (activeTab === "pin") {
        toast.info("PIN authentication not yet implemented with backend.");
        setLoading(false);
        return;
      }

      if (response && response.data.success) {
        login(response.data.data);
        toast.success("Authentication successful");
        navigate("/dashboard");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="w-full max-w-md p-8 bg-background rounded-2xl shadow-lg animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-100/10 dark:bg-slate-800 flex items-center justify-center">
          <Shield className="w-9 h-9 text-blue-500" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">PC App Lock</h2>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-6">Secure your applications and files</p>
      
      <Tabs defaultValue="password" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 bg-black/20 dark:bg-slate-800/50">
          <TabsTrigger value="pin" className="text-center data-[state=active]:bg-black/40 dark:data-[state=active]:bg-slate-700">
            PIN
          </TabsTrigger>
          <TabsTrigger value="password" className="text-center data-[state=active]:bg-black/40 dark:data-[state=active]:bg-slate-700">
            Password
          </TabsTrigger>
          <TabsTrigger value="biometric" className="text-center data-[state=active]:bg-black/40 dark:data-[state=active]:bg-slate-700">
            Biometric
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pin" className="animate-slide-in">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-xs">
              <InputOTP 
                maxLength={4} 
                value={pinValue} 
                onChange={handlePinChange}
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
            <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your 4-digit PIN</p>
          </div>
        </TabsContent>
        
        <TabsContent value="password" className="animate-slide-in">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Input
                ref={emailInputRef}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                autoFocus
              />
            </div>
            <div className="relative">
              <Input
                ref={passwordInputRef}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className="pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your email and password</p>
          </div>
        </TabsContent>
        
        <TabsContent value="biometric" className="animate-slide-in">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleBiometricAuth}
              className="w-20 h-20 rounded-full bg-blue-100/10 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-100/20 dark:hover:bg-slate-700 transition-colors"
            >
              <Fingerprint className="w-10 h-10 text-blue-500" />
            </button>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Tap to authenticate with biometric</p>
            <Button onClick={handleBiometricRegister} variant="link">Register Biometric</Button>
          </div>
        </TabsContent>
        
        {error && (
          <div className="text-red-500 text-sm mt-4 text-center animate-shake">
            {error}
          </div>
        )}
        
        <div className="mt-8">
          {activeTab !== "pin" && (
            <Button 
              onClick={handleUnlock}
              disabled={
                loading || 
                (activeTab === "password" && (!password || !email)) ||
                activeTab === "biometric"
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
            >
              <Lock className="mr-2 h-4 w-4" />
              {loading ? "Authenticating..." : "Unlock"}
            </Button>
          )}
        </div>
      </Tabs>
      
      <div className="mt-6 text-center">
        <a href="#" className="text-blue-500 hover:underline text-sm">
          Forgot PIN or Password?
        </a>
      </div>
      
      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
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