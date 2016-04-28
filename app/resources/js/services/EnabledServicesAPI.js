var request = require('request');

EnabledServicesAPI = {

    getServices: function(callback) {

        request('http://localhost:8080/api/services/', function (error, response, body) {

            if (!error && response.statusCode == 200) {

                return callback(null, body)
              } else {

                return callback(error, null);
              }
            });
        }
};

module.exports = EnabledServicesAPI;