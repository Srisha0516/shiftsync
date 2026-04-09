import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { User, Mail, Lock, Building, ArrowRight, Loader2 } from 'lucide-react';

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
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] flex items-center justify-center px-4 font-body">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(192, 193, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
      }}></div>

      <div className="w-full max-w-md relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-tertiary/5 blur-[100px] rounded-full"></div>

        <div className="bg-[#161f33]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <span className="text-3xl font-black tracking-tighter text-[#c0c1ff] mb-2">ShiftSync</span>
            <h2 className="text-xl font-headline font-bold text-on-surface">Join the Future</h2>
            <p className="text-on-surface-variant text-sm mt-1">Start optimizing your team today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                name="full_name"
                type="text"
                placeholder="Full Name"
                className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-on-surface placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative group">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                name="business_name"
                type="text"
                placeholder="Business/Store Name"
                className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-on-surface placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
                value={formData.business_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-on-surface placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-on-surface placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-tertiary hover:opacity-90 text-on-primary font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-on-surface-variant text-sm mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#c0c1ff] hover:underline font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
