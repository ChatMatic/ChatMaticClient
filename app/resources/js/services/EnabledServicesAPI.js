var request = require('request');

EnabledServicesAPI = {

    getServices: function(callback) {

        request('http://swagchat.apps.incipit.ws/api/services/', function (error, response, body) {

            if (!error && response.statusCode == 200) {

                return callback(null, body)
              } else {

                if (!error) {
                    return callback(response.statusCode, null);
                }
                return callback(error, null);
              }
            });
        }
};

module.exports = EnabledServicesAPI;