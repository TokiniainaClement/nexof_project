import { useState } from "react";
import { ChevronDown, AlertCircle, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export function RightSidebar({ activeMode, onModeChange }) {
  const [expandedSection, setExpandedSection] = useState("modes");
  const [moodState, setMoodState] = useState("calm");

  const moodColors = {
    calm: { bg: "bg-green-500/20", border: "border-green-500/50", text: "text-green-400" },
    stressed: { bg: "bg-orange-500/20", border: "border-orange-500/50", text: "text-orange-400" },
    creative: { bg: "bg-violet-500/20", border: "border-violet-500/50", text: "text-violet-400" },
    distressed: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400" },
  };

  const modes = [
    { id: "cool", icon: "🔥", label: "Mode Cool", desc: "Langage familier" },
    { id: "pro", icon: "💼", label: "Mode Pro", desc: "Langage formel" },
    { id: "flirt", icon: "😉", label: "Mode Drague", desc: "Romantique" },
    { id: "normal", icon: "⚡", label: "Mode Normal", desc: "Naturel" },
  ];

  return (
    <aside className="w-full bg-sidebar border-l border-sidebar-border h-screen flex flex-col overflow-hidden lg:w-72">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* AI Modes Panel */}
        <div className="border-b border-sidebar-border">
          <button
            onClick={() => setExpandedSection(expandedSection === "modes" ? "" : "modes")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors"
          >
            <h3 className="text-sm font-semibold text-cyan-400 uppercase">
              Modes IA
            </h3>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedSection === "modes" ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSection === "modes" && (
            <div className="px-4 pb-4 space-y-2">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    onModeChange(mode.id);
                    toast.success(`${mode.label} activé! ${mode.icon}`);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-all active:scale-95 ${
                    activeMode === mode.id
                      ? "bg-cyan-400/20 border-cyan-400/50 neon-border-cyan shadow-lg shadow-cyan-400/30"
                      : "bg-card border-border hover:border-cyan-400/30 hover:shadow-md hover:shadow-cyan-400/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{mode.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {mode.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {mode.desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}

              {/* Traduction Auto */}
              <div className="pt-2 border-t border-border mt-2">
                <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted rounded-lg transition-all active:scale-95">
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={(e) => {
                      toast.success(e.target.checked ? 'Traduction activée' : 'Traduction désactivée');
                    }}
                    className="w-4 h-4 rounded border-cyan-400 bg-card cursor-pointer"
                  />
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      Traduction auto
                    </p>
                    <p className="text-xs text-muted-foreground">
                      50+ langues
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Security Panel */}
        <div className="border-b border-sidebar-border">
          <button
            onClick={() =>
              setExpandedSection(expandedSection === "security" ? "" : "security")
            }
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors"
          >
            <h3 className="text-sm font-semibold text-violet-400 uppercase flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Sécurité
            </h3>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedSection === "security" ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSection === "security" && (
            <div className="px-4 pb-4 space-y-3">
              {/* Mood Indicator */}
              <div>
                <p className="text-xs font-medium text-foreground mb-2">
                  État émotionnel
                </p>
                <div className="space-y-2">
                  {["calm", "stressed", "creative", "distressed"].map(
                    (mood) => (
                      <button
                        key={mood}
                        onClick={() => {
                          setMoodState(mood);
                          const moodName = mood === "calm" ? "Calme 🟢" : mood === "stressed" ? "Stressé 🟠" : mood === "creative" ? "Créatif 🟣" : "Détresse 🔴";
                          toast.success(`État changé en: ${moodName}`);
                        }}
                        className={`w-full px-3 py-2 rounded-lg border transition-all flex items-center justify-between text-xs active:scale-95 ${
                          moodState === mood
                            ? `${moodColors[mood].bg} ${moodColors[mood].border} neon-border-cyan shadow-lg`
                            : "bg-card border-border hover:border-cyan-400/50 hover:shadow-md"
                        }`}
                      >
                        <span>
                          {mood === "calm"
                            ? "🟢 Calme"
                            : mood === "stressed"
                              ? "🟠 Stressé"
                              : mood === "creative"
                                ? "🟣 Créatif"
                                : "🔴 Détresse"}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${moodState === mood ? "animate-pulse" : ""} ${
                            mood === "calm"
                              ? "bg-green-500"
                              : mood === "stressed"
                                ? "bg-orange-500"
                                : mood === "creative"
                                  ? "bg-violet-500"
                                  : "bg-red-500"
                          }`}
                        ></div>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Alert History */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-foreground mb-2">
                  Historique des alertes
                </p>
                <div className="text-xs text-muted-foreground">
                  <p className="mb-1">📌 3 alertes cette semaine</p>
                  <p className="text-orange-400">⚠️ Dernier pic de stress</p>
                  <p className="text-xs text-muted-foreground">Il y a 2h</p>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-foreground mb-2">
                  Contacts d'urgence
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-cyan-400">👤 Maman</p>
                  <p className="text-xs text-cyan-400">👤 Ami(e)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Panel */}
        <div className="border-b border-sidebar-border">
          <button
            onClick={() =>
              setExpandedSection(expandedSection === "stats" ? "" : "stats")
            }
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors"
          >
            <h3 className="text-sm font-semibold text-cyan-400 uppercase flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Stats
            </h3>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedSection === "stats" ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSection === "stats" && (
            <div className="px-4 pb-4 space-y-3">
              {/* Metrics */}
              <div className="space-y-2">
                <div className="bg-card border border-border rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Messages</p>
                  <p className="text-lg font-bold text-cyan-400">127</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Conversations</p>
                  <p className="text-lg font-bold text-violet-400">8</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Temps moyen</p>
                  <p className="text-lg font-bold text-cyan-400">2.3 min</p>
                </div>
              </div>

              {/* Mood Analysis */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-foreground mb-2">
                  Analyse d'humeur
                </p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>🟢 Calme: 70%</p>
                  <p>🟣 Créatif: 20%</p>
                  <p>🟠 Stressé: 10%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card border-t border-sidebar-border p-4">
        <div className="text-xs text-muted-foreground text-center">
          <p>v1.0.0</p>
          <p className="mt-1">Nexof Chat © 2024</p>
        </div>
      </div>
    </aside>
  );
}
