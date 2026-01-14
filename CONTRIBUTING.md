# Contributing Guide

Thank you for your interest in contributing to the Anythink Market project! This guide will help you get started with development and make meaningful contributions.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Adding Features](#adding-features)
- [Testing](#testing)

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/Anythink-Market-76wmnhox.git
   cd Anythink-Market-76wmnhox
   ```
3. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Setup

### Quick Start with Docker Compose

```bash
# Install dependencies and start both servers
docker compose up

# In another terminal, test the API
curl http://localhost:8001/tasks
curl http://localhost:8000/tasks
```

### Local Setup

#### Express Server (Node.js)

```bash
cd express-server

# Install dependencies
npm install

# Start the development server
npm start

# The server will run on http://localhost:8001
```

#### Python Server (FastAPI)

```bash
cd python-server

# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the development server
python -m uvicorn src.main:app --reload --port 8000

# The server will run on http://localhost:8000
```

---

## Code Standards

### JavaScript/Express

- **Style**: Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **Formatting**: Use consistent indentation (2 spaces)
- **Comments**: Use JSDoc format for function documentation
- **Variables**: Use `const` by default, `let` if reassignment needed, avoid `var`

Example:
```javascript
/**
 * Validate task input
 * @param {string} text - The task description
 * @returns {boolean} True if valid, false otherwise
 */
const validateTask = (text) => {
  return text && text.trim().length > 0;
};
```

### Python/FastAPI

- **Style**: Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/)
- **Formatting**: Use `black` for code formatting
- **Docstrings**: Use Google-style docstrings
- **Type Hints**: Always include type hints for function parameters and returns

Example:
```python
def validate_task(text: str) -> bool:
    """
    Validate task input.
    
    Args:
        text: The task description
    
    Returns:
        True if valid, False otherwise
    """
    return bool(text and text.strip())
```

### General Standards

- **Comments**: Use comments to explain "why", not "what"
- **Naming**: Use clear, descriptive names for variables and functions
- **Functions**: Keep functions small and focused on a single responsibility
- **Documentation**: Document public APIs and complex logic
- **Error Handling**: Include proper error handling and validation

---

## Commit Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, tooling changes

### Examples

```bash
# Feature
git commit -m "feat(express): add task priority support"

# Bug fix
git commit -m "fix(fastapi): handle empty task list correctly"

# Documentation
git commit -m "docs: update API documentation with examples"

# Refactor
git commit -m "refactor(express): simplify task validation logic"
```

---

## Pull Request Process

### Before Submitting

1. **Update your branch** with the latest main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Test your changes**:
   - Express: `npm test` (if tests exist)
   - FastAPI: `pytest` (if tests exist)
   - Manual testing with provided examples

3. **Check code quality**:
   - No console errors or warnings
   - Proper error handling implemented
   - Code follows style guidelines

### Submitting a Pull Request

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - Clear, descriptive title
   - Detailed description of changes
   - Reference to related issues (if any)
   - Screenshots for UI changes (if applicable)

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of what this PR does

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   Describe how to test your changes

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Changes are properly documented
   - [ ] No new warnings/errors introduced
   - [ ] Tested locally with both servers
   ```

---

## Adding Features

### Steps to Add a New Feature

1. **Create an issue** describing the feature
2. **Create a feature branch**: `git checkout -b feature/feature-name`
3. **Implement the feature** on both servers (if applicable)
4. **Add documentation** for new endpoints
5. **Test thoroughly** before submitting PR
6. **Create a Pull Request** with clear description

### Example: Adding Task Categories

```javascript
// Express Implementation
/**
 * POST /tasks - Create a new task with category
 * @route POST /tasks
 * @param {Object} req.body
 * @param {string} req.body.text - Task description
 * @param {string} req.body.category - Task category
 * @returns {Object} Success message
 */
app.post('/tasks', (req, res) => {
  const { text, category } = req.body;
  
  if (!text) {
    return res.status(400).json({ 
      message: 'Task text is required' 
    });
  }
  
  const newTask = { 
    text, 
    category: category || 'general',
    createdAt: new Date()
  };
  
  tasks.push(newTask);
  res.status(201).json({ 
    message: 'Task added successfully',
    task: newTask 
  });
});
```

---

## Testing

### Manual Testing

Use the provided examples in [API_DOCUMENTATION.md](API_DOCUMENTATION.md) to test endpoints:

```bash
# Test with cURL
curl -X POST http://localhost:8001/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "Test task"}'

curl http://localhost:8001/tasks
```

### Automated Testing (When Framework is Updated)

#### Express with Jest
```bash
npm install --save-dev jest
npm test
```

#### FastAPI with Pytest
```bash
pip install pytest httpx
pytest tests/
```

---

## Code Review Process

1. Maintainers will review your PR
2. Changes may be requested
3. Make updates on the same branch
4. Re-request review after changes
5. PR will be merged once approved

### Common Review Comments

- Missing documentation
- Code style inconsistencies
- Missing error handling
- Untested edge cases
- Performance considerations

---

## Project Structure Guidelines

When adding new files:

```
express-server/
├── src/
│   ├── index.js          # Main application
│   ├── routes/           # Route definitions (if added)
│   ├── controllers/      # Business logic (if added)
│   └── middleware/       # Custom middleware (if added)
└── tests/               # Test files (if added)

python-server/
├── src/
│   ├── main.py          # Main application
│   ├── routes/          # Route definitions (if added)
│   ├── models/          # Data models (if added)
│   └── services/        # Business logic (if added)
└── tests/               # Test files (if added)
```

---

## Documentation Requirements

For each new feature, update:

1. **Code comments**: JSDoc or docstrings
2. **API_DOCUMENTATION.md**: New endpoints and examples
3. **README.md**: New features in overview
4. **Commit message**: Clear, descriptive message

---

## Need Help?

- Check existing issues for similar problems
- Review the [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Look at existing code for patterns
- Open an issue for discussion

---

## License

By contributing to this project, you agree that your contributions will be licensed under its license.

---

Thank you for contributing to Anythink Market! 🎉
