const axios = require('axios');

class RequestService {

    constructor() {
        this.logger = require('../utils/logger');
    }

    get(url, config) {
        return axios.get(url)
            .then(response => {
                this.logger.info(`RequestService::get ${JSON.stringify(response.data)}`);
                return response;
            })
            .catch(function (error) {
                console.error(error);
                this.logger.error(`RequestService::get ${error.message}`);
            });
    }

    async getData(url) {
        return (await this.get(url)).data;
    }
}

module.exports = RequestService;
