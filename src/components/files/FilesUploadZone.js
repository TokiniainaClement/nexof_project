import { useState } from "react";
import { Upload, File, Image, Video, Music, X, Check } from "lucide-react";
import { toast } from "sonner";

export function FilesUploadZone({ onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }

  function handleFileSelect(e) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  }

  function handleFiles(files) {
    if (files.length > 0) {
      setUploadedFiles(files);
      onFilesSelected?.(files);
      toast.success(`${files.length} fichier(s) sélectionné(s) pour l'upload !`);
    }
  }

  function removeFile(index) {
    const newFiles = uploadedFiles.filter(function(_, i) { return i !== index; });
    setUploadedFiles(newFiles);
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function getFileIcon(file) {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('audio/')) return Music;
    return File;
  }

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass-panel border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all cursor-pointer group ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-400/30 neon-border-cyan'
            : 'border-cyan-500/50 bg-card/50 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-md hover:shadow-cyan-400/20'
        }`}
      >
        <input
          type="file"
          id="file-input"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <label htmlFor="file-input" className="cursor-pointer block">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-lg border transition-all group-hover:scale-110 ${
              isDragging
                ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-400/50'
                : 'bg-muted border-border group-hover:border-cyan-400/50'
            }`}>
              <Upload className={`w-8 h-8 transition-all ${
                isDragging ? 'text-cyan-400 animate-pulse' : 'text-cyan-300 group-hover:text-cyan-400'
              }`} />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-cyan-100 mb-2 neon-glow-cyan">
            {isDragging ? 'Déposez vos fichiers ici !' : 'Déposez vos fichiers ici'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            ou cliquez pour en sélectionner
          </p>

          <button
            type="button"
            onClick={() => document.getElementById('file-input')?.click()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyan-400 text-background text-sm font-medium rounded-lg hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-400/50 transition-all active:scale-95 group relative"
          >
            <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Parcourir mes fichiers
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Sélectionner des fichiers
            </span>
          </button>

          <p className="text-xs text-muted-foreground mt-4">
            Formats acceptés: Images, Vidéos, Audio, Documents (max 100MB)
          </p>
        </label>
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="glass-panel border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Fichiers sélectionnés ({uploadedFiles.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uploadedFiles.map((file, index) => {
              const FileIcon = getFileIcon(file);
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg group hover:bg-muted transition-colors"
                >
                  <div className="p-1 rounded bg-cyan-500/20">
                    <FileIcon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                    title="Retirer ce fichier"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                onFilesSelected?.(uploadedFiles);
                toast.success('Upload démarré !');
              }}
              className="flex-1 px-3 py-2 bg-cyan-400 text-background text-sm font-medium rounded-lg hover:bg-cyan-500 transition-colors"
            >
              Commencer l'upload
            </button>
            <button
              onClick={() => setUploadedFiles([])}
              className="px-3 py-2 bg-muted hover:bg-muted/80 text-sm rounded-lg transition-colors"
            >
              Vider
            </button>
          </div>
        </div>
      )}
    </div>
  );
}