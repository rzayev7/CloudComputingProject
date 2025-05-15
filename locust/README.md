# Load Testing with Locust

This directory contains a Locust file for load testing the Task Manager API.

## Prerequisites

- Python 3.7+
- pip

## Installation

Install Locust using pip:

```bash
pip install locust
```

## Running the Tests

1. Start your API server (locally or in the cloud)
2. Run Locust from this directory:

```bash
locust -f locustfile.py
```

3. Open Locust web interface at http://localhost:8089
4. Enter the following settings:
   - Number of users: Start with 10 and gradually increase
   - Spawn rate: 1-2 users per second
   - Host: Your API URL (e.g. http://localhost:3000 or https://api.your-domain.com)

5. Start the test and monitor performance

## Interpreting Results

Locust will display:

- Request count and failure rate
- Response time statistics (min, max, median, average)
- Requests per second (throughput)
- Charts showing response times and number of users

## Testing Strategy

1. Start with a small number of users (10-20)
2. Gradually increase to find the breaking point
3. Try different user behaviors by modifying the weights in the tasks

## Load Test Goals

- Ensure the system can handle at least 100 concurrent users
- Response times should stay under 2 seconds
- Error rate should remain below 1% 