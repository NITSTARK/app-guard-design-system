
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AppSecurity from "./pages/AppSecurity";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import HiddenFiles from "./pages/HiddenFiles";
import SecurityCenter from "./pages/SecurityCenter";
import UserProfile from "./pages/UserProfile";
import ActivityLog from "./pages/ActivityLog";
import Inbox from "./pages/Inbox";
import PrivacyDashboard from "./pages/PrivacyDashboard";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/app-security" element={<AppSecurity />} />
              <Route path="/hidden-files" element={<HiddenFiles />} />
              <Route path="/security-center" element={<SecurityCenter />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/activity-log" element={<ActivityLog />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/privacy-dashboard" element={<PrivacyDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
