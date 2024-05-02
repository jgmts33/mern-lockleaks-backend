import { exec } from 'child_process';
import { dirname, join } from 'path';
import config from "./app/config/db.config.js";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Set the path where the backup file will be saved
const backupPath = join(__dirname, 'lockleaks.sql');

// Create the pg_dump command
const command = `pg_dump -U ${config.USER} -h ${config.HOST} -d ${config.DB} -p 5432 -W --no-password --file="${backupPath}"`;

// Execute the command
exec(command, {
    env: {
        ...process.env,
        PGPASSWORD: config.PASSWORD  // Pass the password securely via environment variable
    }
}, (error, stdout, stderr) => {
    if (error) {
        console.error(`Backup error: ${error}`);
        return;
    }
    console.log('Backup complete:', stdout);
    console.error('Backup errors:', stderr);
    return;
});

