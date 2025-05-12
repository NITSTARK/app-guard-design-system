import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, FileText, Video, AudioLines, Archive, Folder, Plus, Grid2X2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import StatusCard from '@/components/StatusCard';

const HiddenFiles = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [archivesOpen, setArchivesOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar Navigation */}
      <div className="w-64 border-r border-slate-200 dark:border-slate-700 bg-background">
        <div className="p-4">
          <h2 className="font-semibold text-lg mb-6">Hidden Files</h2>
          
          <nav className="space-y-1">
            <div className="py-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                <Folder className="h-5 w-5" />
                <span>Hidden Files</span>
              </a>
            </div>
            
            {/* File Categories */}
            <div className="pl-4 space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Image className="h-5 w-5" />
                <span>Images</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <FileText className="h-5 w-5" />
                <span>Documents</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Video className="h-5 w-5" />
                <span>Videos</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <AudioLines className="h-5 w-5" />
                <span>Audio</span>
              </a>
            </div>
            
            {/* Archives Section */}
            <Collapsible open={archivesOpen} onOpenChange={setArchivesOpen} className="py-1">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <div className="flex items-center gap-3">
                  <Archive className="h-5 w-5" />
                  <span>Archives</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 transition-transform ${archivesOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span>ZIP Files</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span>RAR Files</span>
                </a>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Other Section */}
            <Collapsible open={otherOpen} onOpenChange={setOtherOpen} className="py-1">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <div className="flex items-center gap-3">
                  <Folder className="h-5 w-5" />
                  <span>Other</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 transition-transform ${otherOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span>Code Files</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span>Data Files</span>
                </a>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FileText className="h-6 w-6 text-applock-primary mr-2" />
            <h1 className="text-2xl font-semibold">Hidden Files</h1>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatusCard title="Total Size" value="0 KB" color="indigo" />
            <StatusCard title="Encryption Status" value="No Files" />
            <StatusCard title="Last Backup" value="No backups" />
          </div>
          
          {/* Search and Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative w-full max-w-md">
              <Input 
                type="text" 
                placeholder="Search files..."
                className="pl-10 pr-4 py-2"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button onClick={() => setViewMode('grid')} variant="ghost" size="icon" className={viewMode === 'grid' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
                <Grid2X2 className="h-5 w-5" />
              </Button>
              <Button onClick={() => setViewMode('list')} variant="ghost" size="icon" className={viewMode === 'list' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
                <List className="h-5 w-5" />
              </Button>
              <Button className="bg-applock-primary hover:bg-applock-primary/90">
                <Plus className="h-5 w-5 mr-1" /> Add Files
              </Button>
            </div>
          </div>
          
          {/* Files View - Empty State */}
          <Card className="border border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 bg-slate-100 dark:bg-slate-800 p-6 rounded-full">
                <Folder className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Hidden Files</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
                You haven't hidden any files yet. Add your first hidden file to get started.
              </p>
              <Button className="bg-applock-purple hover:bg-applock-purple/90">
                <Plus className="h-5 w-5 mr-1" /> Add Your First File
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HiddenFiles;
