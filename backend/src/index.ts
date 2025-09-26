
import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import sequelize from './config/database';
import WebSocketService from './services/WebSocketService';

// Import models to ensure they are initialized
import './models/User';
import './models/RefreshToken';
import './models/LockedApp';
import './models/EncryptedFile';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import appRoutes from './routes/appRoutes';
import fileRoutes from './routes/fileRoutes';

const app: Application = express();
const server = http.createServer(app);
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Initialize WebSocket Service
export const webSocketService = new WebSocketService(server);

app.use(cors());
app.use(express.json());

// Database synchronization
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Database sync error:', err);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/files', fileRoutes);

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
