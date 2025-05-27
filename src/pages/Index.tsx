
import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';
import DepartmentDirectory from '@/components/DepartmentDirectory';
import ClubDirectory from '@/components/ClubDirectory';
import DepartmentForm from '@/components/DepartmentForm';
import ClubForm from '@/components/ClubForm';
import AdminPanel from '@/components/AdminPanel';
import Gallery from '@/components/Gallery';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedClub, setSelectedClub] = useState<string>('');

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
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
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return <div className="animate-fade-in">{renderCurrentPage()}</div>;
};

export default Index;
