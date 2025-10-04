// graphql-server.js (CRUD Enabled)
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

let nextId = 4;
let tasks = [
    { id: 1, title: 'Learn GraphQL: Query', completed: true },
    { id: 2, title: 'Learn GraphQL: Mutation', completed: false },
    { id: 3, title: 'Practice with schemas', completed: false },
];

const schema = buildSchema(`
  type Task { id: Int!, title: String!, completed: Boolean }
  
  type Query {
    getAllTasks: [Task]
  }

  type Mutation {
    createTask(title: String!): Task
    updateTask(id: Int!): Task
    deleteTask(id: Int!): Boolean
  }
`);

const root = {
    // READ
    getAllTasks: () => tasks,
    
    // CREATE
    createTask: ({ title }) => {
        const newTask = { id: nextId++, title, completed: false };
        tasks.push(newTask);
        return newTask;
    },

    // UPDATE
    updateTask: ({ id }) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return null;
        task.completed = !task.completed;
        return task;
    },

    // DELETE
    deleteTask: ({ id }) => {
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== id);
        return tasks.length < initialLength;
    },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));
app.listen(4000, () => console.log('✅ GraphQL CRUD server ON at http://localhost:4000/graphql'));