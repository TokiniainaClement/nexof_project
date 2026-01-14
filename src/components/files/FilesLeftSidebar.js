import { Folder, Upload, Star, Clock, Trash2, Users, Lock, Globe, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function FilesLeftSidebar({ selectedFolder, onSelectFolder }) {
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const folders = [
    { id: 'all', name: 'Tous les fichiers', icon: Folder, count: 42 },
    { id: 'recent', name: 'Récents', icon: Clock, count: 8 },
    { id: 'starred', name: 'Favoris', icon: Star, count: 5 },
    { id: 'shared', name: 'Partagés', icon: Users, count: 12 },
    { id: 'uploads', name: 'Mes uploads', icon: Upload, count: 15 },
  ];

  const categories = [
    { id: 'documents', name: 'Documents', icon: Folder, count: 18 },
    { id: 'images', name: 'Images', icon: Folder, count: 12 },
    { id: 'videos', name: 'Vidéos', icon: Folder, count: 6 },
    { id: 'audio', name: 'Audio', icon: Folder, count: 3 },
    { id: 'other', name: 'Autres', icon: Folder, count: 3 },
  ];

  const permissions = [
    { id: 'public', name: 'Public', icon: Globe, count: 25 },
    { id: 'restricted', name: 'Restreint', icon: Users, count: 10 },
    { id: 'private', name: 'Privé', icon: Lock, count: 7 },
  ];

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      toast.success(`Dossier "${newFolderName}" créé !`);
      setNewFolderName("");
      setShowCreateFolder(false);
    }
  };

  return (
    <aside className="w-full bg-sidebar border-r border-sidebar-border h-screen flex flex-col overflow-hidden md:w-64">
      {/* Search Bar */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
          Navigation
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick Access */}
        <div className="p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
            <Folder className="w-4 h-4" />
            Accès rapide
          </h3>
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => {
                  onSelectFolder(folder.id);
                  toast.success(`Dossier "${folder.name}" sélectionné`);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all active:scale-95 ${
                  selectedFolder === folder.id
                    ? "bg-accent border border-cyan-400 neon-border-cyan shadow-lg shadow-cyan-400/30"
                    : "hover:bg-muted border border-transparent hover:border-cyan-400/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <folder.icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {folder.name}
                  </span>
                </div>
                <span className="flex-shrink-0 px-2 py-1 bg-cyan-500/20 text-xs font-bold rounded-full text-cyan-300">
                  {folder.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-400 flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Catégories
            </h3>
            <button
              onClick={() => {
                setShowCreateFolder(true);
                toast.info('Création de dossier...');
              }}
              className="p-1 hover:bg-violet-500/20 rounded transition-colors group relative"
              title="Créer un nouveau dossier"
            >
              <Plus className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Nouveau dossier
              </span>
            </button>
          </div>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelectFolder(category.id);
                  toast.success(`Catégorie "${category.name}" sélectionnée`);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all active:scale-95 ${
                  selectedFolder === category.id
                    ? "bg-accent border border-violet-400 neon-border-violet shadow-lg shadow-violet-400/30"
                    : "hover:bg-muted border border-transparent hover:border-violet-400/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <category.icon className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {category.name}
                  </span>
                </div>
                <span className="flex-shrink-0 px-2 py-1 bg-violet-500/20 text-xs font-bold rounded-full text-violet-300">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="p-4 border-t border-sidebar-border">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Permissions
          </h3>
          <div className="space-y-1">
            {permissions.map((perm) => (
              <button
                key={perm.id}
                onClick={() => {
                  onSelectFolder(perm.id);
                  toast.success(`Permission "${perm.name}" sélectionnée`);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all active:scale-95 ${
                  selectedFolder === perm.id
                    ? "bg-accent border border-green-400 neon-border-green shadow-lg shadow-green-400/30"
                    : "hover:bg-muted border border-transparent hover:border-green-400/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <perm.icon className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {perm.name}
                  </span>
                </div>
                <span className="flex-shrink-0 px-2 py-1 bg-green-500/20 text-xs font-bold rounded-full text-green-300">
                  {perm.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Storage Info */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="p-3 bg-gradient-to-br from-card to-muted rounded-lg border border-cyan-400 neon-border-cyan">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-xs font-bold text-background">
                  💾
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full pulse-glow"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Stockage</p>
                <p className="text-xs text-cyan-400">🟢 2.4 GB / 10 GB</p>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-400 to-violet-500 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">7.6 GB restant</p>
          </div>
        </div>
      </div>

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Nouveau dossier</h3>
              <button
                onClick={() => setShowCreateFolder(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="Nom du dossier"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-400"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowCreateFolder(false)}
                  className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateFolder}
                  className="flex-1 px-3 py-2 bg-cyan-400 text-background rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}