
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface GalleryProps {
  onNavigate: (page: string) => void;
}

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  type: string;
  department?: string | null;
  club?: string | null;
}

const Gallery = ({ onNavigate }: GalleryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'department' | 'club'>('all');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          id,
          title,
          type,
          department,
          club,
          submission_images (
            id,
            image_url
          )
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
        return;
      }

      const loaded: GalleryImage[] = [];
      (data || []).forEach((submission: any) => {
        (submission.submission_images || []).forEach((img: any) => {
          loaded.push({
            id: img.id,
            image_url: img.image_url,
            title: submission.title,
            type: submission.type,
            department: submission.department,
            club: submission.club,
          });
        });
      });

      setImages(loaded);
      setLoading(false);
    };

    fetchImages();
  }, []);

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
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Loading...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images
                  .filter(img => filterType === 'all' || img.type === filterType)
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
                          src={image.image_url}
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

              {images.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No images found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
