import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Cpu, Camera, Eye, Brain, Target } from 'lucide-react';

const AISettings = () => {
  const [ai, setAi] = useState({
    faceRecognition: true,
    emotionDetection: true,
    ageGenderEstimation: false,
    cameraPermission: true,
    dataUsage: 'essential',
    sensitivity: 'medium',
    recommendations: true,
    personalization: true
  });

  const handleSave = () => {
    console.log('Saving AI settings:', ai);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Paramètres IA
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Contrôlez les fonctionnalités d'intelligence artificielle et la confidentialité des données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Fonctionnalités IA</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Reconnaissance faciale
                  </Label>
                  <p className="text-sm text-cyan-300/70">Authentification biométrique et sécurité</p>
                </div>
                <input
                  type="checkbox"
                  checked={ai.faceRecognition}
                  onChange={(e) => setAi({...ai, faceRecognition: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Détection d'émotion
                  </Label>
                  <p className="text-sm text-cyan-300/70">Analyser les émotions dans les conversations</p>
                </div>
                <input
                  type="checkbox"
                  checked={ai.emotionDetection}
                  onChange={(e) => setAi({...ai, emotionDetection: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Estimation âge/genre</Label>
                  <p className="text-sm text-cyan-300/70">Analyser les caractéristiques démographiques</p>
                </div>
                <input
                  type="checkbox"
                  checked={ai.ageGenderEstimation}
                  onChange={(e) => setAi({...ai, ageGenderEstimation: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Permissions</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Accès caméra</Label>
                  <p className="text-sm text-cyan-300/70">Permettre l'analyse vidéo en temps réel</p>
                </div>
                <input
                  type="checkbox"
                  checked={ai.cameraPermission}
                  onChange={(e) => setAi({...ai, cameraPermission: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Data Usage */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Utilisation des données</Label>
            </div>

            <Select
              value={ai.dataUsage}
              onValueChange={(value) => setAi({...ai, dataUsage: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="essential" className="text-white hover:bg-cyan-500/20">Essentiel uniquement</SelectItem>
                <SelectItem value="analytics" className="text-white hover:bg-cyan-500/20">Analyses anonymes</SelectItem>
                <SelectItem value="personalization" className="text-white hover:bg-cyan-500/20">Personnalisation complète</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sensitivity */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Sensibilité de détection</Label>
            </div>

            <Select
              value={ai.sensitivity}
              onValueChange={(value) => setAi({...ai, sensitivity: value})}
            >
              <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-cyan-500/30">
                <SelectItem value="low" className="text-white hover:bg-cyan-500/20">Faible (moins précise)</SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-cyan-500/20">Moyenne</SelectItem>
                <SelectItem value="high" className="text-white hover:bg-cyan-500/20">Élevée (plus précise)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recommendations */}
          <div className="border-t border-cyan-500/20 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-cyan-400">Recommandations intelligentes</Label>
                <p className="text-sm text-cyan-300/70">Suggestions d'amis et de contenu personnalisées</p>
              </div>
              <input
                type="checkbox"
                checked={ai.recommendations}
                onChange={(e) => setAi({...ai, recommendations: e.target.checked})}
                className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-cyan-400">Personnalisation IA</Label>
                <p className="text-sm text-cyan-300/70">Adapter l'interface à vos préférences</p>
              </div>
              <input
                type="checkbox"
                checked={ai.personalization}
                onChange={(e) => setAi({...ai, personalization: e.target.checked})}
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
              Sauvegarder les paramètres IA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettings;