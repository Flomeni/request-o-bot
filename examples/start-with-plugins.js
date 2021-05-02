const RequestOBot = require('../RequestOBot');
const SmsPlugin = require('../core/sms-plugin');

(function main(){
    const rb = new RequestOBot();

    rb
    .addPlugins([
        new SmsPlugin()
    ])
    .schedule();
})();
