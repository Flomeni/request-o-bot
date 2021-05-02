const fs = require('fs');
const logDirectory = process.env.LOGS_PATH || `${__dirname}/logs`;
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, {recursive: true});
}

const opt = {
    logDirectory,
    fileNamePattern: 'request-o-bot-<DATE>.log',
    dateFormat: 'YYYY.MM.DD-HHa'
}
const rfl = require('simple-node-logger').createRollingFileLogger(opt);

exports.logger = rfl;
