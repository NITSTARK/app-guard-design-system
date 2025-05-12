
import React from 'react';
import AuthForm from '@/components/AuthForm';
import { Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center auth-container">
      <div className="absolute top-5 left-5 flex items-center gap-2 text-white">
        <Shield className="h-5 w-5" />
        <span className="font-medium">PC App Lock</span>
      </div>
      
      <AuthForm />
      
      <p className="mt-8 text-white/80 text-sm">
        © 2025 PC App Lock. All rights reserved.
      </p>
    </div>
  );
};

export default Index;
