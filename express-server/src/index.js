/**
 * Express Server - Task Management API
 * 
 * This is a simple REST API server built with Express.js that provides
 * endpoints for managing a task list. It supports creating and retrieving tasks.
 * 
 * @author Anythink Team
 * @version 1.0.0
 */

import express from 'express';

// Initialize Express application
const app = express();

// Server configuration
const PORT = 8001;

/**
 * Middleware Configuration
 * 
 * express.json() - Parses incoming request bodies with JSON content
 */
app.use(express.json());

/**
 * In-memory Task Storage
 * 
 * This array stores all tasks. In a production environment,
 * this should be replaced with a persistent database.
 * 
 * @type {Array<string>}
 */
const tasks = [
  "Write a diary entry from the future",
  "Create a time machine from a cardboard box",
  "Plan a trip to the dinosaurs",
  "Draw a futuristic city",
  "List items to bring on a time-travel adventure"
];

/**
 * GET / - Health Check Endpoint
 * 
 * Returns a simple "Hello World" message to verify the server is running.
 * 
 * @route GET /
 * @returns {string} "Hello World" message
 */
app.get('/', (req, res) => {
  res.send('Hello World');
});

/**
 * POST /tasks - Create a New Task
 * 
 * Adds a new task to the task list. Expects a JSON body with a 'text' field.
 * 
 * @route POST /tasks
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.text - The task description (required)
 * @returns {Object} Success message with 201 status code
 * @throws {400} Returns bad request if text field is missing
 */
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  
  // Validate that task text is provided
  if (!text) {
    return res.status(400).json({ message: 'Task text is required' });
  }
  
  // Add new task to the array
  tasks.push(text);
  res.status(201).json({ message: 'Task added successfully' });
});

/**
 * GET /tasks - Retrieve All Tasks
 * 
 * Returns the complete list of all tasks currently stored in memory.
 * 
 * @route GET /tasks
 * @returns {Object} Object containing the tasks array
 * @returns {Array<string>} tasks - Array of all task descriptions
 */
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

/**
 * Server Initialization
 * 
 * Starts the Express server on the configured port and logs a message
 * indicating the server is ready to accept connections.
 */
app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});
