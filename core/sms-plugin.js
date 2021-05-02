const AbstractNotificationPlugin = require('./AbstractNotificationPlugin');
const SmsService = require('../services/sms.service');

class SmsPlugin extends AbstractNotificationPlugin {
    constructor() {
        super();
        this.smsService = new SmsService();
    }

    async notify(msg = {}) {
        await this.smsService.sendMessage(JSON.stringify(msg));
    }
}

module.exports = SmsPlugin;
