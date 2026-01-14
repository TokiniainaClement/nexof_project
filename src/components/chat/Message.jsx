import { CheckCheck, Check, Clock, Download, File, Image, Video, Music, Smile } from "lucide-react";
import { useState } from "react";
import { VoiceMessage } from "./VoiceMessage";

export function Message({
  author,
  content,
  timestamp,
  isOwn,
  isAI,
  readCount,
  messageStatus = 'sent', // sent, delivered, read
  readBy = [],
  messageType,
  fileUrl,
  fileName,
  fileSize,
  reactions = [],
  onReaction
}) {
  const [showTranslationMenu, setShowTranslationMenu] = useState(false);
  const [displayText, setDisplayText] = useState(content);
  const [currentLanguage, setCurrentLanguage] = useState("Original");
  const [hoveredReaction, setHoveredReaction] = useState(null);

  const languages = ["Français", "English", "Español", "日本語", "Português"];

  const handleTranslate = (language) => {
    setCurrentLanguage(language);
    // Simulate translation with a simple indicator
    setDisplayText(`[${language}] ${content}`);
    setShowTranslationMenu(false);
  };

  const handleReactionClick = (emoji) => {
    if (onReaction) {
      onReaction(emoji);
    }
  };

  const hasUserReacted = (emoji) => {
    // This would need current user ID - for now assume no reactions
    return false;
  };
  return (
    <div className={`flex gap-3 mb-4 ${isOwn ? "justify-end" : "justify-start"}`}>
      {!isOwn && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold text-slate-900 flex-shrink-0">
          {isAI ? 'AI' : author[0]}
        </div>
      )}

      <div
        className="relative group max-w-xs lg:max-w-md"
        onMouseEnter={() => setShowTranslationMenu(true)}
        onMouseLeave={() => setShowTranslationMenu(false)}
      >
        <div
          className={`glass-panel px-4 py-3 transition-all duration-300 ${
            isOwn
              ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50"
              : "bg-gradient-to-br from-blue-500/20 to-slate-700/40 border-blue-500/40"
          } ${showTranslationMenu ? "glow-border" : ""}`}
        >
          <p className="text-sm text-cyan-100 break-words font-rajdhani">
            {displayText}
          </p>
          <div className="text-xs text-cyan-400/70 mt-1 flex justify-between items-center">
            <span>{currentLanguage}</span>
            <span>{timestamp}</span>
          </div>
        </div>

        {/* Translation menu */}
        {showTranslationMenu && (
          <div className="absolute bottom-full mb-2 left-0 glass-panel p-2 min-w-[180px] animate-in fade-in duration-200 z-50">
            <p className="text-xs text-cyan-300 font-bold mb-2 px-2">
              Translate to:
            </p>
            <div className="space-y-1">
              {['Français', 'English', 'Español', '日本語', 'Português'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleReactionClick('translate')}
                  className="w-full text-left px-2 py-1.5 text-xs rounded hover:bg-cyan-500/20 text-cyan-200 transition-all hover:text-cyan-300"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reactions display */}
        {reactions.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-2 ${isOwn ? "justify-end" : "justify-start"}`}>
            {Object.entries(
              reactions.reduce((acc, reaction) => {
                acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
                return acc;
              }, {})
            ).map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => handleReactionClick(emoji)}
                onMouseEnter={() => setHoveredReaction(emoji)}
                onMouseLeave={() => setHoveredReaction(null)}
                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full border transition-all ${
                  hasUserReacted(emoji)
                    ? 'bg-cyan-500/30 border-cyan-400/60 text-cyan-300'
                    : hoveredReaction === emoji
                      ? 'bg-slate-600/50 border-slate-500/50 text-cyan-300'
                      : 'bg-slate-700/50 border-slate-600/50 text-cyan-400/70 hover:bg-slate-600/50'
                }`}
                title={`${count} réaction${count > 1 ? 's' : ''}`}
              >
                <span>{emoji}</span>
                <span className="text-xs">{count}</span>
              </button>
            ))}
          </div>
        )}

        {/* Message status for own messages */}
        {isOwn && (
          <div className="flex items-center justify-end gap-1 mt-1 text-xs text-cyan-300/70">
            {messageStatus === 'sending' && (
              <Clock className="w-3 h-3 text-cyan-300/50 animate-spin" />
            )}
            {messageStatus === 'sent' && (
              <Check className="w-3 h-3 text-cyan-300/50" />
            )}
            {messageStatus === 'delivered' && (
              <CheckCheck className="w-3 h-3 text-cyan-300/70" />
            )}
            {messageStatus === 'read' && (
              <CheckCheck className="w-3 h-3 text-cyan-400" />
            )}
            {readBy.length > 0 && (
              <span className="text-cyan-400/70 text-xs">
                {readBy.length}
              </span>
            )}
          </div>
        )}
      </div>

      {isOwn && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex-shrink-0 flex items-center justify-center text-xs font-bold text-background">
          V
        </div>
      )}
    </div>
  );
}
