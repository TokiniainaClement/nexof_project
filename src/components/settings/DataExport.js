import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Download, Trash2, FileText, MessageSquare, Users, Settings } from 'lucide-react';

const DataExport = () => {
  const [exportOptions, setExportOptions] = useState({
    profile: true,
    messages: true,
    contacts: false,
    settings: true,
    files: false,
    format: 'json'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsExporting(false);
    console.log('Exporting data:', exportOptions);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible.')) {
      setIsDeleting(true);
      // Simulate deletion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsDeleting(false);
      console.log('Account deletion requested');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportation de Données
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Téléchargez vos données personnelles ou supprimez votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-cyan-400" />
              <Label className="text-cyan-400 font-semibold">Sélectionner les données à exporter</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Profil et informations personnelles
                  </Label>
                  <p className="text-sm text-cyan-300/70">Nom, email, bio, avatar, etc.</p>
                </div>
                <input
                  type="checkbox"
                  checked={exportOptions.profile}
                  onChange={(e) => setExportOptions({...exportOptions, profile: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Messages et conversations
                  </Label>
                  <p className="text-sm text-cyan-300/70">Historique des messages et fichiers partagés</p>
                </div>
                <input
                  type="checkbox"
                  checked={exportOptions.messages}
                  onChange={(e) => setExportOptions({...exportOptions, messages: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Contacts et amis</Label>
                  <p className="text-sm text-cyan-300/70">Liste de vos contacts et relations</p>
                </div>
                <input
                  type="checkbox"
                  checked={exportOptions.contacts}
                  onChange={(e) => setExportOptions({...exportOptions, contacts: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Paramètres et préférences
                  </Label>
                  <p className="text-sm text-cyan-300/70">Vos paramètres d'application</p>
                </div>
                <input
                  type="checkbox"
                  checked={exportOptions.settings}
                  onChange={(e) => setExportOptions({...exportOptions, settings: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-cyan-400">Fichiers téléchargés</Label>
                  <p className="text-sm text-cyan-300/70">Liste des fichiers que vous avez uploadés</p>
                </div>
                <input
                  type="checkbox"
                  checked={exportOptions.files}
                  onChange={(e) => setExportOptions({...exportOptions, files: e.target.checked})}
                  className="w-4 h-4 rounded border-cyan-400 bg-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Export Format */}
          <div className="border-t border-cyan-500/20 pt-6">
            <Label className="text-cyan-400 font-semibold mb-4 block">Format d'exportation</Label>
            <div className="flex gap-4">
              {[
                { value: 'json', label: 'JSON' },
                { value: 'csv', label: 'CSV' },
                { value: 'pdf', label: 'PDF' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="format"
                    value={value}
                    checked={exportOptions.format === value}
                    onChange={(e) => setExportOptions({...exportOptions, format: e.target.value})}
                    className="text-cyan-400"
                  />
                  <span className="text-cyan-400">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exportation en cours...' : 'Exporter mes données'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="bg-red-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Suppression du Compte
          </CardTitle>
          <CardDescription className="text-red-300/70">
            Supprimez définitivement votre compte et toutes vos données
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <h4 className="text-red-400 font-semibold mb-2">⚠️ Action Irréversible</h4>
              <p className="text-red-300/70 text-sm mb-4">
                La suppression de votre compte entraînera la perte permanente de :
              </p>
              <ul className="text-red-300/70 text-sm space-y-1 ml-4">
                <li>• Toutes vos conversations et messages</li>
                <li>• Votre profil et informations personnelles</li>
                <li>• Vos fichiers et médias téléchargés</li>
                <li>• Vos paramètres et préférences</li>
                <li>• Votre historique d'activité</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                variant="destructive"
                className="bg-red-600 hover:bg-red-500 text-white gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? 'Suppression en cours...' : 'Supprimer mon compte'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExport;