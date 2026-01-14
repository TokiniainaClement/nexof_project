import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Camera, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@nexof.com',
    phone: '+33 6 12 34 56 78',
    bio: 'Passionné par les technologies innovantes et l\'intelligence artificielle. Développeur chez NEXOF.',
    location: 'Paris, France',
    birthday: '1990-05-15',
    avatar: '/api/placeholder/150/150'
  });

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving profile:', profile);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <User className="w-5 h-5" />
            Gestion du Profil
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Gérez vos informations personnelles et votre avatar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar} alt="Profile" />
              <AvatarFallback className="bg-cyan-600 text-white text-xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2">
                <Camera className="w-4 h-4" />
                Changer l'avatar
              </Button>
              <p className="text-sm text-cyan-300/70">
                JPG, PNG ou GIF. Max 2MB.
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-cyan-400">Prénom</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                className="bg-slate-700 border-cyan-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-cyan-400">Nom</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                className="bg-slate-700 border-cyan-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyan-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="bg-slate-700 border-cyan-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-cyan-400 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="bg-slate-700 border-cyan-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-cyan-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Localisation
              </Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
                className="bg-slate-700 border-cyan-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-cyan-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date de naissance
              </Label>
              <Input
                id="birthday"
                type="date"
                value={profile.birthday}
                onChange={(e) => setProfile({...profile, birthday: e.target.value})}
                className="bg-slate-700 border-cyan-500/30 text-white"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-cyan-400">Biographie</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="bg-slate-700 border-cyan-500/30 text-white min-h-[100px]"
              placeholder="Parlez-nous de vous..."
            />
            <p className="text-sm text-cyan-300/70">
              {profile.bio.length}/500 caractères
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              Sauvegarder les modifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;