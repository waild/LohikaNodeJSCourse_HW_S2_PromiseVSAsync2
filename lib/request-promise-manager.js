var rp = require('request-promise');

function getJson(uri) {

    var options = {
        method: 'GET',
        uri: uri,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    return rp(options);
};

module.exports = {
    getJson
}