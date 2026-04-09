import { Filter, Upload, Repeat, CalendarX, MoreHorizontal, Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function ManagerDashboard() {
  const days = [
    { name: 'Monday', date: '11' },
    { name: 'Tuesday', date: '12' },
    { name: 'Wednesday', date: '13' },
    { name: 'Thursday', date: '14', active: true },
    { name: 'Friday', date: '15' },
    { name: 'Saturday', date: '16' },
    { name: 'Sunday', date: '17' },
  ];

  const attendance = [
    { name: 'Alex Rivera', role: 'Floor Lead', shift: '08:00 - 16:00', clockIn: '07:54 AM', status: 'On Time', color: 'green' },
    { name: 'Sarah Low', role: 'Sales Assoc.', shift: '08:00 - 16:00', clockIn: '08:05 AM', status: 'Late', color: 'amber' },
    { name: 'James Knight', role: 'Administrator', shift: '09:00 - 17:00', clockIn: '08:58 AM', status: 'On Time', color: 'green' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 space-y-8 flex-1 overflow-y-auto"
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-between p-8 rounded-3xl glass-panel relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-on-surface mb-2">Weekly Schedule</h2>
                <p className="text-slate-400 max-w-md">Optimize your workforce for the upcoming week. Currently viewing <span className="text-primary font-semibold">Dec 11 - Dec 17</span>.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl transition-all font-medium border border-white/5">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                  <Upload className="w-4 h-4" />
                  Publish
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4">
          <div className="glass-panel p-6 rounded-3xl flex items-center justify-between border-l-4 border-tertiary">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Pending Swaps</p>
              <h3 className="text-2xl font-black text-on-surface">12 Requests</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <Repeat className="w-6 h-6" />
            </div>
          </div>
          <div className="glass-panel p-6 rounded-3xl flex items-center justify-between border-l-4 border-primary">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Leave Approvals</p>
              <h3 className="text-2xl font-black text-on-surface">4 Pending</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <CalendarX className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] p-1 overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-white/5">
          {days.map((day) => (
            <div key={day.name} className="p-4 text-center bg-surface-container-low">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${day.active ? 'text-primary' : 'text-slate-500'}`}>{day.name}</p>
              <p className={`text-xl font-bold ${day.active ? 'text-primary' : 'text-on-surface'}`}>{day.date}</p>
            </div>
          ))}
          {/* Mock Shift Row */}
          <div className="min-h-[140px] p-3 bg-surface-container/50 space-y-2">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group cursor-pointer hover:bg-primary/20 transition-all">
              <p className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1">Morning Shift</p>
              <div className="flex items-center gap-2">
                <img className="w-6 h-6 rounded-full object-cover" src="https://picsum.photos/seed/alex/50/50" referrerPolicy="no-referrer" />
                <span className="text-xs font-medium text-slate-300">Alex R.</span>
              </div>
            </div>
          </div>
          <div className="min-h-[140px] p-3 bg-surface-container/50">
             <div className="p-2.5 rounded-xl bg-slate-800/50 border border-white/5 opacity-40">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">Open Slot</p>
              <button className="w-full py-1.5 rounded-lg border border-dashed border-white/20 text-[10px] text-slate-400 hover:text-white transition-colors">Assign</button>
            </div>
          </div>
          <div className="min-h-[140px] p-3 bg-surface-container/50">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1">Morning Shift</p>
              <div className="flex items-center gap-2">
                <img className="w-6 h-6 rounded-full object-cover" src="https://picsum.photos/seed/sarah/50/50" referrerPolicy="no-referrer" />
                <span className="text-xs font-medium text-slate-300">Sarah L.</span>
              </div>
            </div>
          </div>
          <div className="min-h-[140px] p-3 bg-surface-container/50">
            <div className="p-2.5 rounded-xl bg-tertiary/10 border border-tertiary/20">
              <p className="text-[10px] font-bold text-tertiary uppercase tracking-tighter mb-1">Admin Task</p>
              <div className="flex items-center gap-2">
                <img className="w-6 h-6 rounded-full object-cover" src="https://picsum.photos/seed/james/50/50" referrerPolicy="no-referrer" />
                <span className="text-xs font-medium text-slate-300">James K.</span>
              </div>
            </div>
          </div>
          <div className="min-h-[140px] p-3 bg-surface-container/50">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1">Morning Shift</p>
              <div className="flex items-center gap-2">
                <img className="w-6 h-6 rounded-full object-cover" src="https://picsum.photos/seed/elena/50/50" referrerPolicy="no-referrer" />
                <span className="text-xs font-medium text-slate-300">Elena M.</span>
              </div>
            </div>
          </div>
          <div className="min-h-[140px] p-3 bg-surface-container/50"></div>
          <div className="min-h-[140px] p-3 bg-surface-container/50"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-on-surface">Daily Attendance Report</h3>
            <button className="text-sm text-primary font-medium hover:underline">View Full Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="pb-4 font-bold">Employee</th>
                  <th className="pb-4 font-bold">Shift</th>
                  <th className="pb-4 font-bold">Clock In</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attendance.map((person) => (
                  <tr key={person.name} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-200">{person.name}</p>
                          <p className="text-[10px] text-slate-500">{person.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-xs text-slate-400">{person.shift}</td>
                    <td className="py-4 text-xs text-slate-200">{person.clockIn}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        person.color === 'green' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {person.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-500 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-on-surface">Leave Requests</h4>
              <span className="text-[10px] font-black bg-primary text-on-primary-container px-2 py-0.5 rounded-full">4</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex gap-3 mb-3">
                  <img className="w-8 h-8 rounded-full object-cover" src="https://picsum.photos/seed/elena/50/50" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-sm font-bold text-slate-200">Elena Miller</p>
                    <p className="text-[10px] text-slate-500">Dec 18 - Dec 20 (3 days)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2 italic">"Family emergency requires travel during these dates. Thank you."</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-colors">Decline</button>
                  <button className="py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-primary text-on-primary-container hover:shadow-lg hover:shadow-primary/20 transition-all">Approve</button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-tertiary/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Shift Swap</span>
                  <span className="text-[10px] text-slate-500">2h ago</span>
                </div>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <img className="w-8 h-8 rounded-full object-cover mx-auto mb-1" src="https://picsum.photos/seed/marcus/50/50" referrerPolicy="no-referrer" />
                    <p className="text-[10px] text-slate-300">Marcus</p>
                  </div>
                  <Repeat className="w-4 h-4 text-slate-600" />
                  <div className="text-center">
                    <img className="w-8 h-8 rounded-full object-cover mx-auto mb-1" src="https://picsum.photos/seed/james/50/50" referrerPolicy="no-referrer" />
                    <p className="text-[10px] text-slate-300">James</p>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-tertiary text-tertiary hover:bg-tertiary hover:text-on-tertiary transition-all">Review Swap</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-50">
        <button className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-on-primary-container shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden">
          <Sparkles className="w-8 h-8 z-10 fill-current" />
          <span className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-25"></span>
        </button>
      </div>
    </motion.div>
  );
}
