const mysql = require('mysql2/promise');
require('dotenv').config();

// Days to keep tasks (anything older will be archived and removed)
const RETENTION_DAYS = process.env.RETENTION_DAYS || 30;

async function main() {
  console.log(`Starting cleanup job - removing tasks older than ${RETENTION_DAYS} days`);
  
  // Create database connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
  
  try {
    // Get current date and calculate cutoff date
    const today = new Date();
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - RETENTION_DAYS);
    const formattedCutoffDate = cutoffDate.toISOString().split('T')[0];
    
    console.log(`Cutoff date: ${formattedCutoffDate}`);
    
    // Find completed tasks older than cutoff date
    const [oldTasks] = await connection.execute(
      "SELECT * FROM tasks WHERE status = 'done' AND created_at < ?",
      [formattedCutoffDate]
    );
    
    console.log(`Found ${oldTasks.length} old completed tasks to archive`);
    
    // In a real system, you might want to archive them first to a long-term storage
    // For example, to BigQuery or to a data lake
    
    // Archive process example (mocked)
    if (oldTasks.length > 0) {
      console.log('Archiving tasks to storage...');
      // Mock archiving process
      await archiveTasks(oldTasks);
      
      // Now delete the archived tasks
      const [deleteResult] = await connection.execute(
        "DELETE FROM tasks WHERE status = 'done' AND created_at < ?",
        [formattedCutoffDate]
      );
      
      console.log(`Deleted ${deleteResult.affectedRows} old tasks`);
    }
    
    console.log('Cleanup job completed successfully');
  } catch (error) {
    console.error('Error during cleanup job:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

// Mock function to simulate archiving
async function archiveTasks(tasks) {
  // In a real implementation, you might:
  // 1. Batch upload to BigQuery
  // 2. Write to Cloud Storage as JSON/CSV
  // 3. Insert to a different database table
  
  console.log(`Archiving ${tasks.length} tasks (simulated)`);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 