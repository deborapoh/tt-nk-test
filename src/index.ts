import express, { Request, Response } from 'express';
import taskRoutes from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json('tt-nk-test');
})

// Tasks routes
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
