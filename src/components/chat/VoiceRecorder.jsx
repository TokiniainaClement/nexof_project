import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

export function VoiceRecorder({ onRecordingComplete, isVisible }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const MAX_RECORDING_TIME = 300; // 5 minutes max

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Erreur lors de l\'accès au microphone');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const sendRecording = () => {
    if (audioBlob && onRecordingComplete) {
      onRecordingComplete(audioBlob, recordingTime);
      resetRecording();
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
    setIsPlaying(false);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 border border-cyan-500/30 rounded-lg p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-cyan-300">Enregistrement vocal</h3>
        <button
          onClick={resetRecording}
          className="p-1 hover:bg-red-500/20 rounded transition-colors"
        >
          <Square className="w-4 h-4 text-red-400" />
        </button>
      </div>

      {/* Recording Controls */}
      <div className="flex items-center gap-3 mb-3">
        {!audioBlob ? (
          // Recording state
          <>
            <button
              onClick={isRecording ? (isPaused ? resumeRecording : pauseRecording) : startRecording}
              className={`p-3 rounded-full transition-all ${
                isRecording && !isPaused
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-cyan-500 hover:bg-cyan-600'
              }`}
            >
              {isRecording && !isPaused ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </button>

            <div className="flex-1">
              <div className="text-sm text-cyan-300 mb-1">
                {isRecording ? (isPaused ? 'En pause' : 'Enregistrement...') : 'Prêt à enregistrer'}
              </div>
              <div className="text-xs text-cyan-400">
                {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
              </div>
            </div>

            {isRecording && (
              <button
                onClick={stopRecording}
                className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                <Square className="w-4 h-4 text-white" />
              </button>
            )}
          </>
        ) : (
          // Playback state
          <>
            <button
              onClick={isPlaying ? pausePlayback : playRecording}
              className="p-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>

            <div className="flex-1">
              <div className="text-sm text-cyan-300 mb-1">Aperçu de l'enregistrement</div>
              <div className="text-xs text-cyan-400">
                Durée: {formatTime(recordingTime)}
              </div>
            </div>

            <button
              onClick={sendRecording}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Envoyer
            </button>
          </>
        )}
      </div>

      {/* Recording Progress Bar */}
      {isRecording && (
        <div className="w-full bg-slate-600 rounded-full h-2 mb-3">
          <div
            className="bg-cyan-400 h-2 rounded-full transition-all"
            style={{ width: `${(recordingTime / MAX_RECORDING_TIME) * 100}%` }}
          />
        </div>
      )}

      {/* Hidden Audio Element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Instructions */}
      <div className="text-xs text-cyan-400/70">
        {!audioBlob ? (
          isRecording ? (
            isPaused ? 'Cliquez sur le micro pour reprendre' : 'Cliquez sur le carré pour arrêter'
          ) : (
            'Cliquez sur le micro pour commencer l\'enregistrement'
          )
        ) : (
          'Écoutez votre enregistrement et cliquez sur "Envoyer"'
        )}
      </div>
    </div>
  );
}