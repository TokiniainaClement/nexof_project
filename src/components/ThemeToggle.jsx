import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme, setThemeMode, isSystemTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'system') {
      // Use system preference
      const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      setThemeMode(systemTheme, true);
    } else {
      setThemeMode(newTheme, false);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={() => {
          toggleTheme();
          // Here you could add toast notification
        }}
        className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20 group relative"
        title={`Basculer vers le thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400 transition-colors group-hover:scale-110 transition-transform" />
        ) : (
          <Moon className="w-5 h-5 text-cyan-400 transition-colors group-hover:scale-110 transition-transform" />
        )}
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
        </span>
      </button>

      {/* Theme selector dropdown (optional expanded menu) */}
      <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-xl p-2 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleThemeChange('light')}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
            theme === 'light' && !isSystemTheme ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-muted'
          }`}
        >
          <Sun className="w-4 h-4 text-yellow-400" />
          Clair
        </button>

        <button
          onClick={() => handleThemeChange('dark')}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
            theme === 'dark' && !isSystemTheme ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-muted'
          }`}
        >
          <Moon className="w-4 h-4 text-cyan-400" />
          Sombre
        </button>

        <button
          onClick={() => handleThemeChange('system')}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
            isSystemTheme ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-muted'
          }`}
        >
          <Monitor className="w-4 h-4 text-violet-400" />
          Système
        </button>
      </div>
    </div>
  );
}