require('dotenv').config({ path: './private.env'});
const cron = require('node-cron');

const request = require('./services/request.service');

const REQUEST_URL = process.env.REQUEST_URL;
const LOGS_PATH = process.env.LOGS_PATH;
const SHOULD_LOG = process.env.SHOULD_LOG;
const DAYS_TO_REQUEST = process.env.DAYS_TO_REQUEST;

(function main() {
    //running a task every minute, see https://www.npmjs.com/package/node-cron
    //TODO: add env variable to config cron periodicity, e.g. every 1min, 5min, 1hour, 24hours, Saturday-Sunday
    cron.schedule('* * * * *', async () => {
        try {
            const data = await request.get_data(REQUEST_URL);
            console.log(data);
        } catch(e) {
            console.error(e);
        }
    });
})();