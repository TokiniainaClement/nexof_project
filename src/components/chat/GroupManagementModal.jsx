import { useState } from 'react';
import { X, Users, UserPlus, UserMinus, Crown, Shield, Search } from 'lucide-react';
import { toast } from 'sonner';

export function GroupManagementModal({ conversation, isOpen, onClose, currentUser }) {
  const [activeTab, setActiveTab] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupSettings, setGroupSettings] = useState({
    name: conversation?.name || '',
    description: conversation?.description || '',
    isPublic: conversation?.settings?.isPublic || false,
    allowInvites: conversation?.settings?.allowInvites || true
  });

  if (!isOpen || !conversation) return null;

  const isAdmin = conversation.participants.find(p => p.userId === currentUser?._id)?.role === 'admin';
  const members = conversation.participants || [];
  const filteredMembers = members.filter(member =>
    member.userId.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.userId.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = async (userId, newRole) => {
    if (!isAdmin) return;

    try {
      const response = await fetch(`http://localhost:5000/api/conversations/${conversation._id}/members/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        toast.success(`Rôle mis à jour avec succès`);
        // Refresh conversation data
        window.location.reload();
      } else {
        throw new Error('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Erreur lors de la mise à jour du rôle');
    }
  };

  const handleRemoveMember = async (userId) => {
    if (!isAdmin) return;

    try {
      const response = await fetch(`http://localhost:5000/api/conversations/${conversation._id}/members/${userId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      if (response.ok) {
        toast.success('Membre retiré avec succès');
        // Refresh conversation data
        window.location.reload();
      } else {
        throw new Error('Failed to remove member');
      }
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Erreur lors du retrait du membre');
    }
  };

  const handleUpdateGroup = async () => {
    if (!isAdmin) return;

    try {
      const response = await fetch(`http://localhost:5000/api/conversations/${conversation._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(groupSettings)
      });

      if (response.ok) {
        toast.success('Paramètres du groupe mis à jour');
        onClose();
      } else {
        throw new Error('Failed to update group');
      }
    } catch (error) {
      console.error('Error updating group:', error);
      toast.error('Erreur lors de la mise à jour du groupe');
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'moderator':
        return <Shield className="w-4 h-4 text-blue-400" />;
      default:
        return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'moderator':
        return 'Modérateur';
      default:
        return 'Membre';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Gérer le groupe</h2>
            <p className="text-sm text-muted-foreground">{conversation.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'members'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Membres ({members.length})
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Paramètres
            </button>
          )}
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {activeTab === 'members' && (
            <div className="p-6">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher des membres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Members List */}
              <div className="space-y-3">
                {filteredMembers.map((member) => (
                  <div key={member.userId._id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-sm font-bold text-background">
                        {member.userId.displayName?.[0] || member.userId.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {member.userId.displayName || member.userId.email}
                        </p>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(member.role)}
                          <span className="text-xs text-muted-foreground">
                            {getRoleLabel(member.role)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isAdmin && member.userId._id !== currentUser?._id && (
                      <div className="flex items-center gap-2">
                        <select
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.userId._id, e.target.value)}
                          className="px-2 py-1 bg-background border border-border rounded text-xs"
                        >
                          <option value="member">Membre</option>
                          <option value="moderator">Modérateur</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={() => handleRemoveMember(member.userId._id)}
                          className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors"
                          title="Retirer du groupe"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Members Button - TODO: Implement add members functionality */}
              {isAdmin && (
                <div className="mt-6 pt-4 border-t border-border">
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-500/20 border border-gray-400/50 rounded-lg cursor-not-allowed"
                  >
                    <UserPlus className="w-4 h-4" />
                    Ajouter des membres (Bientôt disponible)
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && isAdmin && (
            <div className="p-6 space-y-6">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom du groupe
                </label>
                <input
                  type="text"
                  value={groupSettings.name}
                  onChange={(e) => setGroupSettings(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              {/* Group Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={groupSettings.description}
                  onChange={(e) => setGroupSettings(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                />
              </div>

              {/* Privacy Settings */}
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Groupe public</span>
                  <input
                    type="checkbox"
                    checked={groupSettings.isPublic}
                    onChange={(e) => setGroupSettings(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="w-4 h-4 rounded border-cyan-400 bg-card"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Autoriser les invitations</span>
                  <input
                    type="checkbox"
                    checked={groupSettings.allowInvites}
                    onChange={(e) => setGroupSettings(prev => ({ ...prev, allowInvites: e.target.checked }))}
                    className="w-4 h-4 rounded border-cyan-400 bg-card"
                  />
                </label>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={handleUpdateGroup}
                  className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
                >
                  Sauvegarder les modifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}