
import { Request, Response } from 'express';
import User from '../models/User';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
    }

    res.status(200).json({ success: true, data: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } });
  } catch (error: any) {
    console.error('Get user profile error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { name, email, avatar } = req.body;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email already in use' } });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.status(200).json({ success: true, data: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } });
  } catch (error: any) {
    console.error('Update user profile error:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
  }
};
