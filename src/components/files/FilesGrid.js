import { FileText, Image, Video, Music, Settings, Download, Share, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export function FilesGrid({ files = [], viewMode = 'grid', onOpenPermissionsModal, onFileSelect }) {
  function getFileIcon(type) {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'audio': return Music;
      default: return FileText;
    }
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function handleFileClick(file) {
    onFileSelect?.(file);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-cyan-100 neon-glow-cyan">
          {files.length} fichier{files.length !== 1 ? 's' : ''} trouvé{files.length !== 1 ? 's' : ''}
        </h2>
        <button
          onClick={() => toast.info('Options avancées...')}
          className="p-2 hover:bg-cyan-500/20 rounded-lg transition-all active:scale-95 group relative"
          title="Options"
        >
          <Settings className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform" />
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Options
          </span>
        </button>
      </div>

      {/* Files Display */}
      {files.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
            <FileText className="w-8 h-8 text-cyan-300/50" />
          </div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-2 neon-glow-cyan">
            Aucun fichier trouvé
          </h3>
          <p className="text-cyan-300/70 text-sm">
            Commencez par uploader un fichier pour le partager
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.map(file => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                onClick={() => handleFileClick(file)}
                className="group relative bg-card border border-border rounded-lg p-4 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all active:scale-95 cursor-pointer"
              >
                {/* File Icon */}
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileIcon className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>

                {/* File Info */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-foreground truncate group-hover:text-cyan-400 transition-colors">
                    {file.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {file.uploadDate.toLocaleDateString('fr-FR')}
                  </p>
                </div>

                {/* Permission Badge */}
                <div className="mt-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    file.permissionLevel === 'public'
                      ? 'bg-green-500/20 text-green-400 border border-green-400/50'
                      : file.permissionLevel === 'restricted'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/50'
                      : 'bg-red-500/20 text-red-400 border border-red-400/50'
                  }`}>
                    {file.permissionLevel === 'public' ? 'Public' :
                     file.permissionLevel === 'restricted' ? 'Restreint' : 'Privé'}
                  </span>
                </div>

                {/* Owner Avatar */}
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-background text-xs font-bold flex items-center justify-center">
                    {file.owner.avatar}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success('Téléchargement démarré !');
                      }}
                      className="p-1 bg-cyan-500/20 hover:bg-cyan-500/30 rounded transition-colors"
                      title="Télécharger"
                    >
                      <Download className="w-3 h-3 text-cyan-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPermissionsModal?.(file.id);
                      }}
                      className="p-1 bg-violet-500/20 hover:bg-violet-500/30 rounded transition-colors"
                      title="Permissions"
                    >
                      <Share className="w-3 h-3 text-violet-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {files.map(file => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                onClick={() => handleFileClick(file)}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all active:scale-95 cursor-pointer group"
              >
                {/* File Icon */}
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FileIcon className="w-5 h-5 text-cyan-400" />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-cyan-400 transition-colors truncate">
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)} • {file.uploadDate.toLocaleDateString('fr-FR')}
                    </p>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      file.permissionLevel === 'public'
                        ? 'bg-green-500/20 text-green-400 border border-green-400/50'
                        : file.permissionLevel === 'restricted'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/50'
                        : 'bg-red-500/20 text-red-400 border border-red-400/50'
                    }`}>
                      {file.permissionLevel === 'public' ? 'Public' :
                       file.permissionLevel === 'restricted' ? 'Restreint' : 'Privé'}
                    </span>
                  </div>
                </div>

                {/* Owner Avatar */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-background text-xs font-bold flex items-center justify-center">
                    {file.owner.avatar}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info('Plus d\'options...');
                    }}
                    className="p-1 hover:bg-muted rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}