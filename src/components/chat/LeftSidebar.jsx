import { MessageSquare, Users, Zap, Search, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { CloneIAPromo } from "./CloneIAPromo";
import { CreateGroupModal } from "./CreateGroupModal";
import { toast } from "sonner";
import useChat from "../../hooks/useChat";

export function LeftSidebar({
  selectedChat,
  onSelectChat,
}) {
  const token = localStorage.getItem('token');
  const { conversations, onlineUsers, fetchConversations, currentUser } = useChat(token);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // Separate conversations by type
  const groupConversations = conversations.filter(conv => conv.type === 'group');
  const directConversations = conversations.filter(conv => conv.type === 'direct');

  useEffect(() => {
    if (token) {
      fetchConversations();
    }
  }, [token, fetchConversations]);

  return (
    <aside className="w-full bg-sidebar border-r border-sidebar-border h-screen flex flex-col overflow-hidden md:w-64">
      {/* Search Bar */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) {
                toast.info(`Recherche: ${e.target.value}`);
              }
            }}
            className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Online Users Section */}
        <div className="p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Utilisateurs en ligne
          </h3>
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => {
                  // Find or create direct conversation
                  const existingDirect = directConversations.find(conv =>
                    conv.participants.some(p => p.userId._id === user._id)
                  );

                  if (existingDirect) {
                    onSelectChat(existingDirect._id);
                    toast.success(`Conversation avec ${user.email} ouverte 💬`);
                  } else {
                    // For now, just show a message - direct conversation creation would need backend support
                    toast.info(`Conversation directe avec ${user.email} - Fonction à venir`);
                  }
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all active:scale-95 ${
                  selectedChat === user._id
                    ? "bg-accent border border-cyan-400 neon-border-cyan shadow-lg shadow-cyan-400/30"
                    : "hover:bg-muted border border-transparent hover:border-cyan-400/30 hover:shadow-md"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-sm font-bold text-background">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-sidebar ${
                      user.status === "online"
                        ? "bg-green-500 pulse-glow"
                        : user.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">
                    {user.displayName || user.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.status === "online"
                      ? "En ligne"
                      : user.status === "away"
                      ? "Absent"
                      : "Hors ligne"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Groups Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Groupes de discussion
            </h3>
            <button
              onClick={() => {
                setShowCreateGroup(true);
                toast.info('Ouverture de la création de groupe...');
              }}
              className="p-1 hover:bg-violet-500/20 rounded transition-colors group relative"
              title="Créer un nouveau groupe de discussion"
            >
              <Plus className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Nouveau groupe
              </span>
            </button>
          </div>
          <div className="space-y-2">
            {groupConversations.map((conversation) => (
              <button
                key={conversation._id}
                onClick={() => {
                  onSelectChat(conversation._id);
                  toast.success(`Groupe "${conversation.name || 'Groupe'}" sélectionné 👥`);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all active:scale-95 ${
                  selectedChat === conversation._id
                    ? "bg-accent border border-violet-400 neon-border-violet shadow-lg shadow-violet-400/30"
                    : "hover:bg-muted border border-transparent hover:border-violet-400/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {conversation.name || 'Groupe sans nom'}
                  </span>
                </div>
                {conversation.unreadCounts && conversation.unreadCounts.length > 0 && (
                  <span className="flex-shrink-0 px-2 py-1 bg-red-500 text-xs font-bold rounded-full">
                    {conversation.unreadCounts[0].count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="p-4 border-t border-sidebar-border">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            Assistant IA
          </h3>
          <div className="p-3 bg-gradient-to-br from-card to-muted rounded-lg border border-cyan-400 neon-border-cyan hover:border-cyan-300 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-xs font-bold text-background">
                  AI
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full pulse-glow"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Nexof AI</p>
                <p className="text-xs text-cyan-400">🟢 Prêt à aider</p>
              </div>
            </div>
            <button
              onClick={() => {
                toast.success('Nexof AI activé! 🤖');
                // Here you could implement actual AI activation logic
              }}
              className="w-full mt-2 px-3 py-2 bg-cyan-400 text-background text-xs font-bold rounded-lg hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-400/50 transition-all active:scale-95 group relative"
              title="Activer l'assistant IA pour obtenir de l'aide">
              Activer
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Assistant IA
              </span>
            </button>
          </div>
        </div>

        {/* Clone IA Promo Section */}
        <CloneIAPromo />
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        currentUser={currentUser}
        onGroupCreated={(newGroup) => {
          fetchConversations(); // Refresh conversations list
          onSelectChat(newGroup._id); // Select the new group
          setShowCreateGroup(false);
        }}
      />
    </aside>
  );
}
