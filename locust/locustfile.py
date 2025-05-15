from locust import HttpUser, task, between
import json
import random

class TaskManagerUser(HttpUser):
    wait_time = between(1, 5)  # Wait between 1 and 5 seconds between tasks
    
    # Store token after login
    token = None
    user_id = None
    created_tasks = []
    
    def on_start(self):
        """This is called when a User starts"""
        self.login()
    
    def login(self):
        # Attempt login with test user
        email = f"test{random.randint(1, 1000)}@example.com"
        password = "password123"
        
        # Try to sign up first
        signup_response = self.client.post("/api/auth/signup", 
            json={"email": email, "password": password},
            name="/api/auth/signup")
        
        # If signup fails (user exists), try login
        if signup_response.status_code != 201:
            login_response = self.client.post("/api/auth/login", 
                json={"email": email, "password": password},
                name="/api/auth/login")
            
            data = login_response.json()
            self.token = data.get("token")
            self.user_id = data.get("userId")
        else:
            data = signup_response.json()
            self.token = data.get("token")
            self.user_id = data.get("userId")
    
    @task(3)
    def get_all_tasks(self):
        """Get all tasks (higher weight - most common operation)"""
        if not self.token:
            self.login()
            
        self.client.get("/api/tasks", 
            headers={"Authorization": f"Bearer {self.token}"},
            name="/api/tasks")
    
    @task(1)
    def create_task(self):
        """Create a new task"""
        if not self.token:
            self.login()
            
        task_data = {
            "title": f"Test Task {random.randint(1, 10000)}",
            "description": "This is a test task created by Locust load testing",
            "status": random.choice(["todo", "in_progress", "done"])
        }
        
        response = self.client.post("/api/tasks", 
            json=task_data,
            headers={"Authorization": f"Bearer {self.token}"},
            name="/api/tasks - create")
        
        if response.status_code == 201:
            data = response.json()
            if "taskId" in data:
                self.created_tasks.append(data["taskId"])
    
    @task(2)
    def update_task(self):
        """Update a task"""
        if not self.token:
            self.login()
            
        # If we have created tasks, update one
        if self.created_tasks:
            task_id = random.choice(self.created_tasks)
            
            task_data = {
                "title": f"Updated Task {random.randint(1, 10000)}",
                "description": "This task was updated by Locust load testing",
                "status": random.choice(["todo", "in_progress", "done"])
            }
            
            self.client.put(f"/api/tasks/{task_id}", 
                json=task_data,
                headers={"Authorization": f"Bearer {self.token}"},
                name="/api/tasks/:id - update")
    
    @task(1)
    def delete_task(self):
        """Delete a task"""
        if not self.token:
            self.login()
            
        # If we have created tasks, delete one
        if self.created_tasks:
            task_id = self.created_tasks.pop()  # Get and remove a task ID
            
            self.client.delete(f"/api/tasks/{task_id}", 
                headers={"Authorization": f"Bearer {self.token}"},
                name="/api/tasks/:id - delete") 