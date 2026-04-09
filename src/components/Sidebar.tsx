import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, FileText, Settings, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Schedules', path: '/schedules' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 h-full bg-surface-container-low border-r border-white/5 flex flex-col pt-8 pb-6 px-4 shrink-0 overflow-y-auto">
      <div className="flex items-center gap-2 px-4 mb-10">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="text-xl font-headline font-black tracking-tight text-white">ShiftSync</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => 
              `nav-link font-medium ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <button 
          onClick={logout}
          className="w-full nav-link text-red-400 hover:bg-red-500/10 hover:text-red-300 font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
