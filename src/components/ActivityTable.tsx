
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type Activity = {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: {
    type: string;
    label: string;
  };
  status: {
    type: string;
    label: string;
  };
  time: string;
};

type ActivityTableProps = {
  activities: Activity[];
};

const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input 
            placeholder="Search activity..." 
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">USER</TableHead>
              <TableHead>ACTION</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">TIME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                      {activity.user.avatar ? (
                        <img 
                          src={activity.user.avatar} 
                          alt={activity.user.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-slate-600 font-medium text-xs">
                          {activity.user.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="font-medium">{activity.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`action-badge action-${activity.action.type.toLowerCase()}`}>
                    {activity.action.label}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`status-badge ${
                    activity.status.type === 'completed' ? 'status-protected' :
                    activity.status.type === 'progress' ? 'status-in-progress' :
                    'status-unlocked'
                  }`}>
                    {activity.status.label}
                  </span>
                </TableCell>
                <TableCell className="text-right text-slate-500">
                  {activity.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ActivityTable;
