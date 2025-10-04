// rpc-server.js (CRUD Enabled)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

let nextId = 4;
let tasks = [
    { id: 1, title: 'Learn RPC: Call a function', completed: true },
    { id: 2, title: 'Pass parameters', completed: false },
    { id: 3, title: 'Handle results', completed: false },
];

app.use(cors());
app.use(bodyParser.json());

const methods = {
    // READ
    getAllTasks: () => tasks,

    // CREATE
    createTask: (params) => {
        const title = params[0];
        if (!title) return { error: 'Title is required' };
        const newTask = { id: nextId++, title, completed: false };
        tasks.push(newTask);
        return newTask;
    },

    // UPDATE
    updateTask: (params) => {
        const id = params[0];
        const task = tasks.find(t => t.id === id);
        if (!task) return null;
        task.completed = !task.completed;
        return task;
    },

    // DELETE
    deleteTask: (params) => {
        const id = params[0];
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== id);
        return tasks.length < initialLength;
    }
};

app.post('/rpc', (req, res) => {
    const { method, params, id } = req.body;
    if (methods[method]) {
        const result = methods[method](params);
        res.json({ jsonrpc: '2.0', result, id });
    } else {
        res.status(400).json({ jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id });
    }
});

app.listen(port, () => console.log(`✅ RPC CRUD server ON at http://localhost:${port}`));