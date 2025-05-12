
import React from 'react';

type StatusCardProps = {
  title: string;
  value: string | number;
  color?: string;
  percentage?: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, color = 'indigo', percentage }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        
        {percentage !== undefined && (
          <div className="mt-4">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${color}-500 dark:bg-${color}-600 rounded-full`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
