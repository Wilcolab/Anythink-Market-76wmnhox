# API Documentation

Complete API reference for the Anythink Market Task Management System.

## Base URLs

- **Express Server**: `http://localhost:8001`
- **FastAPI Server**: `http://localhost:8000`

Both servers implement identical endpoints.

---

## Endpoints

### 1. Health Check

**GET** `/`

Verifies that the server is running and accessible.

#### Response

**Status Code**: `200 OK`

**Content-Type**: `text/plain` (Express) or `application/json` (FastAPI)

**Express Response**:
```
Hello World
```

**FastAPI Response**:
```json
{
  "message": "Hello World"
}
```

#### Example cURL Request
```bash
curl http://localhost:8001/
```

#### Example JavaScript Request
```javascript
fetch('http://localhost:8001/')
  .then(response => response.text())
  .then(data => console.log(data));
```

#### Example Python Request
```python
import requests
response = requests.get('http://localhost:8001/')
print(response.text)
```

---

### 2. Add Task

**POST** `/tasks`

Creates a new task and adds it to the task list.

#### Request

**Content-Type**: `application/json`

**Request Body**:
```json
{
  "text": "Your task description"
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | The task description (cannot be empty) |

#### Response

**Status Code**: `201 Created`

**Content-Type**: `application/json`

**Success Response**:
```json
{
  "message": "Task added successfully"
}
```

**Error Response** (when text is missing):
```json
{
  "detail": [
    {
      "loc": ["body", "text"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**Status Code**: `400 Bad Request`

#### Example cURL Request
```bash
curl -X POST http://localhost:8001/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "Write documentation"}'
```

#### Example JavaScript Request
```javascript
const newTask = { text: "Write documentation" };

fetch('http://localhost:8001/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newTask)
})
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Example Python Request
```python
import requests

task_data = {"text": "Write documentation"}
response = requests.post('http://localhost:8001/tasks', json=task_data)
print(response.json())  # {"message": "Task added successfully"}
print(response.status_code)  # 201
```

---

### 3. Get All Tasks

**GET** `/tasks`

Retrieves the complete list of all tasks stored in the system.

#### Response

**Status Code**: `200 OK`

**Content-Type**: `application/json`

**Response Body**:
```json
{
  "tasks": [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure"
  ]
}
```

#### Response Format

| Field | Type | Description |
|-------|------|-------------|
| `tasks` | array | Array of task descriptions as strings |

#### Example cURL Request
```bash
curl http://localhost:8001/tasks
```

#### Example JavaScript Request
```javascript
fetch('http://localhost:8001/tasks')
  .then(response => response.json())
  .then(data => {
    console.log('All tasks:', data.tasks);
    data.tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
  });
```

#### Example Python Request
```python
import requests

response = requests.get('http://localhost:8001/tasks')
data = response.json()
print(f"Total tasks: {len(data['tasks'])}")

for i, task in enumerate(data['tasks'], 1):
    print(f"{i}. {task}")
```

---

## Error Handling

### Common Error Responses

#### 400 Bad Request
Returned when required fields are missing or invalid.

```json
{
  "detail": "Task text is required"
}
```

#### 404 Not Found
Returned when accessing an undefined endpoint.

```json
{
  "detail": "Not Found"
}
```

#### 500 Internal Server Error
Returned when the server encounters an unexpected error.

```json
{
  "detail": "Internal Server Error"
}
```

---

## Usage Examples

### Complete Workflow Example

```javascript
// 1. Check if server is running
const checkHealth = async () => {
  try {
    const response = await fetch('http://localhost:8001/');
    if (response.ok) {
      console.log('✓ Server is running');
      return true;
    }
  } catch (error) {
    console.log('✗ Server is not accessible');
    return false;
  }
};

// 2. Add new tasks
const addTasks = async () => {
  const newTasks = [
    'Buy groceries',
    'Finish project report',
    'Call the dentist'
  ];

  for (const task of newTasks) {
    const response = await fetch('http://localhost:8001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: task })
    });
    
    if (response.ok) {
      console.log(`✓ Added: "${task}"`);
    }
  }
};

// 3. Retrieve and display all tasks
const displayAllTasks = async () => {
  const response = await fetch('http://localhost:8001/tasks');
  const data = await response.json();
  
  console.log('\nAll Tasks:');
  data.tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
};

// Run the workflow
(async () => {
  if (await checkHealth()) {
    await addTasks();
    await displayAllTasks();
  }
})();
```

### Python Complete Workflow Example

```python
import requests
from datetime import datetime

BASE_URL = 'http://localhost:8001'

def check_health():
    """Check if the server is running"""
    try:
        response = requests.get(f'{BASE_URL}/')
        print(f'✓ Server is running at {BASE_URL}')
        return True
    except requests.exceptions.ConnectionError:
        print(f'✗ Cannot connect to {BASE_URL}')
        return False

def add_task(task_text):
    """Add a new task"""
    response = requests.post(
        f'{BASE_URL}/tasks',
        json={'text': task_text}
    )
    
    if response.status_code == 201:
        print(f'✓ Added: "{task_text}"')
        return True
    else:
        print(f'✗ Failed to add: "{task_text}"')
        return False

def list_all_tasks():
    """Retrieve and display all tasks"""
    response = requests.get(f'{BASE_URL}/tasks')
    data = response.json()
    
    print(f'\nTotal Tasks: {len(data["tasks"])}')
    print('=' * 50)
    for i, task in enumerate(data['tasks'], 1):
        print(f'{i}. {task}')

# Run the workflow
if __name__ == '__main__':
    if check_health():
        # Add some tasks
        tasks = [
            'Complete project documentation',
            'Review pull requests',
            'Update dependencies'
        ]
        
        for task in tasks:
            add_task(task)
        
        # Display all tasks
        list_all_tasks()
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production deployment, consider implementing:
- Request throttling
- IP-based rate limits
- Token-based access control

---

## Authentication

Currently, endpoints are public and do not require authentication. For production, implement:
- API key authentication
- JWT tokens
- OAuth 2.0

---

## Data Persistence

⚠️ **Warning**: All data is stored in memory and will be lost when the server restarts. For production:
- Implement database storage (PostgreSQL, MongoDB, etc.)
- Add data backup mechanisms
- Consider caching strategies

---

## CORS (Cross-Origin Resource Sharing)

CORS is not currently configured. For frontend applications on different origins, configure:
- Allowed origins
- Allowed methods
- Allowed headers

---

## Version History

### v1.0.0 (Current)
- Initial release
- Basic CRUD operations for tasks
- In-memory storage

---

## Support

For issues or questions:
1. Check the main [README.md](README.md)
2. Review server logs
3. Test endpoints with provided examples
