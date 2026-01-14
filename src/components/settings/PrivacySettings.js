import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, Eye, Users, Camera, MessageSquare, MapPin } from 'lucide-react';

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'friends',
    showOnlineStatus: true,
    allowFriendRequests: true,
    showLocation: false,
    allowTagging: true,
    dataSharing: false,
    analyticsTracking: true,
    cameraAccess: true,
    microphoneAccess: false,
    faceRecognition: true,
    chatHistoryRetention: 'unlimited'
  });

  const handleSave = () => {
    console.log('Saving privacy settings:', privacy);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Contrôles de Confidentialité
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Gérez qui peut voir vos informations et comment vos données sont utilisées
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Visibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Visibilité du profil</Label>
            </div>
            <Select
              value={privacy.profileVisibility}
              onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="public" className="text-white hover:bg-cyan-500/20">Public</SelectItem>
                <SelectItem value="friends" className="text-white hover:bg-cyan-500/20">Amis uniquement</SelectItem>
                <SelectItem value="private" className="text-white hover:bg-cyan-500/20">Privé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Privacy Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-cyan-400">Statut en ligne</Label>
                <p className="text-sm text-cyan-300/70">Permettre aux autres de voir quand vous êtes connecté</p>
              </div>
              <Switch
                checked={privacy.showOnlineStatus}
                onCheckedChange={(checked) => setPrivacy({...privacy, showOnlineStatus: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-cyan-400">Demandes d'amis</Label>
                <p className="text-sm text-cyan-300/70">Autoriser les autres à vous envoyer des demandes d'amis</p>
              </div>
              <Switch
                checked={privacy.allowFriendRequests}
                onCheckedChange={(checked) => setPrivacy({...privacy, allowFriendRequests: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-cyan-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Localisation
                </Label>
                <p className="text-sm text-cyan-300/70">Partager votre position géographique</p>
              </div>
              <Switch
                checked={privacy.showLocation}
                onCheckedChange={(checked) => setPrivacy({...privacy, showLocation: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-cyan-400">Mentions et tags</Label>
                <p className="text-sm text-cyan-300/70">Permettre aux autres de vous mentionner dans les messages</p>
              </div>
              <Switch
                checked={privacy.allowTagging}
                onCheckedChange={(checked) => setPrivacy({...privacy, allowTagging: checked})}
              />
            </div>
          </div>

          {/* Data & Analytics */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Données et analyse</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Partage de données</Label>
                  <p className="text-sm text-cyan-300/70">Autoriser le partage anonyme de données d'utilisation</p>
                </div>
                <Switch
                  checked={privacy.dataSharing}
                  onCheckedChange={(checked) => setPrivacy({...privacy, dataSharing: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Suivi analytique</Label>
                  <p className="text-sm text-cyan-300/70">Aider à améliorer NEXOF avec des données d'utilisation</p>
                </div>
                <Switch
                  checked={privacy.analyticsTracking}
                  onCheckedChange={(checked) => setPrivacy({...privacy, analyticsTracking: checked})}
                />
              </div>
            </div>
          </div>

          {/* AI Permissions */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Permissions IA</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Accès caméra</Label>
                  <p className="text-sm text-cyan-300/70">Permettre l'analyse faciale et les fonctionnalités IA</p>
                </div>
                <Switch
                  checked={privacy.cameraAccess}
                  onCheckedChange={(checked) => setPrivacy({...privacy, cameraAccess: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Accès microphone</Label>
                  <p className="text-sm text-cyan-300/70">Pour les messages vocaux et appels</p>
                </div>
                <Switch
                  checked={privacy.microphoneAccess}
                  onCheckedChange={(checked) => setPrivacy({...privacy, microphoneAccess: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Reconnaissance faciale</Label>
                  <p className="text-sm text-cyan-300/70">Authentification biométrique et recommandations</p>
                </div>
                <Switch
                  checked={privacy.faceRecognition}
                  onCheckedChange={(checked) => setPrivacy({...privacy, faceRecognition: checked})}
                />
              </div>
            </div>
          </div>

          {/* Chat History */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Historique des messages</Label>
            </div>

            <Select
              value={privacy.chatHistoryRetention}
              onValueChange={(value) => setPrivacy({...privacy, chatHistoryRetention: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="unlimited" className="text-white hover:bg-cyan-500/20">Illimité</SelectItem>
                <SelectItem value="1year" className="text-white hover:bg-cyan-500/20">1 an</SelectItem>
                <SelectItem value="6months" className="text-white hover:bg-cyan-500/20">6 mois</SelectItem>
                <SelectItem value="1month" className="text-white hover:bg-cyan-500/20">1 mois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSave}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              Sauvegarder les paramètres
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;