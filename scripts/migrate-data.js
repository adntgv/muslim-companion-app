/**
 * Appwrite to Firebase Data Migration Script
 * 
 * This script helps migrate data from Appwrite to Firebase.
 * 
 * Prerequisites:
 * 1. Export data from Appwrite as JSON (using the Appwrite console or CLI)
 * 2. Set up Firebase Admin SDK credentials
 * 3. Install required packages: npm install firebase-admin
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin with your service account credentials
const serviceAccount = require('../firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * Migrates tasks from Appwrite to Firebase
 * @param {string} inputFile - Path to the Appwrite tasks export JSON file
 */
async function migrateTasks(inputFile) {
  try {
    console.log(`Starting migration of tasks from ${inputFile}...`);
    
    // Read and parse the Appwrite export file
    const rawData = fs.readFileSync(path.resolve(inputFile), 'utf8');
    const appwriteData = JSON.parse(rawData);
    
    // Convert Appwrite tasks to Firestore format
    const tasks = appwriteData.documents.map(task => {
      // Map Appwrite document to Firestore document
      return {
        userId: task.userId,
        title: task.title,
        category: task.category,
        time: task.time,
        status: task.status,
        iconName: task.iconName,
        priority: task.priority,
        date: task.date,
        createdAt: admin.firestore.Timestamp.now() // Use current time as we don't have original timestamp
      };
    });
    
    console.log(`Found ${tasks.length} tasks to migrate.`);
    
    // Batch write to Firestore (max 500 per batch)
    const batchSize = 500;
    let migrated = 0;
    
    for (let i = 0; i < tasks.length; i += batchSize) {
      const batch = db.batch();
      const currentBatch = tasks.slice(i, i + batchSize);
      
      currentBatch.forEach(task => {
        const docRef = db.collection('tasks').doc(); // Create new doc with auto-generated ID
        batch.set(docRef, task);
      });
      
      await batch.commit();
      migrated += currentBatch.length;
      console.log(`Migrated ${migrated}/${tasks.length} tasks...`);
    }
    
    console.log('Task migration completed successfully!');
  } catch (error) {
    console.error('Error during task migration:', error);
  }
}

/**
 * Main function to run all migrations
 */
async function runMigration() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Please provide the path to the Appwrite export file.');
    console.log('Usage: node migrate-data.js path/to/tasks-export.json');
    process.exit(1);
  }
  
  const tasksFile = args[0];
  
  try {
    await migrateTasks(tasksFile);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Ensure the script exits
    process.exit(0);
  }
}

// Run the migration
runMigration(); 