"""
Python FastAPI Server - Task Management API

This is a simple REST API server built with FastAPI that provides
endpoints for managing a task list. It supports creating and retrieving tasks.

Author: Anythink Team
Version: 1.0.0
"""

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

# Initialize FastAPI application
app = FastAPI(
    title="Task Management API",
    description="A simple API for managing tasks",
    version="1.0.0"
)


class Task(BaseModel):
    """
    Task Model
    
    Represents a single task in the system.
    
    Attributes:
        text (str): The task description
    """
    text: str


# In-memory Task Storage
# In a production environment, this should be replaced with a persistent database.
tasks: List[str] = [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure"
]


@app.get("/")
def get_root() -> dict:
    """
    Health Check Endpoint
    
    Returns a simple "Hello World" message to verify the server is running.
    
    Returns:
        dict: A simple response message
    """
    return {"message": "Hello World"}


@app.post("/tasks")
def add_task(task: Task) -> dict:
    """
    Create a New Task
    
    Adds a new task to the task list.
    
    Args:
        task (Task): The task object containing the text field
    
    Returns:
        dict: Success message indicating the task was added
    """
    tasks.append(task.text)
    return {"message": "Task added successfully"}


@app.get("/tasks")
def list_tasks() -> dict:
    """
    Retrieve All Tasks
    
    Returns the complete list of all tasks currently stored in memory.
    
    Returns:
        dict: Object containing the tasks array
    """
    return {"tasks": tasks}
