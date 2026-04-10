import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Download,
  Loader2,
  Calendar
} from 'lucide-react';

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    totalHours: 0,
    earnings: 0,
    lateCount: 0,
    attendanceHistory: []
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/reports');
      const data = res.data;
      
      // Calculate aggregate stats from the report array
      const totalHours = data.reduce((acc: number, curr: any) => acc + (curr.completed_shifts * 8), 0);
      const lateCount = data.reduce((acc: number, curr: any) => acc + curr.late_count, 0);
      
      setStats({
        totalHours,
        earnings: totalHours * 20,
        lateCount,
        attendanceHistory: data.slice(0, 5).map((u: any) => ({
          name: u.name,
          status: 'Record Found',
          hours: u.completed_shifts * 8
        }))
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-headline font-black text-white">Performance Reports</h1>
          <p className="text-on-surface-variant mt-1">Detailed breakdown of your work history</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[60px]" />
          <TrendingUp className="text-primary w-10 h-10 mb-6" />
          <p className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant mb-2">Total Earnings</p>
          <div className="flex items-end gap-2">
            <h2 className="text-4xl font-bold text-white">${stats.earnings.toLocaleString()}</h2>
            <span className="text-secondary text-sm font-bold flex items-center mb-1">
              <ArrowUpRight className="w-4 h-4" /> +12%
            </span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-tertiary/10 rounded-full blur-[60px]" />
          <Clock className="text-tertiary w-10 h-10 mb-6" />
          <p className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant mb-2">Hours Logged</p>
          <h2 className="text-4xl font-bold text-white">{stats.totalHours}h</h2>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[60px]" />
          <AlertCircle className="text-red-400 w-10 h-10 mb-6" />
          <p className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant mb-2">Lateness Incidents</p>
          <h2 className="text-4xl font-bold text-white">{stats.lateCount}</h2>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-6">Attendance History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-on-surface-variant font-black">
                <th className="pb-4 px-4">Date</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4">Hours</th>
                <th className="pb-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stats.attendanceHistory.map((row: any, i: number) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="py-5 px-4 text-white font-medium flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="py-5 px-4">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase rounded-lg">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-white">{row.hours}h</td>
                  <td className="py-5 px-4">
                    <button className="text-primary text-xs font-bold hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
