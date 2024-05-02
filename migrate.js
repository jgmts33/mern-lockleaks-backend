import { exec } from 'child_process';
import config from "./app/config/db.config.js";

const importDatabase = (filePath) => {
    const command = `psql -U ${config.USER} -d ${config.DB} -h ${config.HOST} -f ${filePath}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
};

// Replace 'path/to/your/dumpfile.sql' with the path to your SQL dump file
importDatabase('./lockleaks.sql');