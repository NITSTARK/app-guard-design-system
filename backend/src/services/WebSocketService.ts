
import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

// Extend the WebSocket interface to include a userId property for authenticated clients
interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
}

class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<string, AuthenticatedWebSocket[]> = new Map(); // Maps userId to an array of WebSocket connections

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server });
    this.initialize();
  }

  private initialize() {
    this.wss.on('connection', (ws: AuthenticatedWebSocket) => {
      console.log('WebSocket client connected');

      ws.on('message', (message: string) => {
        try {
          const data = JSON.parse(message);
          // Handle authentication message
          if (data.type === 'authenticate' && data.token) {
            this.authenticateClient(ws, data.token);
          }
        } catch (error) {
          console.error('WebSocket message error:', error);
          ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
        }
      });

      ws.on('close', () => {
        console.log('WebSocket client disconnected');
        this.removeClient(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.removeClient(ws);
      });
    });
  }

  private authenticateClient(ws: AuthenticatedWebSocket, token: string) {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const userId = decoded.userId;
      ws.userId = userId;

      if (!this.clients.has(userId)) {
        this.clients.set(userId, []);
      }
      this.clients.get(userId)!.push(ws);

      console.log(`WebSocket client authenticated for userId: ${userId}`);
      ws.send(JSON.stringify({ type: 'authenticated', message: 'Authentication successful' }));
    } catch (error) {
      console.error('WebSocket authentication error:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Authentication failed' }));
      ws.close();
    }
  }

  private removeClient(ws: AuthenticatedWebSocket) {
    if (ws.userId) {
      const userSockets = this.clients.get(ws.userId);
      if (userSockets) {
        const index = userSockets.indexOf(ws);
        if (index > -1) {
          userSockets.splice(index, 1);
        }
        if (userSockets.length === 0) {
          this.clients.delete(ws.userId);
        }
      }
    }
  }

  public sendToUser(userId: string, message: object) {
    const userSockets = this.clients.get(userId);
    if (userSockets) {
      const messageString = JSON.stringify(message);
      userSockets.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageString);
        }
      });
    }
  }

  public broadcast(message: object) {
    const messageString = JSON.stringify(message);
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  }
}

export default WebSocketService;
