import {
    Bell,
    BookOpen,
    Calendar,
    Droplet,
    Home,
    InboxIcon,
    Leaf,
    LineChart,
    Menu,
    MessageCircleIcon,
    MessageSquareHeart,
    Settings,
    ShoppingBagIcon,
    Stethoscope,
    TreePalmIcon,
    X
} from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  if (!user) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    { to: '/plants', label: 'My Plants', icon: <Leaf size={18} /> },
    { to: '/growth', label: 'Growth Tracker', icon: <LineChart size={18} /> },
    { to: '/water', label: 'Water Tracker', icon: <Droplet size={18} /> },
    { to: '/disease-detector', label: 'Disease Detector', icon: <Stethoscope size={18} /> },
    { to: '/reminders', label: 'Reminders', icon: <Calendar size={18} /> },
    { to: '/notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { to: '/encyclopedia', label: 'Encyclopedia', icon: <BookOpen size={18} /> },
    { to: '/community', label: 'Community', icon: <MessageSquareHeart size={18} /> },
    { to: '/shop', label: 'Shop', icon: <ShoppingBagIcon size={18} /> },
    { to: '/garden', label: 'Garden', icon: <TreePalmIcon size={18} /> },
  ];

  if (user.role === 'user') {
    navLinks.push({
      to: '/messages',
      label: 'Any Queries',
      icon: <MessageCircleIcon size={18} />,
    });
  }

  if (user.role === 'admin') {
    navLinks.push(
      {
        to: '/admin/messages',
        label: 'User Queries',
        icon: <InboxIcon size={18} />,
      },
      {
        to: '/admin/dashboard',
        label: 'Admin Panel',
        icon: <Settings size={18} />,
      }
    );
  }

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-primary text-dark-bg p-2 rounded shadow"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-secondary shadow-xl p-6 transform transition-transform duration-300 ease-in-out border-r border-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
      >
        {/* Subtle Glow Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-300 to-transparent opacity-50" />

        <nav className="flex flex-col gap-4 mt-14 md:mt-0 h-full overflow-y-auto pb-20 custom-scrollbar">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-lg shadow-primary/30'
                    : 'hover:bg-white/5 text-gray-400 hover:text-white'
                }`
              }
            >
              <span className="transition">{link.icon}</span>
              <span className="text-sm tracking-wide">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
