
import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ThemeOptionProps {
  value: 'light' | 'dark' | 'system';
  title: string;
  icon: React.ReactNode;
  description: string;
}

const themeOptions: ThemeOptionProps[] = [
  {
    value: 'light',
    title: 'Light Mode',
    icon: <Sun className="h-4 w-4" />,
    description: 'Bright theme for daytime use'
  },
  {
    value: 'dark',
    title: 'Dark Mode',
    icon: <Moon className="h-4 w-4" />,
    description: 'Darker theme to reduce eye strain'
  },
  {
    value: 'system',
    title: 'System Default',
    icon: <Laptop className="h-4 w-4" />,
    description: 'Follow your system appearance settings'
  }
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {themeOptions.map((option) => (
        <div
          key={option.value}
          onClick={() => handleThemeChange(option.value)}
          className={cn(
            "border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all",
            theme === option.value
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80"
          )}
        >
          <div className={cn(
            "w-full h-24 rounded mb-4 flex items-center justify-center",
            option.value === 'light' ? "bg-white border border-slate-200" : 
            option.value === 'dark' ? "bg-slate-900 border border-slate-700" :
            "bg-gradient-to-b from-white to-slate-900 border border-slate-300"
          )}>
            {option.icon}
          </div>
          <span className="font-medium">{option.title}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">
            {option.description}
          </span>
        </div>
      ))}
    </div>
  );
}
