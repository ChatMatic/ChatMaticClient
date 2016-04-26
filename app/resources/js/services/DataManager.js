/**
 * Created by philhudson on 26/04/2016.
 */
const storage = require('electron-json-storage');
var StorageKeys = require('../statics/StorageKeysEnum.js');

DataManager = {

  AddNewAccount: function(data) {

    storage.set(StorageKeys.UserAccounts, data, function (error) {
        if (error) {
          throw error;
        } else {
          console.log("data save success with payload: " +  JSON.stringify(data, null, "    "));
        }
    });
  }

};

module.exports = DataManager;