const cron = require('node-cron');

class SchedulerService {
    //TODO: add env variable to config cron periodicity, e.g. every 1min, 5min, 1hour, 24hours, Saturday-Sunday
    static SCHEDULE_FOR = process.env.SCHEDULE_FOR;
    static SHOULD_LOG = process.env.SHOULD_LOG || false;

    constructor() {
        Object.assign(this, {logger: require('../utils/logger')});
    }

    // running a task every %SCHEDULE_FOR%, see https://www.npmjs.com/package/node-cron
    // @params {JSON} cb - callback
    start(cb) {
        let count = 1;
        cron.schedule('* * * * *', async () => {
            try {
                cb();

                SchedulerService.SHOULD_LOG
                    && this.logger.info(`SchedulerService::start Tick #${count++} is finished.`);
            } catch(e) {
                console.error(e);

                SchedulerService.SHOULD_LOG
                    && this.logger.error(`SchedulerService::start ${e}`);
            }
        });
    }
}

module.exports = SchedulerService;
