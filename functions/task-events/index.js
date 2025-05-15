const functions = require('@google-cloud/functions-framework');
const nodemailer = require('nodemailer');

// Configure email transporter (example with Sendgrid)
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});

// Triggered from a Pub/Sub message
functions.cloudEvent('processPubSubMessage', async (cloudEvent) => {
  try {
    // The Pub/Sub message is passed as the CloudEvent data payload
    const base64Message = cloudEvent.data.message.data;
    
    // Decode the message
    const jsonStr = Buffer.from(base64Message, 'base64').toString();
    const message = JSON.parse(jsonStr);
    
    console.log('Received message:', message);
    
    // Process based on event type
    switch (message.event) {
      case 'task_created':
        await handleTaskCreated(message);
        break;
      case 'task_updated':
        await handleTaskUpdated(message);
        break;
      case 'task_deleted':
        await handleTaskDeleted(message);
        break;
      default:
        console.warn('Unknown event type:', message.event);
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
});

async function handleTaskCreated(message) {
  // In a real-world scenario, you'd fetch user email from a database
  // For this example, we'll just log the event
  console.log(`Task ${message.taskId} created by user ${message.userId}`);
  
  // Example: Send confirmation email
  /*
  await transporter.sendMail({
    from: 'noreply@your-domain.com',
    to: 'user@example.com',
    subject: 'New Task Created',
    text: `Your task has been created successfully. Task ID: ${message.taskId}`
  });
  */
  
  // Example: Record analytics
  await recordAnalytics('task_created', message);
}

async function handleTaskUpdated(message) {
  console.log(`Task ${message.taskId} updated by user ${message.userId}`);
  
  // Example: Record analytics
  await recordAnalytics('task_updated', message);
}

async function handleTaskDeleted(message) {
  console.log(`Task ${message.taskId} deleted by user ${message.userId}`);
  
  // Example: Record analytics
  await recordAnalytics('task_deleted', message);
}

async function recordAnalytics(eventType, data) {
  // In a real implementation, you might log to BigQuery or another analytics service
  console.log(`Analytics: ${eventType}`, {
    eventType,
    taskId: data.taskId,
    userId: data.userId,
    timestamp: data.timestamp
  });
} 