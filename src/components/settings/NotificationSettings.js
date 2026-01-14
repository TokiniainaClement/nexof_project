import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Bell, MessageSquare, Users, FileText, Phone, Volume2, Monitor, Smartphone, Clock } from 'lucide-react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    enabled: true,
    sound: true,
    desktop: true,
    mobile: false,
    messages: true,
    mentions: true,
    reactions: false,
    files: true,
    calls: true,
    groups: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    frequency: 'immediate'
  });

  const handleSave = () => {
    console.log('Saving notification settings:', notifications);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Préférences de Notification
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Personnalisez comment et quand vous recevez des notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Paramètres généraux</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Notifications activées</Label>
                  <p className="text-sm text-cyan-300/70">Recevoir toutes les notifications</p>
                </div>
                <Switch
                  checked={notifications.enabled}
                  onCheckedChange={(checked) => setNotifications({...notifications, enabled: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Sons de notification
                  </Label>
                  <p className="text-sm text-cyan-300/70">Jouer un son pour les nouveaux messages</p>
                </div>
                <Switch
                  checked={notifications.sound}
                  onCheckedChange={(checked) => setNotifications({...notifications, sound: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Notifications desktop
                  </Label>
                  <p className="text-sm text-cyan-300/70">Afficher les notifications sur le bureau</p>
                </div>
                <Switch
                  checked={notifications.desktop}
                  onCheckedChange={(checked) => setNotifications({...notifications, desktop: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Notifications mobile
                  </Label>
                  <p className="text-sm text-cyan-300/70">Recevoir des notifications sur mobile</p>
                </div>
                <Switch
                  checked={notifications.mobile}
                  onCheckedChange={(checked) => setNotifications({...notifications, mobile: checked})}
                />
              </div>
            </div>
          </div>

          {/* Message Types */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Types de messages</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Messages directs</Label>
                  <p className="text-sm text-cyan-300/70">Nouveaux messages privés</p>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={(checked) => setNotifications({...notifications, messages: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Mentions</Label>
                  <p className="text-sm text-cyan-300/70">Quand quelqu'un vous mentionne</p>
                </div>
                <Switch
                  checked={notifications.mentions}
                  onCheckedChange={(checked) => setNotifications({...notifications, mentions: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Réactions</Label>
                  <p className="text-sm text-cyan-300/70">Nouvelles réactions à vos messages</p>
                </div>
                <Switch
                  checked={notifications.reactions}
                  onCheckedChange={(checked) => setNotifications({...notifications, reactions: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Fichiers
                  </Label>
                  <p className="text-sm text-cyan-300/70">Nouveaux fichiers partagés</p>
                </div>
                <Switch
                  checked={notifications.files}
                  onCheckedChange={(checked) => setNotifications({...notifications, files: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Appels
                  </Label>
                  <p className="text-sm text-cyan-300/70">Appels entrants et manqués</p>
                </div>
                <Switch
                  checked={notifications.calls}
                  onCheckedChange={(checked) => setNotifications({...notifications, calls: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Groupes
                  </Label>
                  <p className="text-sm text-cyan-300/70">Messages dans les groupes</p>
                </div>
                <Switch
                  checked={notifications.groups}
                  onCheckedChange={(checked) => setNotifications({...notifications, groups: checked})}
                />
              </div>
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Heures calmes</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Activer les heures calmes</Label>
                  <p className="text-sm text-cyan-300/70">Pas de notifications pendant certaines heures</p>
                </div>
                <Switch
                  checked={notifications.quietHours.enabled}
                  onCheckedChange={(checked) => setNotifications({
                    ...notifications,
                    quietHours: {...notifications.quietHours, enabled: checked}
                  })}
                />
              </div>

              {notifications.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-700/50 rounded-lg">
                  <div className="space-y-2">
                    <Label className="text-cyan-400 text-sm">Heure de début</Label>
                    <input
                      type="time"
                      value={notifications.quietHours.start}
                      onChange={(e) => setNotifications({
                        ...notifications,
                        quietHours: {...notifications.quietHours, start: e.target.value}
                      })}
                      className="w-full px-3 py-2 bg-slate-600 border border-cyan-500/30 rounded text-white text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-400 text-sm">Heure de fin</Label>
                    <input
                      type="time"
                      value={notifications.quietHours.end}
                      onChange={(e) => setNotifications({
                        ...notifications,
                        quietHours: {...notifications.quietHours, end: e.target.value}
                      })}
                      className="w-full px-3 py-2 bg-slate-600 border border-cyan-500/30 rounded text-white text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frequency */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Fréquence de notification</Label>
            </div>

            <Select
              value={notifications.frequency}
              onValueChange={(value) => setNotifications({...notifications, frequency: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="immediate" className="text-white hover:bg-cyan-500/20">Immédiat</SelectItem>
                <SelectItem value="grouped" className="text-white hover:bg-cyan-500/20">Groupé (toutes les 5 min)</SelectItem>
                <SelectItem value="hourly" className="text-white hover:bg-cyan-500/20">Toutes les heures</SelectItem>
                <SelectItem value="daily" className="text-white hover:bg-cyan-500/20">Résumé quotidien</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSave}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              Sauvegarder les préférences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;