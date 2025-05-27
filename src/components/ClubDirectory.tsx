
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ClubDirectoryProps {
  onNavigate: (page: string, club?: string) => void;
}

const ClubDirectory = ({ onNavigate }: ClubDirectoryProps) => {
  const clubs = [
    { id: 'IEEE SB MITS', name: 'IEEE SB MITS', code: 'IEEE' },
    { id: 'NSS MITS', name: 'NSS MITS', code: 'NSS' },
    { id: 'IEDC MITS', name: 'IEDC MITS', code: 'IEDC' },
    { id: 'ETERNIA', name: 'ETERNIA', code: 'ETR' },
    { id: 'μLearn MITS', name: 'μLearn MITS', code: 'μL' },
    { id: 'Tinkerhub MITS', name: 'Tinkerhub MITS', code: 'TH' },
    { id: 'YI YUVA MITS', name: 'YI YUVA MITS', code: 'YI' },
    { id: 'FOSS', name: 'FOSS', code: 'FOSS' },
    { id: 'Polaris Game Labs', name: 'Polaris Game Labs', code: 'PGL' },
    { id: 'LINC', name: 'LINC', code: 'LINC' },
    { id: 'ICI', name: 'ICI', code: 'ICI' },
    { id: 'Math Club', name: 'Math Club', code: 'MATH' },
    { id: 'Quiz Club', name: 'Quiz Club', code: 'QUIZ' },
    { id: 'ASCE', name: 'ASCE', code: 'ASCE' },
    { id: 'Rotract MITS', name: 'Rotract MITS', code: 'ROT' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => onNavigate('dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Select your Club</h1>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clubs..."
              className="pl-10 h-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <Card
                key={club.id}
                className="group cursor-pointer hover-scale border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => onNavigate('club-form', club.id)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {club.code}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {club.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDirectory;
