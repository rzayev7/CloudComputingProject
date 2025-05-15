📌 Project Title: Cloud-Native Task Management System
This project is a cloud-native RESTful application designed to manage tasks for authenticated users. Built as part of the CS436 Cloud Computing course, it demonstrates integration of modern cloud technologies including Kubernetes, Cloud SQL, Compute Engine, and Cloud Functions on Google Cloud Platform (GCP).

🚀 Features
- Secure JWT-based user authentication
- Task management via full CRUD APIs (Create, Read, Update, Delete)
- Containerized Node.js backend using Express.js
- MySQL database hosted on Cloud SQL
- Async event handling with Pub/Sub and Cloud Functions
- Batch processing with Compute Engine VM

☁️ Architecture Overview
- GKE (Kubernetes): Hosts the Express.js API service
- Cloud SQL (MySQL): Stores persistent task data
- Cloud Pub/Sub: Enables async messaging and system decoupling
- Cloud Functions: Handles background tasks like notifications
- Compute Engine VM: Runs periodic batch jobs (e.g., task cleanup)
- Load Balancer: Routes HTTPS traffic to GKE cluster

![alt text](<Architecture Diagram.png>)

## 🛠️ Implementation Details

### 1. API Service (Node.js Express)
- RESTful endpoints for task management
- JWT authentication with signup/login
- Connection to Cloud SQL via sidecar proxy
- Pub/Sub integration for event publishing

### 2. Infrastructure as Code
- Kubernetes YAML manifests for GKE deployment
- ConfigMaps for configuration
- Secrets for sensitive information
- Network policies for enhanced security

### 3. Event-Driven Architecture
- Cloud Functions triggered by Pub/Sub events
- Asynchronous processing for notifications
- Event logging and tracking

### 4. Database Schema
- Users table with secure password storage
- Tasks table with foreign key relationships
- Status tracking and timestamps

### 5. CI/CD Pipeline
- GitHub Actions workflow for automated deployment
- Build, test, and deploy on push to main branch
- Automatic image versioning and rollout

### 6. Batch Processing
- Scheduled cleanup job for old tasks
- Data archiving before deletion
- VM-based execution for resource-intensive tasks

## 📊 Performance Testing
- Simulated using Locust
- Metrics tracked: latency, throughput, error rate, and resource usage
- Scalable system design validated under various load conditions

## 🛠️ Tech Stack
- Node.js 18 (Express.js)
- MySQL (Cloud SQL)
- Docker, Kubernetes (GKE)
- Pub/Sub, Cloud Functions, Compute Engine
- Locust for performance testing

## 📂 Repository Contents
- `/api` – Application source code
- `/infra` – Kubernetes deployment files (YAMLs)
- `/functions` – Cloud Function code
- `/batch` – Batch job scripts for VM
- `/locust` – Load testing scripts
- `README.md` – Setup instructions and project details

## 🚀 Getting Started

### Local Development
1. Clone the repository
2. Create a local `.env` file based on README-env.md
3. Install dependencies: `npm install`
4. Start the local server: `npm run dev`

### Deployment to GCP
1. Set up GCP project with required services
2. Create a Cloud SQL instance and database
3. Create a Pub/Sub topic
4. Deploy Cloud Functions
5. Set up GKE cluster
6. Apply Kubernetes manifests: `kubectl apply -f infra/`
7. Set up the Compute Engine VM for batch jobs

## 💰 Budget & Cost Optimization
- Deployed within the $300 GCP free trial limit
- Auto-scaling, VM right-sizing, and minimal idle costs
- Resource limits to prevent runaway costs

## 🔒 Security Considerations
- JWT for secure authentication
- Least privilege IAM roles
- Network policies in Kubernetes
- Secure handling of credentials
