import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Palette, Sun, Moon, Monitor, Droplet } from 'lucide-react';

const ThemeSettings = () => {
  const [theme, setTheme] = useState({
    mode: 'dark', // light, dark, system
    accentColor: 'cyan',
    fontSize: 'medium',
    animations: true,
    compactMode: false
  });

  const handleSave = () => {
    console.log('Saving theme settings:', theme);
  };

  const accentColors = [
    { name: 'Cyan', value: 'cyan', color: '#00ffff' },
    { name: 'Blue', value: 'blue', color: '#3b82f6' },
    { name: 'Purple', value: 'purple', color: '#8b5cf6' },
    { name: 'Green', value: 'green', color: '#10b981' },
    { name: 'Orange', value: 'orange', color: '#f97316' },
    { name: 'Pink', value: 'pink', color: '#ec4899' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Personnalisation de Thème
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Personnalisez l'apparence de votre interface NEXOF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Mode */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Mode d'affichage</Label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Clair', icon: Sun },
                { value: 'dark', label: 'Sombre', icon: Moon },
                { value: 'system', label: 'Système', icon: Monitor }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme({...theme, mode: value})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme.mode === value
                      ? 'border-cyan-400 bg-cyan-500/10'
                      : 'border-cyan-500/30 bg-slate-700/50 hover:border-cyan-500/50'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${
                    theme.mode === value ? 'text-cyan-400' : 'text-cyan-300/70'
                  }`} />
                  <p className={`text-sm font-medium ${
                    theme.mode === value ? 'text-cyan-400' : 'text-cyan-300/70'
                  }`}>
                    {label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Couleur d'accent</Label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {accentColors.map(({ name, value, color }) => (
                <button
                  key={value}
                  onClick={() => setTheme({...theme, accentColor: value})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme.accentColor === value
                      ? 'border-cyan-400 bg-cyan-500/10'
                      : 'border-cyan-500/30 bg-slate-700/50 hover:border-cyan-500/50'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full mx-auto mb-2 border-2 border-white/20"
                    style={{ backgroundColor: color }}
                  />
                  <p className={`text-sm font-medium ${
                    theme.accentColor === value ? 'text-cyan-400' : 'text-cyan-300/70'
                  }`}>
                    {name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Label className="text-cyan-400 font-semibold">Taille de police</Label>
            </div>

            <Select
              value={theme.fontSize}
              onValueChange={(value) => setTheme({...theme, fontSize: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="small" className="text-white hover:bg-cyan-500/20">Petite</SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-cyan-500/20">Moyenne</SelectItem>
                <SelectItem value="large" className="text-white hover:bg-cyan-500/20">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Options */}
          <div className="border-t border-cyan-500/20 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-cyan-400">Animations</Label>
                <p className="text-sm text-cyan-300/70">Activer les animations et transitions</p>
              </div>
              <input
                type="checkbox"
                checked={theme.animations}
                onChange={(e) => setTheme({...theme, animations: e.target.checked})}
                className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-cyan-400">Mode compact</Label>
                <p className="text-sm text-cyan-300/70">Interface plus compacte avec moins d'espacement</p>
              </div>
              <input
                type="checkbox"
                checked={theme.compactMode}
                onChange={(e) => setTheme({...theme, compactMode: e.target.checked})}
                className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSave}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              Appliquer le thème
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettings;