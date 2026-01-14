import express from 'express';

const app = express();
const PORT = 3000;

const tasks = ["Write a diary entry from the future", "Create a time machine from a cardboard box", "Plan a trip to the dinosaurs", "Draw a futuristic city", "List items to bring on a time-travel adventure"];


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});
app.post('/tasks', express.json(), (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
        res.status(201).json({ message: 'Task added', task: newTask });
    } else {
        res.status(400).json({ message: 'Task content is required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});