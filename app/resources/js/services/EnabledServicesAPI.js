var request = require('request');

var data = null;

EnabledServicesAPI = {

    getServices: function() {
        if (data === null) {
            return request('http://localhost:8080/api/services/', function (error, response, body) {
              if (!error && response.statusCode == 200) {
                data = body;
                return body;
              } else {
                return null;
              }
            });
        } else {
            return data;
        }

    }
}

module.exports = EnabledServicesAPI;