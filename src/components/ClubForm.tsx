import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, Calendar, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ClubFormProps {
  onNavigate: (page: string) => void;
  club?: string;
}

interface UploadedImage {
  path: string;
  publicUrl: string;
  fileName: string;
}

const ClubForm = ({ onNavigate, club }: ClubFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    contact: ''
  });

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploading(true);
    for (const file of Array.from(e.target.files)) {
      const filePath = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('submission-images')
        .upload(filePath, file);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to upload image.',
          variant: 'destructive'
        });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('submission-images')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        toast({
          title: 'Error',
          description: 'Invalid image URL returned.',
          variant: 'destructive'
        });
        continue;
      }

      setImages(prev => [
        ...prev,
        {
          path: filePath,
          publicUrl: urlData.publicUrl,
          fileName: file.name
        }
      ]);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to submit.',
        variant: 'destructive'
      });
      return;
    }

    if (uploading) {
      toast({
        title: 'Please wait',
        description: 'Images are still uploading.',
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          title: formData.title,
          description: formData.description,
          activity_date: formData.date,
          contributor_name: formData.contact,
          club: club,
          type: 'club',
          status: 'pending',
          user_id: user.id
        })
        .select('id')
        .single();

      if (error) throw error;

      const submissionId = data.id;

      for (const img of images) {
        await supabase.from('submission_images').insert({
          submission_id: submissionId,
          image_url: img.publicUrl,
          image_name: img.fileName
        });
      }

      toast({
        title: 'Submission Successful',
        description: 'Your club submission has been received for review.'
      });
      onNavigate('dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => onNavigate('clubs')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              Club Submission
            </h1>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl text-primary-600">
                Submit Event for {club?.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="Fill in within a 20 word limit"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="h-12"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Fill in under a 200-250 word limit"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Click to upload images related to the event.</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                  {uploading && (
                    <p className="text-sm text-gray-600 mt-2">Uploading images...</p>
                  )}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img.publicUrl}
                            alt={img.fileName}
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 h-5 w-5"
                            onClick={async () => {
                              await supabase.storage
                                .from('submission-images')
                                .remove([img.path]);
                              setImages(prev => prev.filter((_, i) => i !== index));
                            }}
                          >
                            <span className="sr-only">Remove</span>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Event/Activity
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="h-12"
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Club Contact Person
                  </label>
                  <Input
                    placeholder="Enter your number or email"
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    className="h-12"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 text-base font-semibold bg-black hover:bg-gray-800 text-white"
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClubForm;
