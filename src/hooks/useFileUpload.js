import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const useFileUpload = (onFileUploaded) => {
  const [uploadingFiles, setUploadingFiles] = useState(new Map());
  const [uploadProgress, setUploadProgress] = useState(new Map());

  // File type validation
  const validateFile = useCallback((file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = {
      image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
      document: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'text/csv'
      ],
      video: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'],
      audio: ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg']
    };

    if (file.size > maxSize) {
      throw new Error('File size exceeds 50MB limit');
    }

    const isAllowed = Object.values(allowedTypes).flat().includes(file.type);
    if (!isAllowed) {
      throw new Error('File type not supported');
    }

    return true;
  }, []);

  // Get file type category
  const getFileCategory = useCallback((file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return 'document';
  }, []);

  // Format file size
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Upload file to server (mock implementation)
  const uploadFile = useCallback(async (file, conversationId) => {
    try {
      validateFile(file);

      const fileId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      setUploadingFiles(prev => new Map(prev.set(fileId, file)));
      setUploadProgress(prev => new Map(prev.set(fileId, 0)));

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev.get(fileId) || 0;
          const newProgress = Math.min(currentProgress + Math.random() * 20, 95);
          const newMap = new Map(prev);
          newMap.set(fileId, newProgress);
          return newMap;
        });
      }, 200);

      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          clearInterval(progressInterval);

          try {
            // Use mock file service
            const { MockFileService } = await import('../services/mockData');
            const result = await MockFileService.uploadFile(file, conversationId);

            setUploadingFiles(prev => {
              const newMap = new Map(prev);
              newMap.delete(fileId);
              return newMap;
            });
            setUploadProgress(prev => {
              const newMap = new Map(prev);
              newMap.delete(fileId);
              return newMap;
            });

            if (onFileUploaded) {
              onFileUploaded(result);
            }

            resolve({ file: result });
          } catch (error) {
            reject(new Error('Upload failed'));
          }
        }, 2000); // Simulate 2 second upload
      });

    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, [validateFile, getFileCategory, onFileUploaded]);

  // Handle file selection from input
  const handleFileSelect = useCallback(async (files, conversationId) => {
    const uploadPromises = Array.from(files).map(file => uploadFile(file, conversationId));

    try {
      const results = await Promise.allSettled(uploadPromises);
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;

      if (successful > 0) {
        toast.success(`${successful} file(s) uploaded successfully`);
      }

      if (failed > 0) {
        toast.error(`${failed} file(s) failed to upload`);
      }

      return results;
    } catch (error) {
      toast.error('Upload process failed');
      return [];
    }
  }, [uploadFile]);

  // Cancel upload
  const cancelUpload = useCallback((fileId) => {
    // In a real implementation, you'd cancel the XHR request
    setUploadingFiles(prev => {
      const newMap = new Map(prev);
      newMap.delete(fileId);
      return newMap;
    });
    setUploadProgress(prev => {
      const newMap = new Map(prev);
      newMap.delete(fileId);
      return newMap;
    });
    toast.info('Upload cancelled');
  }, []);

  return {
    uploadingFiles,
    uploadProgress,
    uploadFile,
    handleFileSelect,
    cancelUpload,
    validateFile,
    getFileCategory,
    formatFileSize
  };
};

export default useFileUpload;