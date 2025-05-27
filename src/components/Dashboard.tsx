
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, Image, Shield } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const cards = [
    {
      id: 'departments',
      title: 'Departments',
      icon: GraduationCap,
      description: 'Submit departmental activities and achievements'
    },
    {
      id: 'clubs',
      title: 'Clubs',
      icon: Users,
      description: 'Submit club events and activities'
    },
    {
      id: 'gallery',
      title: 'Gallery',
      icon: Image,
      description: 'View submitted images and content'
    },
    {
      id: 'admin',
      title: 'Admin Panel',
      icon: Shield,
      description: 'Manage submissions and content'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 dots-pattern opacity-30"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600 rounded-full translate-y-32 -translate-x-32"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary-600 rounded-full"></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4">
            Welcome User
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select an option below to start contributing to the MITS newsletter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              className="group cursor-pointer hover-scale border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
              onClick={() => onNavigate(card.id)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <card.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
