import React from 'react';
import { Clock, Settings, Zap, Home } from 'lucide-react';

const AgendaHeader = ({ onSync, lastSync, isSyncing = false, onHome }) => {
  return (
    <header className="bg-slate-900 border-b border-cyan-500/20 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onHome}
            className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-colors"
            title="Return to Home"
          >
            <Home className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">NEXOF Agenda</h1>
            <p className="text-xs text-cyan-300/70">Smart Schedule Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {lastSync && (
            <div className="text-right text-sm">
              <p className="text-cyan-300/70">Last Sync</p>
              <p className="text-cyan-400 font-medium">{lastSync}</p>
            </div>
          )}

          <button
            onClick={onSync}
            disabled={isSyncing}
            className="gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-2 rounded-md text-sm font-medium inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className={`w-4 h-4 ${isSyncing ? 'animate-pulse' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync'}
          </button>

          <button
            className="gap-2 text-cyan-400 hover:bg-cyan-500/20 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center justify-center"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>
    </header>
  );
};

export default AgendaHeader;