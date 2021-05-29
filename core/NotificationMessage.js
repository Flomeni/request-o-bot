const { assertNotNull } = require('../utils/assert'); 

// Acts as an abstract class
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
 *  "Abstract" NotificationMessage that acts as a bridge between NotificationMessage
 *  interface(AbstractNotificationMessage) and any new concrete NotificationMessage, wiring up behaviours of default
 *  and custom messages.
 *  */
class NotificationMessage extends AbstractNotificationMessage {
    /**
     * 
     * @param {AbstractNotificationMessage} message - concrete sub type of NotificationMessage
     */
    constructor(message) {
        super();
        assertNotNull(message, "AbstractNotificationMessage instance");

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

exports.NotificationMessage = NotificationMessage;
exports.AbstractNotificationMessage = AbstractNotificationMessage;
exports.DefaultNotificationMessage = DefaultNotificationMessage;
