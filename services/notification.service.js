class NotificationService {
    constructor(plugins = []) {
        this.notificationPlugins = plugins;
    }

    addPlugins(plugins) {
        this.notificationPlugins = this.notificationPlugins.concat(plugins);
        return this;
    }

    /**
     * 
     * @param {Object} json - JSON fetched from the server 
     */
    notifyAll(json) {
        this.notificationPlugins.forEach(async (plugin) => {
            await plugin.notify(json);
        });
    }
}

module.exports = NotificationService;
