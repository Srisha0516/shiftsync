import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { motion } from 'framer-motion';
import { Users, Mail, Shield, Search, Loader2 } from 'lucide-react';

const TeamPage = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      // In a real app, this would be GET /api/users or /api/team
      // For now we'll derive from shifts or a mock if empty
      const res = await api.get('/shifts');
      const allUsers = res.data.flatMap((s: any) => s.shift_assignments || [])
        .map((a: any) => a.users)
        .filter((u: any, i: number, self: any[]) => u && self.findIndex(t => t.id === u.id) === i);
      
      setTeam(allUsers.length > 0 ? allUsers : [
        { full_name: 'System Admin', email: 'admin@shiftsync.pro', role: 'manager' }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeam = team.filter(m => 
    m.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-headline font-black text-white">Team Directory</h1>
          <p className="text-on-surface-variant mt-1">Manage your workforce at a glance</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search team..." 
            className="bg-surface-container-high border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.map((member, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={member.id || i} 
            className="glass-card p-6 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                {member.full_name?.[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{member.full_name}</h3>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1 uppercase tracking-widest font-black">
                  <Shield className="w-3 h-3" />
                  {member.role}
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Mail className="w-4 h-4" />
                {member.email}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex gap-2">
              <button className="flex-1 py-3 rounded-xl bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors">View Profile</button>
              <button className="flex-1 py-3 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors">Message</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
