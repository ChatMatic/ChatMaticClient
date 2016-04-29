var request = require('request');
const DataManager = require("./DataManager.js");


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
        },

    populateEnabledServices: function() {
        this.getServices(function(error,data){

            // TODO: test that we can save an array okay straight from the request

            if (!error) {
                console.log(data);
                DataManager.SaveEnabledServices(data, function(error, success){
                    if (!error) {
                        console.log('enabled services saved successfully with payload: ' + JSON.stringify(success));
                    } else {
                        console.log('enabled services failed to save with error: ' + error);
                    }
                });
            } else {
                console.log('enabled services request failed with error: ' + error);

            }

        });

    }
};

module.exports = EnabledServicesAPI;