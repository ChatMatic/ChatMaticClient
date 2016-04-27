var request = require('request');

EnabledServicesAPI = {

    getServices: function() {
        return request('http://localhost:8080/api/services/', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            return body;
          } else {
            return null;
          }
        });

    }
}

module.exports = EnabledServicesAPI;