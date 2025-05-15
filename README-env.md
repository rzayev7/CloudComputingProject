# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```
# App
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=task_manager

# Authentication
JWT_SECRET=your-secret-key-here

# Google Cloud
PUBSUB_TOPIC=task-events
GOOGLE_APPLICATION_CREDENTIALS=./path-to-credentials.json
```

## Production Environment

For production deployments on GKE, these environment variables should be configured using Kubernetes Secrets and ConfigMaps. 