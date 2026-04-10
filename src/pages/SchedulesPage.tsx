import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  X, 
  Loader2, 
  CheckCircle2,
  Sparkles 
} from 'lucide-react';

const SchedulesPage = () => {
  const { user } = useAuth();
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [team, setTeam] = useState<any[]>([]);

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [shiftsRes, teamRes] = await Promise.all([
        api.get('/shifts'),
        api.get('/auth/team')
      ]);
      setShifts(shiftsRes.data);
      setTeam(teamRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShift = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/shifts', {
        title,
        shift_date: date,
        start_time: startTime,
        end_time: endTime,
        user_ids: [selectedUser]
      });
      setShowAddModal(false);
      fetchData();
      alert('Shift created and assigned!');
    } catch (err) {
      alert('Failed to create shift');
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-headline font-black text-white">Work Roster</h1>
          <p className="text-on-surface-variant mt-1">View and manage upcoming assignments</p>
        </div>
        {user?.role === 'manager' && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary py-3 px-6 flex items-center gap-2 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Create Shift
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {shifts.map((shift, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={shift.id} 
            className="glass rounded-3xl p-6 flex items-center justify-between group hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-white/5 flex flex-col items-center justify-center text-on-surface-variant font-bold">
                 <span className="text-[10px] uppercase opacity-50">{new Date(shift.shift_date).toLocaleString('default', { month: 'short' })}</span>
                 <span className="text-xl">{new Date(shift.shift_date).getDate()}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{shift.title}</h3>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {shift.start_time} - {shift.end_time}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(shift.shift_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {shift.shift_assignments?.map((a: any, j: number) => (
                  <div key={j} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-primary font-black text-xs" title={a.users?.full_name}>
                    {a.users?.full_name?.[0]}
                  </div>
                ))}
              </div>
              <div className="h-10 w-[1px] bg-white/5 mx-2" />
              <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest">Confirmed</span>
            </div>
          </motion.div>
        ))}
        {shifts.length === 0 && (
          <div className="text-center py-20 glass rounded-[3rem]">
            <Calendar className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold text-white">No shifts scheduled</h3>
            <p className="text-on-surface-variant mt-1">Get started by creating your first shift assignment.</p>
          </div>
        )}
      </div>

      {/* Add Shift Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass-card p-10 rounded-[2.5rem] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-headline font-black text-white flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-primary" />
                  New Shift
                </h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/5 rounded-full text-on-surface-variant hover:text-white transition-colors">
                  <X />
                </button>
              </div>

              <form onSubmit={handleCreateShift} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">Shift Title</label>
                    <input 
                      required 
                      className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50"
                      placeholder="e.g. Morning Floor Service"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">Date</label>
                        <input 
                          type="date" 
                          required 
                          className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">Assign To</label>
                        <select 
                          required 
                          className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50"
                          value={selectedUser}
                          onChange={(e) => setSelectedUser(e.target.value)}
                        >
                          <option value="">Select User</option>
                          {team.map(u => <option key={u.id} value={u.id}>{u.full_name}</option>)}
                        </select>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">Start Time</label>
                        <input 
                          type="time" 
                          required 
                          className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-on-surface-variant ml-1">End Time</label>
                        <input 
                          type="time" 
                          required 
                          className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                 </div>

                 <button type="submit" className="w-full btn-primary py-5 rounded-3xl font-black uppercase tracking-widest text-sm mt-4">
                    Confirm Assignment
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SchedulesPage;
