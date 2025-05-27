
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import DepartmentDirectory from '@/components/DepartmentDirectory';
import ClubDirectory from '@/components/ClubDirectory';
import DepartmentForm from '@/components/DepartmentForm';
import ClubForm from '@/components/ClubForm';
import AdminPanel from '@/components/AdminPanel';
import Gallery from '@/components/Gallery';

const Index = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedClub, setSelectedClub] = useState<string>('');

  const handleNavigation = (page: string, param?: string) => {
    setCurrentPage(page);
    if (param) {
      if (page === 'department-form') {
        setSelectedDepartment(param);
      } else if (page === 'club-form') {
        setSelectedClub(param);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'departments':
        return <DepartmentDirectory onNavigate={handleNavigation} />;
      case 'clubs':
        return <ClubDirectory onNavigate={handleNavigation} />;
      case 'department-form':
        return <DepartmentForm onNavigate={handleNavigation} department={selectedDepartment} />;
      case 'club-form':
        return <ClubForm onNavigate={handleNavigation} club={selectedClub} />;
      case 'admin':
        return <AdminPanel onNavigate={handleNavigation} />;
      case 'gallery':
        return <Gallery onNavigate={handleNavigation} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return <div className="animate-fade-in">{renderCurrentPage()}</div>;
};

export default Index;
