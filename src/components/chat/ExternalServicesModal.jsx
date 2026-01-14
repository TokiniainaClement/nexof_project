import { useState, useEffect } from 'react';
import { X, Link, MessageSquare, Calendar, FileText, Zap, Github, Slack, Trello, Mail, Cloud } from 'lucide-react';
import { toast } from 'sonner';

export function ExternalServicesModal({ isOpen, onClose, conversationId, currentUser, token }) {
  const [connectedServices, setConnectedServices] = useState({});
  const [loading, setLoading] = useState(false);

  const availableServices = [
    {
      id: 'slack',
      name: 'Slack',
      icon: Slack,
      color: '#4A154B',
      description: 'Intégrer les messages Slack dans vos conversations',
      features: ['Messages synchronisés', 'Notifications temps réel', 'Canaux partagés']
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      color: '#181717',
      description: 'Recevoir les notifications GitHub et commits',
      features: ['Commits', 'Issues', 'Pull requests', 'Releases']
    },
    {
      id: 'trello',
      name: 'Trello',
      icon: Trello,
      color: '#0079BF',
      description: 'Synchroniser les cartes Trello et mises à jour',
      features: ['Nouvelles cartes', 'Mises à jour', 'Échéances', 'Commentaires']
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      icon: Calendar,
      color: '#4285F4',
      description: 'Recevoir les rappels de calendrier et événements',
      features: ['Rappels d\'événements', 'Réunions', 'Échéances', 'Invitations']
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: Mail,
      color: '#EA4335',
      description: 'Notifications d\'emails importants',
      features: ['Emails prioritaires', 'Rappels', 'Invitations', 'Alertes']
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      icon: Cloud,
      color: '#34A853',
      description: 'Partage de fichiers depuis Google Drive',
      features: ['Partage de fichiers', 'Synchronisation', 'Versions', 'Commentaires']
    },
    {
      id: 'discord',
      name: 'Discord',
      icon: MessageSquare,
      color: '#5865F2',
      description: 'Intégration avec les serveurs Discord',
      features: ['Messages', 'Événements', 'Rôles', 'Canaux']
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: FileText,
      color: '#000000',
      description: 'Synchronisation avec les bases de données Notion',
      features: ['Pages mises à jour', 'Bases de données', 'Commentaires', 'Mentions']
    }
  ];

  useEffect(() => {
    if (isOpen) {
      loadConnectedServices();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadConnectedServices = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/integrations/status/${conversationId}`, {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setConnectedServices(data);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const toggleService = async (serviceId) => {
    setLoading(true);
    try {
      const isConnected = connectedServices[serviceId];
      const endpoint = isConnected ? 'disconnect' : 'connect';
      const method = isConnected ? 'DELETE' : 'POST';

      const response = await fetch(`http://localhost:5000/api/integrations/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          serviceId,
          conversationId
        })
      });

      if (response.ok) {
        await response.json();
        setConnectedServices(prev => ({
          ...prev,
          [serviceId]: !isConnected
        }));

        toast.success(`${isConnected ? 'Déconnecté' : 'Connecté'} à ${availableServices.find(s => s.id === serviceId)?.name}`);
      } else {
        throw new Error('Failed to toggle service');
      }
    } catch (error) {
      console.error('Error toggling service:', error);
      toast.error('Erreur lors de la connexion au service');
    } finally {
      setLoading(false);
    }
  };

  const getServiceStatus = (serviceId) => {
    return connectedServices[serviceId] || false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-cyan-500/30 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <Link className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-cyan-100">Services externes</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-cyan-100 mb-2">Intégrations disponibles</h3>
            <p className="text-sm text-cyan-300/70">
              Connectez vos services externes pour recevoir des notifications et synchroniser du contenu directement dans vos conversations.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableServices.map((service) => {
              const Icon = service.icon;
              const isConnected = getServiceStatus(service.id);

              return (
                <div
                  key={service.id}
                  className={`relative p-4 rounded-lg border transition-all ${
                    isConnected
                      ? 'bg-cyan-500/10 border-cyan-400/50 shadow-lg shadow-cyan-400/20'
                      : 'bg-slate-700/50 border-slate-600/50 hover:border-cyan-400/30'
                  }`}
                >
                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: service.color }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-cyan-100">{service.name}</h4>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          isConnected
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-slate-600/50 text-slate-400'
                        }`}>
                          {isConnected ? 'Connecté' : 'Non connecté'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleService(service.id)}
                      disabled={loading}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                        isConnected
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50'
                          : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/50'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? '...' : (isConnected ? 'Déconnecter' : 'Connecter')}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-cyan-300/70 mb-3">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-1">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-cyan-400/70">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Connection Status Indicator */}
                  {isConnected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Integration Settings */}
          <div className="mt-8 p-4 bg-slate-700/30 border border-cyan-500/20 rounded-lg">
            <h4 className="font-medium text-cyan-100 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Paramètres d'intégration
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-300">Notifications automatiques</p>
                  <p className="text-xs text-cyan-400/70">Recevoir des notifications pour les nouveaux événements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-300">Synchronisation bidirectionnelle</p>
                  <p className="text-xs text-cyan-400/70">Synchroniser les modifications dans les deux sens</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-300">Filtrage intelligent</p>
                  <p className="text-xs text-cyan-400/70">Ne recevoir que les notifications pertinentes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="mt-6 p-4 bg-slate-700/30 border border-violet-500/20 rounded-lg">
            <h4 className="font-medium text-violet-100 mb-3">Configuration Webhook</h4>
            <p className="text-sm text-violet-300/70 mb-3">
              Configurez des webhooks personnalisés pour recevoir des notifications depuis vos propres services.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-violet-300 mb-1">URL du webhook</label>
                <input
                  type="url"
                  placeholder="https://your-service.com/webhook"
                  className="w-full px-3 py-2 bg-slate-600/50 border border-violet-500/30 rounded-lg text-sm text-violet-100 placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
                />
              </div>

              <div>
                <label className="block text-sm text-violet-300 mb-1">Secret du webhook</label>
                <input
                  type="password"
                  placeholder="webhook-secret-key"
                  className="w-full px-3 py-2 bg-slate-600/50 border border-violet-500/30 rounded-lg text-sm text-violet-100 placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
                />
              </div>

              <button className="px-4 py-2 bg-violet-500/20 text-violet-300 border border-violet-500/50 rounded-lg hover:bg-violet-500/30 transition-colors text-sm font-medium">
                Enregistrer le webhook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}