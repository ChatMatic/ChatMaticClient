// IPC to communicate from webview to main process
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
//var IPCMessageKeys = require("./js/statics/IPCMessageKeysEnum.js");
//var AccountConfigurationModels = require("./js/models/AccountConfigurationStorageModel.js");
var DataManager = require("./js/services/DataManager.js");

// require jquery
window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js');

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

                ipcRenderer.send(IPCMessageKeys.AddNewAccount, AccountConfigurationModels.NewAccount(1, 'personal facebook', true, false));

        }

    },

    displayUserAccounts : function() {

        DataManager.GetExistingAccounts(function(error, data) {

            if (!error) {
                console.log('existing accounts ' + JSON.stringify(data));
                document.getElementById('accountResults').innerHTML = "<p>" + data + "</p>";
            } else {
                console.log(error);
            }

        });

    }

};

SettingsView.init();