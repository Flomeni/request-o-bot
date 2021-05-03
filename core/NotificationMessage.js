class AbstractNotificationMessage {
    /**
     * {string} body of the message. Stringified JSON by default.
     */
     _body;

     /**
      * {boolean} shows whether this message eligible of to be notified of or not
      */
     _isSendible;
 
     /**
      * {boolean} shows whether this message eligible of to be logged or not
      */
     _isLoggable;
     
    getIsSendible() {}

    getIsLoggable() {}

    toString() {}
}

/**
 *  "Abstract" Notification message that acts as a bridge between NotificationMessage
 *  interface and any new concrete NotificationMessage, wiring up behaviours of default
 *  and custom messages.
 *  */
class NotificationMessage extends AbstractNotificationMessage {
    /**
     * 
     * @param {AbstractNotificationMessage} message - concrete sub type of NotificationMessage
     */
    constructor(message) {
        super();
        this._message = message;
    }

    getBody() {
        return this._message._body;
    }

    getIsSendible() {
        return this._message._isSendible;
    }

    getIsLoggable() {
        return this._message._isLoggable;
    }

    toString() {
        return this._message.toString();
    }
}

exports.NotificationMessage = NotificationMessage;
exports.AbstractNotificationMessage = AbstractNotificationMessage;
