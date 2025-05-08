📌 Project Title: Cloud-Native Task Management System
This project is a cloud-native RESTful application designed to manage tasks for authenticated users. Built as part of the CS436 Cloud Computing course, it demonstrates integration of modern cloud technologies including Kubernetes, Cloud SQL, Compute Engine, and Cloud Functions on Google Cloud Platform (GCP).

🚀 Features
Secure JWT-based user authentication

Task management via full CRUD APIs (Create, Read, Update, Delete)

Containerized Node.js backend using Express.js

MySQL database hosted on Cloud SQL

Async event handling with Pub/Sub and Cloud Functions

Batch processing with Compute Engine VM

☁️ Architecture Overview
GKE (Kubernetes): Hosts the Express.js API service

Cloud SQL (MySQL): Stores persistent task data

Cloud Pub/Sub: Enables async messaging and system decoupling

Cloud Functions: Handles background tasks like notifications

Compute Engine VM: Runs periodic batch jobs (e.g., task cleanup)

Load Balancer: Routes HTTPS traffic to GKE cluster

![alt text](<Architecture Diagram.png>)

📊 Performance Testing
Simulated using Locust

Metrics tracked: latency, throughput, error rate, and resource usage

Scalable system design validated under various load conditions

🛠️ Tech Stack
Node.js 18 (Express.js)

MySQL (Cloud SQL)

Docker, Kubernetes (GKE)

Pub/Sub, Cloud Functions, Compute Engine

Locust for performance testing

📂 Repository Contents
/api – Application source code

/k8s – Kubernetes deployment files (YAMLs)

/functions – Cloud Function code

/vm-scripts – Batch job scripts for VM

/locust – Load testing scripts

README.md – Setup instructions and project details

💰 Budget & Cost Optimization
Deployed within the $300 GCP free trial limit

Auto-scaling, VM right-sizing, and minimal idle costs
