const RequestOBot = require('../RequestOBot');
const SmsNotificationPlugin = require('../core/SmsNotificationPlugin');
const { AbstractNotificationMessage } = require("../core/NotificationMessage");

// Custom object, that will process messages
class JSONDto {
    static AVAILABLE_STATUS = 'available';
    static ACTIVE_LOT_STATUS = 'active';

    constructor(json) {
        this._json = json;
        this.price = json.price;
        this.sellStatus = json.sell_status;
        this.status = json.status;
    }

    isAvailable() {
        return this.sellStatus === JSONDto.AVAILABLE_STATUS;
    }

    isLotActive() {
        return this.status === JSONDto.ACTIVE_LOT_STATUS;
    }

    isSendible() {
        return this.isAvailable() && this.isLotActive();
    }

    toJSON() {
        return this._json;
    }
}

class SmsNotificationMessage extends AbstractNotificationMessage {
    /**
     * 
     * @param {Object} json - recieved data 
     */
     constructor(
        json,
    ) {
        super();
        this._dto = new JSONDto(json);
        this._body = JSON.stringify(json);
        this._isSendible = this._dto.isSendible();
        this._isLoggable = true;
    }

    toString() {
        if (this._dto.isAvailable()) {
            return 'The lot is available again!!!';
        }

        return `The lot status is: ${this._dto.status}.`;
    }
}

(function main(){
    const rb = new RequestOBot();

    rb
    .addPlugins([
        new SmsNotificationPlugin(
            SmsNotificationMessage,
            /*isLoggable*/true,
            /*isSendible*/true
        ),
    ])
    .schedule();
})();
