import express from 'express';

const app = express();
const PORT = 8001;

// Middleware
app.use(express.json());

// In-memory task list
const tasks = [
  "Write a diary entry from the future",
  "Create a time machine from a cardboard box",
  "Plan a trip to the dinosaurs",
  "Draw a futuristic city",
  "List items to bring on a time-travel adventure"
];

// GET /
app.get('/', (req, res) => {
  res.send('Hello World');
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ message: 'Task text is required' });
  }
  
  tasks.push(text);
  res.status(201).json({ message: 'Task added successfully' });
});

// GET /tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});
