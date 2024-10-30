import express, { Request, Response } from 'express'
import { Task } from './task'

const router = express.Router();

let tasks: Task[] = []
let currentTaskId = 1

// GET /tasks - Retrieve all tasks
router.get('/', (req: Request, res: Response) => {
  res.status(201).json(tasks);
})

// POST /tasks - Create a new task
router.post('/', (req: Request, res: Response) => {
  const { title, completed } = req.body;

  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    res.status(400).json('Invalid data');
    return
  }

  const newTask: Task = { id: currentTaskId++, title, completed };
  tasks.push(newTask);

  res.status(201).json(newTask);
})

// PUT /tasks/:id - Update an existing task by ID
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const taskId = parseInt(id, 10);

  if (!taskId) {
    res.status(400).json({ error: 'Invalid task id' });
    return
  }

  if ((title && typeof title !== 'string') || (completed && typeof completed !== 'boolean')) {
    res.status(400).json({ error: 'Invalid data' });
    return
  }

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
    return
  }

  // Update only if fields are provided in the request
  if (title !== undefined) {
    if (typeof title !== 'string') {
      res.status(400).json({ error: 'Invalid title' })
      return
    }
    tasks[taskIndex].title = title;
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      res.status(400).json({ error: 'Invalid completed status' });
      return
    }
    tasks[taskIndex].completed = completed;
  }

  res.json(tasks[taskIndex]);
})

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const taskId = parseInt(id, 10);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
    return
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
})

export default router;
