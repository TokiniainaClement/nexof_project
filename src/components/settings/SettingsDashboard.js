import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Volume2, Zap, Activity, Radio, Power, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from '../ui/button';

// Import hooks
import {
  useGeneralSettings,
  useModulesStatus,
  useAICloneStatus,
  useSecuritySettings,
  useNetworkMetrics,
  useThemeSettings,
  useBackupOperations,
  useSystemInfo
} from '../../hooks/useSettings';

// Import existing components
import ProfileSettings from './ProfileSettings';
import PrivacySettings from './PrivacySettings';
import NotificationSettings from './NotificationSettings';
import ThemeSettings from './ThemeSettings';
import AISettings from './AISettings';
import SecuritySettings from './SecuritySettings';
import LanguageSettings from './LanguageSettings';
import DataExport from './DataExport';

const SettingsDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("general");

  // Use hooks for data management
  const { settings: generalSettings, updateSettings: updateGeneralSettings } = useGeneralSettings();
  const { modules } = useModulesStatus();
  const { status: aiCloneStatus, startSync } = useAICloneStatus();
  const { settings: securitySettings, activityLog } = useSecuritySettings();
  const { metrics: networkMetrics, connections } = useNetworkMetrics();
  const { settings: themeSettings, updateSettings: updateThemeSettings } = useThemeSettings();
  const { history: backupHistory, createBackup, restoreBackup } = useBackupOperations();
  const { info: systemInfo, recalibrateCore, rebuildAICache } = useSystemInfo();

  const menuItems = [
    { id: "general", label: "Général", icon: "⚙️" },
    { id: "profile", label: "Profil", icon: "👤" },
    { id: "modules", label: "Modules", icon: "🔧" },
    { id: "ai-clone", label: "IA & Clone", icon: "🤖" },
    { id: "security", label: "Sécurité", icon: "🔒" },
    { id: "privacy", label: "Confidentialité", icon: "🛡️" },
    { id: "network", label: "Réseau", icon: "🌐" },
    { id: "theme", label: "Thème", icon: "🎨" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "ai", label: "IA", icon: "🧠" },
    { id: "language", label: "Langue", icon: "🌍" },
    { id: "backup", label: "Sauvegarde", icon: "💾" },
    { id: "export", label: "Export", icon: "📤" },
    { id: "devtools", label: "DevTools", icon: "🔧" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSettingsSection />;
      case "profile":
        return <ProfileSettings />;
      case "modules":
        return <ModulesSection />;
      case "ai-clone":
        return <AICloneSection />;
      case "security":
        return <SecuritySection />;
      case "privacy":
        return <PrivacySettings />;
      case "network":
        return <NetworkSection />;
      case "theme":
        return (
          <ThemeSection
            brightness={themeSettings.brightness}
            setBrightness={(value) => updateThemeSettings({ ...themeSettings, brightness: value })}
            glowIntensity={themeSettings.glowIntensity}
            setGlowIntensity={(value) => updateThemeSettings({ ...themeSettings, glowIntensity: value })}
            theme={themeSettings.mode}
            setTheme={(value) => updateThemeSettings({ ...themeSettings, mode: value })}
          />
        );
      case "notifications":
        return <NotificationSettings />;
      case "ai":
        return <AISettings />;
      case "language":
        return <LanguageSettings />;
      case "backup":
        return <BackupSection />;
      case "export":
        return <DataExport />;
      case "devtools":
        return <DevToolsSection />;
      default:
        return <GeneralSettingsSection />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden overflow-y-scroll">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex h-full">
        {/* Sidebar */}
        <div className="settings-sidebar w-16 sm:w-64 md:w-72 bg-slate-800/95 backdrop-blur-xl border-r border-cyan-500/30 shadow-2xl shadow-cyan-500/10 flex-shrink-0">
          <div className="p-2 sm:p-4 md:p-6 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="gap-1 sm:gap-2 text-cyan-400 hover:bg-cyan-500/20 mb-2 sm:mb-4 md:mb-6 transition-all duration-300 hover:scale-105 w-full justify-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour au Hub</span>
            </Button>
            <div className="space-y-1 sm:space-y-2 md:space-y-3">
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-green-400 rounded-full"></div>
                <p className="text-cyan-400 text-xs font-orbitron tracking-wider uppercase">System Online</p>
              </div>
              <h1 className="text-sm sm:text-lg md:text-2xl font-bold font-orbitron text-glow bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                NEXOF CONTROL
              </h1>
              <p className="text-xs md:text-sm text-cyan-300/80 font-exo">Interface de Paramétrage</p>
            </div>
          </div>

          <nav className="p-1 sm:p-3 md:p-4 space-y-1 md:space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-1 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 rounded-lg md:rounded-xl transition-all duration-300 flex items-center gap-1 sm:gap-3 md:gap-4 group ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/20"
                    : "hover:bg-slate-700/50 text-slate-400 hover:text-cyan-400 hover:translate-x-1"
                }`}
              >
                <span className="text-base sm:text-lg md:text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span className="hidden sm:inline text-xs md:text-sm font-exo font-medium truncate">{item.label}</span>
                {activeSection === item.id && (
                  <div className="ml-auto w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Status Indicators */}
          <div className="p-1 sm:p-3 md:p-4 border-t border-cyan-500/20 bg-slate-800/50 mt-auto">
            <div className="space-y-1 sm:space-y-2 md:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-exo">AI Core</span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-400 font-orbitron">ACTIVE</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-exo">Neural Sync</span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-xs text-cyan-400 font-orbitron">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <header className="settings-header bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-cyan-500/30 p-4 md:p-6 shadow-lg flex-shrink-0 h-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-2 text-center md:text-left">
                  <h1 className="text-3xl md:text-5xl font-bold font-orbitron text-glow bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    NEXOF CONTROL PARAMETERS
                  </h1>
                  <p className="text-lg md:text-xl text-cyan-300 font-exo">
                    Core AI Synchronization: <span className="text-green-400 font-orbitron">ONLINE</span>
                  </p>
                </div>
                <div className="text-center md:text-right space-y-2">
                  <div className="text-sm text-cyan-400 font-orbitron">v9.2.1</div>
                  <div className="flex items-center justify-center md:justify-end gap-2 text-sm text-slate-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>All Systems Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 settings-scroll bg-gradient-to-b from-slate-900/50 to-slate-800/50 overflow-x-hidden overflow-y-scroll">
            <div className="settings-content max-w-7xl mx-auto p-4 md:p-6 space-y-12 md:space-y-16 min-h-full">
              {/* Status Widgets Row */}
              <div className="status-widgets grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="holographic-enhanced rounded-lg md:rounded-xl p-4 md:p-6 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:scale-105 transition-all duration-300">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">🧠</div>
                  <p className="text-xs text-slate-400 font-exo mb-1">AI Status</p>
                  <p className="text-base md:text-lg font-orbitron text-green-400 font-bold">ACTIVE</p>
                  <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1">
                    <div className="h-1 bg-green-400 rounded-full w-full"></div>
                  </div>
                </div>
                <div className="holographic-enhanced rounded-lg md:rounded-xl p-4 md:p-6 text-center bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:scale-105 transition-all duration-300">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">🌐</div>
                  <p className="text-xs text-slate-400 font-exo mb-1">Network</p>
                  <p className="text-base md:text-lg font-orbitron text-cyan-400 font-bold">94%</p>
                  <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1">
                    <div className="h-1 bg-cyan-400 rounded-full w-[94%]"></div>
                  </div>
                </div>
                <div className="holographic-enhanced rounded-lg md:rounded-xl p-4 md:p-6 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 hover:scale-105 transition-all duration-300">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">🔒</div>
                  <p className="text-xs text-slate-400 font-exo mb-1">Security</p>
                  <p className="text-base md:text-lg font-orbitron text-purple-400 font-bold">ENCRYPTED</p>
                  <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1">
                    <div className="h-1 bg-purple-400 rounded-full w-full"></div>
                  </div>
                </div>
                <div className="holographic-enhanced rounded-lg md:rounded-xl p-4 md:p-6 text-center bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 hover:scale-105 transition-all duration-300">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">💾</div>
                  <p className="text-xs text-slate-400 font-exo mb-1">Storage</p>
                  <p className="text-base md:text-lg font-orbitron text-yellow-400 font-bold">87%</p>
                  <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1">
                    <div className="h-1 bg-yellow-400 rounded-full w-[87%]"></div>
                  </div>
                </div>
              </div>

              {/* Dynamic Section Content */}
              <div className="section-spacing space-y-8 md:space-y-12">
                {renderSection()}
              </div>


              {/* Footer Status Bar */}
              <footer className="bg-slate-800/95 backdrop-blur-xl border-t border-cyan-500/30 px-4 md:px-8 py-4 md:py-6 shadow-lg rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                  <div className="flex items-center gap-4 md:gap-8 order-2 md:order-1">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Radio size={14} className="text-green-400" />
                      <span className="text-xs md:text-sm font-exo text-slate-300">AI Sync: Active</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <Zap size={14} className="text-cyan-400" />
                      <span className="text-xs md:text-sm font-exo text-slate-300">Universe Link: Online</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <Power size={14} className="text-yellow-400" />
                      <span className="text-xs md:text-sm font-exo text-slate-300">Control Access: Admin Mode</span>
                    </div>
                  </div>
                  <div className="text-center flex-1 px-8 order-1 md:order-2">
                    <p className="font-orbitron text-cyan-400 text-xs md:text-sm tracking-wider">
                      NEXOF CONTROL PARAMETERS — Centralisez, gérez, harmonisez tout votre univers numérique.
                    </p>
                  </div>
                  <div className="text-slate-400 order-3 md:order-3">
                    <span className="font-exo text-xs md:text-sm">v9.2.1</span>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>

    </div>
  );
};

// Section Components
function GeneralSettingsSection() {
  const { settings, updateSettings } = useGeneralSettings();

  const handleToggle = async (key) => {
    try {
      await updateSettings({
        ...settings,
        [key]: !settings[key],
      });
    } catch (error) {
      console.error('Failed to update setting:', error);
    }
  };

  const settingLabels = {
    autoSync: { label: "Synchronisation Automatique", desc: "Synchronisation automatique des données" },
    notifications: { label: "Notifications", desc: "Alertes et notifications système" },
    advancedMode: { label: "Mode Avancé", desc: "Options avancées pour utilisateurs expérimentés" },
    lowPowerMode: { label: "Mode Économie", desc: "Réduction de la consommation énergétique" }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold font-orbitron text-glow bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Paramètres Généraux
        </h2>
        <p className="text-lg text-cyan-300/80 font-exo max-w-2xl mx-auto">
          Configuration de base du système NEXOF pour une expérience optimale
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {Object.entries(settings).map(([key, value]) => {
          const setting = settingLabels[key] || { label: key.replace(/([A-Z])/g, " $1"), desc: "" };
          return (
            <div
              key={key}
              className="group holographic rounded-2xl p-4 md:p-8 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-400/40"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <p className="font-exo font-semibold text-slate-200 text-lg mb-2">
                    {setting.label}
                  </p>
                  <p className="text-sm text-slate-400 font-exo">
                    {setting.desc}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-orbitron font-bold ${
                  value
                    ? "bg-green-500/20 text-green-300 border border-green-400/30"
                    : "bg-slate-600/20 text-slate-400 border border-slate-500/30"
                }`}>
                  {value ? "ACTIVÉ" : "DÉSACTIVÉ"}
                </div>
              </div>

              <button
                onClick={() => handleToggle(key)}
                className={`relative w-full h-12 rounded-xl transition-all duration-300 group-hover:shadow-lg ${
                  value ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20" : "bg-slate-700/50"
                } border ${value ? "border-cyan-400/50" : "border-slate-500/30"} hover:border-cyan-400/60`}
              >
                <div
                  className={`absolute top-2 h-8 w-8 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 shadow-lg ${
                    value ? "right-2" : "left-2"
                  } ${value ? "shadow-cyan-500/50" : ""}`}
                ></div>
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm font-exo text-slate-300">OFF</span>
                  <span className="text-sm font-exo text-slate-300">ON</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModulesSection() {
  const { modules } = useModulesStatus();

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy": return { bg: "bg-green-500/20", text: "text-green-300", border: "border-green-400/30", icon: "✓" };
      case "syncing": return { bg: "bg-blue-500/20", text: "text-blue-300", border: "border-blue-400/30", icon: "⟲" };
      case "training": return { bg: "bg-yellow-500/20", text: "text-yellow-300", border: "border-yellow-400/30", icon: "⚡" };
      default: return { bg: "bg-slate-500/20", text: "text-slate-300", border: "border-slate-400/30", icon: "?" };
    }
  };

  return (
    <div className="space-y-8 overflow-y-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold font-orbitron text-glow bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Modules Connectés
        </h2>
        <p className="text-base text-cyan-300/80 font-exo max-w-2xl mx-auto">
          État et synchronisation de tous les modules NEXOF actifs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {modules.map((module) => {
          const statusStyle = getStatusColor(module.status);
          return (
            <div key={module.name} className="group holographic rounded-2xl p-3 md:p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-400/40">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="font-exo font-bold text-slate-200 text-xl mb-2">{module.name}</h3>
                  <p className="text-sm text-slate-400 font-exo mb-4">Version {module.version}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Dernière sync:</span>
                    <span className="text-cyan-400">{new Date(module.lastSync).toLocaleString('fr-FR')}</span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl text-sm font-orbitron font-bold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} flex items-center gap-2`}>
                  <span className="animate-pulse">{statusStyle.icon}</span>
                  {module.status.toUpperCase()}
                </div>
              </div>

              {/* Progress Bar for non-healthy modules */}
              {module.status !== "healthy" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Progression</span>
                    <span>{module.status === "syncing" ? "67%" : "89%"}</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        module.status === "syncing" ? "bg-blue-400" : "bg-yellow-400"
                      }`}
                      style={{ width: module.status === "syncing" ? "67%" : "89%" }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Module-specific metrics */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xl font-orbitron text-cyan-400">94%</p>
                  <p className="text-xs text-slate-400">CPU Usage</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-orbitron text-green-400">2.1ms</p>
                  <p className="text-xs text-slate-400">Latency</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AICloneSection() {
  const { status, startSync } = useAICloneStatus();

  const handleStartSync = async () => {
    try {
      await startSync();
    } catch (error) {
      console.error('Failed to start sync:', error);
    }
  };

  return (
    <div className="space-y-8 overflow-y-auto">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold font-orbitron text-glow bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Intelligence Artificielle & Clone
        </h2>
        <p className="text-lg text-cyan-300/80 font-exo max-w-2xl mx-auto">
          Gestion avancée de l'IA et synchronisation du clone neuronal
        </p>
      </div>

      {/* Main AI Status Display */}
      <div className="holographic rounded-3xl p-6 md:p-12 flex flex-col items-center justify-center min-h-64 md:min-h-96 relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-cyan-500/20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <defs>
              <pattern id="neural" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.3"/>
                <line x1="20" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
                <line x1="20" y1="20" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural)"/>
          </svg>
        </div>

        {/* Central AI Core */}
        <div className="relative z-10 text-center space-y-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-cyan-400/30 flex items-center justify-center animate-spin">
              <div className="w-24 h-24 rounded-full border-4 border-cyan-300/50 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <span className="text-2xl">🧠</span>
                </div>
              </div>
            </div>
            {/* Orbital Rings */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
              <div className="w-40 h-40 mx-auto border border-cyan-400/20 rounded-full"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
              <div className="w-48 h-48 mx-auto border border-blue-400/20 rounded-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xl font-exo text-slate-300">
              IA Clone Status: <span className="text-cyan-400 font-orbitron">Synchronisation Active</span>
            </p>
            <p className="text-6xl font-bold font-orbitron text-glow bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {status.syncProgress}%
            </p>

            {/* Progress Bar */}
            <div className="w-full max-w-80 h-3 bg-slate-700/50 rounded-full overflow-hidden mx-auto shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 shadow-lg shadow-cyan-500/50"
                style={{ width: `${status.syncProgress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8">
              <div className="text-center">
                <p className="text-2xl font-orbitron text-cyan-400">{status.neuralConnections.toLocaleString()}</p>
                <p className="text-sm text-slate-400 font-exo">Connexions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-orbitron text-green-400">{status.cloneAccuracy}%</p>
                <p className="text-sm text-slate-400 font-exo">Précision</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-orbitron text-purple-400">9.2.1</p>
                <p className="text-sm text-slate-400 font-exo">Version</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {[
          {
            title: "Activer la Préparation",
            desc: "Initialiser le clone neuronal",
            icon: "⚡",
            action: handleStartSync,
            color: "from-yellow-500/20 to-orange-500/20",
            border: "border-yellow-400/30"
          },
          {
            title: "Analyser la Cohérence",
            desc: "Vérifier l'intégrité des modules",
            icon: "🔍",
            color: "from-blue-500/20 to-cyan-500/20",
            border: "border-blue-400/30"
          },
          {
            title: "Transfert Émotionnel",
            desc: "Synchronisation des patterns émotionnels",
            icon: "💫",
            color: "from-purple-500/20 to-pink-500/20",
            border: "border-purple-400/30"
          },
        ].map((option) => (
          <button
            key={option.title}
            onClick={option.action}
            className={`group holographic rounded-2xl p-4 md:p-8 text-center hover:scale-105 transition-all duration-300 bg-gradient-to-br ${option.color} border ${option.border} hover:border-cyan-400/60`}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{option.icon}</div>
            <p className="font-exo font-bold text-slate-200 text-lg mb-2">{option.title}</p>
            <p className="text-sm text-slate-400 font-exo">{option.desc}</p>
          </button>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <div className="holographic rounded-xl p-3 md:p-4 text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-500/20">
          <div className="text-2xl mb-3">🧬</div>
          <p className="text-base font-orbitron text-cyan-400">15,420</p>
          <p className="text-sm text-slate-400 font-exo">Neurones Actifs</p>
        </div>
        <div className="holographic rounded-xl p-3 md:p-4 text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-500/20">
          <div className="text-2xl mb-3">⚡</div>
          <p className="text-base font-orbitron text-yellow-400">2.4ms</p>
          <p className="text-sm text-slate-400 font-exo">Temps de Réponse</p>
        </div>
        <div className="holographic rounded-xl p-3 md:p-4 text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-500/20">
          <div className="text-2xl mb-3">🔄</div>
          <p className="text-base font-orbitron text-green-400">99.7%</p>
          <p className="text-sm text-slate-400 font-exo">Fiabilité</p>
        </div>
        <div className="holographic rounded-xl p-3 md:p-4 text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-500/20">
          <div className="text-2xl mb-3">📊</div>
          <p className="text-base font-orbitron text-purple-400">8.2TB</p>
          <p className="text-sm text-slate-400 font-exo">Données Traitées</p>
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  const { settings, activityLog } = useSecuritySettings();

  return (
    <div className="space-y-6 overflow-y-auto">
      <h2 className="text-2xl font-bold font-orbitron text-cyan-300">Sécurité & Confidentialité</h2>

      {/* Encryption Status */}
      <div className="holographic rounded-xl p-4 md:p-6 flex items-center justify-between">
        <div>
          <p className="font-exo font-semibold text-slate-200">Encryption Protocol</p>
          <p className="text-sm text-cyan-400 font-orbitron font-bold mt-2">{settings.encryptionProtocol}</p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-400/30 text-xs font-orbitron font-bold">
          ✓ ACTIVE
        </div>
      </div>

      {/* AI Protection */}
      <div className="holographic rounded-xl p-4 md:p-6 flex items-center justify-between">
        <div>
          <p className="font-exo font-semibold text-slate-200">IA Protection</p>
          <p className="text-sm text-cyan-400 font-orbitron font-bold mt-2">Active Cognitive Shield</p>
        </div>
        <div className={`px-4 py-2 rounded-lg text-xs font-orbitron font-bold ${
          settings.aiProtection
            ? "bg-green-500/20 text-green-300 border border-green-400/30"
            : "bg-red-500/20 text-red-300 border border-red-400/30"
        }`}>
          {settings.aiProtection ? "ON" : "OFF"}
        </div>
      </div>

      {/* Permissions */}
      <div className="holographic rounded-xl p-4 md:p-6">
        <p className="font-exo font-semibold text-slate-200 mb-4">Global Permissions</p>
        <select
          value={settings.globalPermissions}
          onChange={(e) => {/* TODO: Implement permission update */}}
          className="w-full md:w-48 bg-slate-700/30 border border-cyan-400/30 rounded-lg px-4 py-2 text-slate-200 font-exo text-sm focus:outline-none focus:border-cyan-400/50"
        >
          <option value="read">Lecture</option>
          <option value="edit">Modification</option>
          <option value="share">Partage</option>
          <option value="delete">Suppression</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Activity Log */}
      <div className="holographic rounded-xl p-4 md:p-6">
        <h3 className="font-exo font-semibold text-slate-200 mb-4">Activity Log</h3>
        <div className="space-y-2 text-xs">
          {activityLog.map((entry, index) => (
            <div key={index} className="flex justify-between items-center text-slate-400 border-b border-slate-700/30 pb-2 last:border-b-0">
              <span>{entry.action}</span>
              <span className="text-cyan-400">{new Date(entry.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NetworkSection() {
  const { metrics, connections } = useNetworkMetrics();

  const displayMetrics = [
    { label: "CPU Sync", value: metrics.cpuSync, color: "green" },
    { label: "Neural Flow", value: metrics.neuralFlow, color: "cyan" },
    { label: "Latency", value: metrics.latency, color: "blue" },
  ];

  return (
    <div className="space-y-6 overflow-y-auto">
      <h2 className="text-2xl font-bold font-orbitron text-cyan-300">
        Réseau & Synchronisation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {displayMetrics.map((metric) => (
          <div key={metric.label} className="holographic rounded-xl p-4 md:p-6 text-center">
            <p className="text-sm text-slate-400 font-exo mb-3">{metric.label}</p>
            <p className={`text-3xl font-bold font-orbitron text-${metric.color}-300`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Network Status */}
      <div className="holographic rounded-xl p-4 md:p-6">
        <h3 className="font-exo font-semibold text-slate-200 mb-4">Connection Status</h3>
        <div className="space-y-3">
          {connections.map((connection) => (
            <div key={connection.name} className="flex items-center justify-between">
              <span className="text-slate-400 font-exo text-sm">{connection.name}</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  connection.status === 'connected' ? 'bg-green-400' :
                  connection.status === 'standby' ? 'bg-yellow-400' : 'bg-cyan-400'
                }`}></div>
                <span className={`text-xs font-orbitron ${
                  connection.status === 'connected' ? 'text-green-300' :
                  connection.status === 'standby' ? 'text-yellow-300' : 'text-cyan-300'
                }`}>
                  {connection.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThemeSection({
  brightness,
  setBrightness,
  glowIntensity,
  setGlowIntensity,
  theme,
  setTheme,
}) {
  return (
    <div className="space-y-6 overflow-y-auto">
      <h2 className="text-2xl font-bold font-orbitron text-cyan-300">
        Thème & Apparence
      </h2>

      {/* Theme Mode */}
      <div className="holographic rounded-xl p-4 md:p-6">
        <p className="font-exo font-semibold text-slate-200 mb-4">Theme Mode</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["dark", "light", "holographic"].map((mode) => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              className={`py-3 px-4 rounded-lg font-exo font-semibold capitalize transition-all duration-300 border ${
                theme === mode
                  ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300 glow-cyan-sm"
                  : "bg-slate-700/20 border-slate-500/20 text-slate-400 hover:border-cyan-500/30"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Brightness Control */}
      <div className="holographic rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-exo font-semibold text-slate-200">Luminosité Holographique</p>
          <span className="text-cyan-300 font-orbitron font-bold">{brightness}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full h-2 bg-slate-700/30 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>

      {/* Glow Intensity Control */}
      <div className="holographic rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-exo font-semibold text-slate-200">Intensité du Glow</p>
          <span className="text-cyan-300 font-orbitron font-bold">{glowIntensity}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={glowIntensity}
          onChange={(e) => setGlowIntensity(Number(e.target.value))}
          className="w-full h-2 bg-slate-700/30 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>

      {/* Visual Preview */}
      <div className="holographic rounded-xl p-4 md:p-6 text-center">
        <p className="font-exo font-semibold text-slate-200 mb-4">Preview</p>
        <div
          className="w-24 h-24 mx-auto rounded-lg bg-cyan-500 border-2 border-cyan-400 transition-all duration-300"
          style={{
            opacity: brightness / 100,
            boxShadow: `0 0 ${glowIntensity * 0.5}px rgba(0, 220, 255, ${glowIntensity / 100})`,
          }}
        ></div>
      </div>
    </div>
  );
}

function BackupSection() {
  const { history, createBackup, restoreBackup } = useBackupOperations();

  const handleCreateBackup = async () => {
    try {
      await createBackup('full');
    } catch (error) {
      console.error('Failed to create backup:', error);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    try {
      await restoreBackup(backupId);
    } catch (error) {
      console.error('Failed to restore backup:', error);
    }
  };

  return (
    <div className="space-y-6 overflow-y-auto">
      <h2 className="text-2xl font-bold font-orbitron text-cyan-300">
        Sauvegarde & Restauration
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <button
          onClick={handleCreateBackup}
          className="holographic rounded-xl p-4 md:p-6 text-center hover:scale-105 transition-transform"
        >
          <div className="text-4xl mb-3">💾</div>
          <p className="font-exo font-semibold text-slate-200 mb-2">Create Backup</p>
          <p className="text-xs text-slate-400">Save system state now</p>
        </button>

        <button className="holographic rounded-xl p-4 md:p-6 text-center hover:scale-105 transition-transform">
          <div className="text-4xl mb-3">⏮️</div>
          <p className="font-exo font-semibold text-slate-200 mb-2">Restore</p>
          <p className="text-xs text-slate-400">Restore from backup</p>
        </button>
      </div>

      {/* Backup History */}
      <div className="holographic rounded-xl p-4 md:p-6">
        <h3 className="font-exo font-semibold text-slate-200 mb-4">Backup History</h3>
        <div className="space-y-2 text-xs">
          {history.map((backup, index) => (
            <div key={backup.id || index} className="flex justify-between items-center text-slate-400 border-b border-slate-700/30 pb-2 last:border-b-0">
              <div>
                <span>{backup.type}</span>
                <div className="text-xs text-slate-500">{backup.size}</div>
              </div>
              <div className="text-right">
                <span className="text-cyan-400">{new Date(backup.timestamp).toLocaleDateString('fr-FR')}</span>
                <div className={`text-xs ${backup.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {backup.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DevToolsSection() {
  const { info, recalibrateCore, rebuildAICache } = useSystemInfo();

  const handleRecalibrate = async () => {
    try {
      await recalibrateCore();
    } catch (error) {
      console.error('Failed to recalibrate core:', error);
    }
  };

  const handleRebuildCache = async () => {
    try {
      await rebuildAICache();
    } catch (error) {
      console.error('Failed to rebuild AI cache:', error);
    }
  };

  return (
    <div className="space-y-6 overflow-y-auto">
      <h2 className="text-2xl font-bold font-orbitron text-cyan-300">Outils Développeurs</h2>

      <div className="holographic rounded-xl p-4 md:p-6">
        <h3 className="font-exo font-semibold text-slate-200 mb-4 text-lg">Advanced Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <button
            onClick={handleRecalibrate}
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 rounded-lg px-4 py-3 font-exo text-sm font-semibold text-red-300 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Recalibrer le NEXOF Core
          </button>

          <button
            onClick={handleRebuildCache}
            className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 hover:border-yellow-400/50 rounded-lg px-4 py-3 font-exo text-sm font-semibold text-yellow-300 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Activity size={16} />
            Rebuild AI Cache
          </button>
        </div>
      </div>

      {/* System Info */}
      <div className="holographic rounded-xl p-4 md:p-6">
        <h3 className="font-exo font-semibold text-slate-200 mb-4">System Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">NEXOF Core Version</span>
            <span className="text-cyan-300 font-orbitron">{info.nexofCoreVersion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Database Status</span>
            <span className="text-green-300 font-orbitron">{info.databaseStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Uptime</span>
            <span className="text-cyan-300 font-orbitron">{info.uptime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">API Calls Today</span>
            <span className="text-blue-300 font-orbitron">{info.apiCallsToday.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Memory Usage</span>
            <span className="text-cyan-300 font-orbitron">{info.memoryUsage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">CPU Usage</span>
            <span className="text-cyan-300 font-orbitron">{info.cpuUsage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsDashboard;