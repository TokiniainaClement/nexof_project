import { Zap, ArrowRight, Lock } from "lucide-react";
import { useState } from "react";

export function CloneIAPromo() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-4 border-t border-sidebar-border">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-violet-500/30 via-cyan-500/20 to-violet-500/10 border border-violet-400/50 p-4 group hover:border-violet-400 transition-all cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-2">
            <div className="relative flex-shrink-0 mt-0.5">
              <Lock className="w-5 h-5 text-violet-400" />
              <Zap className="w-3 h-3 text-cyan-400 absolute -bottom-1 -right-1" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-violet-300 uppercase tracking-wider">
                Clone IA
              </h3>
              <p className="text-xs text-violet-200 mt-1 leading-relaxed">
                Répondre automatiquement à tous vos messages
              </p>
            </div>
          </div>

          {/* Expandable Details */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-violet-400/30 space-y-2 animate-in fade-in">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Après 3 mois d'utilisation intensive de Nexof Chat, débloquez votre clone IA personnel qui apprendra votre style de communication et répondra automatiquement en votre nom.
              </p>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Apprentissage intelligent
              </div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Contexte préservé
              </div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Contrôle total
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-3 pt-3 border-t border-violet-400/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Progression</span>
              <span className="text-xs font-bold text-cyan-400">45 jours</span>
            </div>
            <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-violet-400/30">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all"
                style={{ width: '45%' }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              45/90 jours jusqu'au déverrouillage
            </p>
          </div>

          {/* Call to Action */}
          <button className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-violet-500/40 to-cyan-500/40 border border-violet-400/50 text-violet-300 text-xs font-bold rounded-lg hover:from-violet-500/60 hover:to-cyan-500/60 hover:border-violet-400 transition-all flex items-center justify-center gap-2 group/btn">
            <span>En savoir plus</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
