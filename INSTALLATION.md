# Installation & Setup Guide

Complete guide for installing and running the Anythink Market application.

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation Methods](#installation-methods)
- [Docker Setup](#docker-setup)
- [Local Setup](#local-setup)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements

- **OS**: Windows, macOS, or Linux
- **RAM**: 2GB minimum (4GB recommended)
- **Disk Space**: 500MB available

### For Docker Deployment

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 1.29 or higher

### For Local Development

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher (comes with Node.js)
- **Python**: Version 3.8 or higher
- **pip**: Version 20 or higher (comes with Python)

---

## Installation Methods

Choose one of the following installation methods:

### Quick Comparison

| Method | Pros | Cons |
|--------|------|------|
| **Docker Compose** | Easy setup, reproducible environment, no conflicts | Requires Docker installation |
| **Local Development** | Direct control, faster iteration | Requires multiple tools, potential conflicts |
| **Hybrid** | Best of both worlds | More complex |

---

## Docker Setup (Recommended)

### Prerequisites

Ensure Docker and Docker Compose are installed:

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version
```

If not installed, visit:
- Docker: https://www.docker.com/products/docker-desktop
- Docker Compose: https://docs.docker.com/compose/install/

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Wilcolab/Anythink-Market-76wmnhox.git
   cd Anythink-Market-76wmnhox
   ```

2. **Build and start services**:
   ```bash
   docker compose up
   ```

   First-time setup will:
   - Build Docker images for both servers
   - Install all dependencies
   - Start both services
   - Display live logs

3. **Verify services are running**:
   ```bash
   # In another terminal
   curl http://localhost:8001/
   curl http://localhost:8000/
   ```

### Docker Compose Commands

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# View live logs
docker compose logs -f

# View logs for specific service
docker compose logs -f express-server
docker compose logs -f python-server

# Stop all services
docker compose down

# Stop and remove data
docker compose down -v

# Rebuild images without cache
docker compose up --build --no-cache

# View running containers
docker compose ps

# Execute command in running container
docker compose exec express-server npm list
docker compose exec python-server pip list
```

---

## Local Setup

### Option A: Express Server Only

#### Prerequisites
- Node.js 18+ and npm 8+

#### Installation

1. **Clone repository**:
   ```bash
   git clone https://github.com/Wilcolab/Anythink-Market-76wmnhox.git
   cd Anythink-Market-76wmnhox/express-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   Output should show:
   ```
   Express server is running on http://localhost:8001
   ```

4. **Verify**:
   ```bash
   curl http://localhost:8001/
   ```

#### npm Scripts

```bash
npm start    # Start with auto-reload (uses nodemon)
npm run dev  # Start without auto-reload
```

---

### Option B: Python Server Only

#### Prerequisites
- Python 3.8+ and pip

#### Installation

1. **Clone repository**:
   ```bash
   git clone https://github.com/Wilcolab/Anythink-Market-76wmnhox.git
   cd Anythink-Market-76wmnhox/python-server
   ```

2. **Create virtual environment** (recommended):
   ```bash
   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate

   # Windows
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the server**:
   ```bash
   # Using uvicorn directly
   python -m uvicorn src.main:app --reload --port 8000

   # Or create a startup script
   python src/main.py
   ```

   Output should show:
   ```
   Uvicorn running on http://127.0.0.1:8000
   ```

5. **Verify**:
   ```bash
   curl http://localhost:8000/
   ```

---

### Option C: Both Servers Locally

#### Prerequisites
- Node.js 18+
- Python 3.8+
- Two terminal sessions

#### Installation

**Terminal 1 - Express Server**:
```bash
cd express-server
npm install
npm start
```

**Terminal 2 - Python Server**:
```bash
cd python-server
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python -m uvicorn src.main:app --reload --port 8000
```

---

## Hybrid Setup (Docker + Local Development)

Run one server in Docker and one locally for flexibility:

```bash
# Terminal 1 - Express Server in Docker
docker compose up express-server

# Terminal 2 - Python Server locally
cd python-server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn src.main:app --reload
```

---

## Verification

### Health Checks

Test each server:

```bash
# Express Server
curl http://localhost:8001/

# FastAPI Server
curl http://localhost:8000/

# Both should respond with "Hello World" message
```

### Full API Test

```bash
# Add a task
curl -X POST http://localhost:8001/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "Test task"}'

# Retrieve tasks
curl http://localhost:8001/tasks
```

### Expected Response

```json
{
  "message": "Task added successfully"
}
```

```json
{
  "tasks": [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure",
    "Test task"
  ]
}
```

---

## Troubleshooting

### Port Already in Use

**Error**: `Address already in use: ('0.0.0.0', 8001)`

**Solution**:
```bash
# Find process using the port
lsof -i :8001

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Alternative: Change port
python -m uvicorn src.main:app --port 8001
```

### Docker Build Fails

**Solution 1 - Clear Docker cache**:
```bash
docker compose down -v
docker system prune -a
docker compose up --build
```

**Solution 2 - Check logs**:
```bash
docker compose logs --tail=50
```

### Node Modules Issues

**Solution**:
```bash
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Python Virtual Environment Issues

**Solution**:
```bash
# Remove and recreate venv
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Permission Denied (macOS/Linux)

**Solution**:
```bash
# Make scripts executable
chmod +x express-server/start.sh
chmod +x python-server/start.sh

# Or run with python/node directly
python -m uvicorn src.main:app --reload
node src/index.js
```

### Module Not Found Errors

**Express**:
```bash
npm install  # Reinstall dependencies
npm list     # Check installed packages
```

**Python**:
```bash
pip install -r requirements.txt
pip list  # Check installed packages
```

### Connection Refused Errors

**Solution**:
1. Verify servers are running
2. Check correct ports (8001 for Express, 8000 for Python)
3. Check firewall settings
4. Review server logs for errors

### Unicode/Encoding Errors (Python)

**Solution**:
```bash
# Set environment variable
export PYTHONIOENCODING=utf-8

# Or in code
# -*- coding: utf-8 -*-
```

---

## Development Workflow

### Getting Latest Changes

```bash
git fetch origin
git pull origin main
docker compose up --build
```

### Live Code Reload

Both servers automatically reload on code changes:

- **Express**: nodemon watches for file changes
- **FastAPI**: uvicorn reload flag enabled

### Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f express-server
docker compose logs -f python-server

# Last 100 lines
docker compose logs --tail=100
```

---

## Environment Configuration

### Express Server

Environment variables (in `docker-compose.yml`):
- `NODE_ENV=development` - Enable development features

### Python Server

Optional environment setup:
```bash
export PYTHONUNBUFFERED=1
export PYTHONDONTWRITEBYTECODE=1
```

---

## Next Steps

After successful installation:

1. **Review the API**: See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md)
2. **Test the endpoints**: Use cURL examples provided
3. **Start developing**: Follow [CONTRIBUTING.md](../CONTRIBUTING.md)
4. **Check the README**: [README.md](../README.md)

---

## Getting Help

1. Check logs for specific errors
2. Review [Troubleshooting](#troubleshooting) section
3. Check Docker/Python/Node.js documentation
4. Open an issue on GitHub

---

## Uninstallation

### Docker
```bash
# Stop and remove all containers
docker compose down -v

# Remove images
docker rmi anythink-express-server anythink-python-server
```

### Local Setup
```bash
# Express Server
rm -rf express-server/node_modules

# Python Server
rm -rf python-server/venv
```

---

## Version History

- **v1.0.0**: Initial release with Docker and local setup support

---

Last Updated: January 2026
