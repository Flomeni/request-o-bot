const RequestOBot = require('../RequestOBot');
const SmsPlugin = require('../core/SmsNotificationPlugin');

(function main(){
    const rb = new RequestOBot();

    rb
    .addPlugins([
        new SmsPlugin()
    ])
    .schedule();
})();
