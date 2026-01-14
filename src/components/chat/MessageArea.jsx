import { useEffect, useRef, useState, useCallback } from "react";
import { Message } from "./Message";
import { Smile, Paperclip, Send, X, File, Image, Video, Music, Phone, Settings, Mic, BarChart3, Link, Clock } from "lucide-react";
import { toast } from "sonner";
import useChat from "../../hooks/useChat";
import useFileUpload from "../../hooks/useFileUpload";
import { VideoCallModal } from "./VideoCallModal";
import { EmojiPicker } from "./EmojiPicker";
import { SearchModal } from "./SearchModal";
import { GroupManagementModal } from "./GroupManagementModal";
import { VoiceRecorder } from "./VoiceRecorder";
import { ChatAnalyticsModal } from "./ChatAnalyticsModal";
import { ExternalServicesModal } from "./ExternalServicesModal";
import { MessageSchedulerModal } from "./MessageSchedulerModal";

export function MessageArea({ selectedChat }) {
  const token = localStorage.getItem('token');
  const {
    messages: chatMessages,
    sendMessage,
    startTyping,
    stopTyping,
    addReaction,
    typingUsers,
    markAsRead,
    fetchMessages,
    loadMoreMessages,
    loading,
    currentUser,
    messageStatuses,
    hasMoreMessages,
    notificationSettings,
    toggleMuteConversation
  } = useChat(token);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showExternalServices, setShowExternalServices] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiButtonRef = useRef(null);

  // File upload hook
  const { uploadingFiles, uploadProgress, handleFileSelect, formatFileSize } = useFileUpload((fileData) => {
    // Send file message
    sendMessage(selectedChat, `📎 ${fileData.fileName}`, 'file', fileData);
  });

  // Voice recording handler
  const handleVoiceRecordingComplete = async (audioBlob, duration) => {
    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', audioBlob, `voice-message-${Date.now()}.webm`);
      formData.append('conversationId', selectedChat);

      // Use mock file service
      const { MockFileService } = await import('../../services/mockData');
      const result = await MockFileService.uploadFile(audioBlob, selectedChat);
      toast.success('Message vocal envoyé !');
      setShowVoiceRecorder(false);
    } catch (error) {
      console.error('Voice upload error:', error);
      toast.error('Erreur lors de l\'envoi du message vocal');
    }
  };

  const messages = chatMessages[selectedChat] || [];

  // Debug: Log current selectedChat and available conversations
  console.log('Selected chat:', selectedChat);
  console.log('Available chat messages:', Object.keys(chatMessages));
  console.log('Messages for selected chat:', messages);

  // Handle typing indicators
  const handleInputChange = (e) => {
    setInput(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      startTyping(selectedChat);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      stopTyping(selectedChat);
    }, 1000);
  };

  // Mark messages as read when viewing conversation
  useEffect(() => {
    if (selectedChat && messages.length > 0 && currentUser) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.senderId?._id !== currentUser._id) {
        // Mark as read if it's not our own message
        markAsRead(selectedChat, lastMessage._id);
      }
    }
  }, [selectedChat, messages, currentUser, markAsRead]);

  // Infinite scroll handler
  const handleScroll = useCallback((e) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0 && hasMoreMessages[selectedChat]) {
      loadMoreMessages(selectedChat);
    }
  }, [hasMoreMessages, selectedChat, loadMoreMessages]);

  // Get typing users for current conversation
  const currentTypingUsers = typingUsers[selectedChat] || {};
  const typingUserIds = Object.keys(currentTypingUsers).filter(userId => currentTypingUsers[userId]);

  useEffect(() => {
    if (selectedChat && token) {
      console.log('Fetching messages for conversation:', selectedChat);
      fetchMessages(selectedChat);
    }
  }, [selectedChat, token, fetchMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedChat || !currentUser) return;

    const success = await sendMessage(selectedChat, input.trim());
    if (success) {
      setInput("");
      // Mark messages as read when sending
      const lastMessage = messages[messages.length - 1];
      if (lastMessage) {
        markAsRead(selectedChat, lastMessage._id);
      }
    }
  };

  const getChatName = () => {
    // For now, return a default name since we don't have conversation metadata
    if (selectedChat.startsWith("user")) {
      return "Conversation privée";
    }
    return "Salle publique principale";
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Chat Header */}
      <div className="glass-panel border-b border-cyan-500/30 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-cyan-100 neon-glow-cyan">
              {getChatName()}
            </h2>
            <p className="text-xs text-cyan-300/70">
              {selectedChat.startsWith("user")
                ? "Conversation directe"
                : `${typingUserIds.length > 0 ? `${typingUserIds.length} en train d'écrire • ` : ''}Salle publique`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowVideoCall(true);
                toast.info('Ouverture de l\'appel vidéo...');
              }}
              className="p-2 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-400/50 rounded-lg transition-all active:scale-95 border border-green-500/30 group relative"
              title="Démarrer un appel vidéo"
            >
              <Phone className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Appel vidéo
              </span>
            </button>
            <button
              onClick={() => {
                setShowFileUpload(!showFileUpload);
                toast.info(showFileUpload ? 'Fermeture du partage de fichiers' : 'Ouverture du partage de fichiers');
              }}
              className="p-2 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg transition-all active:scale-95 border border-cyan-500/30 group relative"
              title="Voir les fichiers partagés"
            >
              <Paperclip className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Fichiers
              </span>
            </button>
            <button
              onClick={() => {
                toggleMuteConversation(selectedChat);
                const isMuted = notificationSettings.muteList.includes(selectedChat);
                toast.success(isMuted ? 'Notifications activées' : 'Notifications désactivées');
              }}
              className={`p-2 hover:shadow-lg rounded-lg transition-all active:scale-95 border group relative ${
                notificationSettings.muteList.includes(selectedChat)
                  ? 'bg-red-500/20 hover:bg-red-500/30 hover:shadow-red-400/50 border-red-500/30 text-red-400'
                  : 'hover:bg-cyan-500/20 hover:shadow-cyan-400/50 border-cyan-500/30 text-cyan-400'
              }`}
              title={notificationSettings.muteList.includes(selectedChat) ? 'Activer les notifications' : 'Désactiver les notifications'}
            >
              <span className="text-lg group-hover:scale-110 transition-transform inline-block">
                {notificationSettings.muteList.includes(selectedChat) ? '🔇' : '🔔'}
              </span>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {notificationSettings.muteList.includes(selectedChat) ? 'Activer son' : 'Couper son'}
              </span>
            </button>
            <button
              onClick={() => {
                setShowSearchModal(true);
                toast.info('Ouverture de la recherche...');
              }}
              className="p-2 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg transition-all active:scale-95 border border-cyan-500/30 group relative"
              title="Rechercher dans les messages"
            >
              <span className="text-lg group-hover:scale-110 transition-transform inline-block">🔍</span>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Rechercher
              </span>
            </button>
            <button
              onClick={() => {
                setShowAnalytics(true);
                toast.info('Ouverture des statistiques...');
              }}
              className="p-2 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg transition-all active:scale-95 border border-cyan-500/30 group relative"
              title="Voir les statistiques"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Statistiques
              </span>
            </button>

            <button
              onClick={() => {
                setShowExternalServices(true);
                toast.info('Ouverture des services externes...');
              }}
              className="p-2 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg transition-all active:scale-95 border border-cyan-500/30 group relative"
              title="Gérer les intégrations externes"
            >
              <Link className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Services externes
              </span>
            </button>

            <button
              onClick={() => {
                setShowScheduler(true);
                toast.info('Ouverture du programmateur...');
              }}
              className="p-2 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg transition-all active:scale-95 border border-cyan-500/30 group relative"
              title="Programmer des messages"
            >
              <Clock className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Programmer
              </span>
            </button>

            {!selectedChat.startsWith("user") && (
              <button
                onClick={() => {
                  setShowGroupManagement(true);
                  toast.info('Ouverture de la gestion du groupe...');
                }}
                className="p-2 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg transition-all active:scale-95 border border-cyan-500/30 group relative"
                title="Gérer les paramètres du groupe"
              >
                <Settings className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Gestion groupe
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-b from-slate-900/50 to-slate-800/50"
        onScroll={handleScroll}
      >
        {/* NEXOF SYNC ACTIVE Header */}
        <div className="flex items-center justify-center py-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300 mb-2 neon-text font-orbitron">
              NEXOF SYNC ACTIVE
            </div>
            <div className="text-xs text-cyan-400/70 font-rajdhani">
              Emotional Intelligence System Initialized
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-lg text-cyan-300/70 mb-2 neon-glow-cyan">
                Chargement des messages...
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-lg text-cyan-300/70 mb-2 neon-glow-cyan">
                Aucun message pour le moment
              </p>
              <p className="text-xs text-cyan-400/50">
                Dites quelque chose pour commencer ! 👋
              </p>
            </div>
          </div>
        ) : (
          <>
            {hasMoreMessages[selectedChat] && (
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-xs text-cyan-300">
                  <div className="w-3 h-3 border border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  Chargement des messages plus anciens...
                </div>
              </div>
            )}
            {messages.map((msg) => (
              <Message
                key={msg._id || msg.id}
                author={msg.senderId?.email || msg.author}
                content={msg.content}
                timestamp={msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) : msg.timestamp}
                isOwn={msg.isOwn || msg.senderId?._id === currentUser?._id}
                isAI={msg.isAI}
                readCount={msg.readBy?.length || msg.readCount}
                messageStatus={messageStatuses[msg._id] || msg.messageStatus || 'sent'}
                readBy={msg.readBy || []}
                reactions={msg.reactions}
                onReaction={(emoji) => {
                  if (currentUser && msg._id) {
                    addReaction(msg._id, emoji);
                  }
                }}
              />
            ))}
          </>
        )}

        {/* Typing Indicator */}
        {typingUserIds.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-cyan-400/70 px-4 py-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>{typingUserIds.length === 1 ? 'Quelqu\'un' : 'Plusieurs personnes'} écrivent...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-panel border-t border-cyan-500/30 p-4 shadow-lg">
        {/* Mode Toolbar */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          <button
            onClick={() => {
              toast.success('Mode Cool activé! 🔥');
              // Here you could implement actual mode switching logic
            }}
            className="flex-shrink-0 px-3 py-1 text-xs bg-cyan-500/20 border border-cyan-400/60 rounded-full text-cyan-300 hover:bg-cyan-500/30 hover:shadow-lg hover:shadow-cyan-400/60 transition-all active:scale-95 neon-border-cyan group relative"
            title="Activer le mode Cool pour un langage familier">
            🔥 Cool
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Mode Cool
            </span>
          </button>
          <button
            onClick={() => {
              toast.success('Mode Pro activé! 💼');
              // Here you could implement actual mode switching logic
            }}
            className="flex-shrink-0 px-3 py-1 text-xs bg-slate-700/80 border border-slate-600 rounded-full text-slate-300 hover:bg-slate-600/80 hover:border-cyan-400/60 transition-all active:scale-95 group relative"
            title="Activer le mode Professionnel pour un langage formel">
            💼 Pro
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Mode Pro
            </span>
          </button>
          <button
            onClick={() => {
              toast.success('Mode Drague activé! 😉');
              // Here you could implement actual mode switching logic
            }}
            className="flex-shrink-0 px-3 py-1 text-xs bg-slate-700/80 border border-slate-600 rounded-full text-slate-300 hover:bg-slate-600/80 hover:border-violet-400/60 transition-all active:scale-95 group relative"
            title="Activer le mode Romantique pour la drague">
            😉 Drague
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Mode Romantique
            </span>
          </button>
          <button
            onClick={() => {
              toast.success('Mode Normal activé! ⚡');
              // Here you could implement actual mode switching logic
            }}
            className="flex-shrink-0 px-3 py-1 text-xs bg-violet-500/20 border border-violet-400/60 rounded-full text-violet-300 hover:bg-violet-500/30 hover:shadow-lg hover:shadow-violet-400/60 transition-all active:scale-95 neon-border-violet group relative"
            title="Activer le mode Normal pour un langage naturel">
            ⚡ Normal
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Mode Normal
            </span>
          </button>
        </div>

        {/* File Upload Modal */}
        {showFileUpload && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 border border-cyan-500/30 rounded-lg p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-cyan-300">Partager un fichier</h3>
              <button
                onClick={() => setShowFileUpload(false)}
                className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
              >
                <X className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  fileInputRef.current?.click();
                  toast.info('Sélectionnez un document...');
                }}
                className="flex items-center gap-2 p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg transition-all group relative"
                title="Partager un document (PDF, Word, etc.)"
              >
                <File className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-cyan-300">Document</span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  PDF, Word, etc.
                </span>
              </button>
              <button
                onClick={() => {
                  fileInputRef.current?.click();
                  toast.info('Sélectionnez une image...');
                }}
                className="flex items-center gap-2 p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg transition-all group relative"
                title="Partager une image (JPG, PNG, GIF, etc.)"
              >
                <Image className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-cyan-300">Image</span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  JPG, PNG, GIF
                </span>
              </button>
              <button
                onClick={() => {
                  fileInputRef.current?.click();
                  toast.info('Sélectionnez une vidéo...');
                }}
                className="flex items-center gap-2 p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg transition-all group relative"
                title="Partager une vidéo (MP4, AVI, MOV, etc.)"
              >
                <Video className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-cyan-300">Vidéo</span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  MP4, AVI, MOV
                </span>
              </button>
              <button
                onClick={() => {
                  fileInputRef.current?.click();
                  toast.info('Sélectionnez un fichier audio...');
                }}
                className="flex items-center gap-2 p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg transition-all group relative"
                title="Partager un fichier audio (MP3, WAV, etc.)"
              >
                <Music className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-cyan-300">Audio</span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  MP3, WAV, etc.
                </span>
              </button>
            </div>

            {/* Upload Progress */}
            {Array.from(uploadingFiles.entries()).map(([fileId, file]) => (
              <div key={fileId} className="mb-2 p-2 bg-slate-700/30 rounded border border-slate-600">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-cyan-300 truncate">{file.name}</span>
                  <span className="text-xs text-cyan-400">{formatFileSize(file.size)}</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1">
                  <div
                    className="bg-cyan-400 h-1 rounded-full transition-all"
                    style={{ width: `${uploadProgress.get(fileId) || 0}%` }}
                  ></div>
                </div>
                <div className="text-xs text-cyan-400 mt-1">
                  {uploadProgress.get(fileId) === 100 ? 'Terminé' : `${uploadProgress.get(fileId) || 0}%`}
                </div>
              </div>
            ))}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.csv"
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleFileSelect(e.target.files, selectedChat);
                  setShowFileUpload(false);
                  e.target.value = '';
                }
              }}
              className="hidden"
            />
          </div>
        )}

        {/* Input Field */}
        <div className="flex gap-2 items-end">
          <button
            onClick={() => {
              setShowVoiceRecorder(!showVoiceRecorder);
              toast.info(showVoiceRecorder ? 'Enregistrement vocal annulé' : 'Enregistrement vocal démarré');
            }}
            className={`p-2 hover:shadow-lg rounded-lg transition-all active:scale-95 flex-shrink-0 border group relative ${
              showVoiceRecorder
                ? 'bg-red-500/20 hover:bg-red-500/30 hover:shadow-red-400/50 border-red-500/30 text-red-400'
                : 'hover:bg-cyan-500/20 hover:shadow-cyan-400/50 border-cyan-500/30 text-cyan-300'
            }`}
            title={showVoiceRecorder ? "Annuler l'enregistrement vocal" : "Enregistrer un message vocal"}
          >
            <Mic className="w-5 h-5 hover:text-cyan-200 transition-colors group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {showVoiceRecorder ? 'Arrêter' : 'Message vocal'}
            </span>
          </button>

          <button
            onClick={() => {
              setShowFileUpload(!showFileUpload);
              toast.info(showFileUpload ? 'Fermeture du partage de fichiers' : 'Ouverture du partage de fichiers');
            }}
            className="p-2 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg transition-all active:scale-95 flex-shrink-0 border border-cyan-500/30 group relative"
            title="Partager un fichier"
          >
            <Paperclip className="w-5 h-5 text-cyan-300 hover:text-cyan-200 transition-colors group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Partager fichier
            </span>
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Écris quelque chose..."
              className="w-full px-4 py-3 bg-slate-700/80 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 placeholder-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all shadow-lg"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                ref={emojiButtonRef}
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  toast.info(showEmojiPicker ? 'Fermeture du sélecteur d\'emoji' : 'Ouverture du sélecteur d\'emoji');
                }}
                className="p-1 hover:bg-cyan-500/20 rounded transition-all active:scale-95 group relative"
                title="Ajouter un emoji">
                <Smile className="w-4 h-4 text-cyan-300 hover:text-cyan-200 transition-colors group-hover:scale-110 transition-transform" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Emoji
                </span>
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 z-50">
                <EmojiPicker
                  isOpen={showEmojiPicker}
                  onClose={() => setShowEmojiPicker(false)}
                  onEmojiSelect={(emoji) => {
                    setInput(prev => prev + emoji);
                    setShowEmojiPicker(false);
                    toast.success('Emoji ajouté !');
                  }}
                  position="top"
                />
              </div>
            )}
          </div>

          <button
            onClick={() => {
              handleSendMessage();
              if (input.trim()) {
                toast.success('Message envoyé !');
              }
            }}
            className="p-2 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-400/60 rounded-lg transition-all active:scale-95 flex-shrink-0 text-cyan-300 border border-cyan-500/30 neon-border-cyan group relative"
            title="Envoyer le message"
          >
            <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Envoyer
            </span>
          </button>
        </div>

        {/* Mood Indicator */}
        <div className="flex items-center gap-2 mt-2 text-xs text-cyan-300/70">
          <div className="w-3 h-3 rounded-full bg-cyan-400 pulse-glow shadow-lg shadow-cyan-400/50"></div>
          <span>État: Calme</span>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        conversationId={selectedChat}
        currentUser={currentUser}
        token={token}
      />

      {/* Voice Recorder */}
      <VoiceRecorder
        isVisible={showVoiceRecorder}
        onRecordingComplete={handleVoiceRecordingComplete}
      />

      {/* Video Call Modal */}
      <VideoCallModal
        isOpen={showVideoCall}
        onClose={() => setShowVideoCall(false)}
        socket={null} // Socket will be handled by useVideoCall hook
        currentUser={currentUser}
        selectedChat={selectedChat}
        remoteUser={null} // Will be determined based on conversation type
      />

      {/* Group Management Modal */}
      <GroupManagementModal
        conversation={null} // Will be passed from chat context
        isOpen={showGroupManagement}
        onClose={() => setShowGroupManagement(false)}
        currentUser={currentUser}
      />

      {/* Chat Analytics Modal */}
      <ChatAnalyticsModal
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        conversationId={selectedChat}
        currentUser={currentUser}
        token={localStorage.getItem('token')}
      />

      {/* External Services Modal */}
      <ExternalServicesModal
        isOpen={showExternalServices}
        onClose={() => setShowExternalServices(false)}
        conversationId={selectedChat}
        currentUser={currentUser}
        token={localStorage.getItem('token')}
      />

      {/* Message Scheduler Modal */}
      <MessageSchedulerModal
        isOpen={showScheduler}
        onClose={() => setShowScheduler(false)}
        conversationId={selectedChat}
        currentUser={currentUser}
        token={localStorage.getItem('token')}
      />
    </div>
  );
}
