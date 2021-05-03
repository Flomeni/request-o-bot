const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const from = process.env.PHONE_FROM;
const to = process.env.PHONE_TO;

class SmsService {
    constructor() {
        this.logger = require('../utils/logger');
    }

    /**
     * 
     * @param {string} body 
     * @returns
     */
    sendMessage(body) {
        client.messages
        .create({
            body,
            from,
            to
        })
        .then(message => {
            this.logger.info(`SmsService::sendMessage --BODY-- ${body}. \n Server response: ${JSON.stringify(message)}`);
        })
        .catch(response => {
            this.logger.error(`SmsService::sendMessage --ERROR-- ${response}`);
        });
    }
}

module.exports = SmsService;
