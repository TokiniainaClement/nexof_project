import { MessageCircle, Settings, Users, Shield, Home, Bell } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import { NotificationSettings } from "../NotificationSettings";
import { useState } from "react";
import useChat from "../../hooks/useChat";


export function ChatHeader({ activeMode }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { currentUser } = useChat(token);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    sound: true,
    desktop: true,
    mobile: true,
    messages: true,
    mentions: true,
    reactions: false,
    files: true,
    calls: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  const modeEmojis = {
    cool: "🔥",
    pro: "💼",
    flirt: "😉",
    normal: "⚡",
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
      <div className="relative flex-shrink-0">
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 neon-glow-cyan" />
        <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full pulse-glow"></div>
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="text-lg sm:text-xl font-light tracking-wider neon-glow-cyan truncate">
          Nexof Chat
        </h1>
        <p className="text-xs text-muted-foreground truncate">
          {currentUser ? `Connecté en tant que ${currentUser.displayName || currentUser.email}` : 'Connexion...'}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto">
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
          <span className="text-sm">{modeEmojis[activeMode]}</span>
          <span className="text-xs text-muted-foreground capitalize">
            Mode {activeMode}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              navigate('/');
              toast.info('Retour à l\'accueil...');
            }}
            className="p-1.5 sm:p-2 hover:bg-muted hover:shadow-lg hover:shadow-green-400/30 rounded-lg transition-all active:scale-95 group relative"
            title="Retour à l'accueil"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Accueil
            </span>
          </button>
          <ThemeToggle />
          <button
            onClick={() => toast.info('Voir les contacts en ligne')}
            className="p-1.5 sm:p-2 hover:bg-muted hover:shadow-lg hover:shadow-cyan-400/30 rounded-lg transition-all active:scale-95 group relative">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Contacts
            </span>
          </button>
          <button
            onClick={() => toast.info('Paramètres de sécurité')}
            className="p-1.5 sm:p-2 hover:bg-muted hover:shadow-lg hover:shadow-violet-400/30 rounded-lg transition-all active:scale-95 group relative">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Sécurité
            </span>
          </button>
          <button
            onClick={() => {
              setShowNotificationSettings(true);
              toast.info('Ouverture des paramètres de notifications...');
            }}
            className="p-1.5 sm:p-2 hover:bg-muted hover:shadow-lg hover:shadow-cyan-400/30 rounded-lg transition-all active:scale-95 group relative"
            title="Paramètres de notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Notifications
            </span>
          </button>
          <button
            onClick={() => toast.info('Paramètres')}
            className="p-1.5 sm:p-2 hover:bg-muted hover:shadow-lg hover:shadow-cyan-400/30 rounded-lg transition-all active:scale-95 hidden sm:block group relative">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Paramètres
            </span>
          </button>
        </div>
      </div>

      {/* Notification Settings Modal */}
      {showNotificationSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
              <button
                onClick={() => setShowNotificationSettings(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <NotificationSettings
                settings={notificationSettings}
                onUpdate={setNotificationSettings}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
