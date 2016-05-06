/**
 * Created by philhudson on 26/04/2016.
 */
const storage = require('electron-json-storage');

StorageKeys = {
    UserAccounts: "user_accounts",
    EnabledServices: "enabled_services"
};

function count(obj) {
    return Object.keys(obj).length;
}


DataManager = {

    AddNewAccount: function (data, callback) {

        var newStorageObj = {
            0: data
        };

        this.GetExistingAccounts(function (error, existingAccounts) {

            if (!error) {

                if (existingAccounts != null || existingAccounts != undefined) {

                    var countOfProperties = count(existingAccounts);

                    if (countOfProperties >= 0) {

                        countOfProperties += 1;
                        existingAccounts[countOfProperties] = data;

                    } else {

                        existingAccounts = newStorageObj
                    }

                } else {

                    existingAccounts = newStorageObj
                }

                storage.set(StorageKeys.UserAccounts, existingAccounts, function (error) {
                    if (error) {
                        return callback(error, null);
                    } else {
                        console.log("data save success with payload: " + existingAccounts);

                        return callback(null, true);
                    }
                });
            } else {
                console.log(error);
            }

        });

    },

    GetExistingAccounts: function (callback) {

        storage.get(StorageKeys.UserAccounts, function (error, data) {
            if (error) {
                return callback(error, null);
            } else {
                console.log('existing accounts ' + JSON.stringify(data));
                return callback(null, data);
            }
        });
    },

    SaveEnabledServices: function(data, callback) {
        storage.set(StorageKeys.EnabledServices, data, function (error) {
            if (error) {
                return callback(error, null);
            } else {
                console.log("data save success with payload: " + data);

                return callback(null, true);
            }
        });
    },

    GetEnabledServices: function(callback) {
        storage.get(StorageKeys.EnabledServices, function (error, data) {
            if (error) {
                return callback(error, null);
            } else {
                console.log('enabled services ' + JSON.stringify(data));
                return callback(null, data);
            }
        });
    }

};

module.exports = DataManager;