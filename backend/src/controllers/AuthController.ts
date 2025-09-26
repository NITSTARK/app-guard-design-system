
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import RefreshToken from '../models/RefreshToken';
import { JWT_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../config/constants';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email, password, and name are required' } });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'User with this email already exists' } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({ success: true, data: { id: user.id, email: user.email, name: user.name } });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' } });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
    }

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)), // 7 days
    });

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        },
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Refresh token is required' } });
    }

    const storedRefreshToken = await RefreshToken.findOne({ where: { token: refreshToken } });

    if (!storedRefreshToken || storedRefreshToken.expiresAt < new Date()) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid or expired refresh token' } });
    }

    const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not found' } });
    }

    const newAccessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

    res.status(200).json({ success: true, data: { accessToken: newAccessToken } });
  } catch (error: any) {
    console.error('Refresh token error:', error);
    res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid or expired refresh token' } });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Refresh token is required' } });
    }

    await RefreshToken.destroy({ where: { token: refreshToken } });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
    }

    res.status(200).json({ success: true, data: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } });
  } catch (error: any) {
    console.error('Get me error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

// --- Mocked Windows Hello Endpoints ---

export const getWindowsHelloChallenge = async (req: Request, res: Response) => {
  // In a real implementation, this would generate a unique challenge for the user.
  // For this mock, we return a static challenge.
  res.status(200).json({ success: true, data: { challenge: 'mock-challenge-string-12345' } });
};

export const verifyWindowsHello = async (req: Request, res: Response) => {
  try {
    const { email, challengeResponse } = req.body;

    // In a real implementation, we would verify the challengeResponse from the Windows Hello API.
    // For this mock, we assume verification is successful and log in the user by their email.
    if (!email) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email is required for mock verification' } });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not found for mock verification' } });
    }

    // Generate tokens as in a normal login
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)), // 7 days
    });

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        },
      },
    });

  } catch (error: any) {
    console.error('Windows Hello mock verification error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};
