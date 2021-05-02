const axios = require('axios');

const GET = (url, config) => {
    return axios.get(url)
        .then(response => response)
        .catch(function (error) {
            console.log(error);
        });
};

const GET_DATA = async (url) => {
    return (await GET(url)).data;
};

exports.get = GET;
exports.get_data = GET_DATA;
