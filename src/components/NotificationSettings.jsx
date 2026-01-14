import { useState } from 'react';
import { Bell, Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';

export function NotificationSettings({ settings, onUpdate }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const updateSetting = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onUpdate(newSettings);
  };

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Bell className="w-5 h-5 text-cyan-400" />
        Paramètres de notifications
      </h3>

      {/* General Settings */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Général
        </h4>

        <div className="space-y-3">
          {/* Enable Notifications */}
          <label className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-cyan-400/50 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-foreground">Notifications activées</p>
                <p className="text-xs text-muted-foreground">Recevoir des notifications push</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={localSettings.enabled}
              onChange={(e) => updateSetting('enabled', e.target.checked)}
              className="w-4 h-4 rounded border-cyan-400 bg-card cursor-pointer"
            />
          </label>

          {/* Sound Notifications */}
          <label className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-cyan-400/50 transition-colors">
            <div className="flex items-center gap-3">
              {localSettings.sound ? (
                <Volume2 className="w-5 h-5 text-green-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">Sons de notification</p>
                <p className="text-xs text-muted-foreground">Jouer un son pour les nouveaux messages</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={localSettings.sound}
              onChange={(e) => updateSetting('sound', e.target.checked)}
              className="w-4 h-4 rounded border-cyan-400 bg-card cursor-pointer"
            />
          </label>

          {/* Desktop Notifications */}
          <label className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-cyan-400/50 transition-colors">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-violet-400" />
              <div>
                <p className="text-sm font-medium text-foreground">Notifications desktop</p>
                <p className="text-xs text-muted-foreground">Afficher les notifications sur le bureau</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={localSettings.desktop}
              onChange={(e) => updateSetting('desktop', e.target.checked)}
              className="w-4 h-4 rounded border-cyan-400 bg-card cursor-pointer"
            />
          </label>

          {/* Mobile Notifications */}
          <label className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-cyan-400/50 transition-colors">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-foreground">Notifications mobile</p>
                <p className="text-xs text-muted-foreground">Recevoir des notifications sur mobile</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={localSettings.mobile}
              onChange={(e) => updateSetting('mobile', e.target.checked)}
              className="w-4 h-4 rounded border-cyan-400 bg-card cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Message Types */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Types de messages
        </h4>

        <div className="space-y-3">
          {[
            { key: 'messages', label: 'Messages', desc: 'Nouveaux messages texte' },
            { key: 'mentions', label: 'Mentions', desc: 'Quand quelqu\'un vous mentionne' },
            { key: 'reactions', label: 'Réactions', desc: 'Nouvelles réactions à vos messages' },
            { key: 'files', label: 'Fichiers', desc: 'Nouveaux fichiers partagés' },
            { key: 'calls', label: 'Appels', desc: 'Appels entrants' }
          ].map(({ key, label, desc }) => (
            <label key={key} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-cyan-400/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings[key]}
                onChange={(e) => updateSetting(key, e.target.checked)}
                className="w-4 h-4 rounded border-cyan-400 bg-card cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Heures calmes
        </h4>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-cyan-400/50 transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">Activer les heures calmes</p>
              <p className="text-xs text-muted-foreground">Pas de notifications pendant certaines heures</p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.quietHours?.enabled}
              onChange={(e) => updateSetting('quietHours', {
                ...localSettings.quietHours,
                enabled: e.target.checked
              })}
              className="w-4 h-4 rounded border-cyan-400 bg-card cursor-pointer"
            />
          </label>

          {localSettings.quietHours?.enabled && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-card border border-border rounded-lg">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Début</label>
                <input
                  type="time"
                  value={localSettings.quietHours.start || '22:00'}
                  onChange={(e) => updateSetting('quietHours', {
                    ...localSettings.quietHours,
                    start: e.target.value
                  })}
                  className="w-full px-2 py-1 bg-background border border-border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Fin</label>
                <input
                  type="time"
                  value={localSettings.quietHours.end || '08:00'}
                  onChange={(e) => updateSetting('quietHours', {
                    ...localSettings.quietHours,
                    end: e.target.value
                  })}
                  className="w-full px-2 py-1 bg-background border border-border rounded text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">Aperçu des notifications</h4>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Messages: {localSettings.messages ? 'Activé' : 'Désactivé'}</p>
          <p>• Sons: {localSettings.sound ? 'Activé' : 'Désactivé'}</p>
          <p>• Desktop: {localSettings.desktop ? 'Activé' : 'Désactivé'}</p>
          <p>• Heures calmes: {localSettings.quietHours?.enabled ? `${localSettings.quietHours.start} - ${localSettings.quietHours.end}` : 'Désactivé'}</p>
        </div>
      </div>
    </div>
  );
}