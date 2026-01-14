import { useState } from 'react';
import { X, Users, Search } from 'lucide-react';
import { toast } from 'sonner';

export function CreateGroupModal({ isOpen, onClose, currentUser, onGroupCreated }) {
  const [step, setStep] = useState(1); // 1: Group details, 2: Add members
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPublic: false
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step === 1 && (!groupData.name.trim())) {
      toast.error('Veuillez saisir un nom pour le groupe');
      return;
    }
    setStep(2);
    fetchAvailableUsers();
  };

  const handleBack = () => {
    setStep(1);
  };

  const fetchAvailableUsers = async () => {
    try {
      // Use mock users for frontend-only functionality
      const { mockUsers } = await import('../../services/mockData');
      setAvailableUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    }
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers(prev =>
      prev.some(u => u._id === user._id)
        ? prev.filter(u => u._id !== user._id)
        : [...prev, user]
    );
  };

  const handleCreateGroup = async () => {
    if (selectedUsers.length === 0) {
      toast.error('Veuillez sélectionner au moins un membre');
      return;
    }

    setLoading(true);
    try {
      // Simulate group creation with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      const newGroup = {
        _id: `group_${Date.now()}`,
        name: groupData.name,
        description: groupData.description,
        type: 'group',
        isPublic: groupData.isPublic,
        participants: selectedUsers.map(u => ({ userId: u, role: 'member' })),
        createdAt: new Date().toISOString(),
        lastMessage: null
      };

      toast.success('Groupe créé avec succès !');
      onGroupCreated?.(newGroup);
      onClose();
      // Reset form
      setGroupData({ name: '', description: '', isPublic: false });
      setSelectedUsers([]);
      setStep(1);
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Erreur lors de la création du groupe');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = availableUsers.filter(user =>
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {step === 1 ? 'Créer un groupe' : 'Ajouter des membres'}
            </h2>
            <p className="text-sm text-muted-foreground">
              Étape {step} sur 2
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {step === 1 && (
            <div className="p-6 space-y-4">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom du groupe *
                </label>
                <input
                  type="text"
                  value={groupData.name}
                  onChange={(e) => setGroupData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Équipe de développement"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {groupData.name.length}/50 caractères
                </p>
              </div>

              {/* Group Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  value={groupData.description}
                  onChange={(e) => setGroupData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez l'objectif de ce groupe..."
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {groupData.description.length}/200 caractères
                </p>
              </div>

              {/* Privacy Setting */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={groupData.isPublic}
                    onChange={(e) => setGroupData(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="w-4 h-4 rounded border-cyan-400 bg-card"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">Groupe public</p>
                    <p className="text-xs text-muted-foreground">
                      Les autres utilisateurs peuvent rejoindre ce groupe
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6">
              {/* Selected Members Preview */}
              {selectedUsers.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Membres sélectionnés ({selectedUsers.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUsers.map(user => (
                      <div key={user._id} className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 rounded-full text-xs">
                        <span>{user.displayName || user.email}</span>
                        <button
                          onClick={() => toggleUserSelection(user)}
                          className="ml-1 hover:text-red-400"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher des utilisateurs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Users List */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredUsers.map(user => {
                  const isSelected = selectedUsers.some(u => u._id === user._id);
                  return (
                    <button
                      key={user._id}
                      onClick={() => toggleUserSelection(user)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-400'
                          : 'hover:bg-muted border border-transparent'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-xs font-bold text-background">
                        {user.displayName?.[0] || user.email[0].toUpperCase()}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-foreground">
                          {user.displayName || user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.isOnline ? '🟢 En ligne' : '⚪ Hors ligne'}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                          <span className="text-background text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Aucun utilisateur trouvé</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex gap-3">
          {step === 2 && (
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Retour
            </button>
          )}

          <button
            onClick={step === 1 ? handleNext : handleCreateGroup}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Création...' : step === 1 ? 'Suivant' : 'Créer le groupe'}
          </button>
        </div>
      </div>
    </div>
  );
}