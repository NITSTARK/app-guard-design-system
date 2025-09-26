
import { Request, Response } from 'express';
import LockedApp from '../models/LockedApp';
import { webSocketService } from '../index'; // Import the instance from index

// GET /api/apps - List all locked apps for a user
export const getApps = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const apps = await LockedApp.findAll({ where: { userId } });
    res.status(200).json({ success: true, data: apps });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

// POST /api/apps - Add a new app to lock
export const addApp = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { appId, name, icon, path, isLocked } = req.body;

    if (!appId || !name) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'appId and name are required' } });
    }

    const newApp = await LockedApp.create({
      userId,
      appId,
      name,
      icon,
      path,
      isLocked,
    });

    // Notify client of the new app
    if (userId) {
      webSocketService.sendToUser(userId, { type: 'APP_ADDED', payload: newApp });
    }

    res.status(201).json({ success: true, data: newApp });
  } catch (error: any) {
    // Handle potential unique constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: `App with appId '${req.body.appId}' is already registered.` } });
    }
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

// PUT /api/apps/:id - Update an app's settings
export const updateApp = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { name, icon, path, isLocked } = req.body;

    const app = await LockedApp.findOne({ where: { id, userId } });

    if (!app) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'App not found' } });
    }

    app.name = name ?? app.name;
    app.icon = icon ?? app.icon;
    app.path = path ?? app.path;
    app.isLocked = isLocked ?? app.isLocked;

    await app.save();

    // Notify client of the update
    if (userId) {
      webSocketService.sendToUser(userId, { type: 'APP_UPDATED', payload: app });
    }

    res.status(200).json({ success: true, data: app });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

// DELETE /api/apps/:id - Remove an app from the lock list
export const deleteApp = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const app = await LockedApp.findOne({ where: { id, userId } });

    if (!app) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'App not found' } });
    }

    await app.destroy();

    // Notify client of the deletion
    if (userId) {
      webSocketService.sendToUser(userId, { type: 'APP_DELETED', payload: { id } });
    }

    res.status(204).send(); // No content
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

// POST /api/apps/:id/lock - Lock an application
export const lockApp = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const app = await LockedApp.findOne({ where: { id, userId } });

    if (!app) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'App not found' } });
    }

    app.isLocked = true;
    await app.save();

    // Broadcast the status change
    if (userId) {
      webSocketService.sendToUser(userId, { type: 'APP_STATUS_UPDATE', payload: { id: app.id, isLocked: app.isLocked } });
    }

    res.status(200).json({ success: true, data: app });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

// POST /api/apps/:id/unlock - Unlock an application
export const unlockApp = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const app = await LockedApp.findOne({ where: { id, userId } });

    if (!app) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'App not found' } });
    }

    app.isLocked = false;
    await app.save();

    // Broadcast the status change
    if (userId) {
      webSocketService.sendToUser(userId, { type: 'APP_STATUS_UPDATE', payload: { id: app.id, isLocked: app.isLocked } });
    }

    res.status(200).json({ success: true, data: app });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

// GET /api/apps/status - Get the lock status of all apps for a user
export const getAppStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const apps = await LockedApp.findAll({ 
      where: { userId },
      attributes: ['id', 'appId', 'name', 'isLocked']
    });
    res.status(200).json({ success: true, data: apps });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};
