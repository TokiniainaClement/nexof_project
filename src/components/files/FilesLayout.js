import { useState } from "react";
import { Menu, X, Folder, Upload, Grid, List, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { FilesHeader } from "./FilesHeader";
import { FilesLeftSidebar } from "./FilesLeftSidebar";
import { FilesRightSidebar } from "./FilesRightSidebar";
import { FilesUploadZone } from "./FilesUploadZone";
import { FilesGrid } from "./FilesGrid";
import { FilesPermissionsModal } from "./FilesPermissionsModal";

export function FilesLayout() {
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample files data - in a real app, this would come from your backend
  const files = [
    {
      id: '1',
      name: 'Presentation_Q4_2024.pdf',
      size: 2400000,
      uploadDate: new Date(2024, 0, 15),
      owner: { name: 'Marie Dupont', avatar: 'MD' },
      type: 'document',
      permissions: ['view', 'download'],
      permissionLevel: 'public',
    },
    {
      id: '2',
      name: 'Project_Screenshot.png',
      size: 1800000,
      uploadDate: new Date(2024, 0, 14),
      owner: { name: 'Jean Martin', avatar: 'JM' },
      type: 'image',
      permissions: ['view', 'download', 'edit'],
      permissionLevel: 'restricted',
    },
    {
      id: '3',
      name: 'Budget_Analysis_2024.xlsx',
      size: 950000,
      uploadDate: new Date(2024, 0, 13),
      owner: { name: 'Sarah Johnson', avatar: 'SJ' },
      type: 'document',
      permissions: ['view', 'edit'],
      permissionLevel: 'private',
    },
    {
      id: '4',
      name: 'Team_Meeting_Recording.mp4',
      size: 125000000,
      uploadDate: new Date(2024, 0, 12),
      owner: { name: 'Muh Ckayah', avatar: 'MC' },
      type: 'video',
      permissions: ['view', 'download', 'edit', 'admin'],
      permissionLevel: 'admin',
    },
    {
      id: '5',
      name: 'background_music.mp3',
      size: 5400000,
      uploadDate: new Date(2024, 0, 11),
      owner: { name: 'Pierre Lemaire', avatar: 'PL' },
      type: 'audio',
      permissions: ['view', 'download'],
      permissionLevel: 'public',
    },
    {
      id: '6',
      name: 'UI_Design_System_v2.figma',
      size: 8700000,
      uploadDate: new Date(2024, 0, 10),
      owner: { name: 'Lisa Chen', avatar: 'LC' },
      type: 'other',
      permissions: ['view', 'download', 'edit'],
      permissionLevel: 'restricted',
    },
    {
      id: '7',
      name: 'Annual_Report_2023.pdf',
      size: 4200000,
      uploadDate: new Date(2024, 0, 9),
      owner: { name: 'Thomas Weber', avatar: 'TW' },
      type: 'document',
      permissions: ['view'],
      permissionLevel: 'public',
    },
    {
      id: '8',
      name: 'Product_Demo.mp4',
      size: 95000000,
      uploadDate: new Date(2024, 0, 8),
      owner: { name: 'Emma Garcia', avatar: 'EG' },
      type: 'video',
      permissions: ['view', 'download'],
      permissionLevel: 'public',
    },
  ];

  const mockUsers = [
    { id: '1', name: 'Marie Dupont', avatar: 'MD', email: 'marie@example.com' },
    { id: '2', name: 'Jean Martin', avatar: 'JM', email: 'jean@example.com' },
    { id: '3', name: 'Sarah Johnson', avatar: 'SJ', email: 'sarah@example.com' },
    { id: '4', name: 'Pierre Lemaire', avatar: 'PL', email: 'pierre@example.com' },
  ];

  const handleFilesSelected = (newFiles) => {
    console.log('Files selected:', newFiles);
    toast.success(`${newFiles.length} fichier(s) uploadé(s) avec succès !`);
  };

  const handleOpenPermissionsModal = (fileId) => {
    setSelectedFile(fileId);
    setIsPermissionsModalOpen(true);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setShowRightSidebar(true);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
      {/* Left Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:static md:transform-none md:z-0`}
      >
        <FilesLeftSidebar
          selectedFolder={selectedFolder}
          onSelectFolder={setSelectedFolder}
        />
      </div>

      {/* Mobile Overlay */}
      {showLeftSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowLeftSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <div className="glass-panel border-b border-cyan-500/30 h-16 flex items-center px-3 sm:px-6 shadow-lg">
          <button
            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
            className="md:hidden p-2 hover:bg-cyan-500/20 mr-2 flex-shrink-0 rounded transition-colors"
          >
            {showLeftSidebar ? (
              <X className="w-5 h-5 text-cyan-300" />
            ) : (
              <Menu className="w-5 h-5 text-cyan-300" />
            )}
          </button>
          <FilesHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <button
            onClick={() => setShowRightSidebar(!showRightSidebar)}
            className="lg:hidden p-2 hover:bg-cyan-500/20 ml-2 flex-shrink-0 rounded transition-colors"
          >
            {showRightSidebar ? (
              <X className="w-5 h-5 text-cyan-300" />
            ) : (
              <Menu className="w-5 h-5 text-cyan-300" />
            )}
          </button>
        </div>

        {/* Files Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Upload Zone */}
          <div className="p-6 border-b border-sidebar-border">
            <FilesUploadZone onFilesSelected={handleFilesSelected} />
          </div>

          {/* Files Grid/List */}
          <div className="flex-1 overflow-y-auto p-6">
            <FilesGrid
              files={filteredFiles}
              viewMode={viewMode}
              onOpenPermissionsModal={handleOpenPermissionsModal}
              onFileSelect={handleFileSelect}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:static lg:transform-none lg:z-0`}
      >
        <FilesRightSidebar
          selectedFile={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      </div>

      {/* Mobile Overlay for Right Sidebar */}
      {showRightSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowRightSidebar(false)}
        />
      )}

      {/* Permissions Modal */}
      <FilesPermissionsModal
        isOpen={isPermissionsModalOpen}
        fileName={selectedFile ? files.find(f => f.id === selectedFile)?.name : undefined}
        users={mockUsers}
        onClose={() => setIsPermissionsModalOpen(false)}
        onApply={(permissions) => {
          console.log('Permissions applied:', permissions);
          toast.success('Permissions mises à jour !');
        }}
      />
    </div>
  );
}