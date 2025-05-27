
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, User } from 'lucide-react';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

const AdminPanel = ({ onNavigate }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState('reviewed');

  const mockSubmissions = [
    {
      id: 1,
      timestamp: '2024-01-15 10:30',
      title: 'AI Workshop Success',
      description: 'Department of CSE organized a successful AI workshop...',
      uploadedImages: 5,
      date: '2024-01-10',
      type: 'department',
      status: 'reviewed'
    },
    {
      id: 2,
      timestamp: '2024-01-14 15:45',
      title: 'IEEE Technical Event',
      description: 'IEEE Student Branch conducted a technical symposium...',
      uploadedImages: 8,
      date: '2024-01-12',
      type: 'club',
      status: 'pending'
    }
  ];

  const reviewedSubmissions = mockSubmissions.filter(s => s.status === 'reviewed');
  const pendingSubmissions = mockSubmissions.filter(s => s.status === 'pending');

  const SubmissionTable = ({ submissions }: { submissions: typeof mockSubmissions }) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">TimeStamp</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Uploaded Images</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                No submissions found
              </td>
            </tr>
          ) : (
            submissions.map((submission) => (
              <tr key={submission.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{submission.timestamp}</td>
                <td className="px-4 py-3 font-medium">{submission.title}</td>
                <td className="px-4 py-3 max-w-xs truncate">{submission.description}</td>
                <td className="px-4 py-3">{submission.uploadedImages}</td>
                <td className="px-4 py-3">{submission.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-primary-600 min-h-screen p-4">
          <div className="text-white font-bold text-xl mb-8">Admin</div>
          <nav className="space-y-2">
            <Button
              variant={activeTab === 'reviewed' ? 'secondary' : 'ghost'}
              className="w-full justify-start text-white hover:bg-primary-700"
              onClick={() => setActiveTab('reviewed')}
            >
              Reviewed Submissions
            </Button>
            <Button
              variant={activeTab === 'pending' ? 'secondary' : 'ghost'}
              className="w-full justify-start text-white hover:bg-primary-700"
              onClick={() => setActiveTab('pending')}
            >
              Pending Submissions
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
                {activeTab === 'reviewed' ? 'Reviewed Submissions' : 'Pending Submissions'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                Vaishakh
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-0">
              {activeTab === 'reviewed' ? (
                <SubmissionTable submissions={reviewedSubmissions} />
              ) : (
                <SubmissionTable submissions={pendingSubmissions} />
              )}
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-end">
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download as CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
