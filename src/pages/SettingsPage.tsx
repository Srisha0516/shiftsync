import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Lock, 
  Globe, 
  Save, 
  CheckCircle,
  Hash
} from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-headline font-black text-white">Settings</h1>
        <p className="text-on-surface-variant mt-1">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="glass-card rounded-[2.5rem] p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input 
                  type="text" 
                  defaultValue={user?.name}
                  className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50"
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input 
                  type="email" 
                  defaultValue="user@shiftsync.pro" // Example as user interface doesn't expose email in context normally
                  className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50"
                  placeholder="email@company.com"
                />
              </div>
            </div>
            {user?.role === 'manager' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">Business Name</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <input 
                    type="text" 
                    defaultValue="Blue Bayou Kitchen"
                    className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50"
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">Account Role</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input 
                  type="text" 
                  disabled
                  defaultValue={user?.role}
                  className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white/50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="glass-card rounded-[2.5rem] p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-secondary" />
            Notifications & Security
          </h3>
          <div className="space-y-4">
             {[
               { icon: Bell, label: 'Email Notifications', desc: 'Receive shift updates and swap requests' },
               { icon: Lock, label: 'Two-Factor Authentication', desc: 'Secure your account with 2FA' },
               { icon: Hash, label: 'Default Hourly Rate', desc: 'Used for earnings estimations', value: '$20.00/hr' },
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-white/5 rounded-xl">
                     <item.icon className="w-5 h-5 text-on-surface-variant" />
                   </div>
                   <div>
                     <p className="font-bold text-sm text-white">{item.label}</p>
                     <p className="text-xs text-on-surface-variant">{item.desc}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   {item.value && <span className="text-xs font-black text-secondary">{item.value}</span>}
                   <div className="w-12 h-6 bg-primary/20 rounded-full relative p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-primary rounded-full translate-x-6" />
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </section>

        <div className="flex items-center justify-between">
          <p className="text-on-surface-variant text-xs">Last updated: 10 Apr 2026</p>
          <button 
            onClick={handleSave}
            className="btn-primary py-4 px-10 flex items-center gap-3 relative overflow-hidden group"
          >
             <AnimatePresence mode="wait">
               {success ? (
                 <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5" /> Saved!
                 </motion.div>
               ) : (
                 <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2">
                   <Save className="w-5 h-5" /> Save Changes
                 </motion.div>
               )}
             </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
