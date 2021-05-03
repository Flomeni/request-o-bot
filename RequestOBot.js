// Replace with your configed '.env' or use default one, e.g. require('dotenv').config();
require('dotenv').config({ path: './private.env'});

const SchedulerService = require('./services/scheduler.service');
const RequestService = require('./services/request.service');
const NotificationService = require('./services/notification.service');

class RequestOBot {

    static REQUEST_URL = process.env.REQUEST_URL;
    static SHOULD_LOG = process.env.SHOULD_LOG;
    
    constructor(plugins = []) {
        this.schedulerService = new SchedulerService();
        this.notificationService = new NotificationService(plugins);
        this.requestService = new RequestService();
    }

    addPlugins(plugins) {
        this.notificationService.addPlugins(plugins);
        return this;
    }

    schedule() {
        this.schedulerService.start(async () => {
            const data = await this.requestService.getData(RequestOBot.REQUEST_URL);
            
            this.notificationService.notifyAll(data);

            return data;
        });
    }
}

module.exports = RequestOBot;
