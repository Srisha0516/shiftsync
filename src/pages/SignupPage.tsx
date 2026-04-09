import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Building, Loader2, ArrowRight, UserPlus } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    business_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/register-manager', formData);
      login(response.data.accessToken, { id: '', name: formData.full_name, role: 'manager' });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[35%] h-[35%] bg-primary/15 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tertiary/50 to-transparent"></div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-tertiary/10 text-tertiary mb-6 ring-1 ring-tertiary/20">
              <UserPlus className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-headline font-black tracking-tight text-white mb-2">Join ShiftSync</h1>
            <p className="text-on-surface-variant font-medium">Start optimizing your team's workflow</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-2xl text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-tertiary" />
                  <input
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-tertiary/50 transition-all font-medium"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Business Name</label>
                <div className="relative group">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-tertiary" />
                  <input
                    name="business_name"
                    type="text"
                    value={formData.business_name}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-tertiary/50 transition-all font-medium"
                    placeholder="Acme Corp"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-tertiary" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-tertiary/50 transition-all font-medium"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-tertiary" />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-tertiary/50 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 rounded-2xl bg-gradient-to-br from-tertiary/80 to-tertiary text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-tertiary/20 flex items-center justify-center gap-3 mt-6 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <footer className="mt-10 text-center">
            <p className="text-on-surface-variant text-sm font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-tertiary font-bold hover:underline transition-colors">Sign In</Link>
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
