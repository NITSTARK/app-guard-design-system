import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, FileText, FileImage, Video, Eye, Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Sidebar from '@/components/Sidebar';
import BackButton from '@/components/BackButton';
import MobileAccessRequest from '@/components/MobileAccessRequest';
import AuthDialog from '@/components/AuthDialog';

const HiddenFiles = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleAuthentication = () => {
    setAuthenticated(true);
    setDialogOpen(false);
    toast.success('Authentication successful');
  };

  const handleShare = (fileName: string) => {
    setSelectedFile(fileName);
    setShareDialogOpen(true);
  };

  const confirmShare = () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }
    
    toast.success(`File shared successfully`, {
      description: `${selectedFile} has been shared with ${email}`
    });
    
    setShareDialogOpen(false);
    setEmail('');
    setSelectedFile(null);
  };

  const files = [
    { id: 1, name: 'Confidential_Report.pdf', type: 'document', size: '2.4 MB', date: '2023-04-15' },
    { id: 2, name: 'Financial_Statement.xlsx', type: 'document', size: '1.8 MB', date: '2023-04-10' },
    { id: 3, name: 'Project_Roadmap.pptx', type: 'document', size: '5.2 MB', date: '2023-04-05' },
    { id: 4, name: 'Meeting_Notes.pdf', type: 'document', size: '0.8 MB', date: '2023-03-28' },
    { id: 5, name: 'ID_Scan.jpg', type: 'image', size: '3.1 MB', date: '2023-03-20' },
    { id: 6, name: 'Contract_Scan.jpg', type: 'image', size: '2.7 MB', date: '2023-03-15' },
    { id: 7, name: 'Product_Demo.mp4', type: 'video', size: '24.6 MB', date: '2023-03-10' },
    { id: 8, name: 'Team_Photo.jpg', type: 'image', size: '5.3 MB', date: '2023-03-05' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'image':
        return <FileImage className="w-5 h-5 text-purple-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <BackButton />
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Hidden Files</h1>
                <p className="text-slate-500 dark:text-slate-400">Access protected content</p>
              </div>
            </div>
            <div className="flex gap-2">
              <MobileAccessRequest />
            </div>
          </div>
          
          {authenticated ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="w-full max-w-md grid grid-cols-4">
                    <TabsTrigger value="all">All Files</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Name</th>
                          <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Size</th>
                          <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Date</th>
                          <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.map((file) => (
                          <tr key={file.id} className="border-b last:border-0">
                            <td className="py-3 flex items-center gap-2">
                              {getFileIcon(file.type)}
                              {file.name}
                            </td>
                            <td className="py-3 text-slate-500 dark:text-slate-400">{file.size}</td>
                            <td className="py-3 text-slate-500 dark:text-slate-400">{file.date}</td>
                            <td className="py-3">
                              <button
                                className="p-1.5 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => handleShare(file.name)}
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Name</th>
                          <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Size</th>
                          <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Date</th>
                          <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.filter(file => file.type === 'document').map((file) => (
                          <tr key={file.id} className="border-b last:border-0">
                            <td className="py-3 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-blue-500" />
                              {file.name}
                            </td>
                            <td className="py-3 text-slate-500 dark:text-slate-400">{file.size}</td>
                            <td className="py-3 text-slate-500 dark:text-slate-400">{file.date}</td>
                            <td className="py-3">
                              <button
                                className="p-1.5 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => handleShare(file.name)}
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="images" className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {files.filter(file => file.type === 'image').map((file) => (
                      <div key={file.id} className="rounded-lg overflow-hidden border bg-slate-50 dark:bg-slate-700/50">
                        <AspectRatio ratio={4/3}>
                          <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                            <FileImage className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                          </div>
                        </AspectRatio>
                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm">{file.name}</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{file.size}</p>
                            </div>
                            <button
                              className="p-1.5 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              onClick={() => handleShare(file.name)}
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="videos" className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {files.filter(file => file.type === 'video').map((file) => (
                      <div key={file.id} className="rounded-lg overflow-hidden border bg-slate-50 dark:bg-slate-700/50">
                        <AspectRatio ratio={16/9}>
                          <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                            <Video className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                          </div>
                        </AspectRatio>
                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm">{file.name}</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{file.size}</p>
                            </div>
                            <button
                              className="p-1.5 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              onClick={() => handleShare(file.name)}
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Authenticate to View Hidden Files</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-4">This area contains protected content that requires authentication</p>
              <Button onClick={() => setDialogOpen(true)}>Authenticate Now</Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Authentication Dialog */}
      <AuthDialog 
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          if (!authenticated) {
            // User closed dialog without authenticating, redirect to dashboard
            window.location.href = '/dashboard';
          }
        }}
        onAuthenticate={handleAuthentication}
      />
      
      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Share {selectedFile} with another user.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmShare}>
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HiddenFiles;
