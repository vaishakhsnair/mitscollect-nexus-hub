
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Filter } from 'lucide-react';

interface GalleryProps {
  onNavigate: (page: string) => void;
}

const Gallery = ({ onNavigate }: GalleryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data for gallery images
  const mockImages = [
    { id: 1, src: '/placeholder.svg', title: 'AI Workshop', type: 'department', department: 'CSE' },
    { id: 2, src: '/placeholder.svg', title: 'IEEE Event', type: 'club', club: 'IEEE' },
    { id: 3, src: '/placeholder.svg', title: 'Cultural Fest', type: 'club', club: 'Cultural' },
    { id: 4, src: '/placeholder.svg', title: 'Research Symposium', type: 'department', department: 'ECE' },
    { id: 5, src: '/placeholder.svg', title: 'Robotics Competition', type: 'club', club: 'Robotics' },
    { id: 6, src: '/placeholder.svg', title: 'Faculty Achievement', type: 'department', department: 'ME' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => onNavigate('dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select onValueChange={setFilterType} defaultValue="all">
              <SelectTrigger className="w-full md:w-48 h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="department">Departments</SelectItem>
                <SelectItem value="club">Clubs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockImages
              .filter(img => 
                filterType === 'all' || img.type === filterType
              )
              .filter(img =>
                img.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-600">
                      {image.type === 'department' ? image.department : image.club}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {mockImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No images found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
