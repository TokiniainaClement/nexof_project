import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Volume2 } from 'lucide-react';

export function VoiceMessage({ audioUrl, duration, fileSize, sender, timestamp, isOwn }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(duration || 0);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsLoading(false);
      console.error('Error loading audio');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * audioDuration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const downloadAudio = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `voice-message-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progressPercentage = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border max-w-xs ${
      isOwn
        ? 'bg-cyan-500/20 border-cyan-400/60 ml-auto'
        : 'bg-slate-700/80 border-slate-600/50'
    }`}>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayback}
        disabled={isLoading}
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isOwn
            ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
            : 'bg-slate-600 hover:bg-slate-500 text-cyan-300'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>

      {/* Audio Visualization & Progress */}
      <div className="flex-1 min-w-0">
        {/* Waveform Visualization */}
        <div className="flex items-center gap-0.5 mb-2">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isOwn ? 'bg-cyan-400' : 'bg-slate-400'
              }`}
              style={{
                height: `${Math.random() * 20 + 5}px`,
                opacity: i < (progressPercentage / 100) * 20 ? 1 : 0.3
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-1 bg-slate-600 rounded-full cursor-pointer relative mb-1"
        >
          <div
            className={`h-full rounded-full transition-all ${
              isOwn ? 'bg-cyan-400' : 'bg-slate-400'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Time and Controls */}
        <div className="flex items-center justify-between text-xs">
          <span className={isOwn ? 'text-cyan-300' : 'text-slate-300'}>
            {formatTime(currentTime)} / {formatTime(audioDuration)}
          </span>

          <div className="flex items-center gap-2">
            {fileSize && (
              <span className="text-slate-400">
                {formatFileSize(fileSize)}
              </span>
            )}

            <button
              onClick={downloadAudio}
              className={`p-1 rounded transition-colors ${
                isOwn
                  ? 'hover:bg-cyan-500/20 text-cyan-300'
                  : 'hover:bg-slate-600/50 text-slate-400'
              }`}
              title="Télécharger"
            >
              <Download className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      />
    </div>
  );
}