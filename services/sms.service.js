const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const from = process.env.PHONE_FROM;
const to = process.env.PHONE_TO;

class SmsService {
    constructor() {
        this.logger = require('../utils/logger');
    }

    sendMessage(body = '') {
        client.messages
        .create({
            body,
            from,
            to
        })
        .then(message => {
            console.log(message.sid);
            this.logger.info(`Message has been sent to [${to}] with text: ${message}`);
        });
    }
}

module.exports = SmsService;
