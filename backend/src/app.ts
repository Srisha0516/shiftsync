import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth.routes';
import availabilityRoutes from './routes/availability.routes';
import shiftRoutes from './routes/shift.routes';
import attendanceRoutes from './routes/attendance.routes';
import swapRoutes from './routes/swap.routes';
import leaveRoutes from './routes/leave.routes';
import noticeRoutes from './routes/notice.routes';
import aiRoutes from './routes/ai.routes';
import reportRoutes from './routes/report.routes';

const app = express();

// Manual high-priority CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://shiftsync-psi.vercel.app',
    'https://shiftsync-git-main-srisha0516s-projects.vercel.app',
    'https://shiftsync-47pxnn0hg-srisha0516s-projects.vercel.app',
    'http://localhost:5173'
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorHandler);

export default app;
