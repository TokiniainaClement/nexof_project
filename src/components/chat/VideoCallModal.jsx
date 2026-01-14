import { useEffect, useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, X } from 'lucide-react';
import useVideoCall from '../../hooks/useVideoCall';
import { toast } from 'sonner';

export function VideoCallModal({ isOpen, onClose, socket, currentUser, selectedChat, remoteUser }) {
  const {
    isInCall,
    callStatus,
    callDuration,
    isMuted,
    isVideoOff,
    incomingCall,
    localVideoRef,
    remoteVideoRef,
    startCall,
    answerCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleVideo,
    formatDuration
  } = useVideoCall(socket, currentUser, selectedChat);

  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (showControls && isInCall) {
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls, isInCall]);

  // Handle mouse movement to show controls
  const handleMouseMove = () => {
    setShowControls(true);
  };

  // Handle call start
  const handleStartCall = () => {
    if (remoteUser) {
      startCall(remoteUser._id);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (isInCall) {
      endCall();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-full transition-all"
      >
        <X className="w-5 h-5 text-red-400" />
      </button>

      {/* Video container */}
      <div
        className="relative w-full h-full max-w-6xl max-h-screen bg-slate-900"
        onMouseMove={handleMouseMove}
      >
        {/* Remote video (main) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Local video (picture-in-picture) */}
        {isInCall && (
          <div className="absolute top-4 right-4 w-48 h-36 bg-slate-800 border-2 border-cyan-400 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {isVideoOff && (
              <div className="absolute inset-0 bg-slate-700 flex items-center justify-center">
                <VideoOff className="w-8 h-8 text-cyan-400" />
              </div>
            )}
          </div>
        )}

        {/* Call status overlay */}
        {!isInCall && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {remoteUser?.displayName?.[0] || remoteUser?.email?.[0] || '?'}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {remoteUser?.displayName || remoteUser?.email || 'Utilisateur'}
              </h3>
              <p className="text-cyan-300">
                {callStatus === 'calling' && 'Appel en cours...'}
                {callStatus === 'ringing' && 'Appel entrant...'}
                {callStatus === 'connecting' && 'Connexion...'}
              </p>
            </div>
          </div>
        )}

        {/* Call duration */}
        {isInCall && callStatus === 'connected' && (
          <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-mono">{formatDuration(callDuration)}</span>
          </div>
        )}

        {/* Incoming call controls */}
        {incomingCall && !isInCall && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button
              onClick={rejectCall}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-red-500/50"
            >
              <PhoneOff className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={answerCall}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-green-500/50"
            >
              <Phone className="w-8 h-8 text-white" />
            </button>
          </div>
        )}

        {/* In-call controls */}
        {isInCall && showControls && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 bg-black/50 px-6 py-3 rounded-full backdrop-blur-sm">
            <button
              onClick={toggleMute}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                isMuted
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50'
                  : 'bg-slate-600 hover:bg-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                isVideoOff
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50'
                  : 'bg-slate-600 hover:bg-slate-700'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
            </button>

            <button
              onClick={endCall}
              className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-red-500/50"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Connection status indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            callStatus === 'connected'
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : callStatus === 'connecting'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
              : 'bg-slate-500/20 text-slate-400 border border-slate-500/50'
          }`}>
            {callStatus === 'connected' && 'Connecté'}
            {callStatus === 'connecting' && 'Connexion...'}
            {callStatus === 'calling' && 'Appel...'}
            {callStatus === 'ringing' && 'Sonnerie...'}
          </div>
        </div>
      </div>
    </div>
  );
}