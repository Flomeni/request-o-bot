const { AbstractNotificationMessage } = require("./NotificationMessage");

class DefaultNotificationMessage extends AbstractNotificationMessage {
    /**
     * 
     * @param {Object} json - recieved data 
     */
    constructor(
        json,
        isLoggable = true,
        isSendible = false
    ) {
        super();
        this._body = JSON.stringify(json);
        this._isLoggable = isLoggable;
        this._isSendible = isSendible;
    }

    toString() {
        return `Data: ${this._body}`;
    }
}

module.exports = DefaultNotificationMessage;
