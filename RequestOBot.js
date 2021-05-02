// Replace with your configed '.env' or use default one, e.g. require('dotenv').config();
require('dotenv').config({ path: './private.env'});

const Scheduler = require('./services/scheduler.service');
const request = require('./services/request.service');

class RequestOBot {

    static REQUEST_URL = process.env.REQUEST_URL;
    
    constructor() {
        this.scheduler = new Scheduler();
        this.notification_plugins = [];
    }

    addPlugins(plugins) {
        this.notification_plugins = this.notification_plugins.concat(plugins);
        return this;
    }

    schedule() {
        this.scheduler.start(() => {
            const data = request.get_data(RequestOBot.REQUEST_URL);
            
            this.notification_plugins.forEach(async (plugin) => {
                await plugin.notify(data);
            });

            return data;
        });
    }
}

module.exports = RequestOBot;
