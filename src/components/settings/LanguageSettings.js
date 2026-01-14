import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Globe, Languages, Clock } from 'lucide-react';

const LanguageSettings = () => {
  const [language, setLanguage] = useState({
    interface: 'fr',
    region: 'FR',
    timezone: 'Europe/Paris',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'fr-FR'
  });

  const handleSave = () => {
    console.log('Saving language settings:', language);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Paramètres de Langue
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Choisissez votre langue et vos préférences régionales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Langue d'interface</Label>
            </div>

            <Select
              value={language.interface}
              onValueChange={(value) => setLanguage({...language, interface: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="fr" className="text-white hover:bg-cyan-500/20">Français</SelectItem>
                <SelectItem value="en" className="text-white hover:bg-cyan-500/20">English</SelectItem>
                <SelectItem value="es" className="text-white hover:bg-cyan-500/20">Español</SelectItem>
                <SelectItem value="de" className="text-white hover:bg-cyan-500/20">Deutsch</SelectItem>
                <SelectItem value="it" className="text-white hover:bg-cyan-500/20">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Region */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Région</Label>
            </div>

            <Select
              value={language.region}
              onValueChange={(value) => setLanguage({...language, region: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="FR" className="text-white hover:bg-cyan-500/20">France</SelectItem>
                <SelectItem value="CA" className="text-white hover:bg-cyan-500/20">Canada</SelectItem>
                <SelectItem value="BE" className="text-white hover:bg-cyan-500/20">Belgique</SelectItem>
                <SelectItem value="CH" className="text-white hover:bg-cyan-500/20">Suisse</SelectItem>
                <SelectItem value="LU" className="text-white hover:bg-cyan-500/20">Luxembourg</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timezone */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Fuseau horaire</Label>
            </div>

            <Select
              value={language.timezone}
              onValueChange={(value) => setLanguage({...language, timezone: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="Europe/Paris" className="text-white hover:bg-cyan-500/20">Europe/Paris (UTC+1)</SelectItem>
                <SelectItem value="Europe/London" className="text-white hover:bg-cyan-500/20">Europe/London (UTC+0)</SelectItem>
                <SelectItem value="America/New_York" className="text-white hover:bg-cyan-500/20">America/New_York (UTC-5)</SelectItem>
                <SelectItem value="Asia/Tokyo" className="text-white hover:bg-cyan-500/20">Asia/Tokyo (UTC+9)</SelectItem>
                <SelectItem value="Australia/Sydney" className="text-white hover:bg-cyan-500/20">Australia/Sydney (UTC+10)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time Format */}
          <div className="border-t border-cyan-500/20 pt-6">
            <Label className="text-cyan-400 font-semibold mb-4 block">Formats d'affichage</Label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-cyan-400 text-sm">Format de date</Label>
                <Select
                  value={language.dateFormat}
                  onValueChange={(value) => setLanguage({...language, dateFormat: value})}
                >
                  <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-cyan-500/30">
                    <SelectItem value="DD/MM/YYYY" className="text-white hover:bg-cyan-500/20">JJ/MM/AAAA</SelectItem>
                    <SelectItem value="MM/DD/YYYY" className="text-white hover:bg-cyan-500/20">MM/JJ/AAAA</SelectItem>
                    <SelectItem value="YYYY-MM-DD" className="text-white hover:bg-cyan-500/20">AAAA-MM-JJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-cyan-400 text-sm">Format d'heure</Label>
                <Select
                  value={language.timeFormat}
                  onValueChange={(value) => setLanguage({...language, timeFormat: value})}
                >
                  <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-cyan-500/30">
                    <SelectItem value="24h" className="text-white hover:bg-cyan-500/20">24 heures</SelectItem>
                    <SelectItem value="12h" className="text-white hover:bg-cyan-500/20">12 heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-cyan-400 text-sm">Format des nombres</Label>
                <Select
                  value={language.numberFormat}
                  onValueChange={(value) => setLanguage({...language, numberFormat: value})}
                >
                  <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-cyan-500/30">
                    <SelectItem value="fr-FR" className="text-white hover:bg-cyan-500/20">Français</SelectItem>
                    <SelectItem value="en-US" className="text-white hover:bg-cyan-500/20">English (US)</SelectItem>
                    <SelectItem value="de-DE" className="text-white hover:bg-cyan-500/20">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSave}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              Sauvegarder les paramètres de langue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSettings;