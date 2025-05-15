#!/bin/bash

# Exit on any error
set -e

echo "Setting up VM for task cleanup batch jobs..."

# Update system packages
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Create app directory
BATCH_DIR="/opt/task-manager-batch"
sudo mkdir -p $BATCH_DIR
sudo chown $(whoami):$(whoami) $BATCH_DIR

# Clone repo or copy files (assuming script is run from repo directory)
cp -r . $BATCH_DIR

# Install dependencies
cd $BATCH_DIR
npm install --production

# Create .env file (in real setup, use Secret Manager)
cat > .env << EOL
DB_HOST=YOUR_CLOUD_SQL_IP
DB_USER=YOUR_DB_USER
DB_PASS=YOUR_DB_PASSWORD
DB_NAME=task_manager
RETENTION_DAYS=30
EOL

# Set up cron job to run every day at 2 AM
CRON_JOB="0 2 * * * cd $BATCH_DIR && /usr/bin/node cleanup.js >> $BATCH_DIR/cleanup.log 2>&1"
(crontab -l 2>/dev/null || echo "") | grep -v "cleanup.js" | { cat; echo "$CRON_JOB"; } | crontab -

echo "Setup completed successfully. Batch job will run daily at 2 AM." 