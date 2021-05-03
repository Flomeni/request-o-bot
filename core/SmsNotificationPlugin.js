const AbstractNotificationPlugin = require('./AbstractNotificationPlugin');
const SmsService = require('../services/sms.service');
const DefaultNotificationMessage = require('./DefaultNotificationMessage');
const { NotificationMessage } = require('./NotificationMessage');

class SmsNotificationPlugin extends AbstractNotificationPlugin {
    constructor(
        notificationCtor = DefaultNotificationMessage,
        isLoggable = process.env.SHOULD_LOG,
        isSendible = false,
    ) {
        super();
        this.notificationCtor = notificationCtor;
        this.isLoggable = isLoggable;
        this.isSendible = isSendible;
        this.smsService = new SmsService();
    }

    async notify(json) {
        const notification = new NotificationMessage(
            new this.notificationCtor(json, this.isLoggable, this.isSendible)
        );

        if (!this.isSendible || !notification.getIsSendible()) {
            console.warn('Message is not sendible');
            return;
        }

        await this.smsService.sendMessage(notification.toString());
    }
}

module.exports = SmsNotificationPlugin;
