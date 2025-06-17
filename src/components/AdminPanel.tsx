import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Download, User, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

interface Submission {
  id: string;
  title: string;
  description: string;
  contributor_name: string;
  activity_date: string;
  type: string;
  department: string;
  club: string;
  section: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

const AdminPanel = ({ onNavigate }: AdminPanelProps) => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [detailImages, setDetailImages] = useState<{ image_url: string; image_name: string }[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          id,
          title,
          description,
          contributor_name,
          activity_date,
          type,
          department,
          club,
          section,
          status,
          created_at,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData: Submission[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        contributor_name: item.contributor_name || '',
        activity_date: item.activity_date || '',
        type: item.type,
        department: item.department || '',
        club: item.club || '',
        section: item.section || '',
        status: item.status,
        created_at: item.created_at,
        profiles: Array.isArray(item.profiles) ? item.profiles[0] || null : item.profiles
      }));
      
      setSubmissions(transformedData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch submissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (submissionId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({
          status,
          reviewed_by: profile?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', submissionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Submission ${status} successfully.`,
      });

      // Refresh submissions
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Error",
        description: "Failed to update submission status.",
        variant: "destructive",
      });
    }
  };

  const openDetails = async (submission: Submission) => {
    setSelectedSubmission(submission);
    setDetailOpen(true);
    setDetailLoading(true);
    const { data, error } = await supabase
      .from('submission_images')
      .select('image_url, image_name')
      .eq('submission_id', submission.id);
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch images.',
        variant: 'destructive'
      });
      setDetailImages([]);
    } else {
      setDetailImages(data || []);
    }
    setDetailLoading(false);
  };

  const filteredSubmissions = submissions.filter(s => 
    activeTab === 'pending' ? s.status === 'pending' : s.status === 'approved'
  );

  const SubmissionTable = ({ submissions }: { submissions: Submission[] }) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Submitted By</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Department/Club</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Details</th>
            {activeTab === 'pending' && <th className="px-4 py-3 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                {loading ? 'Loading...' : 'No submissions found'}
              </td>
            </tr>
          ) : (
            submissions.map((submission) => (
              <tr key={submission.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{submission.profiles?.full_name || 'Unknown User'}</div>
                    <div className="text-sm text-gray-500">{submission.profiles?.email || 'No email'}</div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{submission.type}</td>
                <td className="px-4 py-3 font-medium">{submission.title}</td>
                <td className="px-4 py-3">
                  {submission.type === 'department' ? submission.department : submission.club}
                </td>
                <td className="px-4 py-3">
                  {new Date(submission.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDetails(submission)}
                  >
                    View
                  </Button>
                </td>
                {activeTab === 'pending' && (
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => updateSubmissionStatus(submission.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateSubmissionStatus(submission.id, 'rejected')}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // Check if user is admin
  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
          <Button onClick={() => onNavigate('dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-primary-600 min-h-screen p-4">
          <div className="text-white font-bold text-xl mb-8">Admin Panel</div>
          <nav className="space-y-2">
            <Button
              variant={activeTab === 'pending' ? 'secondary' : 'ghost'}
              className="w-full justify-start text-white hover:bg-primary-700"
              onClick={() => setActiveTab('pending')}
            >
              Pending Submissions
            </Button>
            <Button
              variant={activeTab === 'approved' ? 'secondary' : 'ghost'}
              className="w-full justify-start text-white hover:bg-primary-700"
              onClick={() => setActiveTab('approved')}
            >
              Approved Submissions
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => onNavigate('dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">
                {activeTab === 'pending' ? 'Pending Submissions' : 'Approved Submissions'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {profile?.full_name}
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-0">
              <SubmissionTable submissions={filteredSubmissions} />
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-end">
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download as CSV
            </Button>
          </div>

          <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogContent className="max-w-2xl">
              {selectedSubmission && (
                <>
                  <DialogHeader>
                    <DialogTitle>{selectedSubmission.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <p><strong>Description:</strong> {selectedSubmission.description}</p>
                    {selectedSubmission.contributor_name && (
                      <p><strong>Contributor:</strong> {selectedSubmission.contributor_name}</p>
                    )}
                    {selectedSubmission.activity_date && (
                      <p><strong>Date:</strong> {new Date(selectedSubmission.activity_date).toLocaleDateString()}</p>
                    )}
                    {detailLoading ? (
                      <p>Loading images...</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {detailImages.map(img => (
                          <img key={img.image_url} src={img.image_url} alt={img.image_name} className="h-32 w-full object-cover rounded" />
                        ))}
                        {detailImages.length === 0 && (
                          <p className="text-sm text-gray-500">No images</p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
