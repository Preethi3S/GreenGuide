import {
    BarChart3,
    FileText,
    MessageCircle,
    ShoppingBag,
    Users,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const adminFeatures = [
  {
    title: 'User Management',
    description: 'View, ban or promote users',
    icon: <Users className="w-6 h-6 text-primary" />,
    link: '/admin/users',
  },
  {
    title: 'System Analytics',
    description: 'Track growth, posts & usage',
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    link: '/admin/analytics',
  },
  {
    title: 'Encyclopedia Manager',
    description: 'Edit or add plant data',
    icon: <FileText className="w-6 h-6 text-primary" />,
    link: '/admin/encyclopedia/new',
  },
  {
    title: 'User Queries',
    description: 'Read & reply to messages',
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    link: '/admin/messages',
  },
  {
    title: 'Shop Admin Panel',
    description: 'Manage products & orders',
    icon: <ShoppingBag className="w-6 h-6 text-primary" />,
    link: '/admin/shop',
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-secondary text-white p-3 rounded-xl text-2xl">🛡️</span>
          <h1 className="text-4xl font-serif font-bold text-secondary">Admin Dashboard</h1>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adminFeatures.map(({ title, description, icon, link }) => (
            <Link
              key={title}
              to={link}
              className="bg-white border border-secondary/10 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  {React.cloneElement(icon, { className: "w-6 h-6 text-primary group-hover:text-white transition-colors" })}
                </div>
                <h2 className="text-xl font-serif font-bold text-secondary">{title}</h2>
              </div>
              <p className="text-gray-500 pl-[60px]">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
