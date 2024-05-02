import { exec } from 'child_process';
import pkg from 'pg';
import { dirname, join } from 'path';
import config from "./app/config/db.config.js";
import { fileURLToPath } from 'url';

const { Client } = pkg

const __dirname = dirname(fileURLToPath(import.meta.url));

// PostgreSQL client setup
const client = new Client({
  connectionString: `postgres://${config.USER}:${config.PASSWORD}@${config.HOST}:5432/${config.DB}`
});

// Function to drop schema and recreate
const resetDatabase = async () => {
  try {
    await client.connect();
    await client.query('DROP SCHEMA public CASCADE;');
    await client.query('CREATE SCHEMA public;');
    console.log('Schema reset successfully');
  } catch (error) {
    console.error('Error resetting schema:', error);
  }
};

// Function to execute SQL file using psql command
const executeSqlFile = (filePath) => {
  const command = `psql -U ${config.USER} -d ${config.DB} -h ${config.HOST} --no-password -f ${filePath}`;

  exec(command, {
    env: {
      ...process.env,
      PGPASSWORD: config.PASSWORD  // Pass the password securely via environment variable
    }
  }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    return;
  });
};

// Main function to reset DB and run SQL file
const main = async () => {
  await resetDatabase();
  const fullPath = join(__dirname, 'lockleaks.sql'); // Replace 'yourfile.sql' with your actual file name
  executeSqlFile(fullPath);
  return;
};

main();
