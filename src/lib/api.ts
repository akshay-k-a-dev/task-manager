const API_URL = 'http://localhost:3000/api';

export async function loginUser(username: string) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
  return response.json();
}

export async function getTasks(userId: string) {
  const response = await fetch(`${API_URL}/tasks/${userId}`);
  return response.json();
}

export async function createTask(task: any) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(taskId: string, updates: any) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return response.json();
}

export async function deleteTask(taskId: string) {
  await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
}

export async function addSubTask(taskId: string, title: string) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/subtasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  return response.json();
}

export async function updateSubTask(taskId: string, subtaskId: string, updates: any) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return response.json();
}