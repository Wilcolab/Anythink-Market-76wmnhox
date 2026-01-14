# Python Server

This project contains a FastAPI server implemented in Python. It provides two routes for managing a task list.

## Project Structure

The project has the following files and directories:

- `python-server/src/main.py`: This file contains the implementation of the FastAPI server with two routes. It handles adding a task to a list and retrieving the list.

- `python-server/src/__init__.py`: This file is an empty file that marks the `src` directory as a Python package.

- `python-server/requirements.txt`: This file lists the dependencies required for the FastAPI server and other dependencies.

- `python-server/Dockerfile`: This file is used to build a Docker image for the FastAPI server. It specifies the base image, copies the source code into the image, installs the dependencies, and sets the command to run the server.

- `docker-compose.yml`: This file is used to define and run multi-container Docker applications. It specifies the services to run, their configurations, and any dependencies between them.

## Getting Started

### Prerequisites
- Docker and Docker Compose installed, or
- Node.js 18+ and Python 3.8+ for local development

### Running with Docker

To run both the Node.js and Python servers using Docker, follow these steps:

```shell
docker compose up
```

This command will build the Docker images and start all containers defined in the `docker-compose.yml` file.

### Running Locally

**Node.js Server:**
```shell
npm install
npm start
```
The Express server will run on `http://localhost:3000`

**Python Server:**
```shell
cd python-server
pip install -r requirements.txt
python src/main.py
```
The FastAPI server will run on `http://localhost:8000`

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
