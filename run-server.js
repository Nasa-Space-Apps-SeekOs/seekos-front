const { exec } = require('child_process');
const dotenv = require('dotenv');
const os = require('os');

const envVars = dotenv.config().parsed;

const reactStartCommand = 'npm start';

let envString = '';
if (os.platform() === 'win32') {
  envString = Object.entries(envVars)
    .map(([key, value]) => `set ${key}=${value}`)
    .join('&')
    .concat('&');
} else {
  envString = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ');
}

console.log(`> ${envString} ${reactStartCommand}`)

const childProcess = exec(`${envString} ${reactStartCommand}`);

childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);