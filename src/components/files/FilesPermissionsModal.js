import { useState } from "react";
import { X, Shield, Users, Eye, Download, Edit, Crown } from "lucide-react";
import { toast } from "sonner";

export function FilesPermissionsModal({
  isOpen,
  fileName = 'Nom du fichier',
  users = [],
  onClose,
  onApply,
}) {
  const [permissions, setPermissions] = useState(
    users.map(u => ({
      userId: u.id,
      see: false,
      download: false,
      edit: false,
      admin: false,
    }))
  );

  function handlePermissionChange(userId, permission) {
    setPermissions(function(prev) {
      return prev.map(function(p) {
        return p.userId === userId
          ? Object.assign({}, p, { [permission]: !p[permission] })
          : p;
      });
    });
  }

  function handleApply() {
    onApply?.(permissions);
    toast.success('Permissions mises à jour avec succès !');
  }

  if (!isOpen) return null;

  const permissionIcons = {
    see: Eye,
    download: Download,
    edit: Edit,
    admin: Crown,
  };

  const permissionLabels = {
    see: 'Voir',
    download: 'Télécharger',
    edit: 'Modifier',
    admin: 'Admin',
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Gérer les permissions
              </h2>
              <p className="text-sm text-muted-foreground">
                {fileName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aucun utilisateur disponible pour gérer les permissions
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Permission Legend */}
              <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
                {Object.entries(permissionLabels).map(([key, label]) => {
                  const Icon = permissionIcons[key];
                  return (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span className="text-muted-foreground">{label}</span>
                    </div>
                  );
                })}
              </div>

              {/* User Permissions */}
              <div className="space-y-3">
                {users.map(user => {
                  const userPerms = permissions.find(p => p.userId === user.id);
                  if (!userPerms) return null;

                  return (
                    <div
                      key={user.id}
                      className="p-4 border border-border rounded-lg hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all"
                    >
                      {/* User Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-background text-sm font-bold flex items-center justify-center">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Permissions Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.entries(permissionLabels).map(([key, label]) => {
                          const Icon = permissionIcons[key];
                          const isChecked = userPerms[key];

                          return (
                            <label
                              key={key}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all active:scale-95 ${
                                isChecked
                                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                                  : 'bg-muted/50 border-border hover:border-cyan-400/30 text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handlePermissionChange(user.id, key)}
                                className="w-4 h-4 rounded border-border bg-background cursor-pointer accent-cyan-400"
                              />
                              <Icon className={`w-4 h-4 ${isChecked ? 'text-cyan-400' : 'text-muted-foreground'}`} />
                              <span className="text-sm font-medium">{label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium text-background bg-cyan-400 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg transition-all active:scale-95"
          >
            Appliquer les permissions
          </button>
        </div>
      </div>
    </div>
  );
}