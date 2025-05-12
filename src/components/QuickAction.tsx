
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type QuickActionProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  title,
  description,
  color,
  onClick
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col h-full">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-4",
          color === 'purple' && "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
          color === 'orange' && "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
          color === 'green' && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        )}>
          {icon}
        </div>
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{description}</p>
        <div className="mt-auto">
          <Button
            variant="ghost"
            className="pl-0 text-applock-primary hover:text-applock-primary hover:bg-transparent dark:text-applock-primary dark:hover:text-applock-primary/80"
            onClick={onClick}
          >
            Open
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path 
                d="M5 12H19M19 12L12 5M19 12L12 19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
