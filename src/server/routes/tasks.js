import express from 'express';
import { Task } from '../models/Task.js';

export const taskRouter = express.Router();

// Get tasks for a user
taskRouter.get('/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create task
taskRouter.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task
taskRouter.patch('/:taskId', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task
taskRouter.delete('/:taskId', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add subtask
taskRouter.post('/:taskId/subtasks', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    task.subTasks.push(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update subtask
taskRouter.patch('/:taskId/subtasks/:subtaskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    const subtask = task.subTasks.id(req.params.subtaskId);
    Object.assign(subtask, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});