import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'database.sqlite'));

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS subtasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    task_id INTEGER,
    FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE
  );
`);

// User routes
app.post('/api/users/login', (req, res) => {
  const { username } = req.body;
  try {
    let user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (!user) {
      const result = db.prepare('INSERT INTO users (username) VALUES (?)').run(username);
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    }
    
    res.json({ _id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task routes
app.get('/api/tasks/:userId', (req, res) => {
  try {
    const tasks = db.prepare(`
      SELECT 
        t.id as _id, 
        t.title, 
        t.description, 
        t.completed, 
        t.created_at as createdAt,
        t.user_id as userId
      FROM tasks t
      WHERE t.user_id = ?
    `).all(req.params.userId);

    // Get subtasks for each task
    for (const task of tasks) {
      task.subTasks = db.prepare(`
        SELECT 
          id as _id,
          title,
          completed
        FROM subtasks
        WHERE task_id = ?
      `).all(task._id);
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tasks', (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const result = db.prepare(
      'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)'
    ).run(title, description, userId);

    const task = db.prepare(`
      SELECT 
        id as _id, 
        title, 
        description, 
        completed, 
        created_at as createdAt,
        user_id as userId
      FROM tasks
      WHERE id = ?
    `).get(result.lastInsertRowid);

    task.subTasks = [];
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/tasks/:taskId', (req, res) => {
  const { completed } = req.body;
  try {
    db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(completed ? 1 : 0, req.params.taskId);
    if (completed) {
      db.prepare('UPDATE subtasks SET completed = 1 WHERE task_id = ?').run(req.params.taskId);
    }

    const task = db.prepare(`
      SELECT 
        id as _id, 
        title, 
        description, 
        completed, 
        created_at as createdAt,
        user_id as userId
      FROM tasks
      WHERE id = ?
    `).get(req.params.taskId);

    task.subTasks = db.prepare(`
      SELECT 
        id as _id,
        title,
        completed
      FROM subtasks
      WHERE task_id = ?
    `).all(task._id);

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tasks/:taskId', (req, res) => {
  try {
    db.prepare('DELETE FROM subtasks WHERE task_id = ?').run(req.params.taskId);
    db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.taskId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tasks/:taskId/subtasks', (req, res) => {
  const { title } = req.body;
  try {
    db.prepare(
      'INSERT INTO subtasks (title, task_id) VALUES (?, ?)'
    ).run(title, req.params.taskId);

    const task = db.prepare(`
      SELECT 
        id as _id, 
        title, 
        description, 
        completed, 
        created_at as createdAt,
        user_id as userId
      FROM tasks
      WHERE id = ?
    `).get(req.params.taskId);

    task.subTasks = db.prepare(`
      SELECT 
        id as _id,
        title,
        completed
      FROM subtasks
      WHERE task_id = ?
    `).all(task._id);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/tasks/:taskId/subtasks/:subtaskId', (req, res) => {
  const { completed } = req.body;
  try {
    db.prepare(
      'UPDATE subtasks SET completed = ? WHERE id = ? AND task_id = ?'
    ).run(completed ? 1 : 0, req.params.subtaskId, req.params.taskId);

    const task = db.prepare(`
      SELECT 
        id as _id, 
        title, 
        description, 
        completed, 
        created_at as createdAt,
        user_id as userId
      FROM tasks
      WHERE id = ?
    `).get(req.params.taskId);

    task.subTasks = db.prepare(`
      SELECT 
        id as _id,
        title,
        completed
      FROM subtasks
      WHERE task_id = ?
    `).all(task._id);

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});