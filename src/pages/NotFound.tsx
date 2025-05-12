
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-16 h-16 rounded-full bg-applock-purple-light dark:bg-slate-800 flex items-center justify-center mb-6">
        <Shield className="w-8 h-8 text-applock-primary" />
      </div>
      
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">Page not found</p>
      <p className="text-slate-500 dark:text-slate-500 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or you don't have permission to access it.
      </p>
      
      <Button asChild className="bg-applock-primary hover:bg-applock-primary/90">
        <a href="/">Return to Dashboard</a>
      </Button>
    </div>
  );
};

export default NotFound;
