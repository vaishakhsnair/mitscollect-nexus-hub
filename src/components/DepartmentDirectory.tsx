
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DepartmentDirectoryProps {
  onNavigate: (page: string, department?: string) => void;
}

const DepartmentDirectory = ({ onNavigate }: DepartmentDirectoryProps) => {
  const departments = [
    { id: 'Artificial Intelligence and Data Science', name: 'Artificial Intelligence and Data Science', code: 'AIDS' },
    { id: 'Basic Science and Humanities', name: 'Basic Science and Humanities', code: 'BSH' },
    { id: 'Civil Engineering', name: 'Civil Engineering', code: 'CE' },
    { id: 'Computer Science and Engineering', name: 'Computer Science and Engineering', code: 'CSE' },
    { id: 'Electrical and Communications Engineering', name: 'Electrical and Communications Engineering', code: 'ECE' },
    { id: 'Electrical and Electronics Engineering', name: 'Electrical and Electronics Engineering', code: 'EEE' },
    { id: 'Mechanical Engineering', name: 'Mechanical Engineering', code: 'ME' },
    { id: 'MCA', name: 'MCA', code: 'MCA' }
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
            <h1 className="text-3xl font-bold text-gray-900">Select Department</h1>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search departments..."
              className="pl-10 h-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card
                key={dept.id}
                className="group cursor-pointer hover-scale border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => onNavigate('department-form', dept.id)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {dept.code}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {dept.name}
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

export default DepartmentDirectory;
