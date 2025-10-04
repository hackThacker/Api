// rest-server.js (CRUD Enabled)
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let nextId = 4;
const initialTasks = () => [
    { id: 1, title: 'Learn REST: GET', completed: true },
    { id: 2, title: 'Learn REST: POST', completed: false },
    { id: 3, title: 'Learn REST: DELETE', completed: false },
];
let tasks = initialTasks();

app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies

// READ (Get all tasks)
app.get('/tasks', (req, res) => res.json(tasks));

// CREATE (Add a new task)
app.post('/tasks', (req, res) => {
    if (!req.body.title) return res.status(400).json({ message: 'Title is required' });
    const newTask = { id: nextId++, title: req.body.title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// UPDATE (Toggle a task's completed status)
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE (Remove a task)
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    if (tasks.length < initialLength) {
        res.status(204).send(); // Success, no content
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Custom endpoint to reset data for the demo
app.post('/reset', (req, res) => {
    tasks = initialTasks();
    nextId = 4;
    res.json({ message: 'Data reset successfully' });
});

app.listen(port, () => console.log(`✅ REST CRUD server ON at http://localhost:${port}`));