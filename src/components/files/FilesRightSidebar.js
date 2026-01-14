import { X, Download, Share, Edit, Trash2, Eye, Users, Calendar, HardDrive, FileText, Image, Video, Music, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export function FilesRightSidebar({ selectedFile, onClose }) {
  if (!selectedFile) {
    return (
      <aside className="w-full bg-sidebar border-l border-sidebar-border h-screen flex flex-col overflow-hidden lg:w-72">
        <div className="p-4 border-b border-sidebar-border">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Détails du fichier
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Sélectionnez un fichier pour voir les détails
            </p>
          </div>
        </div>
      </aside>
    );
  }

  // Mock file data - in real app, this would come from props or API
  const fileData = {
    id: selectedFile,
    name: 'Presentation_Q4_2024.pdf',
    size: 2400000,
    uploadDate: new Date(2024, 0, 15),
    owner: { name: 'Marie Dupont', avatar: 'MD' },
    type: 'document',
    permissions: ['view', 'download'],
    permissionLevel: 'public',
    description: 'Présentation des résultats du quatrième trimestre 2024',
    tags: ['presentation', 'q4', '2024', 'business'],
    downloads: 42,
    views: 128,
    lastModified: new Date(2024, 0, 15),
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'audio': return Music;
      default: return FileText;
    }
  };

  const FileIcon = getFileIcon(fileData.type);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <aside className="w-full bg-sidebar border-l border-sidebar-border h-screen flex flex-col overflow-hidden lg:w-72">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Détails du fichier
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* File Preview */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <FileIcon className="w-6 h-6 text-background" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">
                {fileData.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(fileData.size)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => toast.success('Téléchargement démarré !')}
              className="flex items-center gap-2 p-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 rounded-lg transition-all group"
            >
              <Download className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-cyan-300">Télécharger</span>
            </button>
            <button
              onClick={() => toast.success('Partage activé !')}
              className="flex items-center gap-2 p-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/50 rounded-lg transition-all group"
            >
              <Share className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-violet-300">Partager</span>
            </button>
            <button
              onClick={() => toast.success('Mode édition activé !')}
              className="flex items-center gap-2 p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 rounded-lg transition-all group"
            >
              <Edit className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-green-300">Modifier</span>
            </button>
            <button
              onClick={() => toast.error('Fichier supprimé !')}
              className="flex items-center gap-2 p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 rounded-lg transition-all group"
            >
              <Trash2 className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-red-300">Supprimer</span>
            </button>
          </div>
        </div>

        {/* File Information */}
        <div className="p-4 border-b border-sidebar-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Informations</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Taille</p>
                <p className="text-sm text-foreground">{formatFileSize(fileData.size)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Uploadé le</p>
                <p className="text-sm text-foreground">
                  {fileData.uploadDate.toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Propriétaire</p>
                <p className="text-sm text-foreground">{fileData.owner.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Vues / Téléchargements</p>
                <p className="text-sm text-foreground">{fileData.views} / {fileData.downloads}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="p-4 border-b border-sidebar-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Permissions</h4>
          <div className="flex items-center gap-2 mb-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              fileData.permissionLevel === 'public'
                ? 'bg-green-500/20 text-green-400'
                : fileData.permissionLevel === 'restricted'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {fileData.permissionLevel === 'public' ? 'Public' :
               fileData.permissionLevel === 'restricted' ? 'Restreint' : 'Privé'}
            </div>
          </div>
          <div className="space-y-1">
            {fileData.permissions.map((perm) => (
              <div key={perm} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-foreground capitalize">{perm}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="p-4 border-b border-sidebar-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {fileData.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-400/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Description</h4>
          <p className="text-sm text-muted-foreground">
            {fileData.description}
          </p>
        </div>
      </div>
    </aside>
  );
}