
import { toast } from "sonner";

export type NotificationType = 'access_request' | 'file_shared' | 'access_granted';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  from?: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  read: boolean;
  data?: {
    fileId?: string;
    fileName?: string;
    deviceName?: string;
    userId?: string;
  };
}

// Mock notifications for demo purposes
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'access_request',
    title: 'Access Request',
    message: 'Mobile device is requesting access to hidden files',
    from: {
      name: 'iPhone 13',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    data: {
      deviceName: 'iPhone 13',
      userId: 'user123'
    }
  },
  {
    id: '2',
    type: 'file_shared',
    title: 'File Shared',
    message: 'Project_Confidential.pdf has been shared with you',
    from: {
      name: 'Anna Smith',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    data: {
      fileId: 'file123',
      fileName: 'Project_Confidential.pdf'
    }
  },
  {
    id: '3',
    type: 'access_granted',
    title: 'Access Granted',
    message: 'Your request to access hidden files has been approved',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    data: {}
  }
];

class NotificationService {
  private notifications: Notification[] = [...mockNotifications];
  private listeners: Array<(notifications: Notification[]) => void> = [];

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(id: string): void {
    this.notifications = this.notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.notifyListeners();
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map(notification => ({ ...notification, read: true }));
    this.notifyListeners();
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      read: false
    };
    
    this.notifications = [newNotification, ...this.notifications];
    this.notifyListeners();
    
    // Also show a toast notification
    toast.info(notification.title, {
      description: notification.message,
    });
  }

  deleteNotification(id: string): void {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.notifyListeners();
  }

  subscribeToNotifications(callback: (notifications: Notification[]) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getNotifications()));
  }

  // Handle access request from mobile device
  requestAccess(deviceName: string, userId: string): void {
    this.addNotification({
      type: 'access_request',
      title: 'Access Request',
      message: `${deviceName} is requesting access to hidden files`,
      from: {
        name: deviceName
      },
      data: {
        deviceName,
        userId
      }
    });
  }

  // Grant access to a device
  grantAccess(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && notification.type === 'access_request') {
      this.markAsRead(notificationId);
      toast.success('Access granted', {
        description: `Access granted to ${notification.data?.deviceName}`,
      });
    }
  }

  // Deny access to a device
  denyAccess(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && notification.type === 'access_request') {
      this.markAsRead(notificationId);
      this.deleteNotification(notificationId);
      toast.info('Access denied', {
        description: `Access denied for ${notification.data?.deviceName}`,
      });
    }
  }
}

// Create a singleton instance
const notificationService = new NotificationService();
export default notificationService;
