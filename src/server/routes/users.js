import express from 'express';
import { User } from '../models/User.js';

export const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({ username });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});