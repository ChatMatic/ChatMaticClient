// IPC to communicate from webview to main process
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
//var IPCMessageKeys = require("./js/statics/IPCMessageKeysEnum.js");
//var AccountConfigurationModels = require("./js/models/AccountConfigurationStorageModel.js");
var DataManager = require("./resources/js/services/DataManager.js");

// require jquery
window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js');

function count(obj) { return Object.keys(obj).length; }

var SettingsView = {
    init: function (){
        console.log("init settings view");

        this.displayUserAccounts()
    },

    toggleAddAccountForms: function(identifier) {

        jQuery('#' + identifier).toggle();

    },

    addAccountFormSubmitted : function(formIdentifier) {

        switch (formIdentifier) {

            case AccountTypes.Facebook_Messenger:

                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(1, 'personal facebook', true, false), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }

                });

        }

    },

    displayUserAccounts : function() {

        DataManager.GetExistingAccounts(function(error, data) {

            if (!error) {
                console.log('existing accounts ' + JSON.stringify(data));

                for (var i=0;i<count(data); i++) {

                    var account = JSON.stringify(data[i]);

                    $("#accountResults").append('<li><a href="#">'+ account +'</a></li>');

                }

            } else {
                console.log(error);
            }

        });

    }

};

SettingsView.init();