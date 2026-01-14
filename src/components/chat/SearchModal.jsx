import { useState, useEffect, useCallback } from 'react';
import { Search, X, Calendar, User, MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

export function SearchModal({ isOpen, onClose, conversationId, currentUser, token }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchFilters, setSearchFilters] = useState({
    inCurrentChat: true,
    includeFiles: true,
    dateRange: 'all'
  });

  // Search messages
  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        conversationId: searchFilters.inCurrentChat ? conversationId : '',
        includeFiles: searchFilters.includeFiles.toString(),
        dateRange: searchFilters.dateRange
      });

      const response = await fetch(`http://localhost:5000/api/chat/search?${params}`, {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
        setSelectedIndex(-1);
      } else {
        toast.error('Erreur lors de la recherche');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Erreur de recherche');
    } finally {
      setLoading(false);
    }
  }, [conversationId, token, searchFilters]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        // Scroll to message (would need to be implemented)
        toast.info('Navigation vers le message...');
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, searchResults.length, onClose]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Aujourd\'hui';
    if (diffDays === 2) return 'Hier';
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;

    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-slate-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-cyan-500/30 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-600">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Rechercher dans les messages
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-700 rounded transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher des messages..."
              className="w-full pl-9 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-cyan-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
              autoFocus
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={searchFilters.inCurrentChat}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, inCurrentChat: e.target.checked }))}
                className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
              />
              <span className="text-slate-300">Dans cette conversation</span>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={searchFilters.includeFiles}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, includeFiles: e.target.checked }))}
                className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
              />
              <span className="text-slate-300">Inclure les fichiers</span>
            </label>

            <select
              value={searchFilters.dateRange}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-cyan-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-cyan-400">
                <div className="w-4 h-4 border border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                Recherche en cours...
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="divide-y divide-slate-600">
              {searchResults.map((result, index) => (
                <div
                  key={result._id}
                  className={`p-4 hover:bg-slate-700/50 cursor-pointer transition-colors ${
                    selectedIndex === index ? 'bg-cyan-500/10 border-l-4 border-cyan-400' : ''
                  }`}
                  onClick={() => {
                    // Scroll to message in chat
                    toast.info('Navigation vers le message...');
                    onClose();
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-xs font-bold text-background flex-shrink-0">
                      {result.senderId?.email?.[0]?.toUpperCase() || 'U'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-cyan-300 truncate">
                          {result.senderId?.email || 'Utilisateur'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(result.createdAt)}
                        </span>
                      </div>

                      <div className="text-sm text-slate-300 leading-relaxed">
                        {result.messageType === 'file' ? (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-cyan-400" />
                            <span>Fichier: {highlightText(result.fileName || result.content, searchQuery)}</span>
                          </div>
                        ) : (
                          highlightText(result.content, searchQuery)
                        )}
                      </div>

                      {result.conversationId !== conversationId && (
                        <div className="text-xs text-violet-400 mt-1">
                          Dans: {result.conversationName || 'Autre conversation'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="w-12 h-12 text-slate-500 mb-4" />
              <p className="text-slate-400 mb-2">Aucun résultat trouvé</p>
              <p className="text-xs text-slate-500">
                Essayez avec des termes différents ou vérifiez les filtres
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="w-12 h-12 text-slate-600 mb-4" />
              <p className="text-slate-500">Entrez un terme de recherche</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-600 bg-slate-800/50">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span>↑↓ pour naviguer</span>
              <span>↵ pour sélectionner</span>
              <span>⎋ pour fermer</span>
            </div>
            {searchResults.length > 0 && (
              <span>{searchResults.length} résultat{searchResults.length > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}