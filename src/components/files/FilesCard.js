import React, { useState } from 'react';
import {
  FileText,
  Image,
  Music,
  Video,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Eye,
  Lock,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const FilesCard = ({
  name,
  size,
  uploadDate,
  owner,
  type,
  permissions,
  permissionLevel,
  onOpenPermissionsModal,
  onDownload,
  onShare,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getFileIcon = () => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'audio':
        return <Music className="w-6 h-6" />;
      case 'document':
        return <FileText className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getPermissionBadgeColor = () => {
    switch (permissionLevel) {
      case 'public':
        return 'bg-green-900/40 text-green-400 border-green-500/50';
      case 'restricted':
        return 'bg-orange-900/40 text-orange-400 border-orange-500/50';
      case 'private':
        return 'bg-red-900/40 text-red-400 border-red-500/50';
      case 'admin':
        return 'bg-purple-900/40 text-purple-400 border-purple-500/50';
      default:
        return 'bg-gray-900/40 text-gray-400 border-gray-500/50';
    }
  };

  const getPermissionLabel = () => {
    switch (permissionLevel) {
      case 'public':
        return 'Public';
      case 'restricted':
        return 'Restreint';
      case 'private':
        return 'Privé';
      case 'admin':
        return 'Admin';
      default:
        return 'Inconnu';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    }
    return date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
  };

  const truncateName = (filename, maxLength = 20) => {
    if (filename.length <= maxLength) return filename;
    return filename.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-cyan-500/20 p-4 hover:shadow-md hover:border-cyan-400 transition-all group">
      {/* File Icon and Info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-cyan-600/10 text-cyan-400 flex-shrink-0">
          {getFileIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-cyan-400 truncate text-sm group-hover:text-cyan-300 transition">
            {truncateName(name)}
          </h3>
          <p className="text-xs text-cyan-300/70">
            {formatFileSize(size)} • {formatDate(uploadDate)}
          </p>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1.5 rounded-lg hover:bg-cyan-500/20 transition opacity-0 group-hover:opacity-100 flex-shrink-0"
          aria-label="Menu d'options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Owner */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
          {owner.avatar}
        </div>
        <p className="text-xs text-cyan-300/70">{owner.name}</p>
      </div>

      {/* Permission Badge */}
      <div className={cn(
        'inline-block px-2.5 py-1 rounded-md border text-xs font-medium mb-3',
        getPermissionBadgeColor()
      )}>
        {getPermissionLabel()}
      </div>

      {/* Context Menu */}
      {menuOpen && (
        <div className="absolute right-4 mt-2 w-48 bg-slate-800 rounded-lg border border-cyan-500/20 shadow-lg overflow-hidden z-10">
          <button
            onClick={() => {
              onDownload?.();
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-cyan-400 hover:bg-cyan-500/20 transition"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </button>
          <button
            onClick={() => {
              onShare?.();
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-cyan-400 hover:bg-cyan-500/20 transition"
          >
            <Share2 className="w-4 h-4" />
            Partager
          </button>
          <button
            onClick={() => {
              onOpenPermissionsModal?.();
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-cyan-400 hover:bg-cyan-500/20 transition"
          >
            <Eye className="w-4 h-4" />
            Permissions
          </button>
          <button
            onClick={() => {
              onDelete?.();
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 transition"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      )}

      {/* Permission Icons Footer */}
      <div className="flex items-center gap-1 pt-3 border-t border-cyan-500/20">
        {permissions.includes('view') && (
          <div className="p-1.5 rounded bg-green-900/40 text-green-400" title="Voir">
            <Eye className="w-3 h-3" />
          </div>
        )}
        {permissions.includes('download') && (
          <div className="p-1.5 rounded bg-blue-900/40 text-blue-400" title="Télécharger">
            <Download className="w-3 h-3" />
          </div>
        )}
        {permissions.includes('edit') && (
          <div className="p-1.5 rounded bg-purple-900/40 text-purple-400" title="Modifier">
            <FileText className="w-3 h-3" />
          </div>
        )}
        {permissions.includes('admin') && (
          <div className="p-1.5 rounded bg-purple-900/40 text-purple-400" title="Admin">
            <Lock className="w-3 h-3" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesCard;