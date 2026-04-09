import React from 'react';
import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  user: any;
}

const Header = ({ title, user }: HeaderProps) => {
  return (
    <header className="h-20 bg-background/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 z-10">
      <h2 className="text-xl font-headline font-bold text-white tracking-tight">{title}</h2>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-surface-container-low border border-white/5 rounded-2xl px-4 py-2 w-64 group focus-within:border-primary/40 transition-all">
          <Search className="w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none text-xs text-white focus:outline-none ml-3 w-full"
          />
        </div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6 h-8">
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
          </button>
          
          <div className="flex items-center gap-3 ml-2 group cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{user?.name || 'User'}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{user?.role || 'Member'}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-white/10 flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
              <User className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
