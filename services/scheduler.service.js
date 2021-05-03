const cron = require('node-cron');

class SchedulerService {
    //TODO: add env variable to config cron periodicity, e.g. every 1min, 5min, 1hour, 24hours, Saturday-Sunday
    static SCHEDULE_FOR = process.env.SCHEDULE_FOR;
    static SHOULD_LOG = process.env.SHOULD_LOG || false;

    constructor() {
        Object.assign(this, {logger: require('../utils/logger')});
    }

    // running a task every %SCHEDULE_FOR%, see https://www.npmjs.com/package/node-cron
    // @params {JSON} cb - callback that returns fetched data
    start(cb) {
        cron.schedule('* * * * *', () => {
            try {
                const data = cb();
                if (SchedulerService.SHOULD_LOG) {
                    this.logger.info(`SchedulerService::start ${JSON.stringify(data)}`);
                }
            } catch(e) {
                console.error(e);
                if (SchedulerService.SHOULD_LOG) {
                    this.logger.error(`SchedulerService::start ${e}`);
                }
            }
        });
    }
}

module.exports = SchedulerService;
