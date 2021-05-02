// Replace with your configed '.env' or use default one, e.g. require('dotenv').config();
require('dotenv').config({ path: './private.env'});
const cron = require('node-cron');

const request = require('./services/request.service');
const Logger = require('./utils/logger').logger;

const REQUEST_URL = process.env.REQUEST_URL;
const DAYS_TO_REQUEST = process.env.DAYS_TO_REQUEST;
const SHOULD_LOG = process.env.SHOULD_LOG || false;

(function main() {
    //running a task every minute, see https://www.npmjs.com/package/node-cron
    //TODO: add env variable to config cron periodicity, e.g. every 1min, 5min, 1hour, 24hours, Saturday-Sunday
    cron.schedule('* * * * *', async () => {
        try {
            const data = await request.get_data(REQUEST_URL);
            console.log(data);
            if (SHOULD_LOG) {
                Logger.info(`DATA: ${JSON.stringify(data)}`);
            }
        } catch(e) {
            console.error(e);
        }
    });
})();
