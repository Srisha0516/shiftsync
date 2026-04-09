import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PricingPage from './PricingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PricingPage />} />
        {/* Placeholder for manager/employee dashboard routes */}
        <Route path="/dashboard" element={<div className="p-8 text-on-surface">Dashboard under construction...</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
