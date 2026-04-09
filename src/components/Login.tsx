import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] bg-primary-container/20 blur-[100px] rounded-full"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 bg-surface-container/40 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)] border border-white/5"
      >
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#131b2e] to-[#0b1326] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#07006c] fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-primary">ShiftSync</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-on-surface leading-tight mb-6">
              Precision <br/>
              <span className="text-primary">Workforce</span> <br/>
              Orchestration.
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xs leading-relaxed">
              The intelligence layer for enterprise scheduling. Experience the future of team coordination.
            </p>
          </div>
          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i}
                  alt={`User ${i}`} 
                  className="w-10 h-10 rounded-full border-2 border-background" 
                  src={`https://picsum.photos/seed/user${i}/100/100`}
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container-highest flex items-center justify-center text-xs font-bold text-primary">+12k</div>
            </div>
            <p className="text-xs font-medium tracking-widest uppercase text-slate-500">Trusted by Global Operations</p>
          </div>
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center bg-surface-container/60">
          <div className="max-w-sm mx-auto w-full">
            <header className="mb-10">
              <h2 className="text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant">Enter your credentials to access the Obsidian dashboard.</p>
            </header>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    className="block w-full px-4 py-4 bg-surface-container-lowest border-0 rounded-xl text-on-surface focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                    placeholder="Email Address"
                    type="email"
                    required
                  />
                </div>
                <div className="relative group">
                  <input 
                    className="block w-full px-4 py-4 bg-surface-container-lowest border-0 rounded-xl text-on-surface focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                    placeholder="Password"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-offset-background" type="checkbox" />
                  <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-primary font-medium hover:underline decoration-primary/30">Forgot password?</button>
              </div>
              <button 
                className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:shadow-[0_0_30px_rgba(192,193,255,0.5)] active:scale-[0.98] transition-all duration-300"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-on-surface-variant text-sm mb-4">New to ShiftSync?</p>
              <button className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant text-on-surface hover:bg-white/5 transition-all text-sm font-medium">
                Request Invite Access
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
