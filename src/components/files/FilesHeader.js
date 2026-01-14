import { Upload, Grid, List, Search, Filter, Settings, User, Bell } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";

export function FilesHeader({ searchQuery, onSearchChange, viewMode, onViewModeChange }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
      <div className="relative flex-shrink-0">
        <Upload className="w-6 h-6 sm:w-8 sm:h-8 neon-glow-cyan" />
        <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full pulse-glow"></div>
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="text-lg sm:text-xl font-light tracking-wider neon-glow-cyan truncate">
          Nexof Files
        </h1>
        <p className="text-xs text-muted-foreground truncate">
          {token ? 'Connecté et prêt à partager' : 'Connexion requise'}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto">
        {/* Search Bar */}
        <div className="hidden sm:flex relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher des fichiers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64 pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded transition-all ${
              viewMode === 'grid'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'hover:bg-muted'
            }`}
            title="Vue grille"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded transition-all ${
              viewMode === 'list'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'hover:bg-muted'
            }`}
            title="Vue liste"
          >
            <List className="w-4 h-4" />
          </button>
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
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Accueil
            </span>
          </button>
          <ThemeToggle />
          <button
            onClick={() => toast.info('Filtres avancés')}
            className="p-1.5 sm:p-2 hover:bg-muted hover:shadow-lg hover:shadow-cyan-400/30 rounded-lg transition-all active:scale-95 group relative">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Filtres
            </span>
          </button>
          <button
            onClick={() => toast.info('Paramètres')}
            className="p-1.5 sm:p-2 hover:bg-muted hover:shadow-lg hover:shadow-violet-400/30 rounded-lg transition-all active:scale-95 group relative">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Paramètres
            </span>
          </button>
          <button
            onClick={() => toast.info('Notifications')}
            className="p-1.5 sm:p-2 hover:bg-muted hover:shadow-lg hover:shadow-cyan-400/30 rounded-lg transition-all active:scale-95 hidden sm:block group relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Notifications
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}