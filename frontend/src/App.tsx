import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PricingPage from './PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  if (loading) return null;
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-[#0b1326] text-on-surface p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-[#c0c1ff]">ShiftSync</h1>
            <p className="text-on-surface-variant">Command Center</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Welcome, {user?.name}</span>
            <button 
              onClick={logout}
              className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition-all"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Schedules', icon: 'calendar_month', val: '12 Active' },
            { title: 'Staff', icon: 'group', val: '24 Members' },
            { title: 'Alerts', icon: 'notifications', val: '2 Pending' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#161f33]/50 border border-white/5 p-6 rounded-2xl">
              <span className="material-symbols-outlined text-primary mb-4">{stat.icon}</span>
              <h3 className="text-slate-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold mt-1">{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-12 text-center bg-[#161f33]/30 border border-dashed border-white/10 rounded-3xl">
          <p className="text-on-surface-variant italic">Full scheduling modules loading...</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
