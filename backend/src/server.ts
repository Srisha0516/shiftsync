import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { config } from './config/env';
import './services/cron.service'; // Start cron jobs

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: config.frontendUrl,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  
  // Custom event mappings can be handled here or inside controllers using io.emit
  
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(config.port, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});
