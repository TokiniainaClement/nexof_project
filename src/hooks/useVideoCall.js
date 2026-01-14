import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';

const useVideoCall = (socket, currentUser, selectedChat) => {
  const [isInCall, setIsInCall] = useState(false);
  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, ringing, connected, ended
  const [remoteUser, setRemoteUser] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const callTimerRef = useRef(null);

  // WebRTC configuration
  const rtcConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  // Initialize WebRTC peer connection
  const createPeerConnection = useCallback(async () => {
    const pc = new RTCPeerConnection(rtcConfiguration);

    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit('ice_candidate', {
          candidate: event.candidate,
          to: remoteUser?._id,
          conversationId: selectedChat
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') {
        setCallStatus('connected');
        startCallTimer();
        toast.success('Appel connecté !');
      } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        endCall();
      }
    };

    return pc;
  }, [socket, remoteUser, selectedChat]);

  // Get user media (camera and microphone)
  const getUserMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: !isVideoOff,
        audio: !isMuted
      });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast.error('Impossible d\'accéder à la caméra ou au microphone');
      throw error;
    }
  }, [isMuted, isVideoOff]);

  // Start call timer
  const startCallTimer = useCallback(() => {
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  }, []);

  // Format call duration
  const formatDuration = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Start outgoing call
  const startCall = useCallback(async (targetUserId) => {
    try {
      setCallStatus('calling');
      setRemoteUser({ _id: targetUserId });
      setIsInCall(true);

      const pc = await createPeerConnection();
      peerConnectionRef.current = pc;

      const stream = await getUserMedia();

      // Add tracks to peer connection
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send call request via socket
      socket.emit('start_call', {
        to: targetUserId,
        conversationId: selectedChat,
        offer: offer
      });

      toast.success('Appel en cours...');

    } catch (error) {
      console.error('Error starting call:', error);
      endCall();
      toast.error('Impossible de démarrer l\'appel');
    }
  }, [createPeerConnection, getUserMedia, socket, selectedChat]);

  // Answer incoming call
  const answerCall = useCallback(async () => {
    if (!incomingCall) return;

    try {
      setCallStatus('connecting');
      setRemoteUser(incomingCall.from);
      setIsInCall(true);

      const pc = await createPeerConnection();
      peerConnectionRef.current = pc;

      const stream = await getUserMedia();

      // Add tracks to peer connection
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      // Set remote description
      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));

      // Create answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer via socket
      socket.emit('answer_call', {
        to: incomingCall.from._id,
        conversationId: selectedChat,
        answer: answer
      });

      setIncomingCall(null);

    } catch (error) {
      console.error('Error answering call:', error);
      endCall();
      toast.error('Impossible de répondre à l\'appel');
    }
  }, [incomingCall, createPeerConnection, getUserMedia, socket, selectedChat]);

  // Reject incoming call
  const rejectCall = useCallback(() => {
    if (incomingCall) {
      socket.emit('reject_call', {
        to: incomingCall.from._id,
        conversationId: selectedChat
      });
      setIncomingCall(null);
      toast.info('Appel rejeté');
    }
  }, [incomingCall, socket, selectedChat]);

  // End call
  const endCall = useCallback(() => {
    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Clear video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    // Clear timer
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }

    // Reset state
    setIsInCall(false);
    setCallStatus('idle');
    setRemoteUser(null);
    setCallDuration(0);
    setIncomingCall(null);

    toast.info('Appel terminé');
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
        toast.info(isMuted ? 'Microphone activé' : 'Microphone coupé');
      }
    }
  }, [isMuted]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isVideoOff;
        setIsVideoOff(!isVideoOff);
        toast.info(isVideoOff ? 'Caméra activée' : 'Caméra coupée');
      }
    }
  }, [isVideoOff]);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleIncomingCall = (data) => {
      setIncomingCall(data);
      setCallStatus('ringing');
      toast.success(`Appel entrant de ${data.from.displayName || data.from.email}`, {
        duration: 10000,
        action: {
          label: 'Répondre',
          onClick: () => answerCall()
        }
      });
    };

    const handleCallAnswered = async (data) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    };

    const handleCallRejected = () => {
      endCall();
      toast.info('Appel rejeté par l\'interlocuteur');
    };

    const handleCallEnded = () => {
      endCall();
    };

    const handleIceCandidate = async (data) => {
      if (peerConnectionRef.current && data.candidate) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (error) {
          console.error('Error adding ICE candidate:', error);
        }
      }
    };

    socket.on('incoming_call', handleIncomingCall);
    socket.on('call_answered', handleCallAnswered);
    socket.on('call_rejected', handleCallRejected);
    socket.on('call_ended', handleCallEnded);
    socket.on('ice_candidate', handleIceCandidate);

    return () => {
      socket.off('incoming_call', handleIncomingCall);
      socket.off('call_answered', handleCallAnswered);
      socket.off('call_rejected', handleCallRejected);
      socket.off('call_ended', handleCallEnded);
      socket.off('ice_candidate', handleIceCandidate);
    };
  }, [socket, answerCall, endCall]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endCall();
    };
  }, [endCall]);

  return {
    // State
    isInCall,
    callStatus,
    remoteUser,
    callDuration,
    isMuted,
    isVideoOff,
    incomingCall,

    // Refs
    localVideoRef,
    remoteVideoRef,

    // Actions
    startCall,
    answerCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleVideo,

    // Utils
    formatDuration
  };
};

export default useVideoCall;