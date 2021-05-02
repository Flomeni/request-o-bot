const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const logDirectory = process.env.LOGS_PATH || `${appDir}/logs`;
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, {recursive: true});
}

const opt = {
    logDirectory,
    fileNamePattern: 'request-o-bot-<DATE>.log',
    dateFormat: 'YYYY.MM.DD-HHa'
}
const rfl = require('simple-node-logger').createRollingFileLogger(opt);

module.exports = rfl;
