import { useState, useEffect } from 'react';
import settingsService from '../services/settingsService';

// Hook for general settings
export const useGeneralSettings = () => {
  const [settings, setSettings] = useState({
    autoSync: true,
    notifications: true,
    advancedMode: false,
    lowPowerMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getGeneralSettings();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const result = await settingsService.updateGeneralSettings(newSettings);
      setSettings(result.data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { settings, setSettings, updateSettings, loading, error };
};

// Hook for modules status
export const useModulesStatus = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const data = await settingsService.getModulesStatus();
        setModules(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, []);

  return { modules, loading, error };
};

// Hook for AI clone status
export const useAICloneStatus = () => {
  const [status, setStatus] = useState({
    syncProgress: 0,
    isActive: false,
    lastTraining: null,
    neuralConnections: 0,
    cloneAccuracy: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const data = await settingsService.getAICloneStatus();
        setStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, []);

  const startSync = async () => {
    try {
      const result = await settingsService.startCloneSync();
      // Refresh status after starting sync
      const updatedStatus = await settingsService.getAICloneStatus();
      setStatus(updatedStatus);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { status, startSync, loading, error };
};

// Hook for security settings
export const useSecuritySettings = () => {
  const [settings, setSettings] = useState({
    encryptionProtocol: '',
    aiProtection: false,
    biometricAuth: false,
    globalPermissions: 'read',
    twoFactorEnabled: false
  });
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSecurityData = async () => {
      try {
        const [settingsData, logData] = await Promise.all([
          settingsService.getSecuritySettings(),
          settingsService.getActivityLog()
        ]);
        setSettings(settingsData);
        setActivityLog(logData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSecurityData();
  }, []);

  return { settings, activityLog, loading, error };
};

// Hook for network metrics
export const useNetworkMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpuSync: '0%',
    neuralFlow: '0%',
    latency: '0ms',
    bandwidth: '0 Mbps',
    connections: 0
  });
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNetworkData = async () => {
      try {
        const [metricsData, connectionsData] = await Promise.all([
          settingsService.getNetworkMetrics(),
          settingsService.getConnectionStatus()
        ]);
        setMetrics(metricsData);
        setConnections(connectionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNetworkData();
  }, []);

  return { metrics, connections, loading, error };
};

// Hook for theme settings
export const useThemeSettings = () => {
  const [settings, setSettings] = useState({
    mode: 'dark',
    brightness: 70,
    glowIntensity: 70,
    accentColor: '#00c8ff',
    fontSize: 'medium'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getThemeSettings();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const result = await settingsService.updateThemeSettings(newSettings);
      setSettings(result.data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { settings, setSettings, updateSettings, loading, error };
};

// Hook for backup operations
export const useBackupOperations = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await settingsService.getBackupHistory();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const createBackup = async (type = 'full') => {
    try {
      const result = await settingsService.createBackup(type);
      // Refresh history after creating backup
      const updatedHistory = await settingsService.getBackupHistory();
      setHistory(updatedHistory);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const restoreBackup = async (backupId) => {
    try {
      const result = await settingsService.restoreBackup(backupId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { history, createBackup, restoreBackup, loading, error };
};

// Hook for system info
export const useSystemInfo = () => {
  const [info, setInfo] = useState({
    nexofCoreVersion: '',
    databaseStatus: '',
    uptime: '',
    apiCallsToday: 0,
    memoryUsage: '',
    cpuUsage: '',
    activeConnections: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await settingsService.getSystemInfo();
        setInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, []);

  const recalibrateCore = async () => {
    try {
      const result = await settingsService.recalibrateCore();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const rebuildAICache = async () => {
    try {
      const result = await settingsService.rebuildAICache();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { info, recalibrateCore, rebuildAICache, loading, error };
};

// Hook for profile settings
export const useProfileSettings = () => {
  const [settings, setSettings] = useState({
    username: '',
    email: '',
    displayName: '',
    avatar: null,
    bio: '',
    timezone: '',
    language: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getProfileSettings();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const result = await settingsService.updateProfileSettings(newSettings);
      setSettings(result.data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { settings, setSettings, updateSettings, loading, error };
};

// Hook for notification settings
export const useNotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    systemAlerts: true,
    aiSuggestions: false,
    securityAlerts: true,
    marketingEmails: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getNotificationSettings();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const result = await settingsService.updateNotificationSettings(newSettings);
      setSettings(result.data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { settings, setSettings, updateSettings, loading, error };
};

// Hook for privacy settings
export const usePrivacySettings = () => {
  const [settings, setSettings] = useState({
    dataCollection: 'minimal',
    analyticsSharing: false,
    thirdPartyAccess: false,
    dataRetention: '1year',
    cookieConsent: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getPrivacySettings();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const result = await settingsService.updatePrivacySettings(newSettings);
      setSettings(result.data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { settings, setSettings, updateSettings, loading, error };
};

// Hook for AI settings
export const useAISettings = () => {
  const [settings, setSettings] = useState({
    faceRecognition: true,
    emotionDetection: true,
    ageGenderEstimation: false,
    cameraPermission: true,
    dataUsage: 'essential',
    sensitivity: 'medium',
    recommendations: true,
    personalization: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getAISettings();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const result = await settingsService.updateAISettings(newSettings);
      setSettings(result.data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { settings, setSettings, updateSettings, loading, error };
};

// Hook for language settings
export const useLanguageSettings = () => {
  const [settings, setSettings] = useState({
    interfaceLanguage: 'fr',
    voiceLanguage: 'fr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'fr-FR'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getLanguageSettings();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const result = await settingsService.updateLanguageSettings(newSettings);
      setSettings(result.data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { settings, setSettings, updateSettings, loading, error };
};

// Hook for data export
export const useDataExport = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await settingsService.getExportHistory();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const exportData = async (format = 'json') => {
    try {
      const result = await settingsService.exportData(format);
      // Refresh history after export
      const updatedHistory = await settingsService.getExportHistory();
      setHistory(updatedHistory);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { history, exportData, loading, error };
};