import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Lock, Key, Shield, Smartphone, Mail } from 'lucide-react';

const SecuritySettings = () => {
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    biometricEnabled: true,
    sessionTimeout: '30',
    loginNotifications: true,
    suspiciousActivityAlerts: true
  });

  const handleSave = () => {
    console.log('Saving security settings:', security);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Options de Sécurité
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Gérez votre mot de passe, l'authentification et la sécurité de votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Changer le mot de passe</Label>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-cyan-400">Mot de passe actuel</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={security.currentPassword}
                  onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                  className="bg-slate-700 border-cyan-500/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-cyan-400">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                  className="bg-slate-700 border-cyan-500/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-cyan-400">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                  className="bg-slate-700 border-cyan-500/30 text-white"
                />
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Authentification à deux facteurs</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Activer 2FA</Label>
                  <p className="text-sm text-cyan-300/70">Sécurité renforcée avec code SMS ou app</p>
                </div>
                <input
                  type="checkbox"
                  checked={security.twoFactorEnabled}
                  onChange={(e) => setSecurity({...security, twoFactorEnabled: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Authentification biométrique
                  </Label>
                  <p className="text-sm text-cyan-300/70">Utiliser empreinte digitale ou reconnaissance faciale</p>
                </div>
                <input
                  type="checkbox"
                  checked={security.biometricEnabled}
                  onChange={(e) => setSecurity({...security, biometricEnabled: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Session Management */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Gestion des sessions</Label>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-cyan-400">Timeout de session (minutes)</Label>
                <Input
                  type="number"
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                  className="bg-slate-700 border-cyan-500/30 text-white"
                />
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Alertes de sécurité</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Notifications de connexion</Label>
                  <p className="text-sm text-cyan-300/70">Être informé des nouvelles connexions</p>
                </div>
                <input
                  type="checkbox"
                  checked={security.loginNotifications}
                  onChange={(e) => setSecurity({...security, loginNotifications: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Alertes d'activité suspecte</Label>
                  <p className="text-sm text-cyan-300/70">Détection d'activités inhabituelles</p>
                </div>
                <input
                  type="checkbox"
                  checked={security.suspiciousActivityAlerts}
                  onChange={(e) => setSecurity({...security, suspiciousActivityAlerts: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSave}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              Sauvegarder les paramètres de sécurité
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;