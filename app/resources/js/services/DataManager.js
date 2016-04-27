/**
 * Created by philhudson on 26/04/2016.
 */
const storage = require('electron-json-storage');

StorageKeys = {
    UserAccounts : "user_accounts"
};

function count(obj) { return Object.keys(obj).length; }


DataManager = {

  AddNewAccount: function(data) {

      var newStorageObj = {
          0 : data
      };

      this.GetExistingAccounts(function(error, existingAccounts) {

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
                      throw error;
                  } else {
                      console.log("data save success with payload: " +  existingAccounts    );
                  }
              });
          }

      });

  },

    GetExistingAccounts: function (callback) {

        storage.get(StorageKeys.UserAccounts, function(error, data){
            if (error) {
                return callback(error, null);
            } else {
                console.log('existing accounts ' + JSON.stringify(data));
                return callback(null, data);
            }
        });
    }

};

module.exports = DataManager;