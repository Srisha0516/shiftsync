import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Timer, 
  CalendarDays, 
  Utensils, 
  Moon, 
  MapPin, 
  ArrowRightLeft, 
  TrendingUp, 
  Clock,
  ChevronRight,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="p-8 space-y-8"
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Main Status Panel */}
        <motion.div variants={item} className="col-span-12 lg:col-span-7 glass-card rounded-[2.5rem] p-10 relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-1000"></div>
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isClockedIn ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                  {isClockedIn ? 'On Duty' : 'Ready for Shift'}
                </span>
                <span className="text-on-surface-variant text-xs font-medium">Starts in 34m</span>
              </div>
              <h2 className="text-4xl font-headline font-black text-white leading-tight mb-4">
                Good Morning!<br/>Your shift at Section B awaits.
              </h2>
            </div>

            <div className="flex items-center gap-10 mt-12">
              <button 
                onClick={() => setIsClockedIn(!isClockedIn)}
                className="relative group/btn active:scale-95 transition-all"
              >
                <div className={`absolute -inset-4 rounded-full blur-2xl transition-all animate-pulse ${isClockedIn ? 'bg-secondary/20' : 'bg-primary/20'}`}></div>
                <div className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all border-4 border-white/5 ${isClockedIn ? 'bg-secondary' : 'bg-primary'}`}>
                  <Timer className="w-8 h-8 mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-tight">{isClockedIn ? 'Clock Out' : 'Clock In'}</span>
                </div>
              </button>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-[10px] font-black uppercase text-on-surface-variant mb-2">Weekly Hours</p>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">28.4h</span>
                    <span className="text-[10px] text-on-surface-variant">/ 40h</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[70%]" />
                  </div>
                </div>
                <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-[10px] font-black uppercase text-on-surface-variant mb-2">Earnings</p>
                  <p className="text-2xl font-bold text-secondary">$842.00</p>
                  <div className="flex items-center gap-1 text-[10px] text-secondary mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12% this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Small Widgets */}
        <motion.div variants={item} className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-6">
          <div className="bg-surface-container-high rounded-[2.5rem] p-8 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg mb-2">Swap Hub</h4>
            <p className="text-on-surface-variant text-xs">2 active requests matching your role</p>
            <div className="mt-6 flex items-center text-primary text-xs font-bold gap-2">
              View All <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="bg-surface-container-high rounded-[2.5rem] p-8 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-6">
              <CalendarDays className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg mb-2">Leave</h4>
            <p className="text-on-surface-variant text-xs">Manage your time off requests</p>
            <div className="mt-6 flex items-center text-tertiary text-xs font-bold gap-2">
              Apply Now <Plus className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Upcoming Shifts Table-like Card */}
        <motion.div variants={item} className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center ml-2">
            <h3 className="text-xl font-headline font-bold text-white">Upcoming Shifts</h3>
            <button className="text-sm font-bold text-primary hover:underline">Full Schedule</button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, title: 'Lunch Rush - Kitchen', date: 'Oct 28', time: '11:00 AM - 4:00 PM', loc: 'Main Area', color: 'primary' },
              { id: 2, title: 'Evening Bar Service', date: 'Oct 29', time: '6:00 PM - 1:00 AM', loc: 'Lounge', color: 'tertiary' },
            ].map((shift) => (
              <div key={shift.id} className="flex items-center justify-between p-6 glass rounded-3xl group hover:bg-white/5 transition-all outline outline-1 outline-transparent hover:outline-white/10">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${shift.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>
                    {shift.color === 'primary' ? <Utensils className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">{shift.title}</h5>
                    <div className="flex items-center gap-3 mt-1 text-on-surface-variant text-sm">
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {shift.time}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {shift.loc}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant px-3 py-1 bg-white/5 rounded-lg border border-white/5">{shift.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mini Team Panel */}
        <motion.div variants={item} className="col-span-12 lg:col-span-4">
           <div className="glass-card rounded-[2.5rem] p-8 h-full">
              <h3 className="text-lg font-bold mb-6">Who's Working</h3>
              <div className="space-y-5">
                {[
                  { name: 'Alex Cooper', role: 'Head Chef', status: 'Working' },
                  { name: 'Bella Thorne', role: 'Lead Server', status: 'Working' },
                  { name: 'Chris Evans', role: 'Bar Staff', status: 'Starting in 10m' },
                ].map((member, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{member.name}</p>
                      <p className="text-[10px] uppercase text-on-surface-variant font-bold tracking-tight">{member.role}</p>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#2dd4bf]"></div>
                  </div>
                ))}
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
