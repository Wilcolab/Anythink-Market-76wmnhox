# Anythink Market - Multi-Server Application

A microservices project featuring both Express.js (Node.js) and FastAPI (Python) servers for managing a task list. This project demonstrates containerization with Docker and Docker Compose for orchestrating multiple services.

## Overview

This application provides a distributed task management system with:
- **Express Server** - Node.js REST API on port 8001
- **FastAPI Server** - Python REST API on port 8000
- **Docker Compose** - Multi-container orchestration

Both servers expose identical API endpoints for managing tasks, allowing you to choose between Node.js or Python implementations.

## Project Structure

```
├── docker-compose.yml          # Docker Compose configuration for multi-container setup
├── README.md                   # This file
├── express-server/             # Node.js Express server
│   ├── Dockerfile              # Docker image definition
│   ├── package.json            # Node.js dependencies and scripts
│   ├── README.md               # Express server documentation
│   └── src/
│       └── index.js            # Express server implementation
└── python-server/              # Python FastAPI server
    ├── Dockerfile              # Docker image definition
    ├── requirements.txt        # Python dependencies
    └── src/
        ├── __init__.py         # Python package marker
        ├── main.py             # FastAPI server implementation
        └── __pycache__/        # Python compiled files (auto-generated)
```

## API Endpoints

Both servers implement the same REST API:

### GET /
**Health Check Endpoint**
- Returns a simple message to verify the server is running
- Response: `{"message": "Hello World"}`

### POST /tasks
**Create a New Task**
- Adds a new task to the task list
- Request body (JSON): `{"text": "Your task description"}`
- Response: `{"message": "Task added successfully"}`
- Status: `201 Created`
- Error: `400 Bad Request` if text field is missing

### GET /tasks
**Retrieve All Tasks**
- Returns the complete list of all stored tasks
- Response: `{"tasks": ["task1", "task2", ...]}`

## Prerequisites

Choose one of the following:

### Option A: Docker & Docker Compose (Recommended)
- Docker Engine 20.10+
- Docker Compose 1.29+

### Option B: Local Development
- Node.js 18 or higher
- Python 3.8 or higher
- npm (comes with Node.js)
- pip (comes with Python)

## Getting Started

### Running with Docker Compose (Recommended)

```bash
# Clone or navigate to the project directory
cd /workspaces/Anythink-Market-76wmnhox

# Start all services
docker compose up

# In another terminal, test the servers
curl http://localhost:8001/tasks    # Express server
curl http://localhost:8000/tasks    # FastAPI server
```

The command will:
1. Build Docker images for both servers
2. Start both containers with volume mounts for live code changes
3. Expose services on specified ports

### Running Locally

#### Express Server (Node.js)

```bash
cd express-server
npm install
npm start
```

The Express server will run on `http://localhost:8001`

#### Python Server (FastAPI)

```bash
cd python-server
pip install -r requirements.txt
python src/main.py
```

The FastAPI server will run on `http://localhost:8000`

## API Testing

### Using cURL

```bash
# Create a task
curl -X POST http://localhost:8001/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "My new task"}'

# Get all tasks
curl http://localhost:8001/tasks

# Health check
curl http://localhost:8001/
```

### Using Python requests library

```python
import requests

# Create task
response = requests.post('http://localhost:8001/tasks', 
                        json={'text': 'New task'})
print(response.json())

# Get tasks
response = requests.get('http://localhost:8001/tasks')
print(response.json())
```

## Environment Variables

### Express Server (docker-compose.yml)
- `NODE_ENV=development` - Enables development features and debug output

### Python Server
- Currently no specific environment variables configured

## Development

### Hot Reload

Both servers are configured for development with hot reload:
- **Express**: Uses `nodemon` for automatic server restart on file changes
- **FastAPI**: Uses `uvicorn` with auto-reload enabled

### Making Changes

When running with Docker Compose:
1. Edit files in `express-server/src/` or `python-server/src/`
2. Changes will automatically reload in the running containers
3. Check server logs with: `docker compose logs -f`

## Troubleshooting

### Port Already in Use
If ports 8000 or 8001 are already in use:
```bash
# Find and stop the process using the port
lsof -i :8001  # Find process on port 8001
kill -9 <PID>  # Kill the process
```

### Docker Build Issues
```bash
# Force rebuild of images without cache
docker compose up --build --no-cache

# Remove all containers and images and start fresh
docker compose down -v
docker compose up --build
```

### Python Dependency Issues
```bash
# Update requirements.txt
pip freeze > python-server/requirements.txt

# Rebuild Python container
docker compose up --build python-server
```

## Implementation Details

### Express Server
- **Framework**: Express.js 5.0
- **Port**: 8001
- **Middleware**: JSON body parser for request handling
- **Storage**: In-memory array (not persistent)
- **Development Tool**: nodemon for auto-reload

### FastAPI Server
- **Framework**: FastAPI (modern async Python framework)
- **Port**: 8000
- **Server**: uvicorn ASGI server
- **Type Hints**: Full Python type annotations for better IDE support
- **Storage**: In-memory list (not persistent)

## Notes

⚠️ **Important**: Both servers use in-memory storage, meaning:
- All tasks are lost when the server restarts
- Data is not shared between server instances
- For production, integrate a persistent database (PostgreSQL, MongoDB, etc.)

## Future Enhancements

- [ ] Add persistent database (PostgreSQL, MongoDB)
- [ ] Implement user authentication and authorization
- [ ] Add task priority and due dates
- [ ] Create web frontend dashboard
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Implement task categories and filtering
- [ ] Add WebSocket support for real-time updates
- [ ] Create Kubernetes manifests for production deployment

## License

This project is part of the Anythink Market initiative.

## API Routes

### Node.js Server (Port 3000)

- `GET /`: Returns a greeting message
- `GET /tasks`: Retrieves the current task list
- `POST /tasks`: Adds a new task to the list. Request body should contain:
  ```json
  {
    "task": "Your task description"
  }
  ```

### Python Server (Port 8000)

- `POST /tasks`: Adds a task to the task list. The request body should contain the task details.
- `GET /tasks`: Retrieves the task list.
